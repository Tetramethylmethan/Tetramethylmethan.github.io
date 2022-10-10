
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
    var offset = 0
    let cookie = document.cookie;
    var values = cookie.slice(6);
  
    var A = values.charAt(6+0);
    var B = values.charAt(6+2);
    var C = values.charAt(6+4);
  
    //"werte=0,0,0 ; domain=tetramethylmethan.github.io ; path=."
  
    if (s>C){
      document.cookie = "werte="+ s +","+ B +","+ C + " ;domain=tetramethylmethan.github.io ; path=/";
    }
    console.log(document.cookie);
  }
  function getHighscore(){
    var offset = 6+4
    let cookie = document.cookie;
    console.log(document.cookie);
    return cookie.charAt(offset);
  }

next.addEventListener("click", ()=>{
    const wordIn = document.getElementById('inputWord').value;
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