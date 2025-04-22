<template>
    <div class="form-container">
        <div class="form-content">
            <h2>SELECT IMAGE LIFECYCLE MANAGEMENT POLICIES</h2>
            <p>Choose the appropriate lifecycle management policies that will be applied to your dataset.</p>

            <div class="policies-container">
                <div v-for="policy in availablePolicies" 
                     :key="policy.id" 
                     class="policy-item">
                    <label class="policy-label">
                        <input 
                            type="checkbox"
                            :value="policy.id"
                            v-model="selectedPolicies"
                            @change="updateForm"
                        >
                        <div class="policy-content">
                            <div class="policy-header">
                                <span class="policy-name">{{ policy.name }}</span>
                                <span v-if="policy.isRequired" class="required-badge">Required</span>
                            </div>
                            <p class="policy-description">{{ policy.description }}</p>
                        </div>
                    </label>
                </div>
            </div>

            <div class="form-buttons">
                <button class="back-btn" @click="goBack">Back</button>
                <button class="save-draft" @click="saveDraft">Save Draft</button>
                <button 
                    class="continue-btn" 
                    @click="continueToNextStep"
                    :disabled="!isValid"
                >
                    Continue to Step 3
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AdminGDRStep2',
    
    props: {
        formData: {
            type: Object,
            required: true
        }
    },

    emits: ['update:formData', 'save-draft', 'continue', 'back'],

    data() {
        return {
            selectedPolicies: [],
            availablePolicies: [
                {
                    id: 'KYC_DOCUMENT_WORKFLOW_GALLERY',
                    name: 'KYC Document Workflow',
                    description: 'Standard workflow for Know Your Customer (KYC) document processing and retention.',
                    isRequired: true
                },
                {
                    id: 'GOVT_ID_WORKFLOW_GALLERY',
                    name: 'Government ID Workflow',
                    description: 'Specialized workflow for handling government-issued identification documents.',
                    isRequired: false
                },
                {
                    id: 'PII_DATA_PROTECTION',
                    name: 'PII Data Protection',
                    description: 'Enhanced protection measures for Personally Identifiable Information.',
                    isRequired: false
                },
                {
                    id: 'FRAUD_MONITORING',
                    name: 'Fraud Monitoring',
                    description: 'Additional monitoring and retention policies for fraud-related documentation.',
                    isRequired: false
                }
            ]
        }
    },

    computed: {
        isValid() {
            // Check if at least one policy is selected
            return this.selectedPolicies.length > 0;
        }
    },

    methods: {
        updateForm() {
            this.$emit('update:formData', {
                ...this.formData,
                lifeCycleManagementPolicyIds: [...this.selectedPolicies]
            });
        },
        
        arraysEqual(a, b) {
            if (!a || !b) return false;
            if (a.length !== b.length) return false;
            return a.every((item, index) => item === b[index]);
        },
        
        saveDraft() {
            this.$emit('save-draft');
        },
        
        continueToNextStep() {
            if (this.isValid) {
                this.$emit('continue');
            } else {
                alert('Please select at least one lifecycle management policy.');
            }
        },
        
        goBack() {
            this.$emit('back');
        }
    },

    created() {
        // Initialize selected policies from form data if they exist
        if (this.formData.lifeCycleManagementPolicyIds && this.formData.lifeCycleManagementPolicyIds.length > 0) {
            this.selectedPolicies = [...this.formData.lifeCycleManagementPolicyIds];
        } else {
            // Pre-select required policies by default
            this.selectedPolicies = this.availablePolicies
                .filter(policy => policy.isRequired)
                .map(policy => policy.id);
            
            // Update form data with default selected policies
            this.updateForm();
        }
    },
    
    watch: {
        'formData.lifeCycleManagementPolicyIds': {
            handler(newPolicies) {
                if (newPolicies && !this.arraysEqual(newPolicies, this.selectedPolicies)) {
                    this.selectedPolicies = [...newPolicies];
                }
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

.policies-container {
    margin: 2rem 0;
}

.policy-item {
    margin-bottom: 1rem;
}

.policy-label {
    display: flex;
    gap: 1rem;
    cursor: pointer;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    transition: all 0.3s ease;
}

.policy-label:hover {
    background-color: #f8f9fa;
    border-color: #017291;
}

.policy-content {
    flex: 1;
}

.policy-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.5rem;
}

.policy-name {
    font-weight: 500;
    color: #333;
}

.policy-description {
    color: #666;
    font-size: 0.9rem;
}

.required-badge {
    background-color: #ff4444;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.8rem;
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
</style>