<template>
    <div class="step-container">
      <h2>Select Dataset</h2>
      <p class="step-description">
        The first step to creating an use case is to select a dataset linked to the use case. Once the dataset is selected, rest of the fields will be populated based on the values fetched from the dataset.
      </p>
  
      <div class="search-container">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search for datasets"
          class="search-input"
        >
      </div>
  
      <div class="dataset-grid">
        <div v-for="dataset in datasets" 
             :key="dataset.id" 
             class="dataset-card">
          <div class="dataset-content">
            <div class="dataset-header">
              <h3 class="dataset-name">{{ dataset.name }}</h3>
              <input 
                type="radio" 
                name="dataset-selection" 
                :value="dataset.id"
                v-model="selectedDataset"
                class="dataset-radio"
              >
            </div>
            <p class="dataset-description">{{ dataset.description }}</p>
          </div>
        </div>
      </div>
  
      <div class="navigation-buttons">
            <button class="back-btn" @click="goBack">
                Back
            </button>
            <button class="continue-btn" @click="continueToNextStep">
                Continue to Step 2
            </button>
        </div>
    </div>
  </template>
  

  
  <script>
  export default {
    name: 'UseCaseRegistrationStep1',
    data() {
      return {
        searchQuery: '',
        selectedDataset: null,
        datasets: [
          {
            id: 1,
            name: "Dataset 1",
            description:
              "This is the Dataset 1 description. The producer is going to be adding content here. This content is going to be very descriptive and the producer is going to have multiple values that they will enter. This information is not detailed. Once the producer value will have to be updated by the...",
          },
          {
            id: 2,
            name: "Dataset 2",
            description:
              "This is the Dataset 2 description. The producer is going to be adding content here. This content is going to be very descriptive and the producer is going to have multiple values that they will enter. This information is not detailed. Once the producer value will have to be updated by the...",
          },
          {
            id: 3,
            name: "Dataset 3",
            description:
              "This is the Dataset 3 description. The producer is going to be adding content here. This content is going to be very descriptive and the producer is going to have multiple values that they will enter. This information is not detailed. Once the producer value will have to be updated by the...",
          },
          {
            id: 4,
            name: "Dataset 4",
            description:
              "This is the Dataset 4 description. The producer is going to be adding content here. This content is going to be very descriptive and the producer is going to have multiple values that they will enter. This information is not detailed. Once the producer value will have to be updated by the...",
          },
          {
            id: 5,
            name: "Dataset 5",
            description:
              "This is the Dataset 5 description. The producer is going to be adding content here. This content is going to be very descriptive and the producer is going to have multiple values that they will enter. This information is not detailed. Once the producer value will have to be updated by the...",
          },
          {
            id: 6,
            name: "Dataset 6",
            description:
              "This is the Dataset 6 description. The producer is going to be adding content here. This content is going to be very descriptive and the producer is going to have multiple values that they will enter. This information is not detailed. Once the producer value will have to be updated by the...",
          },
        ],
      };
    },
    methods: {
      goBack() {
        this.$router.push('/user/usecases/register');
      },
      continueToNextStep() {
        if (this.selectedDataset) {
          this.$router.push('/user/usecases/register/steps/2');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .step-container {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .step-description {
    margin-bottom: 20px;
    color: #666;
  }
  
  .search-container {
    margin-bottom: 20px;
  }
  
  .search-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .dataset-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .dataset-card {
    border: 1px solid #017291;
    border-top: 3.5px solid #017291;
    padding: 15px;
    border-radius: 4px;
    position: relative;
  }
  
  .dataset-content {
    position: relative;
    color: #000000;
  }
  
  .dataset-radio {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  
  .navigation-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
}

.back-btn, .continue-btn {
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}

.back-btn {
    border: 1px solid #017291;
    background: white;
    color: #017291;
}

.back-btn:hover {
    background: #f0f7f9;
}

.continue-btn {
    background: #017291;
    color: white;
    border: none;
}

.continue-btn:hover {
    background: #015e78;
}
  
  .continue-btn:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  </style>
  