require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var http = require('http').Server(app);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// mongoose.connection.on("open", function (err) {
//     if (err) {
//         console.log("database error");
//         console.log(err);
//         console.error(err, "mongoose connection open handler", 10);
//     } else {
//         console.log("database connection open success");
//         mongoose.set('debug', false);
//     }
// });

// mongoose.connection.on("error", function (err) {
//     console.log("database connection error");
//     console.log(err);
//     console.error(err, "mongoose connection on error handler", 10);
// });

mongoose.connect(
    process.env.DB_CON_STRING,
    { useNewUrlParser: true },
    { useUnifiedTopology: true },
    (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Successfully Connected to the database');
        }
    }
);

app.use(express.static(__dirname + '/'));
app.use('/api', require('./api'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

http.listen(process.env.ApiPort, function () {
    console.log('listening on *:' + process.env.ApiPort);
});