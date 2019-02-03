//Gets important data from previous http request
//if trendingOnly is true, do extra filtering
function filterData(data, trendingOnly, callback) {
    let filtered = [];
  
    //parse and fetch data
    if(!data.hasOwnProperty('data')) {
      return callback({status:401, message: 'Problem with parsing data'});
    }
    let objData = data['data'];
  
    //loop throw all posts
    for (let i = 0; i < objData.length; i++) {
      try {
        let currentPost = objData[i];
      
        //check if it is trending
        let shouldPushThisPost = false;
        if(!trendingOnly)
          shouldPushThisPost = true;
        else 
          for (let j= 0; j < currentPost['_categories'].length; j++)
            if (currentPost['_categories'][j]['slug'] == 'trending') {
              shouldPushThisPost = true;
              break;
            }
  
        //push to response
        if (shouldPushThisPost) {
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
      catch (err) {
        console.log('Post ${i} could not be parsed: '+err);
      }
    }
    callback({status:200, message:'success', data:filtered});
}

module.exports.execute = filterData;