<template>
  <div>
    <!-- Header Section -->
    <div class="header">
      <nav>
        <a href="#" @click.prevent="setFilter('all')" :class="{ active: activeFilter === 'all' }">All Datasets</a>
        <a href="#" @click.prevent="setFilter('pending')" :class="{ active: activeFilter === 'pending' }">Pending</a>
        <a href="#" @click.prevent="setFilter('review')" :class="{ active: activeFilter === 'review' }">Review</a>
        <a href="#" @click.prevent="setFilter('mine')" :class="{ active: activeFilter === 'mine' }">My Datasets</a>
        <a href="#" @click.prevent="setFilter('comments')" :class="{ active: activeFilter === 'comments' }">Comments</a>
        <!-- Filter for Add/Edit Comments -->
        <a href="#" @click.prevent="setFilter('addEdit')" :class="{ active: activeFilter === 'addEdit' }">Add/Edit Comments</a>
      </nav>
    </div>

    <!-- Main Content Section -->
    <div class="main-container">
      <!-- DATASET GRID -->
      <div class="dataset-grid">
        <div
          v-for="dataset in datasets"
          :key="dataset.dataset_id"
          class="dataset-card"
        >
          <div class="dataset-actions">
            <h3 class="dataset-name">{{ dataset.dataset_name }}</h3>
            <input
              type="radio"
              name="select-dataset"
              :id="dataset.dataset_name"
            />
          </div>
          <p>{{ dataset.description }}</p>

          <!-- Comments UL (initially hidden) -->
          <ul class="comment-list" style="display: none;">
            <li
              v-for="comment in commentsForDataset(dataset.dataset_id)"
              :key="comment.comment_id"
            >
              {{ comment.comment_text }}

              <!-- EDIT button -->
              <button
                v-if="activeFilter === 'addEdit'"
                class="edit-comment-btn"
                @click="openCommentForm(dataset.dataset_id, comment, $event)"
              >
                Edit
              </button>
            </li>
          </ul>

          <!-- ADD COMMENT button -->
          <button
            v-if="activeFilter === 'addEdit'"
            class="add-comment-btn"
            @click="openCommentForm(dataset.dataset_id, null, $event)"
          >
            Add Comment
          </button>

          <!-- COMMENT FORM (hidden by default) -->
          <div class="comment-form" ref="commentForm" style="display: none;">
            <textarea
              v-model="currentCommentText"
              placeholder="Type your comment..."
            ></textarea>
            <button @click="saveComment($event)">Save</button>
            <button @click="closeCommentForm($event)">Cancel</button>
          </div>
        </div>
      </div>

      <!-- Add Dataset Button -->
      <button class="add-dataset-btn" @click="addNewDataset">+</button>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { getAllDatasets } from "@/services/dataset.api";
