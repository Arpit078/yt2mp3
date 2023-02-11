const axios  = require("axios")
require("dotenv").config()

const playlist_id = "6xXui7OOkMrBHH9ZFHFZiu"
let spotifyUrl = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`


const arr = axios.get(spotifyUrl, { headers: 
  {"Authorization" : `Bearer ${process.env.SPOTIFY_API_KEY}`},
}).then((res)=>{
    const data = res.data.items
    let array = []
    for(let i=0;i<data.length;i++){
        array.push(data[i].track.name)
    }
    // console.log(arr)
    return array
})

module.exports = {arr};

