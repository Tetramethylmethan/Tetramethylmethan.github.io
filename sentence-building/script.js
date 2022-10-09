var a;
var i = 0;
var j = 0;
var score = 0;

function start() {
    if (i <= words.length) {
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
        }
        j++;
    }
}