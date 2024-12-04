<template>
  <div>
    <Header />
    <!-- Header Section for the Use Case Registration -->
    <div class="header">
      <nav>
        <a href="#">All Use Cases</a>
        <a href="#">Pending Use Cases</a>
        <a href="#">Review Use Cases for Approval</a>
        <a href="#">Use Cases Created by Me</a>
      </nav>
    </div>

    <!-- Main Content Section -->
    <div class="main-container">
      <div class="usecase-grid">
        <div
          v-for="usecase in usecases"
          :key="usecase.id"
          class="usecase-card"
        >
          <div class="usecase-actions">
            <h3 class="usecase-name">{{ usecase.name }}</h3>
            <input type="radio" name="select-usecase" :id="usecase.id" />
          </div>
          <p>{{ usecase.description }}</p>
        </div>
      </div>
      <!-- Add Use Case Button -->
      <button class="add-usecase-btn" @click="addNewUseCase">+</button>
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";

export default {
  name: "UseCaseRegistration",
  components: {
    Header,
  },
  data() {
    return {
      usecases: [
        {
          id: 1,
          name: "Use Case 1",
          description:
            "This is the Use Case 1 description. The producer is going to be adding content here.",
        },
        {
          id: 2,
          name: "Use Case 2",
          description:
            "This is the Use Case 2 description. The producer is going to be adding content here.",
        },
        {
          id: 3,
          name: "Use Case 3",
          description:
            "This is the Use Case 3 description. The producer is going to be adding content here.",
        },
        {
          id: 4,
          name: "Use Case 4",
          description:
            "This is the Use Case 4 description. The producer is going to be adding content here.",
        },
        {
          id: 5,
          name: "Use Case 5",
          description:
            "This is the Use Case 5 description. The producer is going to be adding content here.",
        },
        {
          id: 6,
          name: "Use Case 6",
          description:
            "This is the Use Case 6 description. The producer is going to be adding content here.",
        },
      ],
    };
  },
  methods: {
    addNewUseCase() {
      console.log("Add New Use Case button clicked");
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

.usecase-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 items per row */
  gap: 20px; /* Space between cards */
}

.usecase-card {
  background-color: #ffffff;
  border: 1px solid #017291;
  border-top: 3.5px solid #017291;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative; /* To position the radio button */
}

.usecase-actions {
  display: flex;
  justify-content: space-between; /* Name on the left, button on the right */
  align-items: center;
}

.usecase-actions .usecase-name {
  margin: 0;
  font-size: 16px;
  color: #000;
  text-align: left;
}

.usecase-actions input[type="radio"] {
  position: absolute;
  top: 10px;
  right: 10px;
}

.usecase-card p {
  font-size: 14px;
  color: #333;
  margin-top: 10px;
  line-height: 1.5;
}

.add-usecase-btn {
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

.add-usecase-btn:hover {
  background-color: #015e78;
}
</style>


<!-- <template>
    <div>
      <h2>Use Case Registration</h2>
      <form @submit.prevent='handleSubmit'>
        <label for='use-case-name'>Use Case Name:</label>
        <input type='text' id='use-case-name' v-model='useCaseName' required />
        <br />
        <label for='use-case-description'>Description:</label>
        <textarea id='use-case-description' v-model='useCaseDescription' required></textarea>
        <br />
        <button type='submit'>Register Use Case</button>
      </form>
      <p v-if='submitted'>Use Case registered: {{ useCaseName }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        useCaseName: '',
        useCaseDescription: '',
        submitted: false
      };
    },
    methods: {
      handleSubmit() {
        this.submitted = true;
        // Logic to handle registration can be added here.
      }
    }
  };
  </script> -->