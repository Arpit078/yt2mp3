// # Run the script from Node.js
const axios = require('axios');
const { exec } = require('child_process');
const {arr} = require('./spotify')
require("dotenv").config()





function download(url){
    axios.get(url).then((res)=>{
      const videoID = res.data.items[0].id.videoId
      const videoTitle = res.data.items[0].snippet.title.replace(/ /g,"_")
      // console.log(res.data.items[0])
      exec(`./script.sh 'https://www.youtube.com/watch?v=${videoID}' '${videoTitle}.m4a'`, (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(stdout);
      });
    })
}


async function array(){
    const array = await arr
    // console.log(array)
    for(let i = 0;i<array.length;i++){
        const query = array[i]
        const url = `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&q=${query}%20lyrics&type=video&part=snippet`
        download(url)
    }
}
array()