<template>
  <div>
    <!-- ========== HEADER ========== -->
    <div class="header">
      <nav>
        <a
          href="#"
          @click.prevent="setFilter('all')"
          :class="{ active: activeFilter === 'all' }"
          >All Datasets</a
        >
        <a
          href="#"
          @click.prevent="setFilter('pending')"
          :class="{ active: activeFilter === 'pending' }"
          >Pending</a
        >
        <a
          href="#"
          @click.prevent="setFilter('approved')"
          :class="{ active: activeFilter === 'approved' }"
          >Approved</a
        >
        <a
          href="#"
          @click.prevent="setFilter('review')"
          :class="{ active: activeFilter === 'review' }"
          >Review/Edit</a
        >
        <a
          href="#"
          @click.prevent="setFilter('comments')"
          :class="{ active: activeFilter === 'comments' }"
          >Comments</a
        >
        <a
          href="#"
          @click.prevent="setFilter('addEdit')"
          :class="{ active: activeFilter === 'addEdit' }"
          >Admin Comments</a
        >
        <a
          href="#"
          @click.prevent="setFilter('adminapprove')"
          :class="{ active: activeFilter === 'adminapprove' }"
          >Admin Approve</a
        >
      </nav>
    </div>

    <!-- ========== MAIN CONTENT ========== -->
    <div class="main-container">
      <div class="dataset-grid">
        <div
          v-for="dataset in filteredDatasets"
          :key="dataset.dataset_id"
          class="dataset-card"
        >
          <div class="dataset-actions">
            <h3 class="dataset-name">{{ dataset.dataset_name }}</h3>
            <!-- radio binds to selectedDatasetId -->
            <input
              type="radio"
              name="select-dataset"
              :value="dataset.dataset_id"
              v-model="selectedDatasetId"
            />
          </div>

          <p>{{ dataset.description }}</p>

          <!-- COMMENTS -->
          <ul class="comment-list" v-show="showComments">
            <li
              v-for="comment in commentsForDataset(dataset.dataset_id)"
              :key="comment.comment_id"
            >
              {{ comment.comment_text }}
              <button
                v-if="activeFilter === 'addEdit'"
                class="edit-comment-btn"
                @click="openCommentForm(dataset.dataset_id, comment)"
              >
                Edit
              </button>
              <button
                v-if="activeFilter === 'addEdit'"
                class="delete-comment-btn"
                @click="deleteCommentHandler(comment.comment_id)"
              >
                Delete
              </button>
            </li>
          </ul>

          <button
            v-if="activeFilter === 'addEdit'"
            class="add-comment-btn"
            @click="openCommentForm(dataset.dataset_id, null)"
          >
            Add Comment
          </button>

          <div
            class="comment-form"
            v-show="formVisible && currentDatasetId === dataset.dataset_id"
          >
            <textarea
              v-model="currentCommentText"
              placeholder="Type your comment..."
            ></textarea>
            <button @click="saveComment">Save</button>
            <button @click="closeCommentForm">Cancel</button>
          </div>
        </div>
      </div>

      <button
        v-if="activeFilter === 'adminapprove' && selectedDatasetId"
        class="approve-dataset-btn"
        @click="approveSelectedDataset"
      >
        Approve
      </button>

      <button
        v-if="activeFilter === 'approved' && selectedDatasetId"
        class="unapprove-dataset-btn"
        @click="unapproveSelectedDataset"
      >
        Unapprove
      </button>

      <button
        v-if="activeFilter === 'review' && selectedDatasetId"
        class="review-btn"
        @click="openReview(selectedDatasetId)"
      >
        Review / Edit
      </button>

      <button class="add-dataset-btn" @click="addNewDataset">+</button>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { getAllDatasets, approveDataset } from "@/services/dataset.api";
import { submitDataset } from "@/services/dataset.api";
import {
  getAllComments,
  createComment,
  updateComment,
  deleteComment,
} from "@/services/comment.api";

