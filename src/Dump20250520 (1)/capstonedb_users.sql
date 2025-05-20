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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'Alan','Dorn','dornn@vcu.edu','$2b$10$bxQMduDuCyuDr7HbcIDHsOzS3iIT99vXaDaq/p6r2iOO2BI25XyLy',1),(3,'Austin','Glass','glassal@vcu.edu','$2b$10$vPZjJRGLQF2MVlwzzSoYwuNq0f5e0XodYCdgYGp2MLJka8MRNab7W',1),(4,'Alan','Dorn','dornn2@vcu.edu','$2b$10$DeXp4V0zuUOUiYzWlEZ4se4YhXL.9hxthAF5NKqIKYC4AzUW7BO/O',0),(5,'Krish','Patel','patelkp7@vcu.edu','$2b$10$dk9hILbnwvSH1UmHKBE6de3sWK2nddlepE4VIqV/1c6zx1xKt6Qam',1),(6,'Rodbod','Bagheri','Rodbodbagheri@gmail.com','$2b$10$vFQ8BqnSgpb2S30M6MvHGeIDeTT91wTk.0TDhtRGMH.6G3GxwCT2O',0),(7,'Milo','Olim','herroitsnathankim@gmail.com','$2b$10$GC7gFhf9nKYY5KLjM1zqROs4N0v8cqplWut38BArP/CRl0k6jqKH6',0),(8,'Rodbod','Bagheri','jamavaj856@cotigz.com','$2b$10$ud5BHZfFb1SIbBU5HRl8EuGcCB/DVpn5NflyPmNyYprRR4gZPdcY.',0),(9,'Luke','Shadow','belcherje@vcu.edu','$2b$10$yt1Tst4U2/q8IeAAZy3ypuyJf8F1IgfLH0FpjTWbaAuI55EG5Pf4a',1),(10,'Akhil','Manoj','akhil.manoj2003@gmail.com','$2b$10$I95j9dzdsGj668on8KuO/erOq1HmrMDXWO1NL8XbCxxg/vQpzY4/q',0),(11,'shashank','sinha','shashank.wmr@gmail.com','$2b$10$aEFot31atRySHyghu0EoAO47k3OislAC2PMl1HRLPKELwyKiFVsy6',1),(12,'shsj','sosks','isksjd@gmail.com','$2b$10$f3jNPfF0OmXgexBxClWz1u.DZHzpyodZp3VLomGOZFcs2.cEMhNKS',0),(13,'C','C','cmc-castro@hotmail.com','$2b$10$rJ5VwkYTtW9e5rSR80BOYO7RXu4aDBMXYlLnHBdWoFk47Eel4XnKu',0),(14,'Omar','Amr','testemail@gmail.com','$2b$10$jc7OaOGJ.8JEoOS1UARF.OWUHH3Qor0k2wYlJeKSmr5cOCqsyHJG.',0),(15,'Jeremy','Wells','sskipperrr@gmail.com','$2b$10$mh6w9Pby82PV1g5SCOeQS.lmv5YYABU8e9SN.2muVA8lOltRlJRZW',0),(16,'Alex ','Jones','atjones080408@gmail.com','$2b$10$uw1tOBPvLTI8kmWsAg4uWuCkvQuPZSG5kkf6/lfnLez8RWgExdPVG',0),(17,'Gavin ','Provost ','dhdbejsh@gmail.com','$2b$10$NXzoLwAb2BmewPaQlJPIXuUvCMP2fmvlZfUGaQkSwVYNSCMhMM04q',0),(18,'Krish','Patel','patelkp8@vcu.edu','$2b$10$JUiy9HZMJxvCubiKGtS2l.DFKZhMbRo9r59k4oIhY6F1iZlrEjoDK',0),(19,'alan','alan','alan@alan.com','$2b$10$PY3CTEqqyfC6pGryJdO6EOkSxNuY6ocTD8eg0r6BlsDd7oUebZBEm',0),(20,'user','user','user@user.com','$2b$10$ddRxi4DLAN8oaOCFBUcAsuWoaFJ95Mk1BNLLVWiKUaSuVAUCztg0y',0),(26,'demo1','demo1','demo1@demo1.com','$2b$10$SXVa643gN/RjtYZpEvRlneTfx4HOkmWW8MRwE23xqO90Ma.oCzmxq',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
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
