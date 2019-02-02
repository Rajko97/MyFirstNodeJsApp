var express = require('express');
var router = express.Router();

const fatchData = require('./../fatchData');

router.get('/', function(req, res, next) {
  fatchData.execute(data => {
    filterData(data, (filtered) => {
      res.set({ 'content-type': 'application/json; charset=utf-8' });
      res.send(filtered);
    });
  });
});

function filterData(data, callback) {
  callback(data);
}

module.exports = router;
