import React, { Component } from "react";

const glself = { self: null }

export default class SlotMachine extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {};
        this.reels = props.reels;
        this.matrica = [];
        this.canvasRef = React.createRef();
        this.reelslika = new Image();
        this.reelslika.src = "http://localhost:80/client/reel.png";
        glself.self = this;
    }
    componentDidMount() {

    }
    showResult(matrica, reelroll) {
        let canvas = this.canvasRef.current;
        let ctx = canvas.getContext("2d");
        //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        let mojm = matrica[0].map((_, colIndex) => matrica.map(row => row[colIndex]));
        for (let i = 0; i < mojm.length; i++) {
            for (let j = 0; j < mojm[0].length; j++) {
                ctx.drawImage(mojm[i][j].slika, 0, 0, 150, 150, j * 150, i * 150, 150, 150);
            }
        }
        for (let i = 0; i < mojm[0].length - 1; i++) {//5
            for (let j = 0; j < mojm.length; j++) {//3
                for (let j1 = 0; j1 < mojm.length; j1++) {
                    console.log(mojm);
                    console.log(i);
                    console.log(j);
                    console.log(j1);
                    if (mojm[j][i].name == mojm[j1][i + 1].name
                        && matrica[0].includes(mojm[j][i]) && matrica[1].includes(mojm[j][i]) && matrica[2].includes(mojm[j][i])
                        && !mojm[j][i].jackpot) {

                        ctx.beginPath();
                        ctx.moveTo(i * 150 + 75, j * 150 + 75);
                        ctx.lineTo((i + 1) * 150 + 75, j1 * 150 + 75);
                        ctx.stroke();

                    }
                }
            }
        }
        console.log(matrica);
    }
    spinTo(matrica, reelroll) {
        let i = 0
        let ter = setInterval(() => {
            let ctx = glself.self.canvasRef.current.getContext("2d");
            let slika = glself.self.reelslika;
            console.log(ctx);
            ctx.clearRect(0, 0, 750, 450);
            ctx.drawImage(slika, 0, 0, 150, 1800, 0, (i * 75) % 1500 - 1500, 150, 1800);
            ctx.drawImage(slika, 0, 0, 150, 1800, 150, (i * 3 * 75) % 1500 - 1500, 150, 1800);
            ctx.drawImage(slika, 0, 0, 150, 1800, 300, (i * 2 * 75) % 1500 - 1500, 150, 1800);
            ctx.drawImage(slika, 0, 0, 150, 1800, 450, (i * 75) % 1500 - 1500, 150, 1800);
            ctx.drawImage(slika, 0, 0, 150, 1800, 600, (i * 2 * 75) % 1500 - 1500, 150, 1800);
            i++;
            if (i > 20) {
                clearInterval(ter);
                glself.self.showResult(matrica, reelroll);
            }
        }, 50);

    }
    render() {
        let self = this;
        return <canvas ref={self.canvasRef} width={750} height={450}></canvas>;
    }
}
