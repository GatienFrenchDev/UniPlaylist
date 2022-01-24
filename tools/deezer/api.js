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
        url: `https://api.deezer.com/search?q=artist:"${artist}" track:"${track}"&access_token=${process.env.deezer_api_token}`,
        json: true
    }
    return new Promise((resolve, reject) =>{
        req.get(options, (error, response, body) => {resolve(body)['data'][0]['id']}
    )})
}

async function CreatePlaylist(name){
    const options = {
        url: `https://api.deezer.com/user/me/playlists/?title=${name}&access_token=${process.env.deezer_api_token}`,
        json: true
    }
    return new Promise((resolve, reject) =>{
        req.post(options, (error, response, body) => {resolve(body['id'])}
    )})
}

async function addTrack(playlist_id, tracks_id){
    const options = {
        url: `https://api.deezer.com/playlist/${playlist_id}/tracks?songs=${tracks_id}&access_token=${process.env.deezer_api_token}`,
        json: true
    }
    return new Promise((resolve, reject) =>{
        req.post(options, (error, response, body) => {resolve(body['id'])}
    )})
}

module.exports = {
    getPlaylist,
    searchTrackId,
    CreatePlaylist,
    addTrack
}