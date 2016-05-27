var fs = require('fs');
var path = require('path');
var express = require('express');

var public = path.resolve('..', 'public');

var router = express.Router({
  caseSensitive: true
});

// static assets
router.use(express.static(public, {
  index: false,
  maxAge: '1d'
}));

// home page route
router.get('/', function (req, res) {
  var filepath = path.resolve('index.html');
  fs.readFile(filepath, function (err, content) {
    if (err) {
      console.log(err);
      return res.status(500).end();
    }
    res.set('Content-Type', 'text/html');
    res.send(content);
  })
});

module.exports = router;