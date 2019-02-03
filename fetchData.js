const request = require('request');

URL = 'https://api.gamebuz.co/posts';

const execute = (callback) => {
    request(URL, {json:true}, (err, res, body) => {
        if(err) {
            console.log("Error sending request: "+err.message);
            return callback(err);
        }
        return callback(JSON.stringify(body));
    });
}

module.exports.execute = execute;