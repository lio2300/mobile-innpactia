-- MySQL dump 10.13  Distrib 8.0.28, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: mobile_repair
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `pk_client` bigint NOT NULL AUTO_INCREMENT,
  `client_dni` varchar(100) DEFAULT NULL,
  `client_firstname` varchar(150) DEFAULT NULL,
  `client_lastname` varchar(150) DEFAULT NULL,
  `client_address` text,
  `client_reference` varchar(50) DEFAULT NULL,
  `client_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`pk_client`),
  UNIQUE KEY `client_pk_client_uindex` (`pk_client`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

--
-- Table structure for table `mobile`
--

DROP TABLE IF EXISTS `mobile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mobile` (
  `pk_mobile` bigint NOT NULL AUTO_INCREMENT,
  `mobile_marca` varchar(200) DEFAULT NULL,
  `mobile_model` varchar(200) DEFAULT NULL,
  `mobile_year` varchar(10) DEFAULT NULL,
  `mobile_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `mobile_color` varchar(100) DEFAULT NULL,
  `mobile_inch` int DEFAULT NULL,
  `mobile_IMEI` text,
  `fk_client` bigint DEFAULT NULL,
  PRIMARY KEY (`pk_mobile`),
  UNIQUE KEY `mobile_pk_mobile_uindex` (`pk_mobile`),
  KEY `mobile_client_pk_client_fk` (`fk_client`),
  CONSTRAINT `mobile_client_pk_client_fk` FOREIGN KEY (`fk_client`) REFERENCES `client` (`pk_client`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mobile`
--

--
-- Table structure for table `repair`
--

DROP TABLE IF EXISTS `repair`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `repair` (
  `pk_repair` bigint NOT NULL AUTO_INCREMENT,
  `repair_ingr` date DEFAULT NULL,
  `repair_sali` date DEFAULT NULL,
  `repair_desc_ingr` text,
  `repair_desc_sali` text,
  `fk_mobile` bigint DEFAULT NULL,
  PRIMARY KEY (`pk_repair`),
  UNIQUE KEY `repair_pk_repair_uindex` (`pk_repair`),
  KEY `repair_mobile_pk_mobile_fk` (`fk_mobile`),
  CONSTRAINT `repair_mobile_pk_mobile_fk` FOREIGN KEY (`fk_mobile`) REFERENCES `mobile` (`pk_mobile`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `repair`
--

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `pk_user` bigint NOT NULL AUTO_INCREMENT,
  `user_nick` varchar(200) DEFAULT NULL,
  `user_firstname` varchar(150) DEFAULT NULL,
  `user_lastname` varchar(150) DEFAULT NULL,
  `user_pass` varchar(200) DEFAULT NULL,
  `user_email` varchar(200) DEFAULT NULL,
  `user_phone` varchar(20) DEFAULT NULL,
  `user_address` text,
  `user_role` char(1) DEFAULT 'A',
  `user_fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`pk_user`),
  UNIQUE KEY `user_pk_user_uindex` (`pk_user`),
  UNIQUE KEY `user_user_email_uindex` (`user_email`),
  UNIQUE KEY `user_user_nick_uindex` (`user_nick`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-24 18:48:10
