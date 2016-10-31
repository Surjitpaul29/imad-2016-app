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
var content= {
  title: 'Article one | Surjit Paul',
  heading: 'Article One',
  date: 'Octber 20, 2016',
  content:'ts of my first article.Plese see the details.'
};

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/article-one',function(req,res){
   res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
});
app.get('/article-two',function(req,res){
  res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});
app.get('/article-three',function(req,res){
  res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
var pool=new Pool(config);

app.get('/test-db',function(req,res){
//make a database query
pool.query("select * from Student",function(err,result){
    
   if(err){
        res.status(500).send(err.toString());
    } 
    else
    {
        res.status(400).send(result.toString());
    }
});
    
});

app.get('/ui/surjit.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'surjit.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
