// JavaScript source code
var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require("request");
var fs = require("fs");

var spotify = new Spotify({
    id: '47e84b5c9a5541ab9f7da73719cac8db',
    secret: '3ccd008b0a3347b0b296f6e4c1b522f1'
});
var client = new Twitter (keys.twitterKeys);

if (process.argv[2] == 'spotify-this-song') {
    spotify.search({ type: 'track', query: process.argv[3] }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(JSON.stringify(data, null, 2));
    })
}
else if (process.argv[2] == 'my-tweets') {
    client.get('statuses/home_timeline', function (error, tweets, response) {
        if (error) throw error;
        console.log(tweets);  // The favorites. 
    });
}
else if (process.argv[2] == 'movie-this') {
    var movieName = process.argv[3];
    var movieSTR;
    if (movieName === '') {
        movieSTR = 'Mr+nobody';
    }
    else {
        movieSTR = movieName.replace(" ", "+");
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieSTR + "&y=&plot=short&apikey=40e9cece";
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(JSON.stringify(body, null,2));
        }
    });
}
else if (process.argv[2] == 'do-what-it-says') {
    fs.readFile("random.txt", (err, data) => {
        var str = data.toString();
        spotify.search({ type: 'track', query: 'I want it that Way' }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log(JSON.stringify(data, null, 2));
        })
}




