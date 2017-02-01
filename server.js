const http = require('http');
const express = require('express');

const app = express();

app.locals.poll = {}

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/form', (req, res) => {
  res.sendFile(__dirname + '/public/form.html');
});

app.post('/form', (req, res) => {
  // const poll = req
  console.log(req);
})

const port = process.env.PORT || 3000;

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});

module.exports = server;
