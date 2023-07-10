const gameCont = document.querySelector(".container");
const box = document.querySelectorAll(".box");
const info = document.querySelector(".info");
const win = document.querySelector(".imgBox");
const reset = document.querySelector("#reset");
const game = document.querySelectorAll("#play");
const gameInfo = document.querySelector(".gameInfo");
const line = document.querySelector(".line");
const x = window.matchMedia("(max-width:500px)");
let turnImg = "circle.png", turn = "O";
info.innerText = "Turn for " + turn;
let board = [[], [], []];
let won = false, draw = false;
function changeTurn() {
    if (turn === "O") {
        turn = "X";
        turnImg = "cross.png"
    }
    else {
        turn = "O";
        turnImg = "circle.png"
    }
    return turnImg;
}
function computerAI(arr) {
    console.log(arr);
}
function checkWin() {
    let wins = [
        [0, 1, 2, 0, 4.5, 0, 0, 7.5],
        [3, 4, 5, 0, 14.5, 0, 0, 26.5],
        [6, 7, 8, 0, 24.5, 0, 0, 44.5],
        [0, 3, 6, -10, 14.5, 90, -18, 26.5],
        [1, 4, 7, 0, 14.5, 90, 0, 26.5],
        [2, 5, 8, 10, 14.5, 90, 18, 26.5],
        [0, 4, 8, -3, 15, 45, -5, 27.5],
        [2, 4, 6, -3, 14, -45, -5, 24.5]
    ]
    wins.forEach(e => {
        if (box[e[0]].children[0].className !== "imgnone" &&
            ((box[e[0]].children[0].className === box[e[1]].children[0].className) &&
                (box[e[1]].children[0].className === box[e[2]].children[0].className)) &&
            ((box[e[0]].children[0].src === box[e[1]].children[0].src) &&
                (box[e[1]].children[0].src === box[e[2]].children[0].src))) {
            line.style.display = "inline";
            if (e[5] === 45 || e[5] === -45) line.style.width = "123%";
            else line.style.width = "100%";
            if (x.matches) line.style.transform = `translate(${e[6]}vw, ${e[7]}vw) rotate(${e[5]}deg)`;
            else line.style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            won = true;
        }
    });
    return won;
}
function drawn() {
    let cnt = 0;
    game.forEach(item => {
        if (item.className === "boximg") cnt++;
    });
    if (cnt === 9) {
        draw = true;
        gameCont.style.pointerEvents = "none";
    }
    return draw;
}
box.forEach(item => {
    item.addEventListener("click", () => {
        if (item.children[0].className === "imgnone") {
            item.children[0].className = "boximg";
            item.children[0].src = turnImg;
            // let i = parseInt(item.id);
            // board[Math.floor(i / 3)][i % 3] = turn;
            // computerAI(board);
            turnImg = changeTurn();
            if (checkWin()) {
                changeTurn();
                if (x.matches) win.childNodes[1].style.width = "40vw";
                else win.childNodes[1].style.width = "20vw";
                info.innerText = `${turn} won!`;
                gameCont.style.pointerEvents = "none";
                gameInfo.style.justifyContent = "space-between";
            }
            else if (drawn()) info.innerText = "Game Drawn";
            else info.innerText = "Turn for " + turn;
        }
    });
});
reset.addEventListener("click", () => {
    win.childNodes[1].style.width = "0px";
    turn = "O";
    turnImg = "circle.png";
    game.forEach(item => item.className = "imgnone");
    info.innerText = "Turn for " + turn;
    won = false, draw = false;
    gameCont.style.pointerEvents = "";
    gameInfo.style.justifyContent = "";
    line.style.display = "none";
    board = [[], [], []];
});