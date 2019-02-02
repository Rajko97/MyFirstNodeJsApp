const https = require('https');

URL = 'https://api.gamebuz.co/posts';

const execute = (callback) => {
    https.get(URL, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            return callback(data);
        });

        res.on('error', (err) => {
            console.log("Error sending request: "+err.message);
        });
    });
}

module.exports.execute = execute;