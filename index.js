const express = require('express');
const http = require('http');

//const path = require('path');
const app = express();
//const router = express.Router();
const port = process.env.port || 5000;
const server = http.Server(app);

//app.use(express.static('public'));

// router.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname+'/public/index.html'));
// });

//app.use('/', router);

app.use(express.static(__dirname + '/public'));

server.listen(port, err => {
    if (err) {
      return console.log("ERROR", err);
    }
    console.log(`Listening on port ${port}`);
  });