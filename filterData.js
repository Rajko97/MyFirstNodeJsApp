//Gets important data from previous http request
//if trendingOnly is true, do extra filtering by trending
function filterData(data, trendingOnly, callback) {
    //parse and fetch data
    if(!data.hasOwnProperty('data')) {
      return callback({status:401, message: 'Problem with parsing data'});
    }
    let objData = data['data'];

    if(trendingOnly) { 
      objData = objData.filter(filterByTrending);
    }
    
    let reformatted = objData.map(post => {
      imagePath = post['_featuredImage']['baseUrl']
                  + post['_featuredImage']['relativePath']
                  + post['_featuredImage']['small'];
      let formatedPost = {
        _id: post['_id'],
        title: post['seo']['title'],
        image: imagePath,
        shortDescription: post['shortDescription'],
        createdAt: post['createdAt']
      };
      return formatedPost;
    });   
    callback({status:200, message:'success', data:reformatted});
}

function filterByTrending(post) {
  return post['_categories'].filter(post2 => post2['slug'] == 'trending').length > 0;
}

module.exports.execute = filterData;