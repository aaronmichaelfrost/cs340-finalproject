LOCK TABLES Customers WRITE;

INSERT INTO Customers VALUES ('1','hello@gmail.com','541777444','John','Oranu'),
(2,'hello@gmail.com','534777444','Mike','Oranu'),
(3,'hello@gmail.com','541342444','Peter','Hemsworth');

UNLOCK TABLES;

LOCK TABLES Products WRITE;

INSERT INTO Products VALUES (1,'survival game',22.99),
(2,'horror game',33.99),
(3,'racing game',44.99);

UNLOCK TABLES;

INSERT INTO Orders (date, customerId) VALUES (
	'2000-01-01 10:45:23',
    (SELECT customerId FROM Customer WHERE email='hello@gmail.com' AND cell='541777444' AND  firstName='John' AND lastName='Oranu')
);
INSERT INTO Orders (date, customerId) VALUES (
	'2005-02-10 10:45:23',
	(SELECT customerId FROM Customer WHERE email='hello@gmail.com' AND cell='534777444' AND  firstName='Mike' AND lastName='Oranu')
);
INSERT INTO Orders (date, customerId) VALUES (
	'2009-03-20 10:45:23',
	(SELECT customerId FROM Customer WHERE email='hello@gmail.com' AND cell='541342444' AND  firstName='Peter' AND lastName='Hemsworth')
);

INSERT INTO OrderProducts (orderId, productId, quantity) VALUES (
	(SELECT orderId FROM Orders WHERE date='2000-01-01 10:45:23' AND customerId='1'),
	(SELECT productId FROM Products WHERE name='survival game' AND price='22.99'),
    '5'
);
INSERT INTO OrderProducts (orderId, productId, quantity) VALUES (
	(SELECT orderId FROM Orders WHERE date='2005-02-10 10:45:23' AND customerId='2'),
	(SELECT productId FROM Products WHERE name='horror game' AND price='33.99'),
    '10'
);
INSERT INTO OrderProducts (orderId, productId, quantity) VALUES (
	(SELECT orderId FROM Orders WHERE date='2009-03-20 10:45:23' AND customerId='3'),
	(SELECT productId FROM Products WHERE name='racing game' AND price='44.99'),
    '16'
);