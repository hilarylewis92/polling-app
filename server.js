const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const md5 = require('md5')
const app = express()

const port = process.env.PORT || 3000
const server = http.createServer(app)

app.locals.polls = []

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/poll', express.static(path.join(__dirname, 'public/poll')))
app.use('/form', express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
  res.redirect('/form')
})

app.post('/form', function(req, res){
  const info = req.body
  const id = md5(info)
  const poll = { id, info}

  app.locals.polls.push(poll)
  res.redirect(`/api/poll/${id}`)
})

app.get('/api/poll/:id', function(req, res){
  var data = app.locals.polls.find(function(poll){
    return poll.id === req.params.id
  })
  res.json(data)
})

if(!module.parent){
  server.listen(port, function() {
    console.log(`Listening on port ${port}.`)
  })
}

module.exports = server

const socketIo = require('socket.io')
const io = socketIo(server)
const votes = {}

io.on('connection', (socket) => {
  io.sockets.emit('usersConnected', io.engine.clientsCount)

  socket.emit('statusMessage', 'You have connected.')

  socket.on('message', (channel, message, user) => {
    if (channel === 'voteCast') {
      votes[socket.id] = message
      socket.emit('voteCount', countVotes(votes))
    }
  })

  function assignUser(newUser, index) {
    let votes = app.locals.votes
    votes = votes.map(function(selection) {
      return selection.filter(function(user) {
        return newUser.user_id != user.user_id
      })
    })
    votes.push(newUser.picture)
    app.locals.votes = votes
  }

    socket.on('disconnect', () => {
      delete votes[socket.id]
      socket.emit('voteCount', countVotes(votes))
      io.sockets.emit('usersConnected', io.engine.clientsCount)
  })
})

const countVotes = (votes) => {
  let voteArr = []
  for (key in votes) {
    if(votes.hasOwnProperty(key)) {
      var value = votes[key]
      voteArr.push(value)
    }
  }

  let voteCount = voteArr.reduce((allVotes, vote) => {
  	if(vote in allVotes) {
  		allVotes[vote]++
      }
  	else {
  		allVotes[vote] = 1
      }
  	return allVotes
  }, {})
  return voteCount
}
