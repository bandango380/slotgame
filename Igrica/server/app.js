require("./server/model/Gost");
require("./server/database/Database")

//komss

Bools = {};
Bools.regKupon = 0;
Bools.enableToken = function () {
    Bools.regKupon++;
}

const express = require('express');
//const https = require("https");
const http = require("http");
const fs = require("fs");
var app = express();
const serv = http.createServer(app);
var io = require('socket.io')(serv, {
    cors: {
        origin: "*",
    }//OBAVEZNO OBRISATI CORS SVOJSTVO*/
});
var favicon = require('serve-favicon');
var path = require('path');

app.use(favicon(__dirname + '/client/favicon.ico'));
let igricaIndeks = function (req, res) {
    res.sendFile(path.join(__dirname, '/game/index.html'), function (err) {
        if (err) {
            res.status(500).send(err)
        }
    })
}
app.get('/', igricaIndeks);

app.use("/game", express.static(__dirname + '/game'));
app.use("/client", express.static(__dirname + '/client'));


Baza.procitajPrihodeIRashode({}, function (rez) {
    if (!rez) return;
    else {

        serv.listen(80, () => {
        });
        io.on('connection', (socket) => {
            Gost.dodajNovog(socket);
        });
    }
})
