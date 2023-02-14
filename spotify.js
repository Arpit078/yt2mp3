const axios  = require("axios")
require("dotenv").config()


async function spotifyTracks(playlistId,spotifyToken){

      let spotifyUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
      const arr = axios.get(spotifyUrl, { headers: 
        {"Authorization" : `Bearer ${spotifyToken}`},
      }).then((res)=>{
          const data = res.data.items
          let array = []
          for(let i=0;i<data.length;i++){
              array.push({
                "trackName" : data[i].track.name,
                "artistName": data[i].track.artists[0].name
              })
          }
          return array
      })
      return arr


}
// spotifyTracks("1qpDYY8t6WcPPNlJVtSZXx","BQAFo2t75h4Nq41Iw6759p-adJ9Gy2f2WEKz4wLZyCAZVhpLl8TxCU3gVii6avrnJ2ju19cey4vbSBc7cZBDC-LwKx6E3bvOsZISj6lYKzzxYD4yuKeV-P8dRhkgdbJLu_SpzN3sV4DwGwr3w6o8cq5ln-bAsbmOl16amsclzClcQWqOiqd98YgbfxvVB2oJh40s")
// .then((res)=>{console.log(res)})

module.exports = {spotifyTracks};