export default {
  name: "DatasetRegistration",

  setup() {
    const router = useRouter();
    return { router };
  },

  data() {
    return {
      activeFilter: "all",
      datasets: [],
      comments: [],
      loading: false,
      error: null,
      currentUserId: 7, // ADD THE USER ID INSTEAD OF 7!!!!!!!!!!! @kriishpatell

      currentCommentId: null,
      currentDatasetId: null,
      currentCommentText: "",
      formVisible: false,

      selectedDatasetId: null,
      reviewingId: null,
    };
  },

  created() {
    this.fetchDatasets();
  },

  computed: {
    filteredDatasets() {
      switch (this.activeFilter) {
        case "pending":
          return this.datasets.filter((d) => d.status === "PENDING_REVIEW");
        case "review":
          return this.datasets.filter((d) =>
            ["DRAFT", "PENDING_REVIEW"].includes(d.status)
          );
        case "approved":
          return this.datasets.filter((d) => d.status === "COMPLETED");
        case "adminapprove":
          return this.datasets.filter((d) => d.status === "PENDING_REVIEW");
        default:
          return this.datasets;
      }
    },
    showComments() {
      return (
        this.activeFilter === "comments" || this.activeFilter === "addEdit"
      );
    },
  },

  methods: {
    async fetchDatasets() {
      this.loading = true;
      try {
        this.datasets = await getAllDatasets();
      } catch (e) {
        console.error(e);
        this.error = e.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchComments() {
      this.loading = true;
      try {
        this.comments = await getAllComments();
      } catch (e) {
        console.error(e);
        this.error = e.message;
      } finally {
        this.loading = false;
      }
    },

    commentsForDataset(id) {
      return this.comments
        .filter((c) => c.dataset_id === id)
        .sort((a, b) => a.comment_id - b.comment_id);
    },

    async setFilter(val) {
      this.activeFilter = val;
      this.selectedDatasetId = null;
      if (this.showComments) await this.fetchComments();
      this.formVisible = false;
    },

    addNewDataset() {
      this.router.push("/datasets/register");
    },

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
      if (!this.currentCommentText) return alert("Comment text is empty!");
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

    // === ADMIN APPROVAL ===
    async approveSelectedDataset() {
      if (!this.selectedDatasetId) return;
      if (!confirm("Approve selected dataset?")) return;
      try {
        await approveDataset(this.selectedDatasetId);
        await this.fetchDatasets();
        this.selectedDatasetId = null;
      } catch (e) {
        console.error(e);
        alert("Failed to approve dataset");
      }
    },

    async unapproveSelectedDataset() {
      if (!this.selectedDatasetId) return;
      if (!confirm("Move this dataset back to Pending Review?")) return;
      try {
        await submitDataset(this.selectedDatasetId); // sets status = PENDING_REVIEW
        await this.fetchDatasets(); // refresh grid
        this.selectedDatasetId = null;
      } catch (e) {
        console.error(e);
        alert("Failed to unapprove dataset");
      }
    },

    openReview(id) {
      // 👉 Route name and path must match what you add in router/index.js
      this.router.push({ name: "dataset-step-5", params: { datasetId: id } });
    },
  },
};
</script>

<style scoped>
/***** HEADER *****/
.header {
  background-color: #ffffff;
  border-bottom: 1px solid #ffffff;
  padding: 30px 20px;
  display: flex;
  justify-content: space-between;
}
nav a {
  margin-right: 20px;
  color: #017291;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 4px;
  transition: all 0.3s ease;
}
nav a:hover {
  background-color: #a9dcea;
  color: #015e78;
}
nav a.active {
  background-color: #017291;
  color: #fff;
}
nav a.active:hover {
  background-color: #015e78;
}

/***** MAIN CONTAINER *****/
.main-container {
  background: #fff;
  padding: 20px;
  min-height: calc(100vh - 60px);
  overflow-y: auto;
}

/***** GRID *****/
.dataset-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

/***** CARD *****/
.dataset-card {
  background: #fff;
  border: 1px solid #017291;
  border-top: 3.5px solid #017291;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
}
.dataset-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dataset-name {
  margin: 0;
  font-size: 16px;
  color: #000;
}
.dataset-actions input {
  position: absolute;
  top: 10px;
  right: 10px;
}
.dataset-card p {
  font-size: 14px;
  color: #333;
  margin-top: 10px;
  line-height: 1.5;
}

/***** BUTTONS *****/
.add-dataset-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #017291;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}
.add-dataset-btn:hover {
  background: #015e78;
}

.comment-list {
  margin-top: 10px;
  padding-left: 20px;
  border-top: 1px dashed #ccc;
}
.add-comment-btn,
.edit-comment-btn,
.delete-comment-btn {
  margin-top: 8px;
  background: #0a9;
  color: #fff;
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
}
.add-comment-btn:hover,
.edit-comment-btn:hover,
.delete-comment-btn:hover {
  background: #08a;
}

.comment-form {
  margin-top: 10px;
  border: 1px solid #ccc;
  padding: 8px;
  background: #f9f9f9;
}
.comment-form textarea {
  width: 100%;
  min-height: 60px;
  margin-bottom: 8px;
}
</style>
