// importation des modules
const express = require('express')
const fs = require('fs')

// variables .env
require('dotenv').config()

// importation des autres fichiers javascript
const spotify_api = require('./tools/spotify/api')
const SpotifygetToken = require('./tools/spotify/GetToken')
const deezer_api = require('./tools/deezer/api')
const DeezergetToken = require('./tools/deezer/GetToken')

const tools = require('./tools/tools')

// playlist spotify de test
const url_spotify = 'https://open.spotify.com/playlist/1jnVddyvPMy0z6UAgMypSh?si=X82MG0JbSdSF3lpD9CcJDQ'
const id_spotify = '1jnVddyvPMy0z6UAgMypSh'

// playlist deezer de test
const url_deezer = 'https://www.deezer.com/fr/playlist/914651125'
const id_deezer = '914651125'


// mise en place du serveur express
const app = express()

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', express.static(__dirname + '/public/'))

const port = process.env.PORT || 80

app.listen(port, () =>{console.log(`🚀 | Serveur express démarré sur l'adresse http://127.0.0.1:${port}`)})

app.get('/', (req, res) =>{
    res.render(`${__dirname}/public/index.ejs`, {})
})

app.post('/playlist', async (req, res) =>{
    const url = req.body.url

    if(url.startsWith('https://open.spotify.com/playlist/')){

        const token = await SpotifygetToken.generateNewToken()
        const id  = spotify_api.getPlaylistId(url)

        const playlist = await spotify_api.getPlaylist(id, token)

        const titre = await spotify_api.getTitle(id, token)

        const contenu = []

        playlist['items'].forEach((item, index) =>{
           contenu.push([item['track']['name'], item['track']['album']['artists'][0]['name']])
        })

        let id_pl = await deezer_api.CreatePlaylist(tools.clearString(titre))
        id_pl = id_pl['id']

        contenu.forEach(async (item, index) =>{
            let id_ = await deezer_api.searchTrackId(tools.clearString(item[0]), tools.clearString(item[0]))
            if(id == false){
                console.log(`aucun résultat pour ${item[0]} de ${item[1]}`)
            }
            else{
                await deezer_api.addTrack(id_pl, id_)
            }
        })

        res.send(`https://deezer.com/fr/playlist/${id_pl}`)
        
    }

    else if(url.startsWith('https://www.deezer.com/')){
        const id = url.split('playlist/')[1]

        const playlist = await deezer_api.getPlaylist(id)

        res.send(JSON.stringify(playlist))

    }

})

async function main(){
    // console.log(encodeURI('https://www.deezer.com?morceau=#1 Gatien'))
}

main()