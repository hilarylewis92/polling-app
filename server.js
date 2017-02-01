const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


app.locals.poll = {}

app.use('/', express.static(path.join(__dirname, 'public/auth')));

// app.use(express.static('public'));

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/public/index.html');
// });

app.use('/form', express.static(path.join(__dirname, 'public.form.html')));

app.get('/form', (req, res) => {
  res.json(app.locals.poll)
  // res.sendFile(__dirname + '/public/form.html');
});

app.post('/form', (req, res) => {
  // const poll = req
  console.log(req.body);
})

const port = process.env.PORT || 3000;

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});

module.exports = server;
