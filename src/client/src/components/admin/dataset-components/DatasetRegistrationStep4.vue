<template>
    <div class="form-container">
        <div class="form-content">
            <h2>SPECIFY FIELDS RELATED TO DATASET</h2>
            <p>Configure the fields that will be part of your dataset.</p>

            <div class="fields-section">
                <!-- Managed Fields Section -->
                <div class="section-container">
                    <div class="section-header">
                        <h3>Managed Fields</h3>
                        <button class="add-btn" @click="addManagedField">+ Add Field</button>
                    </div>
                    <div class="fields-list">
                        <div v-for="(field, index) in managedFields" 
                             :key="index" 
                             class="field-item">
                            <div class="field-content">
                                <div class="field-row">
                                    <input 
                                        v-model="field.fieldName"
                                        type="text"
                                        placeholder="Field Name"
                                        class="field-input"
                                        @input="updateForm"
                                    >
                                    <select 
                                        v-model="field.fieldType"
                                        class="field-input"
                                        @change="updateForm"
                                    >
                                        <option value="" disabled>Select Type</option>
                                        <option value="String">String</option>
                                        <option value="Keyword">Keyword</option>
                                        <option value="Date">Date</option>
                                        <option value="Boolean">Boolean</option>
                                        <option value="Number">Number</option>
                                    </select>
                                </div>
                                <div class="field-row">
                                    <input 
                                        v-model="field.dateFormat"
                                        type="text"
                                        placeholder="Date Format (if applicable)"
                                        class="field-input"
                                        :disabled="field.fieldType !== 'Date'"
                                        @input="updateForm"
                                    >
                                    <div class="field-options">
                                        <label>
                                            <input 
                                                type="checkbox"
                                                v-model="field.isRequired"
                                                @change="updateForm"
                                            > Required
                                        </label>
                                        <label>
                                            <input 
                                                type="checkbox"
                                                v-model="field.isFieldTokenized"
                                                @change="updateForm"
                                            > Tokenized
                                        </label>
                                    </div>
                                </div>
                                <div v-if="field.fieldType === 'Keyword'" class="keyword-values">
                                    <input 
                                        v-model="field.keywordInput"
                                        type="text"
                                        placeholder="Add keyword value and press Enter"
                                        class="field-input"
                                        @keyup.enter="addKeywordValue(field)"
                                    >
                                    <div class="keyword-tags">
                                        <span v-for="(value, idx) in field.keywordValues" 
                                              :key="idx" 
                                              class="keyword-tag">
                                            {{ value }}
                                            <button @click="removeKeywordValue(field, idx)" class="remove-tag">×</button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button @click="removeManagedField(index)" class="remove-btn">Remove</button>
                        </div>
                    </div>
                </div>

                <!-- Client Fields Section -->
                <div class="section-container">
                    <div class="section-header">
                        <h3>Client Fields</h3>
                        <button class="add-btn" @click="addClientField">+ Add Field</button>
                    </div>
                    <div class="fields-list">
                        <div v-for="(field, index) in clientFields" 
                             :key="index" 
                             class="field-item">
                            <div class="field-content">
                                <div class="field-row">
                                    <input 
                                        v-model="field.fieldName"
                                        type="text"
                                        placeholder="Field Name"
                                        class="field-input"
                                        @input="updateForm"
                                    >
                                    <select 
                                        v-model="field.fieldType"
                                        class="field-input"
                                        @change="updateForm"
                                    >
                                        <option value="" disabled>Select Type</option>
                                        <option value="String">String</option>
                                        <option value="Date">Date</option>
                                        <option value="Boolean">Boolean</option>
                                        <option value="Number">Number</option>
                                    </select>
                                </div>
                                <div class="field-row">
                                    <input 
                                        v-model="field.dateFormat"
                                        type="text"
                                        placeholder="Date Format (if applicable)"
                                        class="field-input"
                                        :disabled="field.fieldType !== 'Date'"
                                        @input="updateForm"
                                    >
                                    <div class="field-options">
                                        <label>
                                            <input 
                                                type="checkbox"
                                                v-model="field.isRequired"
                                                @change="updateForm"
                                            > Required
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <button @click="removeClientField(index)" class="remove-btn">Remove</button>
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
                    Review and Submit
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AdminGDRStep4',
    
    props: {
        formData: {
            type: Object,
            required: true
        }
    },

    emits: ['update:formData', 'save-draft', 'continue', 'back'],

    data() {
        return {
            managedFields: [],
            clientFields: []
        }
    },

    computed: {
        isValid() {
            const hasValidManagedFields = this.managedFields.every(field => 
                field.fieldName && 
                field.fieldType && 
                (!field.isRequired || field.fieldName.trim()) &&
                (field.fieldType !== 'Keyword' || field.keywordValues.length > 0)
            );

            const hasValidClientFields = this.clientFields.every(field => 
                field.fieldName && 
                field.fieldType && 
                (!field.isRequired || field.fieldName.trim())
            );

            // Validation requires at least one field in each category
            return hasValidManagedFields && 
                   hasValidClientFields && 
                   this.managedFields.length > 0 && 
                   this.clientFields.length > 0;
        }
    },

    methods: {
        createEmptyManagedField() {
            return {
                fieldName: '',
                fieldType: '',
                dateFormat: '',
                isFieldTokenized: false,
                keywordValues: [],
                isRequired: false,
                keywordInput: ''
            }
        },

        createEmptyClientField() {
            return {
                fieldName: '',
                fieldType: '',
                dateFormat: '',
                isRequired: false
            }
        },

        addManagedField() {
            this.managedFields.push(this.createEmptyManagedField());
        },

        addClientField() {
            this.clientFields.push(this.createEmptyClientField());
        },

        removeManagedField(index) {
            this.managedFields.splice(index, 1);
            this.updateForm();
        },

        removeClientField(index) {
            this.clientFields.splice(index, 1);
            this.updateForm();
        },

        addKeywordValue(field) {
            if (field.keywordInput && field.keywordInput.trim()) {
                field.keywordValues.push(field.keywordInput.trim());
                field.keywordInput = '';
                this.updateForm();
            }
        },

        removeKeywordValue(field, index) {
            field.keywordValues.splice(index, 1);
            this.updateForm();
        },

        updateForm() {
            this.$emit('update:formData', {
                ...this.formData,
                managedFieldContracts: [...this.managedFields],
                clientFieldContracts: [...this.clientFields]
            });
        },
        
        saveDraft() {
            this.$emit('save-draft');
        },
        
        continueToNextStep() {
            if (this.isValid) {
                this.$emit('continue');
            } else {
                alert('Please ensure all fields are properly configured before continuing.');
            }
        },
        
        goBack() {
            this.$emit('back');
        },
        
        areFieldsEqual(a, b) {
            if (!a || !b) return false;
            if (a.length !== b.length) return false;
            
            // Simple comparison - for deep comparison you'd need a more complex approach
            return JSON.stringify(a) === JSON.stringify(b);
        }
    },

    created() {
        // Initialize fields from form data if they exist
        if (this.formData.managedFieldContracts && this.formData.managedFieldContracts.length > 0) {
            this.managedFields = JSON.parse(JSON.stringify(this.formData.managedFieldContracts));
        } else {
            this.addManagedField(); // Start with one empty field
        }

        if (this.formData.clientFieldContracts && this.formData.clientFieldContracts.length > 0) {
            this.clientFields = JSON.parse(JSON.stringify(this.formData.clientFieldContracts));
        } else {
            this.addClientField(); // Start with one empty field
        }
    },
    
    watch: {
        'formData.managedFieldContracts': {
            handler(newFields) {
                if (newFields && !this.areFieldsEqual(newFields, this.managedFields)) {
                    this.managedFields = JSON.parse(JSON.stringify(newFields));
                }
            },
            deep: true
        },
        'formData.clientFieldContracts': {
            handler(newFields) {
                if (newFields && !this.areFieldsEqual(newFields, this.clientFields)) {
                    this.clientFields = JSON.parse(JSON.stringify(newFields));
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
    max-width: 1000px;
    margin: 0 auto;
}

.form-content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.fields-section {
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

.add-btn {
    background: #017291;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
}

.fields-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.field-item {
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 1rem;
    display: flex;
    gap: 1rem;
}

.field-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.field-row {
    display: flex;
    gap: 1rem;
}

.field-input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.9rem;
}

.field-options {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.remove-btn {
    padding: 0.25rem 0.5rem;
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    align-self: flex-start;
}

.keyword-values {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.keyword-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.keyword-tag {
    background: #e9ecef;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.remove-tag {
    background: none;
    border: none;
    color: #666;
    cursor: pointer;
    padding: 0 0.25rem;
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