
module.exports = function(){
    var express = require('express');
    var router = express.Router();


    // Query table and populate handlebars context
    function getOrderProducts(res, mysql, context, complete){

        mysql.pool.query("SELECT * FROM OrderProducts", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.orderProducts  = results;
            complete();
        });
    }

    router.get('/', function(req, res){

        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getOrderProducts(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('orderproduct', context);
            }
        }

    });

    // Create OrderProduct
    router.post('/add', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO OrderProducts (productId, orderId) VALUES(?,?)"

        var inserts = [req.body.productId, req.body.orderId];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/orderproduct');
            }
        });
    });

    // Delete OrderProduct
    router.post('/delete', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');

        var sql = "DELETE FROM OrderProducts WHERE orderProductId = ?";

        var inserts = [req.body.orderProductId];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/orderproduct');
            }
        });
    });
    

    return router;

}();