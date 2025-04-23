<template>
  <div class="form-container">
    <div class="form-content">
      <h2>ENTER BASIC INFORMATION</h2>
      <p>We'll guide you through filling in this info. You can always save, step away and return right where you left off.</p>

      <div class="form-field">
        <label>Dataset Name <span class="required">*</span></label>
        <input 
          v-model="localFormData.datasetName"
          type="text"
          placeholder="Enter dataset name"
          @input="updateForm"
        >
      </div>

      <div class="form-field">
        <label>Description <span class="required">*</span></label>
        <textarea 
          v-model="localFormData.description"
          placeholder="Enter description"
          @input="updateForm"
        ></textarea>
      </div>

      <div class="form-field">
        <label>Line of Business <span class="required">*</span></label>
        <select 
          v-model="localFormData.lineOfBusiness"
          @change="updateForm"
        >
          <option value="" disabled>Select a line of business</option>
          <option v-for="option in lineOfBusinessOptions" 
                  :key="option.value" 
                  :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>

      <div class="form-field">
        <label>Managing Data Steward <span class="required">*</span></label>
        <input 
          v-model="localFormData.managingDataSteward"
          type="text"
          placeholder="Enter managing data steward"
          @input="updateForm"
        >
        <span class="helper-text">Enter the email of the managing data steward</span>
      </div>

      <div class="form-field">
        <label>Performing Data Steward <span class="required">*</span></label>
        <input 
          v-model="localFormData.performingDataSteward"
          type="text"
          placeholder="Enter performing data steward"
          @input="updateForm"
        >
        <span class="helper-text">Enter the email of the performing data steward</span>
      </div>

      <div class="form-field">
        <label>Accountable Executive <span class="required">*</span></label>
        <input 
          v-model="localFormData.accountableExecutive"
          type="text"
          placeholder="Enter accountable executive"
          @input="updateForm"
        >
        <span class="helper-text">Enter the email of the accountable executive</span>
      </div>

      <div class="form-field checkbox-field">
        <label>
          <input 
            v-model="localFormData.hasInternationalData"
            type="checkbox"
            @change="updateForm"
          >
          Has international data
        </label>
        <span class="helper-text">Are you expecting data from outside of U.S.A.?</span>
      </div>

      <div class="form-buttons">
        <button class="back-btn" @click="goBack">Back</button>
        <button class="save-draft" @click="saveDraft">Save Draft</button>
        <button 
          class="continue-btn" 
          @click="continueToNextStep"
          :disabled="!isFormValid"
        >
          Continue to Step 2
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminGDRStep1',
  
  props: {
    formData: {
      type: Object,
      required: true
    }
  },

  emits: ['update:formData', 'save-draft', 'continue', 'back'],
  
  data() {
    return {
      localFormData: {
        datasetName: '',
        description: '',
        lineOfBusiness: '',
        managingDataSteward: '',
        performingDataSteward: '',
        accountableExecutive: '',
        hasInternationalData: false
      },
      lineOfBusinessOptions: [
        { value: 'retail', label: 'Retail Banking' },
        { value: 'commercial', label: 'Commercial Banking' },
        { value: 'credit', label: 'Credit Cards' },
        { value: 'risk', label: 'Risk Management' },
        { value: 'compliance', label: 'Compliance' }
      ]
    }
  },

  computed: {
    isFormValid() {
      return this.localFormData.datasetName && 
             this.localFormData.description &&
             this.localFormData.lineOfBusiness &&
             this.localFormData.managingDataSteward &&
             this.localFormData.performingDataSteward &&
             this.localFormData.accountableExecutive
    }
  },

  methods: {
    updateForm() {
      this.$emit('update:formData', { ...this.formData, ...this.localFormData });
    },
    
    saveDraft() {
      this.$emit('save-draft');
    },
    
    continueToNextStep() {
      if (this.isFormValid) {
        this.$emit('continue');
      } else {
        alert('Please complete all required fields before continuing.');
      }
    },
    
    goBack() {
      this.$emit('back');
    }
  },

  created() {
    // Initialize local form data with props
    this.localFormData = { 
      datasetName: this.formData.datasetName || '',
      description: this.formData.description || '',
      lineOfBusiness: this.formData.lineOfBusiness || '',
      managingDataSteward: this.formData.managingDataSteward || '',
      performingDataSteward: this.formData.performingDataSteward || '',
      accountableExecutive: this.formData.accountableExecutive || '',
      hasInternationalData: this.formData.hasInternationalData || false
    };
  },

  watch: {
    formData: {
      handler(newValue) {
        // Update local form data when props change
        this.localFormData = { 
          datasetName: newValue.datasetName || '',
          description: newValue.description || '',
          lineOfBusiness: newValue.lineOfBusiness || '',
          managingDataSteward: newValue.managingDataSteward || '',
          performingDataSteward: newValue.performingDataSteward || '',
          accountableExecutive: newValue.accountableExecutive || '',
          hasInternationalData: newValue.hasInternationalData || false
        };
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.form-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.form-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.form-field {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.required {
  color: #dc3545;
  margin-left: 4px;
}

input[type="text"], 
textarea, 
select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

input[type="text"]:focus, 
textarea:focus, 
select:focus {
  border-color: #017291;
  outline: none;
  box-shadow: 0 0 0 2px rgba(1,114,145,0.1);
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
  font-weight: normal;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  gap: 1rem;
}

.back-btn, .save-draft, .continue-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
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

.save-draft {
  border: 1px solid #666;
  background: white;
  color: #666;
}

.save-draft:hover {
  background: #f5f5f5;
}

.continue-btn {
  background: #017291;
  color: white;
  border: none;
}

.continue-btn:hover:not(:disabled) {
  background: #015e78;
}

.continue-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

h2 {
  margin-bottom: 1rem;
  color: #333;
}

p {
  color: #666;
  margin-bottom: 2rem;
}
</style>