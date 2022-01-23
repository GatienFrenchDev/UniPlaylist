// variable .env
require('dotenv').config()

// importation des modules
const spotify_api = require('./tools/spotify/api')
const getToken = require('./tools/spotify/GetToken')

// playlist spotify de test
const url = 'https://open.spotify.com/playlist/1jnVddyvPMy0z6UAgMypSh?si=X82MG0JbSdSF3lpD9CcJDQ'
const id = '1jnVddyvPMy0z6UAgMypSh'


getToken.generateNewToken()