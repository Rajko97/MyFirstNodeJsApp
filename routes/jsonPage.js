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
  let filtered = [];

  //parse and fatch data
  let obj = JSON.parse(data);
  if(!obj.hasOwnProperty('data')) {
    callback('Problem with parsing data');
  }
  let objData = obj['data'];

  //loop throw all posts
  for (let i = 0; i < objData.length; i++) {
    let currentPost = objData[i];
    
    //check if it is trending
    let trending = false;
    for (let j= 0; j < currentPost['_categories'].length; j++)
      if (currentPost['_categories'][j]['slug'] == 'trending') {
        trending = true;
        break;
      }

    //push to response
    if (trending) {
      imagePath = currentPost['_featuredImage']['baseUrl']
                + currentPost['_featuredImage']['relativePath']
                + currentPost['_featuredImage']['small'];
      filtered.push({
        _id: currentPost['_id'],
        title: currentPost['seo']['title'],
        image: imagePath,
        shortDescription: currentPost['shortDescription'],
        createdAt: currentPost['createdAt']
      }); 
    }
  }

  callback(JSON.stringify(filtered));
}

module.exports = router;
