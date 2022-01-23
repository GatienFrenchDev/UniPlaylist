var client_id = process.env.spotify_client_id
var redirect_uri = 'http://127.0.0.1:80/callback'

const req = require('request')

function generateNewToken(){
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(process.env.spotify_client_id + ':' + process.env.spotify_client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };
  
  req.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var token = body.access_token;
      console.log(body)
    }
  });
  
}





module.exports = {
  generateNewToken
}