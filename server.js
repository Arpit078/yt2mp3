const express = require("express")
const app = express()
const axios = require('axios');
const path = require('path');
const { execSync } = require('child_process');
// const {download} = require("./scrape")
app.use(express.json());
require("dotenv").config()


var PORT = process.env.PORT||5000;


app.get('/q=:query', async function(req, res){
	const url = `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&q=${req.params.query}%20lyrics&type=video&part=snippet`
	axios.get(url).then((response)=>{
		const videoID = response.data.items[0].id.videoId
		const videoTitle = response.data.items[0].snippet.title.replace("lyrics"," ")
		execSync(`./script.sh 'https://www.youtube.com/watch?v=${videoID}' '${videoTitle}.m4a'`, (err, stdout, stderr) => {
		  if (err) {
			console.error(err);
			return;
		  }
		  console.log(stdout);
		})
		var options = {
			root: path.join(__dirname)
		};
		 
		var fileName = 'music.m4a';
		res.download(fileName, `${videoTitle}.m4a`, function (err) {
			if (err) {
				console.log(err);
			} else {
				console.log('Sent:', fileName);
			}
		});
	})

});

app.get('/playlistURL=:playslistURL&spotifyToken=:spotifyToken',(req,res)=>{
	res.json("api working")
})

app.listen(PORT, function(err){
	if (err) console.log(err);
	console.log("Server listening on PORT", PORT);
});
