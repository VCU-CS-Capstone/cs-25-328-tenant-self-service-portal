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
  <div v-if="loading" class="loading">Loading datasets...</div>
  <div v-if="error" class="error">{{ error }}</div>
  <div v-if="!loading && !error" class="scrollable">
    <ul>
      <li v-for="dataset in datasets" :key="dataset.dataset_id">
        {{ dataset.dataset_name }}
        <span>
          <button @click="favoriteDataset(dataset.dataset_id)">⭐</button>
          <button @click="edit(dataset.dataset_id)">✏️</button>
        </span>
      </li>
    </ul>
    <div v-if="datasets.length === 0" class="no-data">
      No datasets available
    </div>
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
import { getAllDatasets } from '@/services/dataset.api';

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
      datasets: [],
      loading: true,
      error: null
    };
  },
  created() {
    this.fetchDatasets();
  },
  methods: {
    async fetchDatasets() {
      console.log('Fetching datasets...');
      this.loading = true;
      this.error = null;

      try {
        const data = await getAllDatasets();
        console.log('Datasets received:', data);
        this.datasets = data || [];
        this.loading = false;
      } catch (error) {
        console.error('Error fetching datasets:', error);
        this.error = `Failed to load datasets: ${error.message}`;
        this.loading = false;
      }
    },
    addNewUseCase() {
      this.router.push('/usecases/register/');
    },
    reviewUseCases() {
      this.router.push('/usecases');
    },
    viewAllUseCases() {
      this.router.push('/usecases');
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
/* Page Layout */
.page {
  height: calc(100vh - 80px); 
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.space {
  /* Space properties */
}

.main-container {
  background-color: #017291;
  flex: 1;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

/* Box Layout and Structure */
.boxes {
  display: flex;
  gap: 2rem;
  width: 65%;
  justify-content: space-between;
  align-items: stretch;
}

.box {
  background: white;
  border-radius: 10px;
  padding: 1.75rem 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 100%;
}

.box.cta {
  background: transparent;
  color: white;
}

.box h3 {
  font-size: 1.25rem;
  margin: 0.5rem 0;
  color: #033450; 
  font-weight: bold;
}

/* Scrollable Content */
.scrollable {
  flex: 1;
  overflow-y: auto;
  max-height: 240px; /* Fixed height for scrollable content */
}

/* Lists and List Items */
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

.box li span {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

/* Buttons */
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

.actions-grid {
  display: flex;
  gap: 0.5rem;
}

.actions-grid button {
  flex: 1;
  padding: 0.5rem;
  background: transparent;
  color: #017291;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.2s ease;
}

.actions-grid button:hover {
  color: #033450;
  background: transparent;
}

/* CTA Section */
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

.cta-buttons-grid button:hover {
  background: #f5f6f7;
  color: #017291;
}

/* Status Messages */
.loading, .error, .no-data {
  padding: 1rem;
  text-align: center;
}

.error {
  color: #d32f2f;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .main-container {
    padding: 1.5rem;
  }
  
  .boxes {
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .page {
    height: auto; /* Allow full height content */
    min-height: calc(100vh - 70px); /* Minimum height */
    overflow: visible; /* Allow scrolling */
  }
  
  .main-container {
    overflow: visible; /* Allow scrolling */
    padding: 1rem;
  }

  .boxes {
    flex-direction: column;
    width: 100%;
    height: auto; /* Allow content to determine height */
  }

  .box {
    width: auto;
    max-width: none;
    margin-bottom: 1rem; /* Add spacing between stacked boxes */
  }

  .scrollable {
    max-height: 200px; /* Slightly smaller scrollable areas on mobile */
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