//const https = require("https");
const bcrypt = require('bcrypt');
IgracKonzola = {};

let symbols = [
    {
        name: "a",
        value: 5
    },
    {
        name: "b",
        value: 6
    },
    {
        name: "c",
        value: 7
    },
    {
        name: "d",
        value: 8
    },
    {
        name: "e",
        value: 9
    },
    {
        name: "f",
        value: 10
    },
    {
        name: "g",
        value: 11
    },
    {
        name: "h",
        value: 12
    },
    {
        name: "j",
        value: 0,
        jackpot: true
    },
    {
        name: "w",
        wild: true,
        value: 0
    },
];
let reels = [
    [
        5, 3, 4, 4, 7, 8, 2, 7, 0, 0, 5,
        6, 5, 1, 7, 2, 1, 1, 2, 2, 0, 0,
        7, 0, 2, 1, 0, 7, 1, 7, 0, 4, 8,
        6, 0, 5, 3, 5, 5, 0
    ],
    [
        4, 0, 7, 3, 2, 4, 1, 9, 4, 5, 4,
        0, 8, 3, 6, 6, 0, 1, 6, 6, 6, 6,
        3, 6, 3, 2, 7, 3, 1, 3, 1, 0, 8,
        7, 4, 5, 3, 2, 5, 1
    ],
    [
        6, 3, 5, 5, 1, 2, 6, 0, 6, 5, 7,
        2, 0, 4, 9, 4, 1, 5, 0, 5, 1, 0,
        7, 5, 1, 6, 1, 8, 3, 4, 7, 7, 3,
        4, 7, 2, 4, 2, 8, 0
    ],
    [
        4, 4, 7, 2, 5, 1, 3, 7, 6, 4, 0,
        4, 7, 0, 6, 6, 0, 3, 9, 1, 8, 2,
        7, 3, 3, 0, 2, 8, 0, 5, 4, 6, 6,
        1, 0, 9, 7, 2, 4, 3
    ],
    [
        1, 0, 4, 0, 0, 2, 0, 6, 1, 6, 8,
        5, 2, 7, 7, 8, 4, 5, 3, 7, 5, 9,
        4, 5, 4, 4, 3, 0, 7, 7, 3, 9, 2,
        6, 2, 9, 9, 3, 3, 3
    ]
];


let screenh = 3;
let reelh = 40;
let screenw = 5;
let reelw = 5;
let symbolnum = 10;

let window = function (reelroll) {
    let matrica = Array(screenw).fill().map(() => Array(screenh).fill(0));
    for (let i = 0; i < screenw; i++) {
        for (let j = 0; j < screenh; j++) {
            let offset = (reelroll[i] + j) % reelh;
            matrica[i][j] = reels[i][offset];
        }
    }
    return matrica;
}
let monete = { 1: 1, 2: 1, 5: 1, 10: 1, 20: 1, 50: 1, 100: 1 };

let calculate = function (vredm, matrica) {
    let kes = 0;
    for (let i = 0; i < symbolnum - 2; i++) {
        let counts = Array(screenw).fill(0);
        for (let x = 0; x < screenw; x++) {
            for (let y = 0; y < screenh; y++) {
                if (matrica[x][y] == i || symbols[matrica[x][y]].wild) {
                    counts[x]++;
                }
            }
        }
        if (counts[0] && counts[1] && counts[2]) {
            let dobk = 0;
            if (counts[4] && counts[3]) {
                dobk = symbols[i].value * 5 * counts[0] * counts[1] * counts[2] * counts[3] * counts[4];
            }
            else if (counts[3]) {
                dobk = symbols[i].value * 4 * counts[0] * counts[1] * counts[2] * counts[3];
            }
            else {
                dobk = symbols[i].value * 3 * counts[0] * counts[1] * counts[2];
            }
            dobk *= vredm / 26.5;
            if (matrica[0][1] == matrica[1][1] && matrica[0][1] == matrica[2][1] && matrica[0][1] == matrica[3][1] && matrica[0][1] == matrica[4][1]) {
                dobk *= symbols[matrica[0][1]].value;
            }
            if (dobk)
                kes += dobk;
        }
    }

    if (matrica[0][1] == matrica[1][1] && matrica[0][1] == matrica[2][1] && matrica[0][1] == matrica[3][1] && matrica[0][1] == matrica[4][1]) {
        if (symbols[matrica[0][1]].jackpot) {
            kes = 1000000 * vredm;
        }
    }

    kes = Math.floor(kes * 4) / 4;

    return kes;
}


