const req = require('request')

const fs = require('fs')


// fonction pour récupérer l'id d'une playlist spotify
function getPlaylistId(url_){

    const url = url_.split('?')[0]

    if(url.startsWith("https://open.spotify.com/playlist")){
        return url.split('/')[4]
    }
    else
        if(url.startsWith("open.spotify.com/playlist")){
            return url.split('/')[2]
        }
        else{
            return 400
        }
}

// fonction pour récupérer le contenu d'une playlist
async function getPlaylist(id, token){

    const options = {
        url:`https://api.spotify.com/v1/playlists/${id}/tracks`,
        headers :{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        },
    }

    return new Promise((resolve, reject) =>{
        req.get(options, (err, res, body) =>{
            resolve(JSON.parse(body))
        })
    })
}




module.exports = {
    getPlaylistId,
    getPlaylist
}
