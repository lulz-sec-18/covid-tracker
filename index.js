const express = require('express')
const path = require('path');
const app = express();
const router = express.Router();
const port = process.env.port || 3000;

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.use('/', router);

app.use(express.static(__dirname + '/public'));

app.listen(port, err => {
    if (err) {
      return console.log("ERROR", err);
    }
    console.log(`Listening on port ${port}`);
  });