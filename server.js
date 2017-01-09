var express = require("express");
var bodyParser = require('body-parser');

var app     = express();
var path    = require("path");
var router = express.Router();



// Put these statements before you define any routes.
//app.use(bodyParser.urlencoded());
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

router.use(bodyParser.urlencoded({ extended: true })); 


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

router.get('/register',function(req,res){
  res.sendFile(__dirname + '/View/Forgotpassword.html');
});

router.post('/login_validate',function(req, res){ // Specifies which URL to listen for
  
      var username = req.body.user_name;
	  var password = req.body.user_password;
		   console.log(username);
	var nano = require('nano')('http://localhost:5984');
// nano.db.create('alice'); // to create a database
 
 //list all dbs
 
/*  nano.db.list(function(err, body) {
  // body is an array
  body.forEach(function(db) {
    console.log(db);
  });
}); */
 //var alice = nano.use('alice');

var alice = nano.use('db_user_tbl');
/* alice.insert({ crazy: true }, 'rabbit', function(err, body) {
  if (!err)
    console.log(body);
}); */
 
/*  working code for getting doc from couchdb
alice.get('test',function(err, body) {
  if (!err)
   // console.log(body);
		 res.writeHead(200, { "Content-Type": "text/plain" }); 
         res.end("Books queried. Response: " + JSON.stringify(body) + "\n"); 
});
	 */	
	 
	 var user_name=username;alice.view('ram_admin_user','_by_user_pass_2',{"key":[user_name],"key":[password]},function(err, body) {
  if (!err)
   // console.log(body);
		 res.writeHead(200, { "Content-Type": "text/plain" }); 
         res.end("Books queried. Response: " + JSON.stringify(body) + "\n"); 
});
	 

}); 


app.use("/",router);

//app.use("*",function(req,res){
  //res.sendFile(__dirname + "/public/404.html");
//});

app.listen(process.env.PORT || 8081);

console.log("Running at Port 8081");