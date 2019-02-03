var express = require('express');
var router = express.Router();

const fetchData = require('./../fetchData');
const filterData = require('./../filterData');

router.get('/', function(req, res, next) {
  fetchData.execute((data) => {
    filterData.execute(data, false, (filteredData) => {
      try {
        let json = JSON.parse(filteredData);
        res.render('index', {title:'SomeTitle', data:json});
      }
      catch (error) {
        res.render('error', {message: "We could not find Data to show you"});
        console.log('Error parsing data: '+error);
      }
    });
  });
});

module.exports = router;
