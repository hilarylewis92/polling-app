const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const md5 = require('md5')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.locals.polls = []

app.use('/poll', express.static(path.join(__dirname, 'public/poll')));

app.use('/form', express.static(path.join(__dirname, 'public')));

app.post('/form', (req, res) => {
  const info = req.body
  const id = md5(info)
  const poll = { id, info}

  app.locals.polls.push(poll)
  res.redirect(`/api/poll/${id}`)
})

app.get('/api/poll/:id', (req, res) => {
  console.log(req.params.id);
  var data = app.locals.polls.find((poll) => {
    return poll.id === req.params.id
  })
  res.json(data)
})

const port = process.env.PORT || 3000;

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});

module.exports = server;

const socketIo = require('socket.io');
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('A user has connected.', io.engine.clientsCount);

  io.sockets.emit('usersConnected', io.engine.clientsCount);

  socket.on('disconnect', () => {
    console.log('A user has disconnected.', io.engine.clientsCount);
    io.sockets.emit('usersConnected', io.engine.clientsCount);
  });
});
