<!-- UserDatasetGallery.vue -->
<template>
  <div>
    <!-- ░░░ TOP NAV ░░░ -->
    <div class="header">
      <nav>
        <RouterLink
          v-for="item in navItems"
          :key="item.key"
          :to="{ path: '/user/datasets', query: { filter: item.key } }"
          :class="{ active: activeFilter === item.key }"
          replace
        >
          {{ item.label }}
        </RouterLink>
      </nav>
    </div>

    <!-- ░░░ MAIN ░░░ -->
    <div class="main-container">
      <!-- grouped sections -->
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

            <!-- inline review button (hover reveals) -->
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
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- ➕ register -->
      <button
        class="add-dataset-btn"
        @click="addNewDataset"
        title="Register new dataset"
      >
        +
      </button>
    </div>
  </div>
</template>

<script>
import { useRouter, useRoute, RouterLink } from "vue-router";
import { getAllDatasets } from "@/services/dataset.api";
import {
  getAllComments
} from "@/services/comment.api";

export default {
  name: "UserDatasetGallery",
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
    };
  },
  computed: {
    /* current tab via ?filter= */
    activeFilter() {
      return this.route.query.filter || "all";
    },

    /* grouped datasets */
    groupedDatasets() {
      const groups = { DRAFT: [], PENDING_REVIEW: [], COMPLETED: [] };
      let source = this.datasets;

      if (this.activeFilter === "review")
        source = source.filter((d) =>
          ["DRAFT", "PENDING_REVIEW"].includes(d.status)
        );
      if (this.activeFilter === "pending")
        source = source.filter((d) => d.status === "PENDING_REVIEW");
      if (this.activeFilter === "approved")
        source = source.filter((d) => d.status === "COMPLETED");

      source.forEach((d) => groups[d.status]?.push(d));
      return groups;
    },

    /* section order */
    groupingOrder() {
      switch (this.activeFilter) {
        case "review":
          return ["DRAFT", "PENDING_REVIEW"];
        case "pending":
          return ["PENDING_REVIEW"];
        case "approved":
          return ["COMPLETED"];
        default:
          return ["DRAFT", "PENDING_REVIEW", "COMPLETED"];
      }
    },
    groupedSectionsToShow() {
      return this.groupingOrder.filter(
        (key) => this.groupedDatasets[key].length
      );
    },
    statusLabels() {
      return {
        DRAFT: "DRAFT",
        PENDING_REVIEW: "PENDING REVIEW",
        COMPLETED: "APPROVED",
      };
    },

    showComments() {
      return this.activeFilter === "comments";
    },

    navItems() {
      return [
        { key: "all", label: "All Datasets" },
        { key: "pending", label: "Pending" },
        { key: "approved", label: "Approved" },
        { key: "review", label: "Review/Edit" },
        { key: "comments", label: "Comments" },
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
    this.fetchDatasets();
  },
  methods: {
    /* ── fetchers ── */
    async fetchDatasets() {
      this.loading = true;
      try {
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

    /* comment helper */
    commentsForDataset(id) {
      return this.comments
        .filter((c) => c.dataset_id === id)
        .sort((a, b) => a.comment_id - b.comment_id);
    },

    /* actions */
    openReview(id) {
      this.router.push({
        name: "UserGDRStep5",
        params: { datasetId: id },
      });
    },
    addNewDataset() {
      this.router.push("/user/datasets/register");
    },
  },
};
</script>

<style scoped>
/* ░░ HEADER ░░ */
.header {
  background: #fff;
  border-bottom: 1px solid #fff;
  padding: 30px 20px;
}
nav a {
  margin-right: 20px;
  color: #017291;
  font-weight: bold;
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.25s;
}
nav a:hover {
  background: #a9dcea;
  color: #015e78;
}
nav a.active {
  background: #017291;
  color: #fff;
}

/* ░░ MAIN ░░ */
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

/* ░░ GRID & CARD ░░ */
.dataset-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 20px;
}
.dataset-card {
  position: relative;
  padding: 12px 10px 48px;
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
  margin: 0;
  font-size: 14px;
  color: #333;
  line-height: 1.45;
}

/* ░░ REVIEW BUTTON ░░ */
.primary-action {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 50%;
  font-size: 18px;
  color: #fff;
  cursor: pointer;
  transition: filter 0.15s;
}
.primary-action.review {
  background: #017291;
}
.primary-action:hover {
  filter: brightness(85%);
}
.hover-reveal {
  opacity: 0;
}
.dataset-card:hover .hover-reveal {
  opacity: 1;
}

/* ░░ COMMENTS ░░ */
.comment-list {
  margin-top: 10px;
  padding-left: 18px;
  border-top: 1px dashed #ccc;
}

/* ░░ ➕ BUTTON ░░ */
.add-dataset-btn {
  position: fixed;
  bottom: 22px;
  right: 22px;
  width: 52px;
  height: 52px;
  border: none;
  border-radius: 50%;
  background: #017291;
  color: #fff;
  font-size: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 8px rgb(0 0 0 / 28%);
  transition: filter 0.15s;
}
.add-dataset-btn:hover {
  filter: brightness(85%);
}
</style>
