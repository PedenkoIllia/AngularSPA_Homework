'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Constants
const PORT = 8080;

// App
const app = express();

app.use(cors());
app.use(bodyParser.json());
let storage = [];

function getMsg(index) {  
  return index < storage.length ? {
    id: index,
    msg: storage[index]
  } : null;
}

app.get('/api/values', function (req, res) {
  res.send(JSON.stringify(storage.map((el, i) => getMsg(i))));
});

app.post('/api/values', function (req, res) {
  storage.push(req.body.msg);  
  res.send(JSON.stringify(getMsg(storage.length - 1)));
});

app.put('/api/values/:id', function (req, res) {
  const msg = getMsg(req.params.id);
  if (msg) {
    storage[req.params.id] = req.body.msg || "";
  }
  res.send(JSON.stringify(getMsg(req.params.id)));
});

app.delete('/api/values/:id', function (req, res) {
  if (getMsg(req.params.id)) {
    storage.splice(req.params.id, 1);
  }
  res.send('');
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
