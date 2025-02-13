const mockData = {
    "consumers": [
      {
        "consumerId": "c8a7d956-1e23-4f67-b847-9c2481c3b5d1",
        "consumerName": "fraud-detection-team",
        "isDevexClient": true,
        "consumerDescription": "Fraud Detection and Analysis Team",
        "consumes": [
          "customer-kyc-dataset",
          "transaction-monitoring-dataset"
        ]
      },
      {
        "consumerId": "95b32cf1-8d34-4a12-9f56-d23a98b7c3e4",
        "consumerName": "risk-assessment-unit",
        "isDevexClient": true,
        "consumerDescription": "Risk Assessment and Compliance Unit",
        "consumes": [
          "customer-kyc-dataset"
        ]
      }
    ],
    
    "producers": [
      {
        "producerId": "7f9e4d21-6a85-4b39-ae12-c45d8f2e3b1a",
        "producerName": "document-processing-team",
        "isDevexClient": true,
        "producerDescription": "Document Processing and Validation Team",
        "produces": [
          "customer-kyc-dataset"
        ]
      },
      {
        "producerId": "3e2b1c8a-9f76-4d23-b567-a12c3d4e5f6b",
        "producerName": "transaction-monitoring-system",
        "isDevexClient": true,
        "producerDescription": "Transaction Monitoring and Alert System",
        "produces": [
          "transaction-monitoring-dataset"
        ]
      }
    ],
  
    "dataSources": [
      {
        "dataSourceId": "4d5e6f7a-8b9c-4d2e-a1b2-c3d4e5f6a7b8",
        "dataSourceName": "document-upload-system",
        "dataSourceDescription": "Customer Document Upload and Processing System",
        "isDevexClient": true
      },
      {
        "dataSourceId": "1a2b3c4d-5e6f-7a8b-9c0d-e1f2a3b4c5d6",
        "dataSourceName": "transaction-processing-engine",
        "dataSourceDescription": "Real-time Transaction Processing and Monitoring Engine",
        "isDevexClient": true
      }
    ],
  
    "datasets": [
      {
        "datasetId": "9b8a7c6d-5e4f-3d2e-1a2b-c3d4e5f6a7b8",
        "datasetVersion": "2.1",
        "datasetName": "Customer KYC Dataset",
        "lineOfBusiness": "Retail Banking",
        "managedFieldContracts": [
          {
            "fieldName": "documentType",
            "fieldType": "Keyword",
            "dateFormat": null,
            "isFieldTokenized": false,
            "keywordValues": [
              "passport",
              "driversLicense",
              "nationalId",
              "utilityBill"
            ],
            "isRequired": true,
            "isMappedFromClientField": false,
            "mappedFromFieldName": null
          },
          {
            "fieldName": "documentStatus",
            "fieldType": "Keyword",
            "dateFormat": null,
            "isFieldTokenized": false,
            "keywordValues": [
              "pending",
              "approved",
              "rejected",
              "needsReview"
            ],
            "isRequired": true,
            "isMappedFromClientField": false,
            "mappedFromFieldName": null
          },
          {
            "fieldName": "documentDate",
            "fieldType": "Date",
            "dateFormat": "MM/dd/yyyy",
            "isFieldTokenized": false,
            "keywordValues": [],
            "isRequired": true,
            "isMappedFromClientField": false,
            "mappedFromFieldName": null
          }
        ],
        "clientFieldContracts": [
          {
            "fieldName": "customerName",
            "fieldType": "String",
            "dateFormat": null,
            "isFieldTokenized": true,
            "keywordValues": [],
            "isRequired": true
          },
          {
            "fieldName": "customerId",
            "fieldType": "String",
            "dateFormat": null,
            "isFieldTokenized": false,
            "keywordValues": [],
            "isRequired": true
          },
          {
            "fieldName": "documentNumber",
            "fieldType": "String",
            "dateFormat": null,
            "isFieldTokenized": false,
            "keywordValues": [],
            "isRequired": true
          },
          {
            "fieldName": "expirationDate",
            "fieldType": "Date",
            "dateFormat": "MM/dd/yyyy",
            "isFieldTokenized": false,
            "keywordValues": [],
            "isRequired": true
          }
        ],
        "datasetProducers": [
          "7f9e4d21-6a85-4b39-ae12-c45d8f2e3b1a"
        ],
        "datasetConsumers": [
          "c8a7d956-1e23-4f67-b847-9c2481c3b5d1",
          "95b32cf1-8d34-4a12-9f56-d23a98b7c3e4"
        ],
        "dataSources": [
          "4d5e6f7a-8b9c-4d2e-a1b2-c3d4e5f6a7b8"
        ],
        "lifeCycleManagementPolicyIds": [
          "KYC_DOCUMENT_RETENTION",
          "PII_DATA_PROTECTION"
        ],
        "accountableExecutive": "sarah.johnson@company.com",
        "performingDataSteward": "michael.chen@company.com",
        "managingDataSteward": "rachel.smith@company.com",
        "description": "Dataset containing customer KYC document information and verification status",
        "hasInternationalData": true,
        "managedFieldDetails": [],
        "clientFieldDetails": []
      },
      {
        "datasetId": "2c3d4e5f-6a7b-8c9d-0e1f-2a3b4c5d6e7f",
        "datasetVersion": "1.5",
        "datasetName": "Transaction Monitoring Dataset",
        "lineOfBusiness": "Fraud & Risk",
        "managedFieldContracts": [
          {
            "fieldName": "transactionType",
            "fieldType": "Keyword",
            "dateFormat": null,
            "isFieldTokenized": false,
            "keywordValues": [
              "withdrawal",
              "deposit",
              "transfer",
              "payment"
            ],
            "isRequired": true,
            "isMappedFromClientField": false,
            "mappedFromFieldName": null
          },
          {
            "fieldName": "riskLevel",
            "fieldType": "Keyword",
            "dateFormat": null,
            "isFieldTokenized": false,
            "keywordValues": [
              "low",
              "medium",
              "high",
              "critical"
            ],
            "isRequired": true,
            "isMappedFromClientField": false,
            "mappedFromFieldName": null
          }
        ],
        "clientFieldContracts": [
          {
            "fieldName": "transactionId",
            "fieldType": "String",
            "dateFormat": null,
            "isFieldTokenized": false,
            "keywordValues": [],
            "isRequired": true
          },
          {
            "fieldName": "amount",
            "fieldType": "Decimal",
            "dateFormat": null,
            "isFieldTokenized": false,
            "keywordValues": [],
            "isRequired": true
          },
          {
            "fieldName": "timestamp",
            "fieldType": "DateTime",
            "dateFormat": "yyyy-MM-dd'T'HH:mm:ss.SSSZ",
            "isFieldTokenized": false,
            "keywordValues": [],
            "isRequired": true
          }
        ],
        "datasetProducers": [
          "3e2b1c8a-9f76-4d23-b567-a12c3d4e5f6b"
        ],
        "datasetConsumers": [
          "c8a7d956-1e23-4f67-b847-9c2481c3b5d1"
        ],
        "dataSources": [
          "1a2b3c4d-5e6f-7a8b-9c0d-e1f2a3b4c5d6"
        ],
        "lifeCycleManagementPolicyIds": [
          "TRANSACTION_RETENTION",
          "FRAUD_MONITORING"
        ],
        "accountableExecutive": "david.wilson@company.com",
        "performingDataSteward": "jennifer.lee@company.com",
        "managingDataSteward": "robert.taylor@company.com",
        "description": "Dataset containing transaction monitoring and risk assessment data",
        "hasInternationalData": true,
        "managedFieldDetails": [],
        "clientFieldDetails": []
      }
    ]
};

module.exports = mockData;