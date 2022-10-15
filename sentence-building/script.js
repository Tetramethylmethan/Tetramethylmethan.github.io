var i = 0;
var deSenNr = 0;
var enSenNr = 0;
var score = 0;

var deadMenu = document.getElementById("deadMenu");
deadMenu.style.display = 'none';

var health = 5;
var healthArr = [document.getElementById('b5'), document.getElementById('b4'), document.getElementById('b3'), document.getElementById('b2'), document.getElementById('b1'),]


function setHighscore(s) {
    var A = getHighscore()['A'];
    var B = getHighscore()['B'];
    var C = getHighscore()['C'];
    if (isNaN(parseInt(B))) {
        document.cookie = "werte=" + A + "," + s + "," + C + " ;domain=tetramethylmethan.github.io ; path=/";
    } else {
        if (s > parseInt(B)) {
            document.cookie = "werte=" + A + "," + s + "," + C + " ;domain=tetramethylmethan.github.io ; path=/";
        }
    }
}

function getHighscore() {
    let cookie = document.cookie;
    var values = cookie.slice(6);

    var A = values.charAt(0);
    var B = values.charAt(2);
    var C = values.charAt(4);

    //"werte=0,0,0 ; domain=tetramethylmethan.github.io ; path=."

    if (typeof parseInt(A) != "number" || A == undefined || A =='') {
        A = 0;
    }
    if (typeof parseInt(B) != "number" || B == undefined || B =='') {
        B = 0;
    }
    if (typeof parseInt(C) != "number" || C == undefined || C =='') {
        C = 0;
    }
    return { A, B, C }

}

start();

function start() {
    setSentence();
    fillWords();
}

function fillWords() {
    k = 1;
    for (i; i <= i + 9; i++) {
        document.getElementById("button" + k).innerText = words[i];
        k++;
    }
}

function setSentence() {
    document.getElementById("sentence").innerText = sentencesDe[deSenNr];
    deSenNr++;
}

function checkSentence() {
    let a = document.getElementById("answer").value;
    if (a == sentencesEn[enSenNr]) {
        enSenNr++;
        clearResult();
        document.getElementById("correct").innerHTML = "Correct!";
        clearAnswer();
        score++;
        document.getElementById('count').innerHTML = score;
    } else {
        clearResult();
        document.getElementById("false").innerHTML = "Wrong! Correct would be: " + sentencesEn[enSenNr];
        enSenNr++;
        clearAnswer();
        loverHealth();
    }

}

function clearResult() {
    document.getElementById("correct").innerHTML = "";
    document.getElementById("false").innerHTML = "";
}

function clearAnswer() {
    document.getElementById("answer").value = "";
}

function next() {
    if (health == 0) {
        document.getElementById('deadScoreN').innerHTML = score;
        deadMenu.style.display = 'block';
        setHighscore(score);
        score = 0;
    } else {
        if (i <= words.length && deSenNr < sentencesDe.length) {
            checkSentence();
            setSentence();
            fillWords();
        } else {
            checkSentence();
            history.back();
        }
    }
}

function writeWords(buttonValue) {
    document.getElementById("answer").value += buttonValue + " ";
}

function loverHealth() {
    healthArr[health - 1].style.display = 'none';
    health--;
}
