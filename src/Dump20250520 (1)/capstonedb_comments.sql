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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `dataset_id` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  `comment_text` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  KEY `fk_dataset` (`dataset_id`),
  KEY `fk_user` (`user_id`),
  CONSTRAINT `fk_dataset` FOREIGN KEY (`dataset_id`) REFERENCES `datasets` (`dataset_id`),
  CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'636fa4cd-0530-495d-b5c7-e780f2bfe191',5,'The customer is always right!','2025-04-25 02:31:49'),(2,'65581d16-4844-4a61-895e-5681505d8326',2,'All of the customers are all always right','2025-04-25 02:57:00'),(3,'d748f7a2-f5ba-434c-87f9-094df84c6a4b',2,'Love the growth as of late!','2025-04-25 02:57:39'),(4,'b9c87a58-2410-4e22-a567-4fb93ee8475f',2,'Now that\'s a lot of web traffic!!','2025-04-25 02:58:10'),(5,'827d8082-4ea3-4753-b3cc-283c9c6a6889',2,'Nice try guy, this didn\'t pass safety inspection. Will not approve until this actually passes...','2025-04-25 02:58:35'),(6,'9c1ed6cf-e692-4dbe-97f1-0935f08e8a07',2,'Now that is a lot of latency!','2025-04-25 03:00:13'),(8,'bdb76d52-9728-4cd3-aaa4-77b803b72e6b',2,'Keeping an eye on this, we are still in 2025 right now...','2025-04-25 03:27:33'),(9,'0deee7fd-7591-435c-9b02-c615bdc8f4f1',2,'Hello nice job! Could use a few more details...','2025-05-07 00:06:22'),(10,'0deee7fd-7591-435c-9b02-c615bdc8f4f1',2,'doable comments','2025-05-07 00:06:44');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
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

-- Dump completed on 2025-05-20 16:31:54
