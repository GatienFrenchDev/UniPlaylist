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
function getPlaylist(id, token){

    req.get({
        url:`https://api.spotify.com/v1/playlists/${id}/tracks`,
        headers :{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        },
        method: 'GET'
    }, (e, r, body) =>{

        const playlist = [3]

        JSON.parse(body)['items'].forEach(element => {
            if(element['track']){

                console.log(element['track']['name'])
                console.log(element['track']['artists'][0]['name'])

                playlist.push({
                    'titre':element['track']['name'],
                    'artiste':element['track']['artists'][0]['name']
                })
                
            }
        });
    })
}




module.exports = {
    getPlaylistId,
    getPlaylist
}
