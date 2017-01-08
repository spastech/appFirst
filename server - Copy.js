var express = require("express");
var app     = express();
var path    = require("path");
var router = express.Router();

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

app.use(express.static(path.join(__dirname + '/View')));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/Script'));
//Store all JS and CSS in Scripts folder.
app.use(express.static(__dirname + '/Public'));

router.get("/",function(req,res){
  res.sendFile(__dirname + "/View/login.html");
});

router.get('/register',function(req,res){
  res.sendFile(__dirname + '/View/register.html');
});


app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(__dirname + "/public/404.html");
});

app.listen(8081);

console.log("Running at Port 8081");