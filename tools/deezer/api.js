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

async function searchTrackId(track, artist){
    const options = {
        url: encodeURI(`https://api.deezer.com/search?q=${track}-${artist}`),
        json: true
    }
    
    return new Promise((resolve, reject) =>{
        req.get(options, (error, response, body) => {
            if(typeof body['data'] == 'undefined'){
                resolve(false)
            }
            else{
                if(body['data'].length === 0){
                    resolve(false)
                }
                else{
                    console.log(body['data'])
                    resolve((body)['data'][0]['id'])
                }
            }
        }
    )})
}

async function CreatePlaylist(name){
    const options = {
        url: encodeURI(`https://api.deezer.com/user/me/playlists/?title=${name}&access_token=${process.env.deezer_api_token}`),
        json: true
    }
    return new Promise((resolve, reject) =>{
        req.post(options, (error, response, body) => {resolve(body)}
    )})
}

async function addTrack(playlist_id, tracks_id){
    const options = {
        url: encodeURI(`https://api.deezer.com/playlist/${playlist_id}/tracks?songs=${tracks_id}&access_token=${process.env.deezer_api_token}`),
        json: true
    }
    return new Promise((resolve, reject) =>{
        req.post(options, (error, response, body) => {
            if(body['error']){
                console.log(body)
            }
            resolve(body['id'])
        }
    )})
}

module.exports = {
    getPlaylist,
    searchTrackId,
    CreatePlaylist,
    addTrack
}