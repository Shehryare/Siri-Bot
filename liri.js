require("dotenv").config();
var fs = require('fs');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var request = require('request');



var spotify = new Spotify(keys.spotify);
var omdbKey = keys.omdb.api_key;
var bandsInTown = keys.bandsInTown

var command = process.argv[2];
var userInput = process.argv[3];

switch (command){
    case ('spotify-this-song'):
        if(userInput){
            spotifyThisSong(userInput);
        } else{
            spotifyThisSong("My Heart Will Go On");
        };
    break;
    case ('movie-this'):
        if(userInput){
            omdb(userInput)
        } else {
            omdb('Mr. Nobody.');
        }
    break;
    case ('do-what-it-says '):
            doWhatItSays()
    break;
    default:
        console.log('Please Try Again');
    
    };





function spotifyThisSong(song){};

var omdbKey = "5124890f";

function omdb(movie){};

function doWhatItSays(){};
