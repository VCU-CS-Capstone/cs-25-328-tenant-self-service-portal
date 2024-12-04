<template>
    <div class="register-use-case">
        <h2>REGISTER NEW DATASET</h2>
        <p class="guide-text">We'll guide you through filling in this info. You can always save, step away and return
            right where you left off.</p>

        <div class="steps-container">
            <div v-for="step in steps" :key="step.id" class="step-item">
                <div class="step-header" @click="toggleStep(step.id)">
                    <span>Step {{ step.id }}: {{ step.title }}</span>
                    <span class="toggle-icon">{{ step.isOpen ? '▼' : '▲' }}</span>
                </div>
                <div v-if="step.isOpen" class="step-content">
                    <p v-if="step.id === 1">Here you will fill out the basic information regarding the data set that you are registering</p>
                    <p v-if="step.id === 2">Here you will select the image lifecycle management policies</p>
                    <p v-if="step.id === 3">Here you will select dataset channels</p>
                    <p v-if="step.id === 4">Here you will specify fields related to dataset</p>
                </div>
            </div>
        </div>

        <div class="navigation-buttons">
            <button class="back-btn" @click="goBack">Back</button>
            <button class="continue-btn" @click="continueToStep1">
                Continue to Step 1
            </button>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
    name: 'RegisterUseCase',
    setup() {
        const router = useRouter();
        return { router };
    },

    data() {
        return {
            currentStep: 0,
            steps: [
                { id: 1, title: 'Enter basic information', isOpen: false },
                { id: 2, title: 'Select Image Lifecycle Management policies', isOpen: false },
                { id: 3, title: 'Select Dataset Channels', isOpen: false },
                { id: 4, title: 'Specify fields related to dataset', isOpen: false },
            ]
        }
    },
    methods: {
        toggleStep(stepId) {
            const step = this.steps.find(s => s.id === stepId);
            step.isOpen = !step.isOpen;
        },
        continueToStep1() {
            this.router.push('/datasets/register/1')
        },
        goBack() {
            if (confirm("Are you sure you want to cancel this registration?")) {
                this.router.push('/datasets');
            } else {
                return;
            }
        }
    }
}
</script>

<style scoped>
.register-use-case {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.guide-text {
    color: #666;
    margin-bottom: 30px;
}

.steps-container {
    margin-bottom: 30px;
}

.step-item {
    margin-bottom: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
}

.step-header {
    padding: 15px;
    background-color: #f5f5f5;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.step-content {
    padding: 20px;
    background-color: #fff;
}

.navigation-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.back-btn {
    padding: 10px 20px;
    border: 1px solid #017291;
    background: white;
    color: #017291;
    border-radius: 4px;
    cursor: pointer;
}

.continue-btn {
    padding: 10px 20px;
    background: #017291;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.toggle-icon {
    font-size: 12px;
}
</style>