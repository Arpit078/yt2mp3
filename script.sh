#!/bin/bash

# Read the variable from Node.js
MYVAR=$1

# Use the variable
yt-dlp -f 'bestaudio[ext=m4a]' $MYVAR -o ./atif_aslam/$2