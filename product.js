module.exports = function(){
    var express = require('express');
    var router = express.Router();
 
    // Query table and populate handlebars context
    function getProducts(res, mysql, context, complete){
 
        mysql.pool.query("SELECT * FROM Products", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.products  = results;
            complete();
        });
    }
 
    // Query table (with filter) and populate handlebars context
    function getFilteredProducts(req, res, mysql, context, complete){
        var sql = "SELECT * FROM Products WHERE productId = ?"
        var inserts = [req.params.productID];
        mysql.pool.query(sql,inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.products  = results;
            complete();
        });
    }
 
 
    router.get('/', function(req, res){
 
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getProducts(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('product', context);
            }
        }
 
    });
 
    router.get('/filtered/:productID', function(req, res){
 
        console.log("Get filtered with productId = " + req.params.productId);
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getFilteredProducts(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('product', context);
            }
        }
 
    });
 
    // Create Product
    router.post('/add', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Products (productName, price) VALUES(?,?)"
 
        var inserts = [req.body.productName, req.body.price];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/product');
            }
        });
    });
 

    // Delete Product
    router.post('/delete', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
 
        var sql = "DELETE FROM Products WHERE productId = ?";
 
        var inserts = [req.body.productId];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/product');
            }
        });
    });
 

    // Update Product 
    router.post('/update', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
 
        var sql = "UPDATE Products SET productName = ?, price = ? WHERE productId = ?";
 
        var inserts = [ req.body.productName, req.body.price, req.body.productId];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/product');
            }
        });
    });
 

    // Filter Products
    router.post('/filter', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
 
        var sql = "SELECT * FROM Products WHERE productId = ?";
 
        var inserts = [req.body.productId];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/product/filtered/' + req.body.productId);
            }
        });
    });
 
 
    return router;
 
}();