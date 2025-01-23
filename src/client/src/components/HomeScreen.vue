<template>
  <div class="page">
    <div class="space"></div>
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
        <div class="box cta">
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
import { useRouter } from 'vue-router'

export default {
  name: 'HomeScreen',
  setup() {
    const router = useRouter();
    return { router };
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
      console.log('Add use case')
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
      this.router.push('/datasets/register/');
    },
    reviewDatasets() {
      this.router.push('/datasets');
    },
    viewAllDatasets() {
      this.router.push('/datasets');
    },
    favoriteDataset(id) {
      console.log(`Delete dataset ${id}`);
    },
  },
};
</script>

<style scoped>
.page {
  min-height: 100vh;
}

.main-container {
  background-color: #017291;
  min-height: calc(100vh - 80px); /* Changed from 106px to match header height */
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
}


.boxes {
  display: flex;
  gap: 2rem;
  width: 65%; /* Changed from max-width */
  justify-content: space-between; /* Changed from center */
  align-items: stretch;
}

.box {
  background: white;
  border-radius: 10px;
  padding-top: 1.75rem;
  padding-bottom: 1.75rem;
  padding-left: 2rem;
  padding-right: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem; 
}

.box li button {
  background: transparent;
  border: none;
  color: #017291;
  cursor: pointer;
  padding: 4px 8px;
  font-size: 1rem;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
}

.box li button:hover {
  color: #033450;
}

.box li span {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.box h3 {
  font-size: 1.25rem;
  margin: 0.5rem 0 0.5rem 0;
  color: #033450; 
  font-weight: bold;
}

.box.cta {
  background: transparent;
  color: white;
}

.scrollable {
  flex: 1;
  overflow-y: auto;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding-top: 1rem;
  padding-bottom: 1rem;
  background: white;
}

.box ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.box li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-weight: normal;
  font-size: 0.9rem;
  color: #000000;
}

.actions-grid {
  display: flex;
  gap: 0.5rem;
}

.actions-grid button {
  flex: 1;
  padding: 0.5rem;
  background: transparent; /* Changed from white */
  color: #017291;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.2s ease; /* Smooth color transition */
}

.cta-buttons-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.cta-buttons-grid button {
  padding: 0.65rem;
  background: #017291;
  color: white;
  border: 1px solid white;
  border-radius: 25px;
  cursor: pointer;
}

.actions-grid button:hover {
  color: #033450; /* Match header hover color */
  background: transparent; /* Keep background transparent */
}

.cta-buttons-grid button:hover {
  background: #f5f6f7;
  color: #017291;
}

@media (max-width: 1024px) {
  .main-container {
    padding: 1.5rem;
  }
  
  .boxes {
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .main-container {
    align-items: flex-start;
    padding: 1rem;
  }

  .boxes {
    flex-direction: column;
    width: 100%;
  }

  .box {
    width: auto;
    max-width: none;
  }

  .scrollable {
    max-height: 200px;
  }

  .cta-buttons-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .main-container {
    padding: 0.5rem;
  }

  .actions-grid {
    flex-direction: column;
  }

  .box {
    padding: 1rem;
  }
}
</style>
