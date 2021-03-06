/*
    Uses express, dbcon for database connection, body parser to parse form data
    handlebars for HTML templates
*/

require('util.promisify').shim();

var express = require('express');
var mysql = require('./dbconn.js');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({
        defaultLayout:'main',
        });

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', 9082);
app.set('mysql', mysql);

// Route URLs
app.use('/customer', require('./customer.js'));
app.use('/order', require('./order.js'));
app.use('/product', require('./product.js'));
app.use('/orderProduct', require('./orderProduct.js'));

app.use('/', express.static('public'));

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});


app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});