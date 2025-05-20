-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: capstonedb.cgdg0a806s8r.us-east-1.rds.amazonaws.com    Database: capstonedb
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `datasets`
--

DROP TABLE IF EXISTS `datasets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `datasets` (
  `dataset_id` varchar(255) NOT NULL,
  `dataset_version` varchar(50) DEFAULT NULL,
  `dataset_name` varchar(255) DEFAULT NULL,
  `line_of_business` varchar(100) DEFAULT NULL,
  `description` text,
  `has_international_data` tinyint(1) DEFAULT NULL,
  `accountable_executive` varchar(255) DEFAULT NULL,
  `performing_data_steward` varchar(255) DEFAULT NULL,
  `managing_data_steward` varchar(255) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `managed_field_contracts` json DEFAULT NULL,
  `client_field_contracts` json DEFAULT NULL,
  `dataset_producers` json DEFAULT NULL,
  `dataset_consumers` json DEFAULT NULL,
  `data_sources` json DEFAULT NULL,
  `life_cycle_management_policy_ids` json DEFAULT NULL,
  PRIMARY KEY (`dataset_id`),
  CONSTRAINT `datasets_chk_1` CHECK ((`status` in (_utf8mb4'DRAFT',_utf8mb4'COMPLETED',_utf8mb4'PENDING_REVIEW')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `datasets`
--

LOCK TABLES `datasets` WRITE;
/*!40000 ALTER TABLE `datasets` DISABLE KEYS */;
INSERT INTO `datasets` VALUES ('0c017ea7-bf50-448d-ba51-26aafe3301e6','1.0','US CPI Trends Monthly','commercial','Consumer Price Index trends segmented by category and region.',0,'US CPI Trends Monthly@gmail.com','US CPI Trends Monthly@gmail.com','US CPI Trends Monthly@gmail.com','COMPLETED','[{\"fieldName\": \"42\", \"fieldType\": \"Number\", \"dateFormat\": \"\", \"isRequired\": false, \"keywordInput\": \"\", \"keywordValues\": [], \"isFieldTokenized\": false}]','[{\"fieldName\": \"21\", \"fieldType\": \"Number\", \"dateFormat\": \"\", \"isRequired\": false}]','[\"fraud-detection\"]','[\"fraud-team\"]','[\"customer-portal\"]','[\"FRAUD_MONITORING\"]'),('0deee7fd-7591-435c-9b02-c615bdc8f4f1','1.0','Regulatory Documentation for Access','compliance','Provides records of regulatory documents required for accessing controlled or restricted locations/information, including compliance certifications, access agreements, and relevant approvals. It supports tracking of documentation status and ensures that data access aligns with institutional, legal, and regulatory requirements',0,'regulation@manager.com','regulation@user.com','regulation@admin.com','PENDING_REVIEW','[{\"fieldName\": \"Requested permits\", \"fieldType\": \"Number\", \"dateFormat\": \"\", \"isRequired\": true, \"keywordInput\": \"\", \"keywordValues\": [], \"isFieldTokenized\": false}, {\"fieldName\": \"Business tags\", \"fieldType\": \"Keyword\", \"dateFormat\": \"\", \"isRequired\": false, \"keywordInput\": \"\", \"keywordValues\": [\"IT Support Team\", \"Financial Management\"], \"isFieldTokenized\": false}]','[{\"fieldName\": \"User identification token\", \"fieldType\": \"Number\", \"dateFormat\": \"\", \"isRequired\": false}]','[\"doc-processing\", \"fraud-detection\"]','[\"compliance-team\", \"fraud-team\"]','[\"doc-upload\", \"customer-portal\"]','[\"KYC_DOCUMENT_WORKFLOW_GALLERY\", \"PII_DATA_PROTECTION\", \"FRAUD_MONITORING\"]'),('636fa4cd-0530-495d-b5c7-e780f2bfe191','1.0','Customer Insights Q2 2025','commercial','Quarterly dataset containing anonymized customer interactions, purchase history, and behavioral analytics across digital channels.',1,'jamie.lin@datacorp.com','alex.morgan@datacorp.com','Consumer Marketinbbbbg','PENDING_REVIEW','[{\"fieldName\": \"Route tracking number\", \"fieldType\": \"Number\", \"dateFormat\": \"\", \"isRequired\": true, \"keywordInput\": \"\", \"keywordValues\": [], \"isFieldTokenized\": true}]','[{\"fieldName\": \"Client Account Setup\", \"fieldType\": \"Date\", \"dateFormat\": \"\", \"isRequired\": true}]','[\"doc-processing\"]','[\"compliance-team\"]','[\"doc-upload\"]','[\"KYC_DOCUMENT_WORKFLOW_GALLERY\", \"GOVT_ID_WORKFLOW_GALLERY\", \"FRAUD_MONITORING\"]'),('65581d16-4844-4a61-895e-5681505d8326','1.0','Customer360_Master','compliance','A consolidated view of customer profiles combining data from CRM, e-commerce, and support channels to provide a 360-degree perspective for personalized marketing and service delivery.',0,'michael.johnson@datacorp.com','elena.martinez@datacorp.com','jordan.smith@datacorp.com','PENDING_REVIEW','[{\"fieldName\": \"personalized marketing\", \"fieldType\": \"String\", \"dateFormat\": \"\", \"isRequired\": false, \"keywordInput\": \"support help\", \"keywordValues\": [], \"isFieldTokenized\": false}]','[{\"fieldName\": \"Client Contact\", \"fieldType\": \"String\", \"dateFormat\": \"\", \"isRequired\": true}]','[\"fraud-detection\"]','[\"compliance-team\", \"fraud-team\"]','[\"customer-portal\"]','[\"GOVT_ID_WORKFLOW_GALLERY\", \"FRAUD_MONITORING\"]'),('7620ce3b-c9bc-4724-8900-21c0f53be038','1.0','Unfinished Draft Dataset','retail','Hello this is a Unfinished Draft Dataset',0,'Unfinished Draft Dataset','Unfinished Draft Dataset','Unfinished Draft Dataset','DRAFT','[{\"fieldName\": \"123\", \"fieldType\": \"Number\", \"dateFormat\": \"\", \"isRequired\": false, \"keywordInput\": \"\", \"keywordValues\": [], \"isFieldTokenized\": false}]','[{\"fieldName\": \"123\", \"fieldType\": \"Number\", \"dateFormat\": \"\", \"isRequired\": false}]','[\"fraud-detection\"]','[\"fraud-team\"]','[\"doc-upload\"]','[\"PII_DATA_PROTECTION\"]'),('827d8082-4ea3-4753-b3cc-283c9c6a6889','1.0','Safety Inspections & Prevention Success','risk','Documents safety inspections, identified hazards, and corrective actions across multiple facilities. Also tracks the effectiveness of prevention measures to evaluate improvements in workplace safety over time.',0,'riskcompliance@manager.com','riskcompliance@user.com','riskcompliance@admin.com','PENDING_REVIEW','[{\"fieldName\": \"Successful preventions\", \"fieldType\": \"Number\", \"dateFormat\": \"\", \"isRequired\": true, \"keywordInput\": \"\", \"keywordValues\": [], \"isFieldTokenized\": false}, {\"fieldName\": \"Percentage of safety success\", \"fieldType\": \"Number\", \"dateFormat\": \"\", \"isRequired\": false, \"keywordInput\": \"\", \"keywordValues\": [], \"isFieldTokenized\": false}]','[{\"fieldName\": \"Prevention attempts\", \"fieldType\": \"Number\", \"dateFormat\": \"\", \"isRequired\": false}]','[\"doc-processing\"]','[\"compliance-team\"]','[\"doc-upload\"]','[\"GOVT_ID_WORKFLOW_GALLERY\", \"PII_DATA_PROTECTION\", \"KYC_DOCUMENT_WORKFLOW_GALLERY\"]'),('986136eb-973c-43ff-9e24-c27411cc33e8','1.0','State Unemployment Rate(s)','risk','Monthly unemployment rates reported by the Bureau of Labor Statistics.',0,'needAJob@gmail.com','needAJob@gmail.com','needAJob@gmail.com','COMPLETED','[{\"fieldName\": \"true\", \"fieldType\": \"Boolean\", \"dateFormat\": \"\", \"isRequired\": false, \"keywordInput\": \"\", \"keywordValues\": [], \"isFieldTokenized\": false}]','[{\"fieldName\": \"false\", \"fieldType\": \"Boolean\", \"dateFormat\": \"\", \"isRequired\": false}]','[\"doc-processing\"]','[\"compliance-team\"]','[\"doc-upload\"]','[\"GOVT_ID_WORKFLOW_GALLERY\"]'),('9c1ed6cf-e692-4dbe-97f1-0935f08e8a07','1.0','API Latency Report – Global','commercial','Latency metrics collected from edge locations across 12 countries.',0,'API@gmail.com','API@gmail.com','API@gmail.com','COMPLETED','[{\"fieldName\": \"keyword\", \"fieldType\": \"Keyword\", \"dateFormat\": \"\", \"isRequired\": false, \"keywordInput\": \"\", \"keywordValues\": [\"this is key\"], \"isFieldTokenized\": false}]','[{\"fieldName\": \"are you serious\", \"fieldType\": \"String\", \"dateFormat\": \"\", \"isRequired\": false}]','[\"fraud-detection\"]','[\"compliance-team\"]','[\"doc-upload\"]','[\"KYC_DOCUMENT_WORKFLOW_GALLERY\", \"GOVT_ID_WORKFLOW_GALLERY\"]'),('b1cff7ca-0130-4bdd-a433-6d515b79c51f','1.0','2025 US Census Data','retail','Population demographics by state, race, and age group.',0,'123@gmail.com','123@gmail.com','123@gmail.com','PENDING_REVIEW','[{\"fieldName\": \"123\", \"fieldType\": \"Number\", \"dateFormat\": \"\", \"isRequired\": false, \"keywordInput\": \"\", \"keywordValues\": [], \"isFieldTokenized\": false}]','[{\"fieldName\": \"123\", \"fieldType\": \"Number\", \"dateFormat\": \"\", \"isRequired\": false}]','[\"doc-processing\"]','[\"fraud-team\"]','[\"doc-upload\"]','[\"KYC_DOCUMENT_WORKFLOW_GALLERY\"]'),('b9c87a58-2410-4e22-a567-4fb93ee8475f','1.0','Web Traffic Logs – Q1 2025','compliance','Aggregated session and user data from an e-commerce platform.',1,'WebTrafficLogs@gmail.com','WebTrafficLogs@gmail.com','WebTrafficLogs@gmail.com','COMPLETED','[{\"fieldName\": \"String\", \"fieldType\": \"String\", \"dateFormat\": \"\", \"isRequired\": false, \"keywordInput\": \"\", \"keywordValues\": [], \"isFieldTokenized\": false}]','[{\"fieldName\": \"String\", \"fieldType\": \"String\", \"dateFormat\": \"\", \"isRequired\": false}]','[\"doc-processing\"]','[\"compliance-team\"]','[\"doc-upload\"]','[\"FRAUD_MONITORING\"]'),('bdb76d52-9728-4cd3-aaa4-77b803b72e6b','1.0','Air Quality Index – 2026','compliance','Daily AQI data including PM2.5, PM10, and ozone levels.',0,'AirQualityIndex@gmail.com','AirQualityIndex@gmail.com','AirQualityIndex@gmail.com','COMPLETED','[{\"fieldName\": \"123\", \"fieldType\": \"Number\", \"dateFormat\": \"\", \"isRequired\": false, \"keywordInput\": \"\", \"keywordValues\": [], \"isFieldTokenized\": false}]','[{\"fieldName\": \"321\", \"fieldType\": \"Number\", \"dateFormat\": \"\", \"isRequired\": false}]','[\"fraud-detection\"]','[\"compliance-team\"]','[\"doc-upload\"]','[\"KYC_DOCUMENT_WORKFLOW_GALLERY\", \"GOVT_ID_WORKFLOW_GALLERY\"]'),('d748f7a2-f5ba-434c-87f9-094df84c6a4b','1.0','S&P 500 Daily Prices','commercial','Historical closing prices and volumes of S&P 500 companies.',0,'StockMarketExec@gmail.com','StockMarketAdmin@gmail.com','StockMarket@gmail.com','COMPLETED','[{\"fieldName\": \"21\", \"fieldType\": \"Number\", \"dateFormat\": \"\", \"isRequired\": false, \"keywordInput\": \"\", \"keywordValues\": [], \"isFieldTokenized\": false}]','[{\"fieldName\": \"42\", \"fieldType\": \"Number\", \"dateFormat\": \"\", \"isRequired\": false}]','[\"fraud-detection\", \"doc-processing\"]','[\"compliance-team\", \"fraud-team\"]','[\"customer-portal\", \"doc-upload\"]','[\"GOVT_ID_WORKFLOW_GALLERY\", \"PII_DATA_PROTECTION\"]'),('f7669e88-5878-4cef-8bbd-8931cdb379ac','1.0','Another Test','commercial','Another Test',0,'Another Test','Another Test','Another Test','PENDING_REVIEW','[{\"fieldName\": \"123\", \"fieldType\": \"Number\", \"dateFormat\": \"\", \"isRequired\": false, \"keywordInput\": \"\", \"keywordValues\": [], \"isFieldTokenized\": false}]','[{\"fieldName\": \"123\", \"fieldType\": \"Number\", \"dateFormat\": \"\", \"isRequired\": false}]','[\"fraud-detection\"]','[\"compliance-team\"]','[\"doc-upload\"]','[\"KYC_DOCUMENT_WORKFLOW_GALLERY\", \"GOVT_ID_WORKFLOW_GALLERY\"]');
/*!40000 ALTER TABLE `datasets` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-20 16:31:55
