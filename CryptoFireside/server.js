const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
var fs = require('fs');
var favicon = require('serve-favicon');



let rawvideos = fs.readFileSync('videos.json');
let videos = JSON.parse(rawvideos);

var CLIENT_ID = "87522016106-jjunc7arktqqojlpiemvkm8becqi0u16.apps.googleusercontent.com";
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

const rooms = { };




app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/images/logo.png'));
app.use(express.urlencoded({extended: true}));


// app.get('/', (req, res) => {
//   res.render('index', { rooms: rooms })
// })

app.get('/', function(request, response){

    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render('landing',{});
  //console.log(videos.videos);
  });
  app.get('/login', function(request, response){
      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.render('login',{});
    //console.log(videos.videos);
    });

app.get('/index', function(request, response){
  //console.log(videos);
    var feedback = {
      "videos":videos.videos,
      "rooms":rooms
    };
    // for(i in feedback.videos){
    //   console.log(feedback.videos[i]);
    // }
  
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render('index',{feedback});
  //console.log(videos.videos);
  });

  
app.post('/tokensignin', function(request, body){
  console.log(request.body.id_token);
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
  

app.post('/room', (req, res) => {
  if (rooms[req.body.room] != null) {
    return res.redirect('/')
  }
  rooms[req.body.room] = { users: {} }
  res.redirect(req.body.room)
  // Send message that new room was created
  io.emit('room-created', req.body.room)
})

app.get('/:room', (req, res) => {
  if (rooms[req.params.room] == null) {
    return res.redirect('/')
  }
  var feedback = {
    "videos":videos.videos,
    "roomName":req.params.room
  };
  res.render('room', { feedback })
})


server.listen(3000)

io.on('connection', socket => {
  socket.on('new-user', (room, name) => {
    socket.join(room)
    rooms[room].users[socket.id] = name
    socket.to(room).broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', (room, message) => {
    socket.to(room).broadcast.emit('chat-message', { message: message, name: rooms[room].users[socket.id] })
  })
  socket.on('disconnect', () => {
    getUserRooms(socket).forEach(room => {
      socket.to(room).broadcast.emit('user-disconnected', rooms[room].users[socket.id])
      delete rooms[room].users[socket.id]
    })
  })
})

function getUserRooms(socket) {
  return Object.entries(rooms).reduce((names, [name, room]) => {
    if (room.users[socket.id] != null) names.push(name)
    return names
  }, [])
}