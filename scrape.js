// # Run the script from Node.js
const axios = require('axios');
const { execSync } = require('child_process');
const {spotifyTracks} = require('./spotify')
require("dotenv").config()





async function download(url){
    axios.get(url).then((res)=>{
      const videoID = res.data.items[0].id.videoId
      const videoTitle = res.data.items[0].snippet.title.replace(/ /g,"_")
      execSync(`./script.sh 'https://www.youtube.com/watch?v=${videoID}' '${videoTitle}.m4a'`, (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(stdout);
      })
    })
}


async function getSongs(playlistUrl,spotifyToken){
    const playlistId = playlistUrl.replace("https://open.spotify.com/playlist/","")
    spotifyTracks(playlistId,spotifyToken)
    .then((array)=>{
      for(let i = 0;i<array.length;i++){
        const query = array[i].trackName + " by " + array[i].artistName
        const url = `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&q=${query}%20lyrics&type=video&part=snippet`
        download(url)
        
      }
    })
    
}

module.exports = {getSongs,download}

// getSongs("https://open.spotify.com/playlist/3CRRwWoW5a00SHgwl2kEoP","BQA2t4W6BDs3YKTZq5TPR6TEk_qmXV7RLI9yA7Rmc_KqZEBjZEoONDxr-0T5Ou-HDYdqt-xvVCKIPqJROz0HVlcM_pXB7c3VcVeabsn9fIFi2IuSQRIAOideXSgTy20DPmVSvfRjWGxhy7xn4z1w5SBKTzcqajmOVOkOTejKuSM33QSzpfcPUEYAC1w4lFM94IEE")