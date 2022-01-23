const req = require('request')

async function generateNewToken(){
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(process.env.spotify_client_id + ':' + process.env.spotify_client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  }
  
  return new Promise((resolve, reject) =>{
    req.post(authOptions, (error, response, body) => {resolve(body.access_token)}
  )})
  
}


module.exports = {
  generateNewToken
}