<template>
  <div>
    <Header />
    <!-- Header Section for the Dataset Registration -->
    <div class="header">
      <nav>
        <a href="#">All Datasets</a>
        <a href="#">Pending Datasets</a>
        <a href="#">Review Datasets for Approval</a>
        <a href="#">Datasets Created by Me</a>
      </nav>
    </div>

    <!-- Main Content Section -->
    <div class="main-container">
      <div class="dataset-grid">
        <div
          v-for="dataset in datasets"
          :key="dataset.id"
          class="dataset-card"
        >
          <div class="dataset-actions">
            <h3 class="dataset-name">{{ dataset.name }}</h3>
            <input type="radio" name="select-dataset" :id="dataset.id" />
          </div>
          <p>{{ dataset.description }}</p>
        </div>
      </div>
      <!-- Add Dataset Button -->
      <button class="add-dataset-btn" @click="addNewDataset">+</button>
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";

export default {
  name: "DatasetRegistration",
  components: {
    Header,
  },
  data() {
    return {
      datasets: [
        {
          id: 1,
          name: "Dataset 1",
          description:
            "This is the Dataset 1 description. The producer is going to be adding content here.",
        },
        {
          id: 2,
          name: "Dataset 2",
          description:
            "This is the Dataset 2 description. The producer is going to be adding content here.",
        },
        {
          id: 3,
          name: "Dataset 3",
          description:
            "This is the Dataset 3 description. The producer is going to be adding content here.",
        },
        {
          id: 4,
          name: "Dataset 4",
          description:
            "This is the Dataset 4 description. The producer is going to be adding content here.",
        },
        {
          id: 5,
          name: "Dataset 5",
          description:
            "This is the Dataset 5 description. The producer is going to be adding content here.",
        },
        {
          id: 6,
          name: "Dataset 6",
          description:
            "This is the Dataset 6 description. The producer is going to be adding content here.",
        },
      ],
    };
  },
  methods: {
    addNewDataset() {
      console.log("Add New Dataset button clicked");
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
}

nav a:hover {
  background-color: #a9dcea;
  color: #015e78;
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
  justify-content: space-between; /* Name on the left, button on the right */
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
</style>
