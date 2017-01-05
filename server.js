var express = require("express");
var app     = express();
var path    = require("path");

app.use(express.static(__dirname + '/View'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/Script'));
//Store all JS and CSS in Scripts folder.
app.get('/',function(req,res){
  res.sendFile('login.html');
  //It will find and locate index.html from View or Scripts
});

app.get('/about',function(req,res){
  res.sendFile('/register.html');
});



app.listen(8081);

console.log("Running at Port 8081");