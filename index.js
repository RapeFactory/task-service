const express = require('express');
const path = require('path');
const app = require('./mysqlServer/server');
const port = process.env.PORT || 8080;
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
  console.log('SENDING');
});

app.listen(port, () => console.log('SERVER IS LISTENING ON', port));
