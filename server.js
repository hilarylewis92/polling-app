const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const md5 = require('md5')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


app.locals.poll = {}

app.use('/', express.static(path.join(__dirname, 'public/auth')));

// app.use(express.static('public'));

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/public/index.html');
// });

app.use('/form', express.static(path.join(__dirname, 'public')));

// app.get('/form', (req, res) => {
//   // res.json(app.locals.poll)
//   res.sendFile(__dirname + 'public');
// });

app.post('/form', (req, res) => {
  const poll = req.body
  const id = md5(poll)
  app.locals.poll[id] = poll

  res.json({ id, poll })

  console.log(app.locals.poll);
})

const port = process.env.PORT || 3000;

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});

module.exports = server;
