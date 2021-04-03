var express = require('express');
var fs = require('fs');
var favicon = require('serve-favicon');
var app = express();
var methodOverride = require('method-override');
const apirequest = require('request');
let rawvideos = fs.readFileSync('videos.json');
let videos = JSON.parse(rawvideos);

var CLIENT_ID = "87522016106-jjunc7arktqqojlpiemvkm8becqi0u16.apps.googleusercontent.com";
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);


app.use(methodOverride('_method'));
app.use(express.urlencoded());

app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/images/logo.png'));

var port = process.env.PORT || 3000; //||8000
app.listen(port, function(){
  console.log('Easy server listening for requests on port '+ port+'!');
});

app.get('/', function(request, response){
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('index',{feedback:videos.videos});
//console.log(videos.videos);
});

app.post('/tokensignin', function(request, body){
console.log(request.body.id_token);

  // async function verify() {
  //   const ticket = await client.verifyIdToken({
  //       idToken: token,
  //       audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
  //       // Or, if multiple clients access the backend:
  //       //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  //   });
  //   const payload = ticket.getPayload();
  //   const userid = payload['sub'];
  //   // If request specified a G Suite domain:
  //   // const domain = payload['hd'];
  // }
  // verify().catch(console.error);
  
});


app.get('/logout', function(request, response){
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('index',{feedback:""});
});

app.get('/about', function(request, response){
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('about',{feedback:""});
});
