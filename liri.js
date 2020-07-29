//reqire methods for all the diffrent modules.
require("dotenv").config();
var fs = require('fs');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var request = require('request');
var axios = require('axios');
var moment = require('moment')



var spotify = new Spotify(keys.spotify); //calls for the spotify ID from keys.js
var bandsInTown = keys.bandsInTown

var command = process.argv[2];  //turns the third input on the command line into a variable 
var userInput = process.argv.slice(3).join(" "); //turns the fourth input on the command line into a variable and makes it inside a string to pass multiple words.

//Switch statement to take in two user input for to gather specific API. 
switch (command){
    case ('spotify-this-song'): //case for spotify API
        if(userInput){
            spotifyThisSong(userInput);
        } else{
            spotifyThisSong("My Heart Will Go On");
        };
    break;
    case ('movie-this'): //case to gather movie API
        if(userInput){
            omdb(userInput)
        } else {
            omdb('Mr. Nobody.');
        }
    break;
    case ('concert-this'): //case to gather concert information. 
            if(userInput){
                concert(userInput)
            } else {
                concert('Mr. Nobody.');
            }
        break;
    case ('do-what-it-says'): //case to gather information from random txt. 
            doWhatItSays()
    break;
    default:
        console.log('Please Try Again');
    
    };




//function for spotify API (no axios required)
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
//function for concert API
function concert(concert){
//bands in town API was not avalible but here is my take at working logic. 
let bandsFakeAPI = "13722599";
let bandsInTownURL = "http://www.bandsintown.com/event/13722599?app_id=" + bandsFakeAPI + concert;
axios.get(bandsInTownURL).then((response) => { //axios method to gather bands in town URL.
    console.log(response)
    let concertData = response.data
    console.log(concertData)
}
)}


var omdbKey = "trilogy";

//function to gather movie information using the ombd key
function omdb(movie){
    var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&apikey=' + omdbKey + '&plot=short&tomatoes=true';
    request(omdbURL, function(error, response, body){ //request method get the ombdkey.
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
        
        if(movie === "Mr. Nobody"){ //Defualt if Mr. Nodody is typed.
            console.log("-----------------------");
        }
    })
};
//function that takes all the information from random.txt and displays it on the console
function doWhatItSays(){
    fs.readFile('random.txt', "utf8", function(error, data){
        var txt = data.split(',');
        spotifyThisSong(txt[1]);
        return txt;
    })
};
