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
        oznaka: "j",
        value: 0,
        jackpot: true
    },
    {
        name: "w",
        wild: true,
        value: 0
    },
];
/*let reels = [
    [0, 0, 1, 5, 4, 0, 2, 0, 5, 0, 3, 0, 4, 0, 0, 1, 0, 0, 5, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 1, 2, 5, 2, 1, 3, 7, 4, 1, 1, 5, 0, 7, 2, 0, 1, 1, 2, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 2, 2, 0, 2, 3, 2, 1, 5, 1, 0, 7, 7, 2, 4, 2, 0, 1, 2, 2, 1, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [3, 1, 0, 2, 3, 0, 0, 3, 3, 1, 1, 3, 2, 3, 7, 3, 7, 3, 7, 4, 3, 4, 3, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [4, 3, 4, 4, 7, 4, 2, 5, 0, 7, 0, 4, 2, 1, 1, 3, 4, 0, 2, 4, 4, 3, 4, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]*/
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
let brojdobitaka = 0;
let wildnum = 8;
let reelroll = Array(reelw).fill(0); //U igri random
let matrica = Array(screenw).fill().map(() => Array(screenh).fill(0));
for (let i = 0; i < reelh * reelw; i++) {
    //console.log(i)
    //reels[Math.floor(i / reelh)][i % reelh] = Math.floor(Math.random() * (symbolnum - 1));
}
/*for (let i = 0; i < wildnum; i++) {
    let poz = Math.floor(Math.random() * reelh * reelw);
    reels[Math.floor(poz / reelh)][poz % reelh] = symbolnum - 1;
}*/

let miz = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]

let maxkes = 0;
let window = function () {
    for (let i = 0; i < screenw; i++) {
        for (let j = 0; j < screenh; j++) {
            let offset = (reelroll[i] + j) % reelh;
            matrica[i][j] = reels[i][offset];
        }
    }
}
let calculate = function (vredm) {
    let kes = 0;
    let supr = {};

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

    if (kes > 0) brojdobitaka++;
    if (kes > maxkes) maxkes = kes;
    return kes;
}

let monete = [1, 2, 5, 10, 20, 50, 100];
for (let i in monete) {
    let vredm = monete[i];
    let brojkomb = 0;
    let osvojeno = 0;
    let runde = 0;
    maxkes = 0;
    brojdobitaka = 0;
    while (true) {
        let br = brojkomb;
        for (let i = 0; i < reelw; i++) { //Pravi kombinaciju reelova
            reelroll[i] = br % reelh;
            br = Math.floor(br / reelh);
        }
        if (br > 0) {
            break;
        }
        runde++;
        window();
        let dob = calculate(vredm);
        osvojeno += dob;
        //console.log(osvojeno);
        if (brojkomb % 1024000 == 0) {
            console.log((brojkomb / 1024000) + "%");
        }
        brojkomb++;
    }
    console.log("------------------------------------------")
    console.log("Vrednost uloga:        " + vredm)
    console.log("Usao sa:               " + (runde * vredm));
    console.log("Izasao sa:             " + osvojeno);
    console.log("RTP:                   " + (100 * osvojeno / (runde * vredm)) + "%");
    console.log("Procenat isplacenih:   " + (100 * brojdobitaka / runde) + "%");
    console.log("Maksimalna zarada:     " + maxkes);
    console.log("------------------------------------------")
}
