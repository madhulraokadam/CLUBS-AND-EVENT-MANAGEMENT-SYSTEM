-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: clubandevents
-- ------------------------------------------------------
-- Server version	5.7.44-log

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

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `Student_id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Department` varchar(50) NOT NULL,
  `Phone_no` varchar(15) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `Semester` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`Student_id`),
  UNIQUE KEY `Email` (`Email`),
  UNIQUE KEY `Phone_no` (`Phone_no`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1,'Likita G','likita@gmail.com','CSE','5632154987',2,'4'),(3,'arya','aya@gmail.com','DS','12345678',NULL,'4'),(101,'Sanjita G','sanjita@cmru.ac.in','CSE','9876543210',1,'4'),(102,'Madhu Kadam','madhu@cmru.ac.in','AIML','8765432109',13,'3'),(103,'Jyothsna','jyothsna@cmru.ac.in','DS','7654321098',3,'5'),(104,'Nitish','nitish@cmru.ac.in','IT','6543210987',4,'2'),(105,'Kireeti Reddy','kireeti@cmru.ac.in','ECE','9432109876',5,'6'),(106,'Kunal Tiwari','kunal@cmru.ac.in','CSE','8321098765',6,'3'),(107,'Abhiram','abhiram@cmru.ac.in','AIML','7210987654',7,'1'),(108,'Samarthya','samarthya@cmru.ac.in','DS','6109876543',8,'7'),(109,'Rohit Mehta','rohit@cmru.ac.in','IT','5098765432',9,'4'),(110,'Priya Singh','priya@cmru.ac.in','ECE','4987654321',10,'5'),(111,'Sophia Khan','sophia@cmru.ac.in','CSE','3876543210',11,'2'),(112,'Megha Kapoor','megha@cmru.ac.in','AIML','2765432109',12,'8');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-10 14:37:49
