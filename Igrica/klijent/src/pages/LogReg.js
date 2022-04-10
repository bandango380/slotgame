import { Component } from "react";
import React from "react";
export default class LogReg extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = { korisnicko_ime: "", lozinka: "", register: false };
    }
    componentDidMount() {

    }
    render() {
        let self = this;
        return <div>
            <label>Korisnicko ime </label>
            <input value={self.state.korisnicko_ime} onChange={(e) => self.setState({ korisnicko_ime: e.target.value })} type={"text"}></input><br></br>
            <label>Lozinka </label>
            <input value={self.state.lozinka} onChange={(e) => self.setState({ lozinka: e.target.value })} type={"password"}></input>
            <button onClick={() => {
                if (/^[A-Za-z0-9_]{1,29}$/.test(self.state.korisnicko_ime) && self.state.lozinka.length > 0) {
                    global.socket.emit("prijavaIgraca", { korisnicko_ime: self.state.korisnicko_ime, lozinka: self.state.lozinka });
                    global.socket.once("odgovorNaPrijavu", function (podaci) {
                        if (podaci.uspeh) {
                            global.igrac = podaci.igrac;
                            global.cookies.set('_id', podaci.igrac._id.toString(), { path: '/', expires: (new Date(new Date().getTime() + 2592000000)) });
                            global.cookies.set('kod_sesije', podaci.igrac.kod_sesije.toString(), { path: '/', expires: (new Date(new Date().getTime() + 2592000000)) });
                            window.location.reload(false);
                        }
                        else {
                            alert("neuspeh");
                        }
                    })
                }
            }}>Prijavi se</button>
            <button onClick={() => {
                if (/^[A-Za-z0-9_]{1,29}$/.test(self.state.korisnicko_ime) && self.state.lozinka.length > 0) {
                    global.socket.emit("registracijaIgraca", { korisnicko_ime: self.state.korisnicko_ime, lozinka: self.state.lozinka });
                    global.socket.once("odgovorNaRegistraciju", function (podaci) {
                        if (podaci.uspeh) {
                            global.igrac = podaci.igrac;
                            global.cookies.set('_id', podaci.igrac._id.toString(), { path: '/', expires: (new Date(new Date().getTime() + 2592000000)) });
                            global.cookies.set('kod_sesije', podaci.igrac.kod_sesije.toString(), { path: '/', expires: (new Date(new Date().getTime() + 2592000000)) });
                            window.location.reload(false);
                        }
                        else {
                            alert("neuspeh");
                        }
                    })
                }
            }}>Registruj se</button>
        </div>;
    }
}
