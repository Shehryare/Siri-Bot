require("dotenv").config();
var fs = require('fs');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var request = require('request');
var axios = require('axios');
var moment = require('moment')



var spotify = new Spotify(keys.spotify);
var bandsInTown = keys.bandsInTown

var command = process.argv[2];
var userInput = process.argv.slice(3).join(" ");

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
    case ('concert-this'):
            if(userInput){
                concert(userInput)
            } else {
                concert('Mr. Nobody.');
            }
        break;
    case ('do-what-it-says'):
            doWhatItSays()
    break;
    default:
        console.log('Please Try Again');
    
    };





function spotifyThisSong(song){
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
      console.log("Album: " + data.tracks.items[0].album.name);
        console.log("Release Date: " + data.tracks.items[0].album.release_date);

 
      });
};

function concert(concert){

}


var omdbKey = "trilogy";

function omdb(movie){
    var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&apikey=' + omdbKey + '&plot=short&tomatoes=true';
    request(omdbURL, function(error, response, body){
        if(!error && response.statusCode == 200){
            var body = JSON.parse(body);
            console.log("Title: " + body.Title);
            console.log("Release Year: " + body.Year);
            console.log("IMdB Rating: " + body.imdbRating);
            console.log("Country: " + body.Country);
            console.log("Language: " + body.Language);
            console.log("Plot: " + body.Plot);
            console.log("Actors: " + body.Actors);
            console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
            console.log("Rotten Tomatoes URL: " + body.tomatoURL);
        } else {
            console.log(body);
            console.log('-----------Error------------')
        }
        
        if(movie === "Mr. Nobody"){
            console.log("-----------------------");
        }
    })
};

function doWhatItSays(){
    fs.readFile('random.txt', "utf8", function(error, data){
        var txt = data.split(',');
        spotifyThisSong(txt[1]);
        return txt;
    })
};
