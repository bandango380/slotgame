require("./Gost");
require("../socket/managers/IgracKonzola")

Igrac = function (gost, _id, kod_sesije) {
    var self = {};
    self.id = gost.id;
    self.socket = gost.socket;
    self._id = _id;
    self.kod_sesije = kod_sesije;
    Gost.priOdvezivanju(gost.id);
    Igrac.lista[self.id] = self;
    return self;
};
Igrac.lista = {};

Igrac.dodajNovog = function (gost, _id, kod_sesije) {
    var igrac = Igrac(gost, _id, kod_sesije);
    IgracKonzola.registrujListenerePrijavljen(igrac);
    //ZA SADA RADIM BEZ ONDISCONNECT, DA VIDIM DA LI JE STVARNO POTREBNO //OVAJ KOMENTAR JE NAJVRV GLUPOST
}
Igrac.priOdvezivanju = function (id) {
    delete Igrac.lista[id];
}