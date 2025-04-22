<template>
  <div>
    <!-- Header Section for the Dataset Registration -->
    <div class="header">
      <nav>
        <!-- Existing links -->
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
          >Pending Datasets</a
        >
        <a
          href="#"
          @click.prevent="setFilter('review')"
          :class="{ active: activeFilter === 'review' }"
          >Review Datasets</a
        >
        <a
          href="#"
          @click.prevent="setFilter('mine')"
          :class="{ active: activeFilter === 'mine' }"
          >Datasets Created by Me</a
        >
        <a
          href="#"
          @click.prevent="setFilter('comments')"
          :class="{ active: activeFilter === 'comments' }"
          >Comments</a
        >
      </nav>
    </div>

    <div class="main-container">
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

          <!-- Comments UL. Initially hidden via style="display:none" -->
          <ul ref="commentList" class="comment-list" style="display: none">
            <!-- Only show comments that match this dataset_id -->
            <li
              v-for="comment in commentsForDataset(dataset.dataset_id)"
              :key="comment.comment_id"
            >
              {{ comment.comment_text }}
            </li>
          </ul>
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
import { getAllComments } from "@/services/comment.api";

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

    // Fetch all comments from the server
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

    // Return only comments for the given datasetId
    commentsForDataset(datasetId) {
      return this.comments.filter((c) => c.dataset_id === datasetId);
    },

    // Toggling the "comments" filter
    async setFilter(filterValue) {
      this.activeFilter = filterValue;

      // 1) Hide all .comment-list elements
      const allCommentLists = this.$el.querySelectorAll(".comment-list");
      allCommentLists.forEach((ul) => {
        ul.style.display = "none";
      });

      if (filterValue === "comments") {
        // 2) If user wants to see comments, fetch them
        await this.fetchComments();

        // 3) Now reveal all .comment-list elements
        allCommentLists.forEach((ul) => {
          ul.style.display = "block";
        });
      }
    },

    addNewDataset() {
      this.router.push("/user/datasets/register");
    },
  },
};
</script>

<style scoped>
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

/* Main content styles */
.main-container {
  background-color: #ffffff;
  padding: 20px;
  position: relative;
  min-height: calc(100vh - 60px);
  overflow-y: auto;
}

.dataset-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.dataset-card {
  background-color: #ffffff;
  border: 1px solid #017291;
  border-top: 3.5px solid #017291;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative; /* For positioning the radio button */
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
</style>

<!-- <template>
  <div>
     Header Section for the Dataset Registration
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
          >Pending Datasets</a
        >
        <a
          href="#"
          @click.prevent="setFilter('review')"
          :class="{ active: activeFilter === 'review' }"
          >Review Datasets for Approval</a
        >
        <a
          href="#"
          @click.prevent="setFilter('mine')"
          :class="{ active: activeFilter === 'mine' }"
          >Datasets Created by Me</a
        >
        <a
          href="#"
          @click.prevent="setFilter('comments')"
          :class="{ active: activeFilter === 'comments' }"
          >Comments</a
        >
      </nav>
    </div>

     Main Content Section
    <div class="main-container">
      <div class="dataset-grid">
        <div v-for="dataset in datasets" :key="dataset.id" class="dataset-card">
          <div class="dataset-actions">
            <h3 class="dataset-name">{{ dataset.dataset_name }}</h3>
            <input type="radio" name="select-dataset" :id="dataset.name" />
          </div>
          <p>{{ dataset.description }}</p>
        </div>
      </div>

       Add Dataset Button 
      <button class="add-dataset-btn" @click="addNewDataset">+</button>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { getAllDatasets } from "@/services/dataset.api";

export default {
  name: "DatasetRegistration",
  setup() {
    const router = useRouter();
    return { router };
  },

  // Utilize this instead of data() to fetch datasets from DB
  /* async fetchDatasets() {
      this.loading = true;
      try {
        const response = await fetch('/api/datasets');
        const data = await response.json();
        this.datasets = data;
      } catch (err) {
        this.error = 'Error loading datasets';
        console.error(err);
      } finally {
        this.loading = false;
      }
    }, */

  data() {
    return {
      activeFilter: "all",
      datasets: [],
      loading: false,
      error: null,
    };
  },
  created() {
    this.fetchDatasets();
  },
  methods: {
    async fetchDatasets() {
      console.log("Fetching datasets...");
      this.loading = true;
      this.error = null;

      try {
        const data = await getAllDatasets();
        console.log("Datasets received:", data);
        this.datasets = data || [];
        this.loading = false;
      } catch (error) {
        console.error("Error fetching datasets:", error);
        this.error = `Failed to load datasets: ${error.message}`;
        this.loading = false;
      }
    },
    setFilter(filterValue) {
      this.activeFilter = filterValue;
    },
    addNewDataset() {
      this.router.push("/datasets/register");
    },
  },
};
</script>

<style scoped>
/* Header styles */
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

/* Main content styles */
.main-container {
  background-color: #ffffff;
  padding: 20px;
  position: relative;
  min-height: calc(100vh - 60px);
  overflow-y: auto;
}

.dataset-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.dataset-card {
  background-color: #ffffff;
  border: 1px solid #017291;
  border-top: 3.5px solid #017291;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  /* For positioning the radio button */
}

.dataset-actions {
  display: flex;
  justify-content: space-between;
  /* Name on the left, button on the right */
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
</style> -->