IgracKonzola.registrujListenereNeprijavljen = function (gost) {
    let socket = gost.socket;
    socket.removeAllListeners();
    socket.on("registracijaIgraca", function (podaci) {
        Baza.iskoriscenoKorisnickoIme({ korisnicko_ime: podaci.korisnicko_ime }, function (korisnickoImeIskorisceno) {
            if (korisnickoImeIskorisceno) {
                socket.emit("odgovorNaRegistraciju", { uspeh: false, korisnickoImeIskorisceno: true });
                return;
            }
            Baza.dodajIgraca({
                korisnicko_ime: podaci.korisnicko_ime,
                lozinka: podaci.lozinka
            }, function (rezultat) {
                if (rezultat) {
                    var kod_sesije = Math.random();
                    rezultat._id = rezultat._id.toString();
                    Igrac.dodajNovog(gost, rezultat._id, kod_sesije);
                    rezultat.kod_sesije = kod_sesije;
                    socket.emit("odgovorNaRegistraciju", {
                        uspeh: true, igrac: rezultat
                    });
                    Baza.prijavljenIgrac({ _id: rezultat._id, sesije: [kod_sesije] })
                }
                else {
                    socket.emit("odgovorNaRegistraciju", { uspeh: false });
                }
            });

            /*})*/
        });

    });
    socket.on("prijavaIgraca", function (podaci) {
        Baza.nadjiIgraca({ korisnicko_ime: podaci.korisnicko_ime }, function (igrac) {
            if (!igrac) return socket.emit("odgovorNaPrijavu", { uspeh: false, igracNePostoji: true });
            for (var i in Igrac.lista) {//da ne moze jedan da bude prijavljen na dva mesta
                if (Igrac.lista[i]._id == igrac._id) {
                    return socket.emit("odgovorNaPrijavu", { uspeh: false, vecPrijavljen: true });
                }
            }
            bcrypt.compare(podaci.lozinka, igrac.lozinka, function (err, result) {
                if (result) {
                    var kod_sesije = Math.random();
                    igrac._id = igrac._id.toString();
                    Igrac.dodajNovog(gost, igrac._id, kod_sesije);
                    igrac.kod_sesije = kod_sesije;
                    socket.emit("odgovorNaPrijavu", {
                        uspeh: true, igrac: igrac
                    });
                    Baza.prijavljenIgrac({ _id: igrac._id, sesije: [kod_sesije] });
                }
                else {
                    if (!igrac) return socket.emit("odgovorNaPrijavu", { uspeh: false, losaLozinka: true });
                }
            })
        });
    });
    gost.socket.on("disconnect", function () {
        Gost.priOdvezivanju(gost.id);
    })
}
IgracKonzola.registrujListenerePrijavljen = function (igrac) { //MOZDA OVDE TREBA DA PRIMA KORISNIKA, VIDECEMO JOS
    let socket = igrac.socket;
    socket.removeAllListeners();
    igrac.socket.on("odjavljivanje", function (podaci) {
        Baza.obrisiSesijuIgraca({ _id: igrac._id });
        Igrac.priOdvezivanju(igrac.id);
        Gost.dodajNovog(igrac.socket, igrac.id);
        IgracKonzola.registrujListenereNeprijavljen(Gost.lista[igrac.id]);
    });
    igrac.socket.on("online", function () {
        console.log("online igrac");
    })
    igrac.socket.on("vrti", function (podaci) {
        if (!podaci.ulog || !monete[podaci.ulog]) {
            return igrac.socket.emit("odgovorNaVrtenje", { uspeh: false });
        }

        Baza.procitajIgracevKredit({ _id: igrac._id }, function (res) {
            if (!res || res < podaci.ulog) {
                return igrac.socket.emit("odgovorNaVrtenje", { uspeh: false });
            } let reelroll = [Math.floor(Math.random() * reelh), Math.floor(Math.random() * reelh), Math.floor(Math.random() * reelh), Math.floor(Math.random() * reelh), Math.floor(Math.random() * reelh)];
            let matrica = window(reelroll);
            let dobitak = calculate(podaci.ulog, matrica);
            Baza.rashodi += dobitak;
            Baza.prihodi += podaci.ulog;
            Baza.brojigara++;
            if (dobitak > 0)
                Baza.dobijene++;
            Baza.prikaziPrihodeIRashode();
            Baza.postaviPrihodeIRashode();
            let novk = res + dobitak - podaci.ulog;
            Baza.postaviIgracevKredit({ _id: igrac._id, kredit: novk }, function (res) {
                if (res) {
                    return igrac.socket.emit("odgovorNaVrtenje", { uspeh: true, matrica: matrica, dobitak: dobitak, kredit: novk, reelroll: reelroll });
                }
                else {
                    return igrac.socket.emit("odgovorNaVrtenje", { uspeh: false });
                }
            })
        })
    })
    igrac.socket.on("zatraziStanje", function (podaci) {
        Baza.procitajIgracevKredit({ _id: igrac._id }, function (res) {
            if (res || res === 0) {
                igrac.socket.emit("stigloStanje", { kredit: res, uspeh: true });
            }
            else {
                igrac.socket.emit("stigloStanje", { uspeh: false });
            }
        })
    })
    igrac.socket.on("disconnect", function () {
        Igrac.priOdvezivanju(igrac.id);
    })
    //OVDE IDE DISCONNECT
}
