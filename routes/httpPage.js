var express = require('express');
var router = express.Router();

const fetchData = require('./../fetchData');
const filterData = require('./../filterData');

router.get('/', function(req, res, next) {
  fetchData.execute((data) => {
    filterData.execute(data, false, (filteredData) => {
      let json = JSON.parse(filteredData);
      res.render('index', {title:'SomeTitle', data:json});
    });
  });
});

module.exports = router;
