<template>
    <div class="registration-wrapper">
      <!-- Progress bar -->
      <div class="progress-container">
        <div class="progress-bar">
          <div 
            class="progress-fill"
            :style="{ width: progressPercentage + '%' }"
          ></div>
        </div>
        <div class="steps-container">
          <div 
            v-for="(step, index) in totalSteps" 
            :key="index"
            class="step"
            :class="{
              'completed': currentStep > index + 1,
              'active': currentStep === index + 1,
              'pending': currentStep < index + 1
            }"
          >
            <div class="step-circle">{{ index + 1 }}</div>
            <div class="step-label">Step {{ index + 1 }}</div>
          </div>
        </div>
      </div>
  
      <!-- Router view for steps -->
      <router-view 
        v-model:formData="formData"
        @save-draft="saveDraft"
        @continue="handleContinue"
        @back="handleBack"
      ></router-view>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import axios from 'axios'
  
  export default {
    name: 'UseCaseRegistrationWrapper',
    
    setup() {
      const router = useRouter()
      const route = useRoute()
      
      const totalSteps = 5
      const formData = ref({
        usecaseName: '',
        description: '',
        lineOfBusiness: '',
        managingDataSteward: '',
        performingDataSteward: '',
        accountableExecutive: '',
        hasInternationalData: false,
        lifeCycleManagementPolicyIds: [], 
        datasetProducers: [],
        datasetConsumers: [],
        dataSources: [], 
        managedFieldContracts: [],
        clientFieldContracts: []
      })
  
      const currentStep = computed(() => {
        const stepPath = route.path
        const stepNumber = parseInt(stepPath.split('/').pop())
        return isNaN(stepNumber) ? 1 : stepNumber
      })
  
      const progressPercentage = computed(() => {
        return ((currentStep.value - 1) / (totalSteps - 1)) * 100
      })
  
      // Your existing methods remain the same
      const saveDraft = async () => {
        try {
          await axios.post(`${process.env.VUE_APP_API_URL}/admin/usecases`, {
            ...formData.value,
            status: 'DRAFT'
          })
          alert('Draft saved successfully!')
        } catch (error) {
          console.error('Error saving draft:', error)
          alert('Error saving draft. Please try again.')
        }
      }
  
      const handleContinue = () => {
        const nextStep = currentStep.value + 1
        if (nextStep <= totalSteps) {
          localStorage.setItem('usecaseFormData', JSON.stringify(formData.value))
          router.push(`/admin/usecases/register/steps/${nextStep}`)
        }
      }
  
      const handleBack = () => {
        const prevStep = currentStep.value - 1
        if (prevStep >= 1) {
          router.push(`/admin/usecases/register/steps/${prevStep}`)
        } else {
          router.push('/admin/usecases/register')
        }
      }
  
      // Load saved form data if it exists
      const savedData = localStorage.getItem('usecaseFormData')
      if (savedData) {
        formData.value = JSON.parse(savedData)
      }
  
      return {
        totalSteps,
        currentStep,
        formData,
        progressPercentage,
        saveDraft,
        handleContinue,
        handleBack
      }
    }
  }
  </script>
  
  <style scoped>
  .registration-wrapper {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .progress-container {
    padding: 20px;
    width: 100%;
    margin-bottom: 2rem;
  }
  
  .progress-bar {
    height: 4px;
    background-color: #e0e0e0;
    border-radius: 2px;
    position: relative;
    margin-bottom: 20px;
  }
  
  .progress-fill {
    position: absolute;
    height: 100%;
    background-color: #017291;
    border-radius: 2px;
    transition: width 0.3s ease;
  }
  
  .steps-container {
    display: flex;
    justify-content: space-between;
    position: relative;
    margin-top: -12px;
  }
  
  .step {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    position: relative;
  }
  
  .step-circle {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #ffffff;
    border: 2px solid #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
    color: #666;
    transition: all 0.3s ease;
    z-index: 1;
  }
  
  .step-label {
    margin-top: 8px;
    font-size: 12px;
    color: #666;
    text-align: center;
  }
  
  .step.completed .step-circle {
    background-color: #017291;
    border-color: #017291;
    color: white;
  }
  
  .step.active .step-circle {
    border-color: #017291;
    color: #017291;
    transform: scale(1.2);
    box-shadow: 0 0 0 4px rgba(1, 114, 145, 0.1);
  }
  
  .step.completed .step-label,
  .step.active .step-label {
    color: #017291;
    font-weight: bold;
  }
  
  .step.pending .step-circle {
    background-color: #ffffff;
  }
  
  @media (max-width: 768px) {
    .step-label {
      font-size: 10px;
    }
    
    .step-circle {
      width: 20px;
      height: 20px;
      font-size: 10px;
    }
  }
  </style>
  