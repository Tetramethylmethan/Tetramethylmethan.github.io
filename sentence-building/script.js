var a;
var i = 0;
var j = 0;
var score = 0;

var deadMenu = document.getElementById("deadMenu");
deadMenu.style.display = 'none';

var health = 5;
var healthArr = [document.getElementById('b5'), document.getElementById('b4'), document.getElementById('b3'), document.getElementById('b2'), document.getElementById('b1'),]


function setHighscore(s){
    var A = getHighscore()['A'];
    var B = getHighscore()['B'];
    var C = getHighscore()['C'];
    if(isNaN(int(B))){
        document.cookie = "werte="+ A +","+ s +","+ C + " ;domain=tetramethylmethan.github.io ; path=/";
    }else{
        if (s>int(B)){
            document.cookie = "werte="+ A +","+ s +","+ C + " ;domain=tetramethylmethan.github.io ; path=/";
        }
    }
  }
  
  function getHighscore(){
    let cookie = document.cookie;
    var values = cookie.slice(6);
  
    var A = values.charAt(0);
    var B = values.charAt(2);
    var C = values.charAt(4);
  
    //"werte=0,0,0 ; domain=tetramethylmethan.github.io ; path=."
  
    if(typeof int(A) != "number" ){
        A = 0;
    }
    if(typeof int(B) != "number"){
        B  = 0;
    }
    if(typeof int(C) != "number"){
        C  = 0;
    }
    return {A,B,C}
  
  }



start();

function start() {
    if (health == 0) {
        document.getElementById('deadScoreN').innerHTML = score;
        deadMenu.style.display = 'block';
        setHighscore(score);
        score = 0;
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