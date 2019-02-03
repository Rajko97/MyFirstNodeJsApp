var express = require('express');
var router = express.Router();

const fatchData = require('./../fatchData');
const filterData = require('./../filterData');

router.get('/', function(req, res, next) {
  fatchData.execute(data => {
    filterData.execute(data, true, (filtered) => {
      res.set({ 'content-type': 'application/json; charset=utf-8' });
      res.send(filtered);
    });
  });
});

module.exports = router;