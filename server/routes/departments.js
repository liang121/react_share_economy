var express = require("express");
var router  = express.Router();
// var mongojs = require('mongojs');
// var connectToDatabase = require ('../connectToDb/connectToDatabase');
// var db_xchange = connectToDatabase.connection;
var bodyParser = require('body-parser');

router.get('/',function(req,res){
    res.json([
                {
                    elecCompItems: [
                        "TV & Video",
                        "Home Audio & Theater",
                        "Camera, Photo & Video",
                        "Cell Phones & Accessories",
                        "Headphones",
                        "Bluetooth & Wireless Speakers",
                        "Car Electronics",
                        "Musical Instruments",
                        "Wearable Technology",
                        "Computers & Tablets",
                        "Monitors",
                        "Computer Parts & Components"
                    ]
                },
                {
                    autoIndItems: [
                        "Automotive Parts & Accessories",
                        "Automotive Tools & Equipment",
                        "Car/Vehicle Electronics & GPS",
                        "Tires & Wheels",
                        "Motorcycle & Powersports",
                        "Your Garage",
                        "Industrial Supplies",
                        "Safety"
                    ]
                },
                {
                    movieMusicGameItems: [
                        "Movies & TV",
                        "Blu-ray",
                        "Amazon Video",
                        "CDs & Vinyl",
                        "Digital Music",
                        "Musical Instruments",
                        "Headphones",
                        "Video Games",
                        "PC Gaming",
                        "Digital Games"
                    ]
                },
                {
                    homeServicesItems: [
                        "Home Improvement & Repair",
                        "Yard & Outdoors",
                        "Computer & Electronics",
                        "Assembly",
                        "Cleaning",
                        "Plumbing",
                        "Electrical",
                        "Home Theater"
                    ]
                }
            ]);
    
})
 module.exports = router;