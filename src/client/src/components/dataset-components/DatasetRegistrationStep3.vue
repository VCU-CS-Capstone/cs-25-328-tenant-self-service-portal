<template>
    <div class="form-container">
        <div class="form-content">
            <h2>SELECT DATASET CHANNELS</h2>
            <p>Configure who can produce and consume data from this dataset.</p>

            <div class="channels-section">
                <div class="section-container">
                    <h3>Producers</h3>
                    <div class="channel-list">
                        <div v-for="producer in availableProducers" 
                             :key="producer.producerId" 
                             class="channel-item">
                            <label class="channel-label">
                                <input 
                                    type="checkbox"
                                    :value="producer.producerId"
                                    v-model="selectedProducers"
                                    @change="updateForm"
                                >
                                <div class="channel-content">
                                    <div class="channel-header">
                                        <span class="channel-name">{{ producer.producerName }}</span>
                                    </div>
                                    <p class="channel-description">{{ producer.producerDescription }}</p>
                                </div>
                            </label>
                        </div>
                        <div v-if="isLoadingProducers" class="loading-indicator">
                            Loading producers...
                        </div>
                        <div v-if="!isLoadingProducers && availableProducers.length === 0" class="empty-message">
                            No producers available
                        </div>
                    </div>
                </div>

                <div class="section-container">
                    <h3>Consumers</h3>
                    <div class="channel-list">
                        <div v-for="consumer in availableConsumers" 
                             :key="consumer.consumerId" 
                             class="channel-item">
                            <label class="channel-label">
                                <input 
                                    type="checkbox"
                                    :value="consumer.consumerId"
                                    v-model="selectedConsumers"
                                    @change="updateForm"
                                >
                                <div class="channel-content">
                                    <div class="channel-header">
                                        <span class="channel-name">{{ consumer.consumerName }}</span>
                                    </div>
                                    <p class="channel-description">{{ consumer.consumerDescription }}</p>
                                </div>
                            </label>
                        </div>
                        <div v-if="isLoadingConsumers" class="loading-indicator">
                            Loading consumers...
                        </div>
                        <div v-if="!isLoadingConsumers && availableConsumers.length === 0" class="empty-message">
                            No consumers available
                        </div>
                    </div>
                </div>

                <div class="section-container">
                    <h3>Data Sources</h3>
                    <div class="channel-list">
                        <div v-for="source in availableDataSources" 
                             :key="source.dataSourceId" 
                             class="channel-item">
                            <label class="channel-label">
                                <input 
                                    type="checkbox"
                                    :value="source.dataSourceId"
                                    v-model="selectedDataSources"
                                    @change="updateForm"
                                >
                                <div class="channel-content">
                                    <div class="channel-header">
                                        <span class="channel-name">{{ source.dataSourceName }}</span>
                                    </div>
                                    <p class="channel-description">{{ source.dataSourceDescription }}</p>
                                </div>
                            </label>
                        </div>
                        <div v-if="isLoadingDataSources" class="loading-indicator">
                            Loading data sources...
                        </div>
                        <div v-if="!isLoadingDataSources && availableDataSources.length === 0" class="empty-message">
                            No data sources available
                        </div>
                    </div>
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
                    Continue to Step 4
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'DatasetRegistrationStep3',
    
    props: {
        formData: {
            type: Object,
            required: true
        }
    },

    emits: ['update:formData', 'save-draft', 'continue', 'back'],

    data() {
        return {
            selectedProducers: [],
            selectedConsumers: [],
            selectedDataSources: [],
            availableProducers: [],
            availableConsumers: [],
            availableDataSources: [],
            isLoadingProducers: false,
            isLoadingConsumers: false,
            isLoadingDataSources: false,
            error: null
        }
    },

    computed: {
        isValid() {
            return this.selectedProducers.length > 0 && 
                   this.selectedConsumers.length > 0 && 
                   this.selectedDataSources.length > 0;
        }
    },

    methods: {
        updateForm() {
            this.$emit('update:formData', {
                ...this.formData,
                datasetProducers: [...this.selectedProducers],
                datasetConsumers: [...this.selectedConsumers],
                dataSources: [...this.selectedDataSources]
            });
        },
        
        saveDraft() {
            this.$emit('save-draft');
        },
        
        continueToNextStep() {
            if (this.isValid) {
                this.$emit('continue');
            } else {
                alert('Please select at least one producer, consumer, and data source.');
            }
        },
        
        goBack() {
            this.$emit('back');
        },

        async fetchChannelData() {
            try {
                const API_URL = process.env.VUE_APP_API_URL;
                
                // Fetch producers
                this.isLoadingProducers = true;
                try {
                    const producersRes = await axios.get(`${API_URL}/producers`);
                    this.availableProducers = producersRes.data;
                } catch (error) {
                    console.error('Error fetching producers:', error);
                    // Add mock producers for testing if API fails
                    this.availableProducers = [
                        {
                            producerId: "doc-processing",
                            producerName: "Document Processing Team",
                            producerDescription: "Team responsible for processing and validating documents"
                        },
                        {
                            producerId: "fraud-detection",
                            producerName: "Fraud Detection Team",
                            producerDescription: "Team responsible for fraud detection and monitoring"
                        }
                    ];
                } finally {
                    this.isLoadingProducers = false;
                }
                
                // Fetch consumers
                this.isLoadingConsumers = true;
                try {
                    const consumersRes = await axios.get(`${API_URL}/consumers`);
                    this.availableConsumers = consumersRes.data;
                } catch (error) {
                    console.error('Error fetching consumers:', error);
                    // Add mock consumers for testing if API fails
                    this.availableConsumers = [
                        {
                            consumerId: "fraud-team",
                            consumerName: "Fraud Detection Team",
                            consumerDescription: "Team handling fraud detection and analysis"
                        },
                        {
                            consumerId: "compliance-team",
                            consumerName: "Compliance Team",
                            consumerDescription: "Team ensuring compliance with regulations"
                        }
                    ];
                } finally {
                    this.isLoadingConsumers = false;
                }
                
                // Fetch data sources
                this.isLoadingDataSources = true;
                try {
                    const sourcesRes = await axios.get(`${API_URL}/datasources`);
                    this.availableDataSources = sourcesRes.data;
                } catch (error) {
                    console.error('Error fetching data sources:', error);
                    // Add mock data sources for testing if API fails
                    this.availableDataSources = [
                        {
                            dataSourceId: "doc-upload",
                            dataSourceName: "Document Upload System",
                            dataSourceDescription: "System handling document uploads and processing"
                        },
                        {
                            dataSourceId: "customer-portal",
                            dataSourceName: "Customer Portal",
                            dataSourceDescription: "Main customer interaction portal"
                        }
                    ];
                } finally {
                    this.isLoadingDataSources = false;
                }
            } catch (error) {
                console.error('Error fetching channel data:', error);
                this.error = 'Failed to load channel data. Please try again.';
            }
        },
        
        arraysEqual(a, b) {
            if (!a || !b) return false;
            if (a.length !== b.length) return false;
            return a.every((item, index) => item === b[index]);
        }
    },

    created() {
        // Initialize selections from form data if they exist
        if (this.formData.datasetProducers) {
            this.selectedProducers = [...this.formData.datasetProducers];
        }
        if (this.formData.datasetConsumers) {
            this.selectedConsumers = [...this.formData.datasetConsumers];
        }
        if (this.formData.dataSources) {
            this.selectedDataSources = [...this.formData.dataSources];
        }

        // Fetch available channels
        this.fetchChannelData();
    },
    
    watch: {
        'formData.datasetProducers': {
            handler(newProducers) {
                if (newProducers && !this.arraysEqual(newProducers, this.selectedProducers)) {
                    this.selectedProducers = [...newProducers];
                }
            },
            deep: true
        },
        'formData.datasetConsumers': {
            handler(newConsumers) {
                if (newConsumers && !this.arraysEqual(newConsumers, this.selectedConsumers)) {
                    this.selectedConsumers = [...newConsumers];
                }
            },
            deep: true
        },
        'formData.dataSources': {
            handler(newSources) {
                if (newSources && !this.arraysEqual(newSources, this.selectedDataSources)) {
                    this.selectedDataSources = [...newSources];
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

.channels-section {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin: 2rem 0;
}

.section-container {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
}

h3 {
    margin-bottom: 1rem;
    color: #017291;
}

.channel-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.channel-item {
    background: white;
    border-radius: 4px;
}

.channel-label {
    display: flex;
    gap: 1rem;
    cursor: pointer;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    transition: all 0.3s ease;
}

.channel-label:hover {
    border-color: #017291;
}

.channel-content {
    flex: 1;
}

.channel-header {
    margin-bottom: 0.5rem;
}

.channel-name {
    font-weight: 500;
    color: #333;
}

.channel-description {
    color: #666;
    font-size: 0.9rem;
}

.loading-indicator {
    text-align: center;
    padding: 1rem;
    color: #666;
    font-style: italic;
}

.empty-message {
    text-align: center;
    padding: 1rem;
    color: #666;
    font-style: italic;
    background: #f8f9fa;
    border-radius: 4px;
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