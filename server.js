
// if a directory needs to be served
const path = require('path');
// for webserver
const express = require('express');
// parse POST data uploaded from client
const parser = require('body-parser');
// for cross origin requests
const cors = require('cors');
// express web server
const app = express();
// required so we can have a socket server alongside webserver
const server = require('http').Server(app);
// websocket server running on the same port as http
const io = require('socket.io')(server);

const bcrypt = require('bcrypt');
const saltRounds = 10;

const sessionIDLength = 32;
const sessionChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'Z', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

var db = [];

// which port to listen on, accepts requests from ALL ip addresses
// access this server with http://ip:port/
// this case http://localshot:5000/
server.listen(process.env.PORT || 5000);
app.use(express.static(__dirname));

// cross origin requests accepted
app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname+'/index.html'));
});

function getRandomInt(min, max){//[)
   return Math.floor(Math.random() * (max - min)) + min;
}

// connection event emitted when something connects to the websocket server
io.on('connection', function(socket) {
  // socket is the connection to the client
  // socket.emit sends connected event back to the client with specified msg
  socket.emit('connected', 'Connected to server!');
  // socket.on('connected', (data) => {
  // console.log(socket);
  // });
  // how the server responds when the client sends a message
  socket.on('message', function(data) {
   console.log("socket received", data);
   // io.emit sends the event (message) and data to ALL socket connections
   // ie other clients
   if(data.request!==undefined){

   }else{
      console.log("data.request undefined");
   }
   // io.emit('message', data);
   // just send a confirmation event back to client to signal receive
   socket.emit('confirmation', data);
  });
  // what happens when a client disconnects, not sure what's the event emitted
  // usually diconnect, close, or exit
  socket.on('disconnect', (data) => {
     console.log(socket.client.conn.id);
     console.log("client disconnected");
  });
});

app.post('/checkusername', function(req, res) {
   console.log(req.body);
   var usernameexists = false;
   for(var i = 0; i<db.length; i++){
      if(db[i].name==req.body.name){
         usernameexists = true;
      }
   }
   res.send({body: usernameexists, status: "success"});
});

app.post('/login', function(req, res) {
   console.log(req.body);
   var ind = -1;
   for(var i = 0; i<db.length; i++){
      if(db[i].name==req.body.name){
         ind = i;
      }
   }
   if(ind!=-1){//user exists
      bcrypt.compare(req.body.pass, db[ind].pass, function(err, passres) {
         console.log(passres);
         db[ind].sessID = getNewSessionID();
         res.send({outcome: "exists", body: passres, swatches: db[ind].swatches, sessID: db[ind].sessID, status: "success"});
      });
   }else{
      res.send({outcome: "DNE", body: 0, status: "success"});
   }
});

function getNewSessionID(){
   var newSessID = "";
   for(var i = 0; i<sessionIDLength; i++){
      newSessID+=sessionChars[getRandomInt(0, sessionChars.length)];
   }
   return newSessID;
}

app.post('/signup', function(req, res) {
   var ind = -1;
   for(var i = 0; i<db.length; i++){
      if(db[i].name==req.body.name){
         ind = i;
      }
   }
   if(ind!=-1){ //user already exists
      res.send({body: "user exists", status: "success"});
   }else{//user does not exist
      bcrypt.hash(req.body.pass, saltRounds, function(err, hash) {
         var newSessID = getNewSessionID();
         db.push({name: req.body.name, pass: hash, sessID: newSessID, swatches: []});
         console.log(db);
         res.send({body: "you have signed up", sessID: newSessID, status: "success"});
      });
   }
});

app.post('/updateSwatches', function(req, res) {
   var ind = -1;
   for(var i = 0; i<db.length; i++){
      if(db[i].name==req.body.username && db[i].sessID==req.body.sessID){
         ind = i;
      }
   }
   if(ind!=-1){ //user already exists
      db[ind].swatches = req.body.swatches;
      res.send({body: db[ind].swatches, status: "success"});
   }else{//user does not exist
      res.send({body: "invalid credentials", status: "fail"});
   }
});
