const express = require('express');
const handlebars = require("express-handlebars");
const rateLimit = require("express-slow-down");
const request = require("request");
const path = require("path")
const app = express();
var http = require('http').Server(app);          
var io = require('socket.io')(http);
const admin = require("/data/data/com.termux/files/home/jack/admin")
const fs = require("fs")
const bodyParser = require("body-parser")
var cheerio = require('cheerio');
const axios = require("axios")
const JWT = require("jsonwebtoken");
const pug = require("pug");
app.use(express.static(__dirname + '/Model/js'));
app.use(express.static(__dirname + '/View/Home/'));
app.use(express.static(__dirname + '/View/Home/css'));
app.use(express.static(__dirname + '/View/Account'));
app.use(express.static(__dirname + '/View/Account/css'));
app.use(express.static(__dirname + '/private'));
//Rotas
app.use("/admin", admin) 

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
  socket.emit('chat message', msg);
  console.log("Id: "+ socket.id)
  });
});;

request('http://localhost:8081', function(err, resp, html) {
if (!err){
 const $ = cheerio.load(html);
 const title = $('title')
 console.log(title.text()); 
 }
});

http.listen(8081,() => {
 console.log("Servidor escutando na porta 8081");
});
