var express = require('express');
var router = express.Router();

const fetchData = require('./../fetchData');
const filterData = require('./../filterData');

router.get('/', function(req, res, next) {
  fetchData.execute((data) => {
    filterData.execute(data, false, (filteredData) => {
      if(filteredData.status == 200) {
        res.render('index', {title:'SomeTitle', data:filteredData.data});
      }
      else {
        res.render('error', {message: "We could not find Data to show you"});
      }
    });
  });
});

module.exports = router;
