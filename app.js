var WebSocketServer = require("ws").Server;
var gcm = require('node-gcm');
var express = require('express');
var http = require('http');
var https = require('https');
var bodyParser = require('body-parser');
var app = express();
var jsonParser = bodyParser.json()
var port = process.env.PORT || 5000;

app.use(express.static(__dirname + '/public'));

var gcmKey = 'AIzaSyCEEkwC2sW4SZfl2cjPfaJS3Cl5hvsYNew';

var regTokens = [];

// Set up the sender with you API key
//var sender = new gcm.Sender(gcmKey);

// views is directory for all template files
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('public/index.html');
});

app.get('/package', function(request, response) {
  var json = require('./package.json');
  response.send(JSON.stringify(json));
});

var server = http.createServer(app)
server.listen(port)
console.log("http server listening on %d", port)

var wss = new WebSocketServer({server: server})
console.log("websocket server created")
var websocket;
wss.on("connection", function(ws) {
  websocket = ws;
  var result = {'status':'connected'}
  ws.send(JSON.stringify(result), function() {  })
  console.log("websocket connection open")

  ws.on("close", function() {
    console.log("websocket connection close")
    
  })
})
var message = new gcm.Message();
var sendnotifs = function(message){
  // Now the sender can be used to send messages
  sender.send(message, { registrationTokens: regids }, function (err, res) {
      if(err) console.error(err);
      else    console.log(res);
      console.log('notifications sent to '+regids);
  });
}

var broadcast=function(){
  var result = {};
  result.rank = queuerank; 
  result.time = queuetime;
  websocket.send(JSON.stringify(result), function() {  });
}
