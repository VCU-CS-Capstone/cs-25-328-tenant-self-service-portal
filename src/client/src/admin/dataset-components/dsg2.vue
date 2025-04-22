<!--  DatasetGallery.vue  -->
<template>
    <div>
      <!-- ███  TOP NAV  ███ -->
      <div class="header">
        <nav>
          <RouterLink
            v-for="item in navItems"
            :key="item.key"
            :to="{ path: '/admin/datasets', query: { filter: item.key } }"
            :class="{ active: activeFilter === item.key }"
            replace
          >
            {{ item.label }}
          </RouterLink>
        </nav>
      </div>
  
      <!-- ███  MAIN  ███ -->
      <div class="main-container">
        <!-- ── GROUPED LAYOUT ── -->
        <template v-if="needsGrouping">
          <section v-for="statusKey in groupedSectionsToShow" :key="statusKey">
            <h3 class="status-header">{{ statusLabels[statusKey] }}</h3>
  
            <div class="dataset-grid">
              <div
                v-for="dataset in groupedDatasets[statusKey]"
                :key="dataset.dataset_id"
                class="dataset-card"
              >
                <h4 class="dataset-name">{{ dataset.dataset_name }}</h4>
                <p>{{ dataset.description }}</p>
  
                <!-- ACTION BUTTONS BOTTOM‑RIGHT -->
                <!-- Admin‑Approve tab -->
                <button
                  v-if="activeFilter === 'adminapprove' && dataset.status === 'PENDING_REVIEW'"
                  class="primary-action approve"
                  @click="approveDataset(dataset.dataset_id)"
                  :title="'Approve ' + dataset.dataset_name"
                >
                  ✔
                </button>
  
                <!-- Admin‑Approve tab: Unapprove -->
                <button
                  v-if="activeFilter === 'adminapprove' && dataset.status === 'COMPLETED'"
                  class="primary-action unapprove"
                  @click="unapproveDataset(dataset.dataset_id)"
                  :title="'Move back to Pending Review'"
                >
                  ✘
                </button>
  
                <!-- Review/Edit tab -->
                <button
                  v-if="activeFilter === 'review'"
                  class="primary-action review"
                  @click="openReview(dataset.dataset_id)"
                  :title="'Review ' + dataset.dataset_name"
                >
                  ✎
                </button>
  
                <!-- COMMENTS -->
                <ul v-if="showComments" class="comment-list">
                  <li
                    v-for="comment in commentsForDataset(dataset.dataset_id)"
                    :key="comment.comment_id"
                  >
                    {{ comment.comment_text }}
                    <template v-if="activeFilter === 'addEdit'">
                      <button
                        class="comment-btn edit"
                        @click="openCommentForm(dataset.dataset_id, comment)"
                      >
                        Edit
                      </button>
                      <button
                        class="comment-btn delete"
                        @click="deleteCommentHandler(comment.comment_id)"
                      >
                        Delete
                      </button>
                    </template>
                  </li>
                </ul>
  
                <button
                  v-if="activeFilter === 'addEdit'"
                  class="comment-btn add"
                  @click="openCommentForm(dataset.dataset_id, null)"
                >
                  Add Comment
                </button>
              </div>
            </div>
          </section>
        </template>
  
        <!-- ── FLAT LAYOUT (Pending / Approved views) ── -->
        <template v-else>
          <div class="dataset-grid">
            <div
              v-for="dataset in filteredDatasets"
              :key="dataset.dataset_id"
              class="dataset-card"
            >
              <h4 class="dataset-name">{{ dataset.dataset_name }}</h4>
              <p>{{ dataset.description }}</p>
            </div>
          </div>
        </template>
  
        <!-- ➕ floating register button -->
        <button class="add-dataset-btn" @click="addNewDataset" title="Register new dataset">
          +
        </button>
      </div>
  
      <!-- COMMENT MODAL -->
      <div v-if="formVisible" class="comment-modal" @click.self="closeCommentForm">
        <div class="comment-form">
          <textarea v-model="currentCommentText" placeholder="Type your comment…"></textarea>
          <div class="comment-form-actions">
            <button @click="saveComment">Save</button>
            <button @click="closeCommentForm">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useRouter, useRoute, RouterLink } from "vue-router";
  import {
    getAllDatasets,
    approveDataset,
    submitDataset,
  } from "@/services/dataset.api";
  import { getCurrentUser } from "@/services/auth.api";
  import {
    getAllComments,
    createComment,
    updateComment,
    deleteComment,
  } from "@/services/comment.api";
  
  export default {
    name: "DatasetGallery",
    components: { RouterLink },
    setup() {
      const router = useRouter();
      const route = useRoute();
      return { router, route };
    },
    data() {
      return {
        datasets: [],
        comments: [],
        loading: false,
        error: null,
        // comment‑form state
        currentUserId: null,
        currentCommentId: null,
        currentDatasetId: null,
        currentCommentText: "",
        formVisible: false,
      };
    },
    computed: {
      /* current tab via query‑string */
      activeFilter() {
        return this.route.query.filter || "all";
      },
      /* which tabs need grouping */
      needsGrouping() {
        return ["all", "comments", "addEdit", "review", "adminapprove"].includes(
          this.activeFilter
        );
      },
      /* datasets for non‑grouped tabs (Pending / Approved) */
      filteredDatasets() {
        switch (this.activeFilter) {
          case "pending":
            return this.datasets.filter((d) => d.status === "PENDING_REVIEW");
          case "approved":
            return this.datasets.filter((d) => d.status === "COMPLETED");
          default:
            return this.datasets;
        }
      },
      /* grouped map: status → array */
      groupedDatasets() {
        const groups = { DRAFT: [], PENDING_REVIEW: [], COMPLETED: [] };
        const source =
          this.activeFilter === "review"
            ? this.datasets.filter((d) =>
                ["DRAFT", "PENDING_REVIEW"].includes(d.status)
              )
            : this.datasets;
  
        source.forEach((d) => groups[d.status]?.push(d));
        return groups;
      },
      /* order of sections per tab */
      groupingOrder() {
        if (this.activeFilter === "review") return ["DRAFT", "PENDING_REVIEW"];
        if (this.activeFilter === "adminapprove")
          return ["PENDING_REVIEW", "COMPLETED"];
        return ["DRAFT", "PENDING_REVIEW", "COMPLETED"];
      },
      groupedSectionsToShow() {
        return this.groupingOrder.filter(
          (key) => this.groupedDatasets[key].length
        );
      },
      statusLabels() {
        return {
          DRAFT: "DRAFT",
          PENDING_REVIEW: "PENDING REVIEW",
          COMPLETED: "APPROVED",
        };
      },
      showComments() {
        return ["comments", "addEdit"].includes(this.activeFilter);
      },
      navItems() {
        return [
          { key: "all", label: "All Datasets" },
          { key: "pending", label: "Pending" },
          { key: "approved", label: "Approved" },
          { key: "review", label: "Review/Edit" },
          { key: "comments", label: "Comments" },
          { key: "addEdit", label: "Admin Comments" },
          { key: "adminapprove", label: "Admin Approve" },
        ];
      },
    },
    watch: {
      activeFilter: {
        immediate: true,
        handler() {
          if (this.showComments) this.fetchComments();
        },
      },
    },
    created() {
      this.fetchCurrentUser().then(() => this.fetchDatasets());
    },
    methods: {
      /* ── fetch helpers ── */
      async fetchDatasets() {
        try {
          this.loading = true;
          this.datasets = await getAllDatasets();
        } catch (e) {
          this.error = e.message;
        } finally {
          this.loading = false;
        }
      },
      async fetchComments() {
        try {
          this.comments = await getAllComments();
        } catch (e) {
          this.error = e.message;
        }
      },
      commentsForDataset(id) {
        return this.comments
          .filter((c) => c.dataset_id === id)
          .sort((a, b) => a.comment_id - b.comment_id);
      },
      /* ── comment form ── */
      openCommentForm(datasetId, comment) {
        this.currentDatasetId = datasetId;
        if (comment) {
          this.currentCommentId = comment.comment_id;
          this.currentCommentText = comment.comment_text;
        } else {
          this.currentCommentId = null;
          this.currentCommentText = "";
        }
        this.formVisible = true;
      },
      closeCommentForm() {
        this.formVisible = false;
      },
      async saveComment() {
        if (!this.currentCommentText.trim()) return;
        try {
          if (this.currentCommentId) {
            await updateComment(this.currentCommentId, {
              userId: this.currentUserId,
              datasetId: this.currentDatasetId,
              commentText: this.currentCommentText,
            });
          } else {
            await createComment({
              userId: this.currentUserId,
              datasetId: this.currentDatasetId,
              commentText: this.currentCommentText,
            });
          }
          await this.fetchComments();
          this.closeCommentForm();
        } catch (e) {
          console.error(e);
        }
      },
      async deleteCommentHandler(id) {
        if (!confirm("Delete this comment?")) return;
        try {
          await deleteComment(id);
          await this.fetchComments();
        } catch (e) {
          console.error(e);
          alert("Failed to delete comment");
        }
      },
      /* ── dataset actions ── */
      async approveDataset(id) {
        if (!confirm("Approve this dataset?")) return;
        try {
          await approveDataset(id);
          await this.fetchDatasets();
        } catch (e) {
          console.error(e);
          alert("Failed to approve dataset");
        }
      },
      async unapproveDataset(id) {
        if (!confirm("Move this dataset back to Pending Review?")) return;
        try {
          await submitDataset(id); // sets status back to PENDING_REVIEW
          await this.fetchDatasets();
        } catch (e) {
          console.error(e);
          alert("Failed to un-approve dataset");
        }
      },
      openReview(id) {
        this.router.push({ name: "AdminGDRStep5", params: { datasetId: id } });
      },
      addNewDataset() {
        this.router.push("/admin/datasets/register");
      },
      async fetchCurrentUser() {
        try {
          const user = await getCurrentUser();
          this.currentUserId = user.id;
        } catch (e) {
          this.error = e.message;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* ███ HEADER ███ */
  .header {
    background: #ffffff;
    border-bottom: 1px solid #ffffff;
    padding: 30px 20px;
  }
  nav a {
    margin-right: 20px;
    color: #017291;
    text-decoration: none;
    font-weight: bold;
    font-size: 14px;
    padding: 8px 16px;
    border-radius: 4px;
    transition: all 0.3s;
  }
  nav a:hover {
    background: #a9dcea;
    color: #015e78;
  }
  nav a.active {
    background: #017291;
    color: #fff;
  }
  
  /* ███ MAIN ███ */
  .main-container {
    background: #fff;
    padding: 20px;
    min-height: calc(100vh - 60px);
    overflow-y: auto;
  }
  .status-header {
    margin: 25px 0 10px;
    font-size: 18px;
    font-weight: 700;
    color: #003d4c;
  }
  
  /* GRID + CARD */
  .dataset-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    gap: 20px;
  }
  .dataset-card {
    position: relative;
    padding: 12px 10px 48px; /* bottom padding for button space */
    border: 1px solid #017291;
    border-top: 3.5px solid #017291;
    background: #fff;
    box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
    transition: box-shadow 0.2s;
  }
  .dataset-card:hover {
    box-shadow: 0 4px 8px rgb(0 0 0 / 15%);
  }
  .dataset-name {
    margin: 0 0 6px;
    font-size: 15px;
    color: #003d4c;
  }
  .dataset-card p {
    font-size: 14px;
    color: #333;
    line-height: 1.45;
    margin: 0;
  }
  
  /* PRIMARY ACTION BTN */
  .primary-action {
    position: absolute;
    bottom: 8px;
    right: 8px;
    border: none;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    font-size: 18px;
    cursor: pointer;
    color: #fff;
  }
  .primary-action.approve {
    background: #0a9;
  }
  .primary-action.unapprove {
    background: #c0392b;
  }
  .primary-action.review {
    background: #017291;
  }
  /* .hover-reveal {
    opacity: 0;
  } */
  .dataset-card:hover .hover-reveal {
    opacity: 1;
  }
  
  /* COMMENT LIST + BUTTONS */
  .comment-list {
    margin-top: 10px;
    padding-left: 18px;
    border-top: 1px dashed #ccc;
  }
  .comment-btn {
    margin-left: 6px;
    background: #0a9;
    color: #fff;
    border: none;
    padding: 2px 8px;
    border-radius: 3px;
    font-size: 12px;
    cursor: pointer;
  }
  .comment-btn.delete {
    background: #c0392b;
  }
  .comment-btn.edit {
    background: #017291;
  }
  .comment-btn.add {
    margin-top: 8px;
  }
  
  /* COMMENT MODAL */
  .comment-modal {
    position: fixed;
    inset: 0;
    background: rgba(0 0 0 / 0.45);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }
  .comment-form {
    background: #fff;
    padding: 16px;
    width: 420px;
    border-radius: 6px;
  }
  .comment-form textarea {
    width: 100%;
    min-height: 80px;
    resize: vertical;
    padding: 6px;
    font-size: 14px;
    margin-bottom: 10px;
  }
  .comment-form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }
  .comment-form-actions button {
    padding: 6px 14px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .comment-form-actions button:first-child {
    background: #017291;
    color: #fff;
  }
  .comment-form-actions button:last-child {
    background: #eee;
    color: #333;
  }
  
  /* ➕ FLOATING BUTTON */
  .add-dataset-btn {
    position: fixed;
    bottom: 22px;
    right: 22px;
    background: #017291;
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 52px;
    height: 52px;
    font-size: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 0 4px 8px rgb(0 0 0 / 28%);
  }
  .add-dataset-btn:hover {
    background: #015e78;
  }
  </style>