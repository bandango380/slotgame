import React, { Component } from "react";
import SlotMachine from "../components/SlotMachine";

const rootElement = document.getElementById('root')

let gls = { self: null };

export default class GameScreen extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = { ucitavanje: true, brojac: 0 };
        this.kredit = 0;
        this.slotMachine = React.createRef();
        this.reelroll = [];
        gls.self = this;
        this.symbols = [
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
        this.symbols[0].slika = new Image();
        this.symbols[0].slika.src = "http://localhost:80/client/brada.jpg";
        this.symbols[1].slika = new Image();
        this.symbols[1].slika.src = "http://localhost:80/client/kapa.jpg";
        this.symbols[2].slika = new Image();
        this.symbols[2].slika.src = "http://localhost:80/client/pivo.jpg";
        this.symbols[3].slika = new Image();
        this.symbols[3].slika.src = "http://localhost:80/client/brod.jpg";
        this.symbols[4].slika = new Image();
        this.symbols[4].slika.src = "http://localhost:80/client/cekic.jpg";
        this.symbols[5].slika = new Image();
        this.symbols[5].slika.src = "http://localhost:80/client/sekira.jpg";
        this.symbols[6].slika = new Image();
        this.symbols[6].slika.src = "http://localhost:80/client/rog.jpg";
        this.symbols[7].slika = new Image();
        this.symbols[7].slika.src = "http://localhost:80/client/stit.jpg";
        this.symbols[8].slika = new Image();
        this.symbols[8].slika.src = "http://localhost:80/client/novcic.jpg";
        this.symbols[9].slika = new Image();
        this.symbols[9].slika.src = "http://localhost:80/client/wild.jpg";
        this.reels = [
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
        this.matrica = [[8, 8, 8], [8, 8, 8], [8, 8, 8], [8, 8, 8], [8, 8, 8]];
        this.screenh = 3;
        this.reelh = 40;
        this.screenw = 5;
        this.reelw = 5;
        this.monete = [1, 2, 5, 10, 20, 50, 100];
        this.symbolnum = 10;
    }
    componentDidMount() {
        let self = this;
        //self.slotMachine.current.spinTo(self.matrica);
        global.socket.emit("zatraziStanje");
        global.socket.once("stigloStanje", function (podaci) {
            if (podaci.uspeh) {
                self.kredit = podaci.kredit;
                self.setState({ ucitavanje: false });
                self.setState({ brojac: self.state.brojac + 1 });
            }
        })
        global.socket.on("odgovorNaVrtenje", function (podaci) {
            if (podaci.uspeh) {
                setTimeout(() => {
                    gls.self.setState({ brojac: gls.self.state.brojac + 1 });
                }, 1000)
                gls.self.matrica = podaci.matrica;
                gls.self.kredit = podaci.kredit;
                self.slotMachine.current.spinTo(self.matrica.map(a => a.map(e => self.symbols[e])));
            }
            else {
                alert("Neuspesno");
            }
        })
    }
    render() {
        let self = this;
        return self.state.ucitavanje ?
            <div>
                ucitavanje
            </div> :
            <div style={{
                position: "absolute",
                backgroundImage: `url("http://localhost:80/client/pozadina.jpg")`, height: "100vh", width: "100vw",
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}>
                <p>Krediti: {self.kredit}</p>
                <table>
                    {
                        self.matrica[0].map((_, colIndex) => self.matrica.map(row => row[colIndex])).map(e =>
                        (<tr>
                            {e.map(e1 => (<td>{e1}</td>))}
                        </tr>)
                        )
                    }</table>
                <button onClick={() => { global.socket.emit("vrti", { ulog: 1 }) }}>1</button>
                <button onClick={() => { global.socket.emit("vrti", { ulog: 2 }) }}>2</button>
                <button onClick={() => { global.socket.emit("vrti", { ulog: 5 }) }}>5</button>
                <button onClick={() => { global.socket.emit("vrti", { ulog: 10 }) }}>10</button>
                <button onClick={() => { global.socket.emit("vrti", { ulog: 20 }) }}>20</button>
                <button onClick={() => { global.socket.emit("vrti", { ulog: 50 }) }}>50</button>
                <button onClick={() => { global.socket.emit("vrti", { ulog: 100 }) }}>100</button>
                <div style={{ marginLeft: 200, width: 1200, display: 'flex', justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                    <SlotMachine reels={self.reels} ref={self.slotMachine}></SlotMachine>
                    <div id="root"></div>
                </div>
            </div>;
    }
}
