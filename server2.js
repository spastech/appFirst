var express = require('express'),
   app = express(),
   bodyParser = require('body-parser'),
   fs= require('fs');

app.use(bodyParser.urlencoded({ extended: true }));

fs.readFile('./head.html', function (err, head) {
   if (err) {
       res.sendStatus(500).send('Couldn\'t read head!');
       res.end();
   }
   fs.readFile('./form.html', function (err, form) {
       if (err) {
           res.sendStatus(500).send('Couldn\'t read form!');
           res.end();
       }
       fs.readFile('./foot.html', function (err, foot) {
           if (err) {
               res.sendStatus(500).send('Couldn\'t read foot!');
        res.end();
           }

           app.get('/', function (req, res) {
               res.send(head + form + foot);
               res.end();

               console.log("Got a GET");
           });

           app.post('/', function (req, res) {
               res.send(head + form + '<p>' + req.body.name + '</p>\n' + foot);
               res.end();

               console.log("Got a POST");
           });

           var server = app.listen(8081, function () {
           console.log("Example app listening at http://127.0.0.1:8081")
           });
           
       });
   });
});