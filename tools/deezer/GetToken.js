const req = require('request')

// generer un code pour token permanent :
// https://connect.deezer.com/oauth/auth.php?app_id=${process.env.deezer_app_id}&redirect_uri=http%3A%2F%2F127.0.0.1%2Fcallback&perms=manage_library%2Coffline_access&dispatch_path=auth

async function GenerateToken(){
    var authOptions = {
        url: `https://connect.deezer.com/oauth/access_token.php?app_id=${process.env.deezer_app_id}&secret=${process.env.deezer_api_secret}&code=${process.env.deezer_api_code}&output=json`,
        json: true
      }
    return new Promise((resolve, reject) =>{
        req.get(authOptions, (error, response, body) => {resolve(body['access_token'])}
    )})
}

module.exports = {
    GenerateToken
}