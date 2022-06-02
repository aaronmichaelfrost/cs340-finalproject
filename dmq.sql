-- CREATE
INSERT INTO Customers VALUES (:emailInput,:cellInput,:firstNameInput,:lastNameInput,:birthDateInput);
INSERT INTO Products VALUES (:productNameInput,:priceInput);
INSERT INTO Orders (date, customerId) VALUES (:dateInput,:customerIdInput);
INSERT INTO OrderProducts (orderId, productId) VALUES (:orderIdInput,:productIdInput);

-- READ
SELECT * FROM Customers;
SELECT * FROM Products;
SELECT * FROM Orders;
SELECT * FROM OrderProducts;

-- UPDATE
UPDATE Customers SET email = :emailInput, cell = :cellInput, firstName = :firstNameInput, lastName= :lastNameInput WHERE customerId= :customerIdInput;
UPDATE Products SET productName = :productNameInput, price= :priceInput WHERE productId= :productIdInput;
UPDATE Orders SET date = :dateInput WHERE customerId= :customerIdInput;

-- DELETE
DELETE FROM Customers WHERE customerId = :customerIdInput;
DELETE FROM Orders WHERE orderId = :orderIdInput;
DELETE FROM Productss WHERE productId = :productIdInput;
DELETE FROM OrderProducts WHERE orderId = :orderIdInput AND productId = :productIdInput;