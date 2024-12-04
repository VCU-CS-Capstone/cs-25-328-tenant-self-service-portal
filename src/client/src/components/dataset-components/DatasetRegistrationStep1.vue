<template>
    <div class="form-container">
      <div class="form-content">
        <h2>ENTER BASIC INFORMATION</h2>
        <p>We'll guide you through filling in this info. You can always save, step away and return right where you left off.</p>
  
        <div class="form-field">
          <label>Dataset Name</label>
          <input 
            v-model="formData.datasetName"
            type="text"
            placeholder="Enter dataset name"
          >
        </div>
  
        <div class="form-field">
          <label>Description</label>
          <textarea 
            v-model="formData.description"
            placeholder="Enter description"
          ></textarea>
        </div>
  
        <div class="form-field">
          <label>Line of Business <span class="info-icon">ⓘ</span></label>
          <select v-model="formData.lineOfBusiness">
            <option value="" disabled selected>Placeholder</option>
            <option v-for="option in lineOfBusinessOptions" 
                    :key="option.value" 
                    :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
  
        <div class="form-field">
          <label>Managing Data Steward</label>
          <input 
            v-model="formData.managingDataSteward"
            type="text"
            placeholder="Enter managing data steward"
          >
          <span class="helper-text">Helpful text that makes things easier.</span>
        </div>
  
        <div class="form-field">
          <label>Performing Data Steward</label>
          <input 
            v-model="formData.performingDataSteward"
            type="text"
            placeholder="Enter performing data steward"
          >
          <span class="helper-text">Helpful text that makes things easier.</span>
        </div>
  
        <div class="form-field">
          <label>Accountable Executive</label>
          <input 
            v-model="formData.accountableExecutive"
            type="text"
            placeholder="Enter accountable executive"
          >
          <span class="helper-text">Helpful text that makes things easier.</span>
        </div>
  
        <div class="form-field checkbox-field">
          <label>
            <input 
              v-model="formData.hasInternationalData"
              type="checkbox"
            >
            Has international data
          </label>
          <span class="helper-text">Are you expecting data from outside of U.S.A.?</span>
        </div>
  
        <div class="form-buttons">
          <button class="back-btn" @click="goBack">Back</button>
          <button class="btn-continue" @click="continueToStep2">Continue to Step 2</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useRouter } from 'vue-router';
  export default {
    name: 'BasicInformationForm',
    setup() {
        const router = useRouter();
        return { router };
    },

    data() {
      return {
        formData: {
          datasetName: '',
          description: '',
          lineOfBusiness: '',
          managingDataSteward: '',
          performingDataSteward: '',
          accountableExecutive: '',
          hasInternationalData: false
        },
        lineOfBusinessOptions: [
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' }
        ]
      }
    },
    methods: {
      goBack() {
        this.router.push('/datasets/register')
      },
      continueToStep2() {
        // Handle form submission and navigation
      }
    }
  }
  </script>
  
  <style scoped>
  .form-container {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 2rem;
  }
  
  .form-content {
    width: 100%;
    max-width: 800px;
  }
  
  .form-field {
    margin-bottom: 1.5rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  input[type="text"], 
  textarea, 
  select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  textarea {
    min-height: 100px;
    resize: vertical;
  }
  
  .helper-text {
    display: block;
    font-size: 0.875rem;
    color: #666;
    margin-top: 0.25rem;
  }
  
  .checkbox-field label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .info-icon {
    color: #666;
    cursor: help;
  }
  
  .form-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
  
  .btn-back,
  .btn-continue {
    padding: 0.5rem 1rem;
    border-radius: 4px;
    border: none;
    cursor: pointer;
  }
  
  .back-btn {
    padding: 10px 20px;
    border: 1px solid #017291;
    background: white;
    color: #017291;
    border-radius: 4px;
    cursor: pointer;
}
  
  .btn-continue {
    background-color: #017291;
    color: white;
  }
  
  h2 {
    margin-bottom: 1rem;
  }
  
  p {
    margin-bottom: 2rem;
  }
  </style>