
module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // Query table and populate handlebars context
    function getCustomers(res, mysql, context, complete){

        mysql.pool.query("SELECT * FROM Customers", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.customers  = results;
            complete();
        });
    }


    // Query table (with filter) and populate handlebars context
    function getFilteredCustomers(req, res, mysql, context, complete){
        var sql = "SELECT * FROM Customers WHERE lastName = ?"
        var inserts = [req.params.lastName];
        mysql.pool.query(sql,inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.customers  = results;
            complete();
        });
    }


    router.get('/', function(req, res){

        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getCustomers(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('customer', context);
            }
        }

    });

    router.get('/filtered/:lastName', function(req, res){

        console.log("Get filtered with lastname = " + req.params.lastName);
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getFilteredCustomers(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('customer', context);
            }
        }

    });


    // Create Customer
    router.post('/add', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Customers (email, cell, firstName, lastName) VALUES(?,?,?,?)"

        var inserts = [req.body.email, req.body.cell, req.body.firstName, req.body.lastName];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/customer');
            }
        });
    });


    // Delete Customer
    router.post('/delete', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');

        var sql = "DELETE FROM Customers WHERE customerId = ?";

        var inserts = [req.body.customerId];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/customer');
            }
        });
    });


    // Update Customer
    router.post('/update', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');

        var sql = "UPDATE Customers SET email = ?, cell = ?, firstName = ?, lastName= ? WHERE customerId= ?";

        var inserts = [req.body.email, req.body.cell, req.body.firstName, req.body.lastName, req.body.customerId];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/customer');
            }
        });
    });


    // Filter Customers
    router.post('/filter', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');

        var sql = "SELECT * FROM Customers WHERE lastName = ?";

        var inserts = [req.body.lastName];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/customer/filtered/' + req.body.lastName);
            }
        });
    });
    

    return router;

}();