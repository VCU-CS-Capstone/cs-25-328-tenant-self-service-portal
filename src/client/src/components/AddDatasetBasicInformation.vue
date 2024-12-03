<template>
  <div class="basic-information">
    <div class="content-wrapper">
      <h1 class="heading">Enter basic information</h1>
      <p class="subheading">
        We'll guide you through filling in this info. You can always save, step
        away, and return right where you left off.
      </p>

      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="dataset-name">Dataset Name</label>
          <input
            type="text"
            id="dataset-name"
            v-model="form.datasetName"
            placeholder="Enter dataset name"
            required
          />
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            v-model="form.description"
            placeholder="Enter description"
            required
          ></textarea>
        </div>

        <div class="form-group">
          <label for="line-of-business">
            Line of Business
            <span class="info-icon" title="Helpful info about this field"
              >?</span
            >
          </label>
          <select id="line-of-business" v-model="form.lineOfBusiness" required>
            <option value="" disabled>Select an option</option>
            <option value="placeholder">Placeholder</option>
            <!-- Add more options as needed -->
          </select>
        </div>

        <div class="form-group">
          <label for="managing-data-steward">Managing Data Steward</label>
          <input
            type="text"
            id="managing-data-steward"
            v-model="form.managingDataSteward"
            placeholder="Helpful text that makes things easier"
          />
        </div>

        <div class="form-group">
          <label for="performing-data-steward">Performing Data Steward</label>
          <input
            type="text"
            id="performing-data-steward"
            v-model="form.performingDataSteward"
            placeholder="Helpful text that makes things easier"
          />
        </div>

        <div class="form-group">
          <label for="accountable-executive">Accountable Executive</label>
          <input
            type="text"
            id="accountable-executive"
            v-model="form.accountableExecutive"
            placeholder="Helpful text that makes things easier"
          />
        </div>

        <div class="form-group">
          <label>Has international data </label>
          <small>Are you expecting data from outside of U.S.A?</small>
          <input type="checkbox" v-model="form.hasInternationalData" />
        </div>

        <div class="form-buttons">
          <button type="button" @click="goBack">Back</button>
          <button type="submit">Continue to Step 1</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        datasetName: "",
        description: "",
        lineOfBusiness: "",
        managingDataSteward: "",
        performingDataSteward: "",
        accountableExecutive: "",
        hasInternationalData: false,
      },
    };
  },
  methods: {
    submitForm() {
      console.log("Form submitted", this.form);
      // Placeholder for backend API integration
    },
    goBack() {
      const fromPage = this.$route.query.from;

      if (fromPage === "HomeScreen") {
        this.$router.push({ name: "HomeScreen" });
      } else if (fromPage === "DatasetRegistration") {
        this.$router.push({ name: "DatasetRegistration" });
      } else {
        // Default fallback (go back one step in the browser history)
        this.$router.go(-1);
      }
    },
  },
};
</script>

<style scoped>
.basic-information {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
  background-color: #ffffff;
  padding: 20px;
}

.content-wrapper {
  width: 600px; /* Limit the content width */
  text-align: center; /* Center the heading and subheading */
}

.heading {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.subheading {
  font-size: 16px;
  margin-bottom: 20px;
  color: #555;
}

form {
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left; /* Left-align form content */
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
textarea,
select {
  width: 100%;
  padding: 8px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

textarea {
  resize: vertical;
}

.info-icon {
  font-size: 14px;
  cursor: help;
  color: #007bff;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: #0056b3;
}
</style>
