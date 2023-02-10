@echo off

set input=%1

echo Input received: %input%

yt-dlp --extract-audio --audio-format best %input%

