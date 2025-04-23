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
              <span>{{ formData.hasInternationalData ? "Yes" : "No" }}</span>
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
            <div
              v-for="policyId in formData.lifeCycleManagementPolicyIds"
              :key="policyId"
              class="policy-item"
            >
              {{ policyId }}
            </div>
            <div
              v-if="
                !formData.lifeCycleManagementPolicyIds ||
                formData.lifeCycleManagementPolicyIds.length === 0
              "
              class="empty-message"
            >
              No policies selected
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
                <div
                  v-for="producer in formData.datasetProducers"
                  :key="producer"
                  class="channel-item"
                >
                  {{ producer }}
                </div>
                <div
                  v-if="
                    !formData.datasetProducers ||
                    formData.datasetProducers.length === 0
                  "
                  class="empty-message"
                >
                  No producers selected
                </div>
              </div>
            </div>
            <div class="channel-section">
              <h4>Consumers</h4>
              <div class="channel-list">
                <div
                  v-for="consumer in formData.datasetConsumers"
                  :key="consumer"
                  class="channel-item"
                >
                  {{ consumer }}
                </div>
                <div
                  v-if="
                    !formData.datasetConsumers ||
                    formData.datasetConsumers.length === 0
                  "
                  class="empty-message"
                >
                  No consumers selected
                </div>
              </div>
            </div>
            <div class="channel-section">
              <h4>Data Sources</h4>
              <div class="channel-list">
                <div
                  v-for="source in formData.dataSources"
                  :key="source"
                  class="channel-item"
                >
                  {{ source }}
                </div>
                <div
                  v-if="
                    !formData.dataSources || formData.dataSources.length === 0
                  "
                  class="empty-message"
                >
                  No data sources selected
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
                  <tr
                    v-for="field in formData.managedFieldContracts"
                    :key="field.fieldName"
                  >
                    <td>{{ field.fieldName }}</td>
                    <td>{{ field.fieldType }}</td>
                    <td>{{ field.isRequired ? "Yes" : "No" }}</td>
                    <td>{{ field.isFieldTokenized ? "Yes" : "No" }}</td>
                  </tr>
                  <tr
                    v-if="
                      !formData.managedFieldContracts ||
                      formData.managedFieldContracts.length === 0
                    "
                  >
                    <td colspan="4" class="empty-message">
                      No managed fields defined
                    </td>
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
                  <tr
                    v-for="field in formData.clientFieldContracts"
                    :key="field.fieldName"
                  >
                    <td>{{ field.fieldName }}</td>
                    <td>{{ field.fieldType }}</td>
                    <td>{{ field.isRequired ? "Yes" : "No" }}</td>
                  </tr>
                  <tr
                    v-if="
                      !formData.clientFieldContracts ||
                      formData.clientFieldContracts.length === 0
                    "
                  >
                    <td colspan="3" class="empty-message">
                      No client fields defined
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <div class="form-buttons">
        <button class="back-btn" @click="goBack">Back</button>
        <button
          class="submit-btn"
          @click="submitDataset"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? "Submitting..." : "Submit Dataset" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import datasetService from "../../../services/dataset.api";

