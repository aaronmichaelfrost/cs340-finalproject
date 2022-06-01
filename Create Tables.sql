DROP TABLE IF EXISTS `Orders`;

CREATE TABLE IF NOT EXISTS `Orders` (

	`orderId` int(11) NOT NULL AUTO_INCREMENT,

	`date` dateTime NOT NULL,
    
	`customerID` int(9) NOT NULL,    

	PRIMARY KEY (`orderId`),

	FOREIGN KEY (`customerId`) REFERENCES `Customer` (`customerId`)

) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `OrderProducts`;

CREATE TABLE IF NOT EXISTS `OrderProducts` (

	`orderProductId` int(11) NOT NULL AUTO_INCREMENT,

	`orderId` int(11) NOT NULL,
    
	`productId` int(11) NOT NULL,   

	PRIMARY KEY (`orderProductId`), 

	FOREIGN KEY (`orderId`) REFERENCES `Orders` (`orderId`),
    
	FOREIGN KEY (`productId`) REFERENCES `Products` (`productId`)

) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS Customers;
/!40101 SET @saved_cs_client     = @@character_set_client/;
/!40101 SET character_set_client = utf8/;
CREATE TABLE Customers (
  customerId int(9) NOT NULL AUTO_INCREMENT,
  email varchar(255) NOT NULL,
  cell int(10),
  firstName varchar(255),
  lastName varchar(255),
  birthDate datetime,

  PRIMARY KEY (customerId),
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;
/!40101 SET character_set_client = @saved_cs_client/;


DROP TABLE IF EXISTS Products;
/!40101 SET @saved_cs_client     = @@character_set_client/;
/!40101 SET character_set_client = utf8/;
CREATE TABLE Products (
  productId int(9) NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  price dec(unsigned),
  PRIMARY KEY (productId),
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;
/!40101 SET character_set_client = @saved_cs_client/;


