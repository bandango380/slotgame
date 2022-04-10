import logo from './logo.svg';
import './App.css';
import { Component } from "react";
import { io } from "socket.io-client";
import Cookies from "universal-cookie";
import LogReg from './pages/LogReg';
import GameScreen from './pages/GameScreen';
import React from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { loading: true, loggedIn: false };
  }
  componentDidMount() {
    document.title = "Igrica";
    let self = this;
    global.cookies = new Cookies();
    const SERVIP = "localhost";
    global.socket = io("http://" + SERVIP + ":80");
    global.socket.on("zatraziAutentikaciju", function (podaci) {
      if (global.igrac && global.igrac._id && global.igrac.kod_sesije) {
        global.socket.emit("autentikacija", { konzola: "Igrac", _id: global.igrac._id, kod_sesije: global.igrac.kod_sesije });
      }
      else {
        global.socket.emit("autentikacija", { konzola: "Igrac" });
      }
    })
    global.functions = {};
    global.functions.login = () => {
      self.setState({ loggedIn: true });
    };
    let _id = global.cookies.get("_id");
    let kod_sesije = global.cookies.get("kod_sesije");
    self.setState({ loading: true, loggedIn: false })
    global.igrac = {};
    global.igrac._id = _id;
    global.igrac.kod_sesije = kod_sesije;
    global.socket.once("odgovorNaAutentikaciju", function (podaci) {
      if (podaci.uspeh) {
        let ks = global.igrac.kod_sesije;
        global.igrac = podaci.igrac;
        global.igrac.kod_sesije = ks;
        self.setState({ loading: false, loggedIn: true });
      }
      else {
        self.setState({ loading: false, loggedIn: false });
      }
    })
  }
  render() {
    let self = this;
    if (self.state.loading) {
      return <div>Loading</div>
    }
    if (self.state.loggedIn) {
      return <GameScreen></GameScreen>
    }
    else {
      return <LogReg></LogReg>
    }
  }
}
