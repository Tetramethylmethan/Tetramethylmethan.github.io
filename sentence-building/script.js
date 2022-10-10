var a;
var i = 0;
var j = 0;
var score = 0;

var deadMenu = document.getElementById("deadMenu");
deadMenu.style.display = 'none';

var health = 5;
var healthArr = [document.getElementById('b5'), document.getElementById('b4'), document.getElementById('b3'), document.getElementById('b2'), document.getElementById('b1'),]

start();

function start() {
    if (health == 0) {
        document.getElementById('deadScoreN').innerHTML = score;
        deadMenu.style.display = 'block';
    }
    if (i <= words.length && j < sentencesDe.length) {
        document.getElementById("result").value = "";
        document.getElementById("false").innerHTML = "";
        document.getElementById("right").innerHTML = "";
        document.getElementById("sentence").innerText = sentencesDe[j];
        k = 1;
        for (i; i <= i + 9; i++) {
            document.getElementById(k).innerText = words[i];
            k++;
        }
    } else {
        history.back();
    }
}

function writeWords(buttonValue) {
    document.getElementById("result").value += buttonValue + " ";
}

function checkSentence() {
    if (j <= sentencesEn.length) {
        a = document.getElementById("result").value;
        if (a == sentencesEn[j]) {
            document.getElementById("right").innerHTML = "Richtig!";
            score++;
            document.getElementById('count').innerHTML = score;
        } else {
            document.getElementById("false").innerHTML = "Falsch! Richtig wäre: " + sentencesEn[j];
            loverHealth();
        }
        j++;
    }
}

function loverHealth() {
    healthArr[health - 1].style.display = 'none';
    health--;
}