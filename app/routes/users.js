var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res) {
  res.send('respond with a resource');
});

module.exports = router;
