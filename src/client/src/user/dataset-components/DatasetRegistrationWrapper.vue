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
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import datasetService from '../../services/dataset.api'

export default {
  name: 'DatasetRegistrationWrapper',
  
  setup() {
    const router = useRouter()
    const route = useRoute()
    
    const totalSteps = 5
    const statusMessage = ref('')
    const statusType = ref('info')
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
      clientFieldContracts: [],
      dataset_id: null
    })

    const currentStep = computed(() => {
      const stepPath = route.path
      const stepNumber = parseInt(stepPath.split('/').pop())
      return isNaN(stepNumber) ? 1 : stepNumber
    })

    const progressPercentage = computed(() => {
      return ((currentStep.value - 1) / (totalSteps - 1)) * 100
    })

    // Show status message
    const showStatus = (message, type = 'info', duration = 3000) => {
      statusMessage.value = message
      statusType.value = type
      setTimeout(() => {
        statusMessage.value = ''
      }, duration)
    }

    // Save dataset as draft
    const saveDraft = async () => {
      try {
        // Store in localStorage as backup
        localStorage.setItem('datasetFormData', JSON.stringify(formData.value))
        
        // Save to database via API
        const response = await datasetService.saveDatasetDraft(formData.value)
        
        // Update form with returned dataset ID if it's new
        if (response && response.dataset_id && !formData.value.dataset_id) {
          formData.value.dataset_id = response.dataset_id
        }
        
        showStatus('Draft saved successfully!', 'success')
      } catch (error) {
        console.error('Error saving draft:', error)
        showStatus(`Error saving draft: ${error.message || 'Unknown error'}`, 'error')
      }
    }

    const handleContinue = () => {
      const nextStep = currentStep.value + 1
      if (nextStep <= totalSteps) {
        // Save current progress before proceeding
        localStorage.setItem('datasetFormData', JSON.stringify(formData.value))
        router.push(`/user/datasets/register/steps/${nextStep}`)
      }
    }

    const handleBack = () => {
      const prevStep = currentStep.value - 1
      if (prevStep >= 1) {
        router.push(`/user/datasets/register/steps/${prevStep}`)
      } else {
        router.push('/user/datasets/register')
      }
    }

    // Load saved form data if it exists
    onMounted(() => {
      const savedData = localStorage.getItem('datasetFormData')
      if (savedData) {
        formData.value = JSON.parse(savedData)
      }
    })

    return {
      totalSteps,
      currentStep,
      formData,
      progressPercentage,
      statusMessage,
      statusType,
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
