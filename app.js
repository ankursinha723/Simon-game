let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let score = 0;
let best = 0;

let h2 = document.querySelector("h2");
let h4 = document.querySelector("h4");
let clickSound = new Audio("clickSound.wav");
let loseSound = new Audio("loseSound.wav");

let btns = ["green", "red", "yellow", "blue"];

document.addEventListener("keypress", function () {
    if (started == false) {
        started = true;
        console.log("Game started");

        levelUp();
    }
});

document.addEventListener("click", function () {
    if (started == false) {
        started = true;
        console.log("Game started");

        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("gameFlash");
    setTimeout(function () {
        btn.classList.remove("gameFlash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp() {
    userSeq = [];

    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    gameFlash(randBtn);
};

function checkSequence(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        score = level;
        h2.innerHTML = `Game over! Your score is <b>${score}</b> <br>Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        
        if (score > best) {
            best = score;
        }

        h4.innerText = `Best : ${best}`;

        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
            loseSound.play();
            reset();
        }, 250);
    }
}

function btnPress() {
    let btn = this;
    btn.classList.add("userFlash");
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkSequence(userSeq.length - 1);
    clickSound.play();
};

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
};

function reset() {
    gameSeq = [];
    userSeq = [];
    started = false;
    level = 0;
}