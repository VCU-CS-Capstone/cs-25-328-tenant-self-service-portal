<template>
    <div class="register-dataset">
        <h2>REGISTER NEW DATASET</h2>
        <p class="guide-text">We'll guide you through filling in this info. You can always save, step away and return
            right where you left off.</p>

        <div class="steps-container">
            <div v-for="step in steps" :key="step.id" class="step-item">
                <div class="step-header" @click="toggleStep(step.id)">
                    <div class="step-title">
                        <span class="step-number">Step {{ step.id }}</span>
                        <span class="step-name">{{ step.title }}</span>
                        <span v-if="step.isRequired" class="required-badge">Required</span>
                    </div>
                    <div class="step-icon">
                        <span class="toggle-icon">{{ step.isOpen ? '▼' : '▲' }}</span>
                    </div>
                </div>
                <div v-if="step.isOpen" class="step-content">
                    <p>{{ step.description }}</p>
                </div>
            </div>
        </div>

        <div class="navigation-buttons">
            <button class="back-btn" @click="goBack">
                Back
            </button>
            <button class="continue-btn" @click="continueToSteps">
                Continue to Step 1
            </button>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
    name: 'DatasetRegistrationOverview',
    setup() {
        const router = useRouter();
        return { router };
    },

    data() {
        return {
            currentStep: 0,
            steps: [
                { 
                    id: 1, 
                    title: 'Enter basic information', 
                    isOpen: false,
                    isRequired: true,
                    description: 'Fill out the basic information regarding your dataset including name, description, line of business, and data steward details.'
                },
                { 
                    id: 2, 
                    title: 'Select Image Lifecycle Management policies', 
                    isOpen: false,
                    isRequired: true,
                    description: 'Choose appropriate lifecycle management policies for your dataset images and documents.'
                },
                { 
                    id: 3, 
                    title: 'Select Dataset Channels', 
                    isOpen: false,
                    isRequired: true,
                    description: 'Specify the channels through which your dataset will be accessed and distributed.'
                },
                { 
                    id: 4, 
                    title: 'Specify fields related to dataset', 
                    isOpen: false,
                    isRequired: true,
                    description: 'Define the structure of your dataset by specifying field names, types, and validation rules.'
                },
            ]
        }
    },
    methods: {
        toggleStep(stepId) {
            const step = this.steps.find(s => s.id === stepId);
            if (step) {
                // Close all other steps
                this.steps.forEach(s => {
                    if (s.id !== stepId) s.isOpen = false;
                });
                // Toggle the clicked step
                step.isOpen = !step.isOpen;
            }
        },
        continueToSteps() {
            this.router.push('/admin/datasets/register/steps/1');
        },
        goBack() {
            if (confirm("Are you sure you want to cancel this registration?")) {
                this.router.push('/admin/datasets');
            }
        }
    }
}
</script>

<style scoped>
.register-dataset {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

h2 {
    color: #333;
    margin-bottom: 1rem;
}

.guide-text {
    color: #666;
    margin-bottom: 2rem;
    font-size: 1.1rem;
}

.steps-container {
    margin-bottom: 2rem;
}

.step-item {
    margin-bottom: 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    transition: all 0.3s ease;
    overflow: hidden;
}

.step-item:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.step-header {
    padding: 1.25rem;
    background-color: #f8f9fa;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background-color 0.3s ease;
}

.step-header:hover {
    background-color: #f0f0f0;
}

.step-title {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.step-number {
    font-weight: 600;
    color: #017291;
}

.step-name {
    font-weight: 500;
}

.required-badge {
    background-color: #ff4444;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.8rem;
}

.step-content {
    padding: 1.5rem;
    background-color: white;
    border-top: 1px solid #e0e0e0;
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

.toggle-icon {
    font-size: 0.75rem;
    color: #666;
    transition: transform 0.3s ease;
}
</style>