import {
  getAllComments,
  createComment,
  updateComment,
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

      // For add/edit comment
      currentCommentId: null,
      currentDatasetId: null,
      currentCommentText: "",
    };
  },

  created() {
    this.fetchDatasets();
  },

  methods: {
    async fetchDatasets() {
      this.loading = true;
      this.error = null;
      try {
        const data = await getAllDatasets();
        this.datasets = data || [];
      } catch (error) {
        console.error("Error fetching datasets:", error);
        this.error = `Failed to load datasets: ${error.message}`;
      } finally {
        this.loading = false;
      }
    },

    async fetchComments() {
      this.loading = true;
      this.error = null;
      try {
        const data = await getAllComments();
        this.comments = data || [];
      } catch (error) {
        console.error("Error fetching comments:", error);
        this.error = `Failed to load comments: ${error.message}`;
      } finally {
        this.loading = false;
      }
    },

    commentsForDataset(datasetId) {
      return this.comments.filter((c) => c.dataset_id === datasetId);
    },

    // Switch filters
    async setFilter(filterValue) {
      this.activeFilter = filterValue;
      // Hide all comment lists and forms
      const allCommentLists = this.$el.querySelectorAll(".comment-list");
      allCommentLists.forEach((ul) => {
        ul.style.display = "none";
      });
      const allCommentForms = this.$el.querySelectorAll(".comment-form");
      allCommentForms.forEach((form) => {
        form.style.display = "none";
      });

      if (filterValue === "comments" || filterValue === "addEdit") {
        await this.fetchComments();
        // Show all comment ULs
        allCommentLists.forEach((ul) => {
          ul.style.display = "block";
        });
      }
    },

    addNewDataset() {
      this.router.push("/datasets/register");
    },

    // Called when user clicks "Add Comment" or "Edit"
    openCommentForm(datasetId, comment, e) {
  // 1) Close all open forms (so only one can be open at once)
  const allCommentForms = this.$el.querySelectorAll(".comment-form");
  allCommentForms.forEach((formDiv) => {
    formDiv.style.display = "none";
  });

  // 2) Set your data fields
  this.currentDatasetId = datasetId;
  if (comment) {
    // Editing existing
    this.currentCommentId = comment.comment_id;
    this.currentCommentText = comment.comment_text;
  } else {
    // New comment
    this.currentCommentId = null;
    this.currentCommentText = "";
  }

  // 3) Show the comment form for THIS dataset card
  this.$nextTick(() => {
    const datasetCard = e.target.closest(".dataset-card");
    if (!datasetCard) return;

    const formDiv = datasetCard.querySelector(".comment-form");
    if (formDiv) {
      formDiv.style.display = "block";
    }
  });
},

    closeCommentForm(e) {
      this.$nextTick(() => {
        const datasetCard = e.target.closest(".dataset-card");
        if (!datasetCard) return;
        const formDiv = datasetCard.querySelector(".comment-form");
        if (formDiv) {
          formDiv.style.display = "none";
        }
      });
    },

    async saveComment(e) {
      try {
        if (!this.currentCommentText) {
          alert("Comment text is empty!");
          return;
        }

        if (this.currentCommentId) {
          // Editing existing comment
          await updateComment(this.currentCommentId, {
            datasetId: this.currentDatasetId,
            userId: 7, // or from your auth system
            commentText: this.currentCommentText,
          });
          console.log("Comment updated");
        } else {
          // Creating new comment
          await createComment({
            datasetId: this.currentDatasetId,
            userId: 7,
            commentText: this.currentCommentText,
          });
          console.log("Comment created");
        }

        // Refresh comments
        await this.fetchComments();
      } finally {
        // Hide the form
        this.$nextTick(() => {
          const datasetCard = e.target.closest(".dataset-card");
          if (!datasetCard) return;
          const formDiv = datasetCard.querySelector(".comment-form");
          if (formDiv) {
            formDiv.style.display = "none";
          }
        });
      }
    },
  },
};
</script>

<style scoped>
/* == HEADER == */
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
  color: #ffffff;
}
nav a.active:hover {
  background-color: #015e78;
  color: #ffffff;
}

/* == MAIN CONTAINER == */
.main-container {
  background-color: #ffffff;
  padding: 20px;
  position: relative;
  min-height: calc(100vh - 60px);
  overflow-y: auto;
}

/* == GRID == */
.dataset-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

/* == DATASET CARD == */
.dataset-card {
  background-color: #ffffff;
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
.dataset-actions .dataset-name {
  margin: 0;
  font-size: 16px;
  color: #000;
  text-align: left;
}
.dataset-actions input[type="radio"] {
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

/* ADD BUTTON */
.add-dataset-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #017291;
  color: #ffffff;
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
  background-color: #015e78;
}

.comment-list {
  margin-top: 10px;
  padding-left: 20px;
  border-top: 1px dashed #ccc;
}
.add-comment-btn,
.edit-comment-btn {
  margin-top: 8px;
  background-color: #0a9;
  color: #fff;
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
}
.add-comment-btn:hover,
.edit-comment-btn:hover {
  background-color: #08a;
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
