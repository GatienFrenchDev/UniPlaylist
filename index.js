// importation des modules
const express = require('express')

// variables .env
require('dotenv').config()

// importation des autres fichiers javascript
const spotify_api = require('./tools/spotify/api')
const getToken = require('./tools/spotify/GetToken')

// playlist spotify de test
const url = 'https://open.spotify.com/playlist/1jnVddyvPMy0z6UAgMypSh?si=X82MG0JbSdSF3lpD9CcJDQ'
const id = '1jnVddyvPMy0z6UAgMypSh'


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

        const token = await getToken.generateNewToken()
        const id  = spotify_api.getPlaylistId(url)

        spotify_api.getPlaylist(id, token)
    }

})