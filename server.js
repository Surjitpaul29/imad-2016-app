var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool= require('pg').Pool;

var config={
    user:'surjitpaul29',
    database:'surjitpaul29',
    host: 'db.imad.hasura.app.io',
    port: '5432',
    password: process.env.DB_Password
};

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/article-one',function(req,res){
   res.send('Article one is requested'); 
});
app.get('/article-two',function(req,res){
   res.send('Article two is requested'); 
});
app.get('/article-three',function(req,res){
   res.send('Article three is requested'); 
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
var pool=new Pool(config);

app.get('/test-db',function(req,res){
//make a database query
pool.query('select * from Student',function(err,result){
    
   if(err){
        res.status(500).send(err.toString());
    } 
});
    
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
