<template>
    <div class="registration-wrapper">
      <!-- Progress bar -->
      <div class="progress-bar">
        <div 
          v-for="(step, index) in totalSteps" 
          :key="index"
          class="step-indicator"
          :class="{ 'active': currentStep >= index + 1 }"
        >
          Step {{ index + 1 }}
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
    name: 'DatasetRegistrationWrapper',
    
    setup() {
      const router = useRouter()
      const route = useRoute()
      
      const totalSteps = 5
      
      const formData = ref({
        datasetName: '',
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
  
      const saveDraft = async () => {
        try {
          await axios.post('http://localhost:3000/api/datasets', {
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
          localStorage.setItem('datasetFormData', JSON.stringify(formData.value))
          router.push(`/datasets/register/steps/${nextStep}`)
        }
      }
  
      const handleBack = () => {
        const prevStep = currentStep.value - 1
        if (prevStep >= 1) {
          router.push(`/datasets/register/steps/${prevStep}`)
        } else {
          router.push('/datasets/register')
        }
      }
  
      // Load saved form data if it exists
      const savedData = localStorage.getItem('datasetFormData')
      if (savedData) {
        formData.value = JSON.parse(savedData)
      }
  
      return {
        totalSteps,
        currentStep,
        formData,
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
  
  .progress-bar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    padding: 1rem;
    background-color: #f5f5f5;
    border-radius: 8px;
  }
  
  .step-indicator {
    padding: 0.5rem 1rem;
    border-radius: 4px;
    background-color: #ddd;
    color: #666;
    transition: all 0.3s ease;
  }
  
  .step-indicator.active {
    background-color: #017291;
    color: white;
  }
  </style>