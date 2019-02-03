var express = require('express');
var router = express.Router();

const fatchData = require('./../fatchData');
const filterData = require('./../filterData');

router.get('/', function(req, res, next) {
  fatchData.execute((data) => {
    filterData.execute(data, false, (filteredData) => {
      let json = JSON.parse(filteredData);
      res.render('index', {title:'SomeTitle', data:json});
    });
  });
});

module.exports = router;
