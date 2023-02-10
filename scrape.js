// # Run the script from Node.js
const axios = require('axios');
const { exec } = require('child_process');

const query = 'game sidhu moosewala'
let url = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyAQxX1NjBQpOZfLuO-7qqwrtCUdpLL8tJg&q=${query}%20lyrics&type=video&part=snippet`



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