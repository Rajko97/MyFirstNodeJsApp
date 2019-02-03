var express = require('express');
var router = express.Router();

const fetchData = require('./../fetchData');
const filterData = require('./../filterData');

router.get('/', function(req, res, next) {
  fetchData.execute(data => {
    filterData.execute(data, true, (filtered) => {
      res.set({ 'content-type': 'application/json; charset=utf-8' });
      res.send(filtered);
    });
  });
});

module.exports = router;