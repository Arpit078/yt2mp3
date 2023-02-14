
const {Storage} = require('@google-cloud/storage');
const express = require("express");

const app = new express();


const storage = new Storage({
    keyFilename: "./music-database-75f84-firebase-adminsdk-h0j48-d9ec3dc335.json",
 });

let bucketName = "gs://music-database-75f84.appspot.com"

let filename = './talwinder/Dhundla_|_yashraj_|_Talwinder_|_lyrics.m4a';

// Testing out upload of file
const uploadFile = async() => {

    // Uploads a local file to the bucket
    await storage.bucket(bucketName).upload(filename, {
        // Support for HTTP requests made with `Accept-Encoding: gzip`
        gzip: true,
        // By setting the option `destination`, you can change the name of the
        // object you are uploading to a bucket.
        metadata: {
            // Enable long-lived HTTP caching headers
            // Use only if the contents of the file will never change
            // (If the contents will change, use cacheControl: 'no-cache')
            cacheControl: 'public, max-age=31536000',
        },
});

console.log(`${filename} uploaded to ${bucketName}.`);
}

uploadFile();

