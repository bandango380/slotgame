require("../socket/managers/IgracKonzola")
require("./Igrac")
require("../database/Database")
require("../lib/IDManager")

const bcrypt = require('bcrypt');
const saltRounds = 10;

Gost = function (socket, id) {
    let self = {};
    if (id) {
        self.id = id;
    }
    else {
        self.id = generisiID();
    }
    self.socket = socket;
    Gost.lista[self.id] = self;
    return self;
};
Gost.lista = {};

Gost.dodajNovog = function (socket, id) {
    console.log("Gostic");
    let gost = Gost(socket, id);
    socket.removeAllListeners();
    gost.socket.on("disconnect", function () {
        Gost.priOdvezivanju(gost.id);
        obrisiID(gost.id);
    })
    gost.socket.emit("zatraziAutentikaciju");

    gost.socket.on("online", function () {
        console.log("online gost");
    })

    gost.socket.on("autentikacija", function (podaci) {
        if (podaci.konzola == "Igrac") {
            if (podaci._id && podaci.kod_sesije) {
                if (!/^[a-f0-9]{24}$/.test(podaci._id)) return socket.emit("odgovorNaAutentikaciju", { uspeh: false });
                Baza.nadjiIgraca({ _id: podaci._id }, function (igrac) {
                    if (igrac) {
                        for (let i in igrac.sesije) {
                            if (igrac.sesije[i] == podaci.kod_sesije) {
                                Igrac.dodajNovog(gost, podaci._id, podaci.kod_sesije);
                                socket.emit("odgovorNaAutentikaciju", {
                                    uspeh: true,
                                    igrac: igrac
                                });
                                return;
                            }
                        }
                        IgracKonzola.registrujListenereNeprijavljen(gost);
                        socket.emit("odgovorNaAutentikaciju", {
                            uspeh: false
                        });
                    }
                    else {
                        IgracKonzola.registrujListenereNeprijavljen(gost);
                        socket.emit("odgovorNaAutentikaciju", {
                            uspeh: false
                        });
                    }
                })
            }
            else {
                IgracKonzola.registrujListenereNeprijavljen(gost);
                socket.emit("odgovorNaAutentikaciju", {
                    uspeh: false
                });
            }

        }
    })
}

Gost.priOdvezivanju = function (id) {
    delete Gost.lista[id];
};