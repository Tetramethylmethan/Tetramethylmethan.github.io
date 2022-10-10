
var i = 0;
var shuffled = '';
data.sort(function(){return 0.5-Math.random()});
var word = data[i];
var highScore = 0;

var error = document.getElementById("error")

var errorDiv = document.getElementById("errorDiv")
errorDiv.style.display = 'none';
var deadMenu = document.getElementById("deadMenu");
deadMenu.style.display = 'none';
var wholeDiv = document.getElementById('wholeDiv');
var backImg = document.getElementById('backImg');

var health = 5;
var healthArr = [document.getElementById('b5'), document.getElementById('b4'), document.getElementById('b3'), document.getElementById('b2'), document.getElementById('b1'), ]
start();

var score = 0;
const next = document.getElementById('next');
const exit = document.getElementById('exit');


function setHighscore(s){
    var A = getHighscore()['A'];
    var B = getHighscore()['B'];
    var C = getHighscore()['C'];
    if(isNaN(int(C))){
        document.cookie = "werte="+ A +","+ B +","+ s + " ;domain=tetramethylmethan.github.io ; path=/";
    }else{
        if (s>int(C)){
            document.cookie = "werte="+ A +","+ B +","+ s + " ;domain=tetramethylmethan.github.io ; path=/";
        }
    }
    
  
    console.log(document.cookie);
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

next.addEventListener("click", ()=>{
    const wordIn = document.getElementById('inputWord').value;
    wordIn = wordIn.toLowerCase();
    word = word.toLowerCase();
        if(!(word == wordIn)){
            loverHealth();
            errorDiv.style.display = 'block';
            errorMessage();
            i++;
            start();
        }else{
            errorDiv.style.display = 'block';
            correctMessage()
            i++;
            score++;
            document.getElementById('count').innerHTML = score;
            start();
        }
    
})
document.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
      next.click()
      document.getElementById('inputWord').value = "";
    }
})

function start(){
    if(health == 0){
        exit.style.display = 'none';
        next.style.display = 'none';
        wholeDiv.style.opacity = '0.5';
        backImg.style.opacity = '0.4';

        document.getElementById('deadScoreN').innerHTML = score;
        deadMenu.style.display = 'block';
        setHighscore(score)
        
        
    }
    word = data[i];
    var shuffled = word.split('').sort(function(){return 0.5-Math.random()}).join('');
    while(1){
        if(word == shuffled){
            var shuffled = word.split('').sort(function(){return 0.5-Math.random()}).join('');
        }
        if(word != shuffled){
            break;
        }
    }
    document.getElementById('word').innerText = shuffled + '';
}

function errorMessage() {
    var error = document.getElementById("error")
        error.textContent = "The right word was  " + data[i]  + " !!";
        error.style.color = "red";
        error.style.fontSize = "3rem";
        //error.style.fontWeight = "bold";
}

function correctMessage() {
    var error = document.getElementById("error")
       
        error.textContent = "Nice, you go the word right!" ;
        error.style.color = "green";
        error.style.fontSize = "3rem";
        //error.style.fontWeight = "bold";
}

function loverHealth(){
    healthArr[health - 1].style.display = 'none';
    health--;
}