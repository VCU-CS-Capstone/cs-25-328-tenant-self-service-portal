<template>
  <div>
    <!-- Header Component -->
    <Header />

    <div class="space"></div>

    <!-- Main Content -->
    <div class="main-container">
      <div class="boxes">
        <!-- Use Cases Box -->
        <div class="box">
          <h3>Use Cases</h3>
          <div class="scrollable">
            <ul>
              <li v-for="useCase in useCases" :key="useCase.id">
                {{ useCase.name }}
                <span>
                  <button @click="favoriteUseCase(useCase.id)">⭐</button>
                  <button @click="edit(useCase.id)">✏️</button>
                </span>
              </li>
            </ul>
          </div>
          <div class="actions-grid">
            <button @click="addNewUseCase">Add New</button>
            <button @click="reviewUseCases">Review</button>
            <button @click="viewAllUseCases">View All</button>
          </div>
        </div>

        <!-- Datasets Box -->
        <div class="box">
          <h3>Datasets</h3>
          <div class="scrollable">
            <ul>
              <li v-for="dataset in datasets" :key="dataset.id">
                {{ dataset.name }}
                <span>
                  <button @click="favoriteDataset(dataset.id)">⭐</button>
                  <button @click="edit(dataset.id)">✏️</button>
                </span>
              </li>
            </ul>
          </div>
          <div class="actions-grid">
            <button @click="addNewDataset">Add New</button>
            <button @click="reviewDatasets">Review</button>
            <button @click="viewAllDatasets">View All</button>
          </div>
        </div>

        <!-- Call-to-Action Section -->
        <div class="cta-box">
          <h2>What would you like to do today?</h2>
          <p>
            We'll guide you through filling in this info. You can always save,
            step away and return right where you left off.
          </p>
          <div class="cta-buttons-grid">
            <button @click="addNewUseCase">Add new use case</button>
            <button @click="reviewUseCases">Review pending use cases</button>
            <button @click="addNewDataset">Add new dataset</button>
            <button @click="reviewDatasets">Review pending datasets</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'HomeScreen',
  components: {
    Header,
  },
  data() {
    return {
      useCases: [
        { id: 1, name: 'Use case name 1' },
        { id: 2, name: 'Use case name 2' },
        { id: 3, name: 'Use case name 3' },
        { id: 4, name: 'Use case name 4' },
        { id: 5, name: 'Use case name 5' },
        { id: 6, name: 'Use case name 6' },
      ],
      datasets: [
        { id: 1, name: 'Dataset name 1' },
        { id: 2, name: 'Dataset name 2' },
        { id: 3, name: 'Dataset name 3' },
        { id: 4, name: 'Dataset name 4' },
        { id: 5, name: 'Dataset name 5' },
        { id: 6, name: 'Dataset name 6' },
      ],
    };
  },
  methods: {
    addNewUseCase() {
      console.log('Add new use case');
    },
    reviewUseCases() {
      console.log('Review use cases');
    },
    viewAllUseCases() {
      console.log('View all use cases');
    },
    edit(id) {
      console.log(`Edit item ${id}`);
    },
    favoriteUseCase(id) {
      console.log(`Delete use case ${id}`);
    },
    addNewDataset() {
      console.log('Add new dataset');
    },
    reviewDatasets() {
      console.log('Review datasets');
    },
    viewAllDatasets() {
      console.log('View all datasets');
    },
    favoriteDataset(id) {
      console.log(`Delete dataset ${id}`);
    },
  },
};
</script>

<style scoped>

.space {
  background-color: #ffffff;
  overflow: hidden;
  border-bottom: 1px solid black;
  min-height: 12px;
}

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px;
  background-color: #017291;
  color: white;
  position: absolute;
  top: 106px;
  bottom: 0px;
  width: 100%;
}

.boxes {
  display: flex;
  gap: 100px;
  justify-content: center;
  align-items: flex-start;
}

.box {
  background-color: white;
  color: black;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 275px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.scrollable {
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  background-color: #ffffff;
  font-weight: bold;
  font-size: 13px; 
}

.box ul {
  list-style: none;
  padding: 0;
  margin: 0;
  
}

.box li {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.box h3 {
  text-align: left;
  
}


.actions-grid {
  display: flex;
  gap: 10px;
}

.actions-grid button {
  padding: 5px 10px;
  font-size: 14px;
  background-color: white;
  color:#017291;
  font-weight: bold;
  border: white;
  cursor: pointer;
}

.actions-grid button:hover  {
  background-color: #a9dcea;
}
/* Call-to-Action Buttons 2x2 Grid */
.cta-buttons-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.cta-buttons-grid button {
  color: white;
  background-color: #017291;
  padding: 10px;
  font-size: 14px;
  border: 1px solid white; /* White border */
  border-radius: 3px;
  cursor: pointer;
}

.cta-buttons-grid button:hover {
  background-color: #f5f6f7; /* Slightly darker on hover */
  color:#017291;
}

.cta-box {
  color: rgb(255, 255, 255);
  padding: 20px;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.cta-box h2 {
  margin-bottom: 10px;
}
</style>
