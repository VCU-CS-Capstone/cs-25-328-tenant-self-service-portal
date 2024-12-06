<template>
    <div class="form-container">
        <div class="form-content">
            <h2>REVIEW AND SUBMIT</h2>
            <p>Review all information before submitting your dataset registration.</p>

            <div class="review-sections">
                <!-- Basic Information -->
                <div class="section">
                    <div class="section-header">
                        <h3>Step 1: Basic Information</h3>
                        <button class="edit-btn" @click="goToStep(1)">Edit</button>
                    </div>
                    <div class="info-grid">
                        <div class="info-item">
                            <label>Dataset Name:</label>
                            <span>{{ formData.datasetName }}</span>
                        </div>
                        <div class="info-item">
                            <label>Description:</label>
                            <span>{{ formData.description }}</span>
                        </div>
                        <div class="info-item">
                            <label>Line of Business:</label>
                            <span>{{ formData.lineOfBusiness }}</span>
                        </div>
                        <div class="info-item">
                            <label>Managing Data Steward:</label>
                            <span>{{ formData.managingDataSteward }}</span>
                        </div>
                        <div class="info-item">
                            <label>Performing Data Steward:</label>
                            <span>{{ formData.performingDataSteward }}</span>
                        </div>
                        <div class="info-item">
                            <label>Accountable Executive:</label>
                            <span>{{ formData.accountableExecutive }}</span>
                        </div>
                        <div class="info-item">
                            <label>Has International Data:</label>
                            <span>{{ formData.hasInternationalData ? 'Yes' : 'No' }}</span>
                        </div>
                    </div>
                </div>

                <!-- Lifecycle Management Policies -->
                <div class="section">
                    <div class="section-header">
                        <h3>Step 2: Lifecycle Management Policies</h3>
                        <button class="edit-btn" @click="goToStep(2)">Edit</button>
                    </div>
                    <div class="policy-list">
                        <div v-for="policyId in formData.lifeCycleManagementPolicyIds" 
                             :key="policyId" 
                             class="policy-item">
                            {{ policyId }}
                        </div>
                    </div>
                </div>

                <!-- Dataset Channels -->
                <div class="section">
                    <div class="section-header">
                        <h3>Step 3: Dataset Channels</h3>
                        <button class="edit-btn" @click="goToStep(3)">Edit</button>
                    </div>
                    <div class="channels-grid">
                        <div class="channel-section">
                            <h4>Producers</h4>
                            <div class="channel-list">
                                <div v-for="producer in formData.datasetProducers" 
                                     :key="producer" 
                                     class="channel-item">
                                    {{ producer }}
                                </div>
                            </div>
                        </div>
                        <div class="channel-section">
                            <h4>Consumers</h4>
                            <div class="channel-list">
                                <div v-for="consumer in formData.datasetConsumers" 
                                     :key="consumer" 
                                     class="channel-item">
                                    {{ consumer }}
                                </div>
                            </div>
                        </div>
                        <div class="channel-section">
                            <h4>Data Sources</h4>
                            <div class="channel-list">
                                <div v-for="source in formData.dataSources" 
                                     :key="source" 
                                     class="channel-item">
                                    {{ source }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Dataset Fields -->
                <div class="section">
                    <div class="section-header">
                        <h3>Step 4: Dataset Fields</h3>
                        <button class="edit-btn" @click="goToStep(4)">Edit</button>
                    </div>
                    <div class="fields-review">
                        <div class="fields-section">
                            <h4>Managed Fields</h4>
                            <table class="fields-table">
                                <thead>
                                    <tr>
                                        <th>Field Name</th>
                                        <th>Type</th>
                                        <th>Required</th>
                                        <th>Tokenized</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="field in formData.managedFieldContracts" 
                                        :key="field.fieldName">
                                        <td>{{ field.fieldName }}</td>
                                        <td>{{ field.fieldType }}</td>
                                        <td>{{ field.isRequired ? 'Yes' : 'No' }}</td>
                                        <td>{{ field.isFieldTokenized ? 'Yes' : 'No' }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="fields-section">
                            <h4>Client Fields</h4>
                            <table class="fields-table">
                                <thead>
                                    <tr>
                                        <th>Field Name</th>
                                        <th>Type</th>
                                        <th>Required</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="field in formData.clientFieldContracts" 
                                        :key="field.fieldName">
                                        <td>{{ field.fieldName }}</td>
                                        <td>{{ field.fieldType }}</td>
                                        <td>{{ field.isRequired ? 'Yes' : 'No' }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-buttons">
                <button class="back-btn" @click="$emit('back')">Back</button>
                <button class="submit-btn" @click="handleSubmit" :disabled="!isValid">
                    Submit Dataset
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DatasetRegistrationStep5',
    
    props: {
        formData: {
            type: Object,
            required: true
        }
    },

    emits: ['update:formData', 'back', 'submit'],

    computed: {
        isValid() {
            // Add any final validation checks here
            return true;
        }
    },

    methods: {
        goToStep(step) {
            this.$router.push(`/datasets/register/steps/${step}`);
        },

        handleSubmit() {
            this.$emit('submit', this.formData);
        }
    }
}
</script>

<style scoped>
.form-container {
    padding: 20px;
    max-width: 1000px;
    margin: 0 auto;
}

.form-content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.review-sections {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin: 2rem 0;
}

.section {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 1.5rem;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

h3 {
    color: #017291;
    margin: 0;
}

.edit-btn {
    padding: 0.5rem 1rem;
    background: white;
    border: 1px solid #017291;
    color: #017291;
    border-radius: 4px;
    cursor: pointer;
}

.info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
}

.info-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.info-item label {
    font-weight: 500;
    color: #666;
}

.fields-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
}

.fields-table th,
.fields-table td {
    padding: 0.75rem;
    border: 1px solid #e0e0e0;
    text-align: left;
}

.fields-table th {
    background: #f8f9fa;
    font-weight: 500;
}

.channels-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
}

.channel-section h4 {
    margin-bottom: 1rem;
    color: #666;
}

.channel-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.channel-item {
    padding: 0.5rem;
    background: #f8f9fa;
    border-radius: 4px;
}

.form-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
}

.back-btn, .submit-btn {
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

.submit-btn {
    background: #28a745;
    color: white;
    border: none;
}

.submit-btn:hover:not(:disabled) {
    background: #218838;
}

.submit-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
}
</style>