module.exports = function(){
    var express = require('express');
    var router = express.Router();
 
    // Query table and populate handlebars context
    function getOrders(res, mysql, context, complete){
 
        mysql.pool.query("SELECT * FROM Orders", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.orders  = results;
            complete();
        });
    }
 
    // Query table (with filter) and populate handlebars context
    function getFilteredOrders(req, res, mysql, context, complete){
        var sql = "SELECT * FROM Orders WHERE customerId = ?"
        var inserts = [req.params.customerId];
        mysql.pool.query(sql,inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.orders  = results;
            complete();
        });
    }
 
 
    router.get('/', function(req, res){
 
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getOrders(res, mysql, context, complete);

        
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('order', context);
            }
        }
 
    });
 
    router.get('/filtered/:customerId', function(req, res){
 
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getFilteredOrders(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('order', context);
            }
        }
 
    });
 
    // Create Order
    router.post('/add', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Orders (customerId) VALUES(?)"
 
        var inserts = [req.body.customerId];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/order');
            }
        });
    });
 

    // Delete Order
    router.post('/delete', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
 
        var sql = "DELETE FROM Orders WHERE orderId = ?";
 
        var inserts = [req.body.orderId];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/order');
            }
        });
    });
 

    // Update Order
    router.post('/update', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');

        var sql = "UPDATE Orders SET customerId= ? WHERE orderId= ?";
 
        var inserts = [req.body.customerId, req.body.orderId];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/order');
            }
        });
    });
 
    
    // Filter Orders
    router.post('/filter', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
 
        var sql = "SELECT * FROM Orders WHERE customerId = ?";
 
        var inserts = [req.body.customerId];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/order/filtered/' + req.body.customerId);
            }
        });
    });
 
 
    return router;
 
}();