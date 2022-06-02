
DROP TABLE IF EXISTS `OrderProducts`;
DROP TABLE IF EXISTS `Orders`;
DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Products;


SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE Customers (
  customerId int(9) NOT NULL AUTO_INCREMENT,
  email varchar(255) NOT NULL,
  cell int(10),
  firstName varchar(255),
  lastName varchar(255),
  birthDate date,

  PRIMARY KEY (customerId)
  ) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;


SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE Products (
  productId int(9) NOT NULL AUTO_INCREMENT,
  productName varchar(255) NOT NULL,
  price decimal(30,2) unsigned NOT NULL,
  PRIMARY KEY (productId)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;



CREATE TABLE IF NOT EXISTS `Orders` (

	`orderId` int(11) NOT NULL AUTO_INCREMENT,

	`date` dateTime NOT NULL,
    
	`customerID` int(9) NOT NULL,    

	PRIMARY KEY (`orderId`),

	FOREIGN KEY (`customerId`) REFERENCES `Customers` (`customerId`)

) ENGINE=InnoDB DEFAULT CHARSET=latin1;



CREATE TABLE IF NOT EXISTS `OrderProducts` (

	`orderProductId` int(11) NOT NULL AUTO_INCREMENT,

	`orderId` int(11) NOT NULL,
    
	`productId` int(11) NOT NULL,  

	PRIMARY KEY (`orderProductId`), 

	FOREIGN KEY (`orderId`) REFERENCES `Orders` (`orderId`),
    
	FOREIGN KEY (`productId`) REFERENCES `Products` (`productId`)

) ENGINE=InnoDB DEFAULT CHARSET=latin1;



DESCRIBE Products;
DESCRIBE Customers;
DESCRIBE OrderProducts;
DESCRIBE Orders;

LOCK TABLES Customers WRITE;

INSERT INTO Customers VALUES (1,'hello@gmail.com','541777444','John','Oranu','2001-12-11'),
(2,'hello@gmail.com','534777444','Mike','Oranu','2001-12-11'),
(3,'hello@gmail.com','541342444','Peter','Hemsworth','2001-12-11');

UNLOCK TABLES;

LOCK TABLES Products WRITE;

INSERT INTO Products VALUES (1,'survival game','22.99'),
(2,'horror game','33.99'),
(3,'racing game','44.99');

UNLOCK TABLES;

INSERT INTO Orders (date, customerId) VALUES (
	'2000-01-01 10:45:23',
    (SELECT customerId FROM Customers WHERE email='hello@gmail.com' AND cell='541777444' AND  firstName='John' AND lastName='Oranu')
);
INSERT INTO Orders (date, customerId) VALUES (
	'2005-02-10 10:45:23',
	(SELECT customerId FROM Customers WHERE email='hello@gmail.com' AND cell='534777444' AND  firstName='Mike' AND lastName='Oranu')
);
INSERT INTO Orders (date, customerId) VALUES (
	'2009-03-20 10:45:23',
	(SELECT customerId FROM Customers WHERE email='hello@gmail.com' AND cell='541342444' AND  firstName='Peter' AND lastName='Hemsworth')
);

INSERT INTO OrderProducts (orderId, productId, quantity) VALUES (
	(SELECT orderId FROM Orders WHERE date='2000-01-01 10:45:23' AND customerId='1'),
	(SELECT productId FROM Products WHERE productName='survival game' AND price='29.99')
);
INSERT INTO OrderProducts (orderId, productId, quantity) VALUES (
	(SELECT orderId FROM Orders WHERE date='2005-02-10 10:45:23' AND customerId='2'),
	(SELECT productId FROM Products WHERE productName='horror game' AND price='33.99')
);
INSERT INTO OrderProducts (orderId, productId, quantity) VALUES (
	(SELECT orderId FROM Orders WHERE date='2009-03-20 10:45:23' AND customerId='3'),
	(SELECT productId FROM Products WHERE productName='racing game' AND price='44.99')
);