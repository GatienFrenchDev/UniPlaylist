const req = require('request')

async function getPlaylist(id){
    const options = {
        url: `https://api.deezer.com/playlist/${id}?access_token=${process.env.deezer_api_token}`,
        json: true
    }
    return new Promise((resolve, reject) =>{
        req.get(options, (error, response, body) => {resolve(body)}
    )})
}

module.exports = {
    getPlaylist
}