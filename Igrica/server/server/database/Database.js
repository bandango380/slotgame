const bcrypt = require('bcrypt');
const saltRounds = 10;
const mongojs = require('mongojs');
/*mongodb://wfAShUasUf88234y8:A7adD72T7a8214kita@localhost:27017/fastguest */
const db = mongojs('localhost:27017/igricica', ['igraci', 'administracija']);
Baza = {};
var ObjectId = require('mongodb').ObjectID;

Baza.prihodi = 0;
Baza.rashodi = 0;
Baza.brojigara = 0;
Baza.dobijene = 0;
Baza.prikaziPrihodeIRashode = function () {
    console.log("O------------------------------O");
    console.log("Prihodi:           " + Baza.prihodi)
    console.log("Rashodi:           " + Baza.rashodi)
    console.log("Broj igara:        " + Baza.brojigara)
    console.log("Broj dobijenih:    " + Baza.dobijene)
    console.log("________________________________");
    console.log("RTP:               " + Math.floor(Baza.rashodi / Baza.prihodi * 10000) / 100)//Ovo nije rtp
    console.log("Dobijene/igrane:   " + Math.floor(Baza.dobijene / Baza.brojigara * 10000) / 100)
    console.log("O------------------------------O");
}

Baza.nadjiIgraca = function (query, cb) {
    if (query._id)
        query._id = ObjectId(query._id);
    db.igraci.findOne(query, function (err, res) {
        if (err || !res) {
            return cb(false);
        }
        return cb(res);
    })
}

Baza.iskoriscenoKorisnickoIme = function (podaci, cb) {
    db.igraci.findOne({ korisnicko_ime: podaci.korisnicko_ime }, function (err, res) {
        if (res) return cb(true);
        else return cb(false);
    });
}

Baza.dodajIgraca = function (podaci, cb) {
    bcrypt.hash(podaci.lozinka, saltRounds, function (err, hash) {
        db.igraci.insert({
            korisnicko_ime: podaci.korisnicko_ime,
            lozinka: hash,
            kredit: 1000.0
        }, function (err, res) {
            if (!err) cb(res);
            else cb(false);
        })
    });
};

Baza.procitajIgracevKredit = function (podaci, cb) {
    db.igraci.findOne({ _id: ObjectId(podaci._id) }, { kredit: 1 }, function (err, res) {
        if (err || !res) {
            return cb(false);
        }
        return cb(res.kredit);
    })
}
Baza.postaviIgracevKredit = function (podaci, cb) {
    db.igraci.updateOne({ _id: ObjectId(podaci._id) }, { $set: { kredit: podaci.kredit } }, function (err, res) {
        if (err || !res) {
            return cb(false);
        }
        return cb(true);
    })
}
Baza.postaviPrihodeIRashode = function (podaci, cb) {
    db.administracija.updateOne({}, { $set: { prihodi: Baza.prihodi, rashodi: Baza.rashodi, brojigara: Baza.brojigara, dobijene: Baza.dobijene } }, function (err, res) { });
}
Baza.procitajPrihodeIRashode = function (podaci, cb) {
    db.administracija.findOne({ _id: ObjectId("62525b5751ca184999630022") }, { prihodi: 1, rashodi: 1, brojigara: 1, dobijene: 1 }, function (err, res) {
        if (!err && res) {
            Baza.prihodi = res.prihodi;
            Baza.rashodi = res.rashodi;
            Baza.brojigara = res.brojigara;
            Baza.dobijene = res.dobijene;
            Baza.prikaziPrihodeIRashode();
            return cb(true);
        }
        return cb(false);
    });
}

Baza.dobarKodSesijeIgraca = function (podaci, cb) {
    db.igraci.findOne({ _id: ObjectId(podaci._id) }, function (err, res) {
        if (err || !res) return cb(false);
        for (var i in res.sesije) {
            if (res.sesije[i] == podaci.kod_sesije) {
                return cb(res);
            }
        }
        return cb(false);
    });
}
Baza.prijavljenIgrac = function (podaci, cb) {
    //ses = [podaci.kod_sesije]; //res.sesije.concat([podaci.kod_sesije]);
    db.igraci.updateOne({ _id: ObjectId(podaci._id) }, { $set: { sesije: podaci.sesije } }, function (err, res) {
        //return cb(true);
        return null;//NEMA PROVERE GRESKE
    });
};
Baza.obrisiSesijuIgraca = function (podaci, cb) {
    ses = []; //res.sesije.concat([podaci.kod_sesije]);
    db.igraci.updateOne({ _id: ObjectId(podaci._id) }, { $set: { sesije: podaci.sesije } }, function (err, res) {
        //return cb(true);
        return null;//NEMA PROVERE GRESKE
    });
};