export default {
  name: "AdminGDRStep5",

  props: {
    formData: {
      type: Object,
      required: true,
    },
    datasetId: {
      type: [String, Number],
      default: null,
    },
  },

  emits: ["back"],

  setup(props) {
    const router = useRouter();
    const isSubmitting = ref(false);
    const errorMessage = ref("");

    const asArray = (val) => {
      if (Array.isArray(val)) return val;
      if (typeof val === "string") {
        try {
          const parsed = JSON.parse(val);
          return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
          return [];
        }
      }
      return [];
    };

    const mapServerToForm = (d) => ({
      dataset_id: d.dataset_id,
      datasetName: d.dataset_name,
      description: d.description,
      lineOfBusiness: d.line_of_business,
      managingDataSteward: d.managing_data_steward,
      performingDataSteward: d.performing_data_steward,
      accountableExecutive: d.accountable_executive,
      hasInternationalData: d.has_international_data,

      lifeCycleManagementPolicyIds: asArray(d.life_cycle_management_policy_ids),
      datasetProducers: asArray(d.dataset_producers),
      datasetConsumers: asArray(d.dataset_consumers),
      dataSources: asArray(d.data_sources),
      managedFieldContracts: asArray(d.managed_field_contracts),
      clientFieldContracts: asArray(d.client_field_contracts),
    });

    onMounted(async () => {
      // Validate all required fields are present
      if (props.datasetId) {
        // pull the saved draft from the API and copy it into the reactive formData
        const existing = await datasetService.getDatasetById(props.datasetId);
        Object.assign(props.formData, mapServerToForm(existing));
      }
      validateForm();
    });

    const validateForm = () => {
      // Basic validation to ensure all required fields are present
      const requiredFields = [
        "datasetName",
        "description",
        "lineOfBusiness",
        "managingDataSteward",
        "performingDataSteward",
        "accountableExecutive",
      ];

      for (const field of requiredFields) {
        if (!props.formData[field]) {
          errorMessage.value = `Missing required information: ${field}. Please go back and complete all required fields.`;
          return false;
        }
      }

      // Validate policy selection
      if (
        !props.formData.lifeCycleManagementPolicyIds ||
        props.formData.lifeCycleManagementPolicyIds.length === 0
      ) {
        errorMessage.value =
          "Please select at least one lifecycle management policy.";
        return false;
      }

      // Validate channel selection
      if (
        !props.formData.datasetProducers ||
        props.formData.datasetProducers.length === 0
      ) {
        errorMessage.value = "Please select at least one producer.";
        return false;
      }

      if (
        !props.formData.datasetConsumers ||
        props.formData.datasetConsumers.length === 0
      ) {
        errorMessage.value = "Please select at least one consumer.";
        return false;
      }

      if (
        !props.formData.dataSources ||
        props.formData.dataSources.length === 0
      ) {
        errorMessage.value = "Please select at least one data source.";
        return false;
      }

      // Validate fields
      if (
        !props.formData.managedFieldContracts ||
        props.formData.managedFieldContracts.length === 0
      ) {
        errorMessage.value = "Please define at least one managed field.";
        return false;
      }

      if (
        !props.formData.clientFieldContracts ||
        props.formData.clientFieldContracts.length === 0
      ) {
        errorMessage.value = "Please define at least one client field.";
        return false;
      }

      // All validation passed
      errorMessage.value = "";
      return true;
    };

    const goToStep = (stepNumber) => {
      router.push(`/admin/datasets/register/steps/${stepNumber}`);
    };

    const goBack = () => {
      router.push(`/admin/datasets/register/steps/4`);
    };

    const submitDataset = async () => {
      // Final validation before submission
      if (!validateForm()) {
        return;
      }

      if (
        !confirm("Are you sure you want to submit this dataset for review?")
      ) {
        return;
      }

      errorMessage.value = "";
      isSubmitting.value = true;

      try {
        // First, save the dataset as a draft to ensure all data is up-to-date
        const saveResponse = await datasetService.saveDatasetDraft(
          props.formData
        );

        // Get dataset ID from response or use existing one
        const datasetId = saveResponse.dataset_id || props.formData.dataset_id;

        if (!datasetId) {
          throw new Error("Failed to create or retrieve dataset ID");
        }

        // Submit the dataset for review
        await datasetService.submitDataset(datasetId);

        // Clear localStorage data
        localStorage.removeItem("datasetFormData");

        alert("Dataset submitted successfully for review!");
        router.push("/admin/datasets");
      } catch (error) {
        console.error("Error submitting dataset:", error);
        errorMessage.value =
          error.response?.data?.message ||
          error.message ||
          "An unknown error occurred";
        alert(`Error submitting dataset: ${errorMessage.value}`);
      } finally {
        isSubmitting.value = false;
      }
    };

    return {
      isSubmitting,
      errorMessage,
      goToStep,
      submitDataset,
      goBack,
      validateForm,
    };
  },
};
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

.policy-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.policy-item {
  padding: 0.5rem 1rem;
  background: #f8f9fa;
  border-radius: 4px;
}

.empty-message {
  text-align: center;
  padding: 0.5rem;
  color: #888;
  font-style: italic;
}

.error-message {
  color: #dc3545;
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  text-align: center;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  gap: 1rem;
}

.back-btn,
.submit-btn {
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

.fields-section {
  margin-top: 1.5rem;
}

.fields-section h4 {
  margin-bottom: 1rem;
  color: #666;
}
</style>
