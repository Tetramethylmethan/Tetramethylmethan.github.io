var yScale =0;

var doodlerSize = 60;
var doodlerX;
var doodlerY;
var doodlerVelocity;
var doodlerXSpeed = 4;
var platformWidth = 85;
var platformHeight = 15;
var numOfPlatforms = 5;
var platformList = [];
var platYChange = 0;
var gameStarted;
var score = 0;
var highScore = 0;
var doodlerLeftImg;
var doodlerRightImg;
var platformImg;
var backgroundImg;
var guess = "";
var wantedWord = "ree";
var health = 3;


// ===========================
//  Preload the Image Sprites
// ===========================
function preload() {

  //backgroundImg = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Graph-paper.svg/1024px-Graph-paper.svg.png");
  //backgroundImg = loadImage("https://i.imgur.com/qDiLiTP.jpg");
  doodlerLeftImg = loadImage("https://i.imgur.com/9UrDzMT.png");
  doodlerRightImg = loadImage("https://i.imgur.com/9UrDzMT.png");
  platformImg = loadImage("https://i.imgur.com/B9mJM2m.png");
  bananaImg = loadImage("https://i.imgur.com/wwqxYjB.png");
}

// ===========================
//  Controllers
// ===========================
function setup() {
  var cnv = createCanvas(400 , 600 );
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  frameRate(60);
  gameStarted = false;
  //stroke(0, 0, 0);
  //strokeWeight(2);
}

function setHighscore(s){
  var A = getHighscore()['A'];
  var B = getHighscore()['B'];
  var C = getHighscore()['C'];
  if(isNaN(int(A))){
      document.cookie = "werte="+ s +","+ B +","+ C + " ;domain=tetramethylmethan.github.io ; path=/";
  }else{
      if (s>int(A)){
          document.cookie = "werte="+ s +","+ B +","+ C + " ;domain=tetramethylmethan.github.io ; path=/";
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

function draw() {
  clear()
  background(0, 0, 0,0);
  //image(backgroundImg, 0, 0, 400, 600);
  if(gameStarted == true) {
    //Set up and draw the game
    drawPlatforms();
    drawDoodler();
    checkCollision();
    moveDoodler();
    moveScreen();
    drwaGuess();
    setNextPlatform();
    showScore();
    drawLives();
    if(health <=0){
      gameStarted = false;
      health = 3;
      platformList = []
    }
    
  } else {
    // Start menu
    health = 3;
    fill(0);
    textSize(60);
    text("Start", 140, 275);
    textSize(30);
    text("Score: " + score, 150, 325);
    setHighscore(score);
    textSize(20);
    text("High Score: " + getHighscore()['A'], 150, 360);
    
  }
}

function moveScreen() {
  if(doodlerY < 250) {
    platYChange = 3;
    doodlerVelocity += 0.25;
  } else {
    platYChange = 0;
  }
}

// Start Game
function mousePressed() {
  if(gameStarted == false) {
    score = 0;
    setupPlatforms();
    doodlerY = 350;
    doodlerX = platformList[platformList.length - 1].xPos + 15;
    doodlerVelocity = 0.1;
    gameStarted = true;
  }
}

// ===========================
//  Lives
// ===========================
function drawLives(){
  for(var i = 0; i<=health;i++){
    image(bananaImg,400-i*40,0, 40,40)
  }
}




// ===========================
//  Doodler
// ===========================
function drawDoodler() {
  fill(204, 200, 52);
  image(doodlerLeftImg, doodlerX, doodlerY, doodlerSize, doodlerSize);
}

function moveDoodler() {
  // doodler falls with gravity
  doodlerVelocity += 0.2;
  doodlerY += doodlerVelocity;

  if (keyIsDown(LEFT_ARROW)) {
    doodlerX -= doodlerXSpeed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    doodlerX += doodlerXSpeed;
  }
}

// ===========================
//  Platforms
// ===========================
function setupPlatforms() {
  for(var i=0; i < numOfPlatforms; i++) {
    var platGap = height / numOfPlatforms;
    var newPlatformYPosition = i * platGap;
    var plat = new Platform(newPlatformYPosition,getWord());
    platformList.push(plat); 
  }
  //setup startingplatform
  plat.jumpable = true;
  plat.word = "";
  //setup nextPlatform
  //console.log(platformList)
  nextPlatform = platformList[3];
  console.log(platformList[3]);
}

function drawPlatforms() {
  fill(106, 186, 40);
  platformList.forEach(function(plat) {
    // move all platforms down
    plat.yPos += platYChange;
    image(platformImg, plat.xPos, plat.yPos, plat.width, plat.height);

    if(plat.color == 1){
      fill(50, 205, 50);
    }
    if(plat.color == 0){
      fill(176,176,176);
    }
    if(plat.color == 2){
      fill(236, 236,236 );
    }

    if(nextPlatform === plat){
      fill(255, 255,0);
    }

    textSize(30);
    text(plat.word, plat.xPos, plat.yPos);

    if(plat.yPos > 600) {
      
      platformList.pop();
      var newPlat = new Platform(0,getWord());
      platformList.unshift(newPlat); // add to front

    }
  });
}
//platform class
function Platform(newPlatformYPosition, word) {
  this.color = 0;
  this.jumpable = false;
  this.word = word;
  this.xPos = random(15, 300);
  this.yPos = newPlatformYPosition;
  this.width = platformWidth;
  this.height = platformHeight;
}
// ===========================
//  Words
// ===========================
function getWord(){
  var keys = Object.keys(vocabulary);
  return keys[Math.floor(Math.random() * keys.length)];
}

function keyPressed(){
  if(keyCode == BACKSPACE){
    guess = guess.slice(0, -1);
  }

}
function keyTyped(){
  // controll
  if(keyCode == ENTER){
    console.log(guess)
    console.log(vocabulary[nextPlatform.word])
    guess = guess.replace(' ','')
    if(guess != ""){
      if (guess == vocabulary[nextPlatform.word].replace(' ','')){
        //richtige eingabe
        score++;
        nextPlatform.jumpable = true;
        nextPlatform.word = vocabulary[nextPlatform.word];
        nextPlatform.color = 1;
        setNextPlatform();
        guess = "";
      }else{
        //falsche eingabe
        health--;
        nextPlatform.jumpable = true;
        nextPlatform.word = vocabulary[nextPlatform.word];
        nextPlatform.color = 2;
        setNextPlatform();
        guess = "";
      }
    }

    return; 
  }
  guess = guess+ key;
}
function drwaGuess(){
  textSize(60);
  text(guess, 150, 325);
}
function setNextPlatform(){

  platformList.forEach(function(plat){
    if(!plat.jumpable){
      nextPlatform = plat
      return
    }
  })
}

function showScore(){
  fill(240,255,255)
  textSize(30);
  text("Score: " + score, 0,30);
}


// ===========================
//  Collisions
// ===========================
function checkCollision() {
  platformList.forEach(function(plat) {
    if(plat.jumpable){ 
      if(
        doodlerX < plat.xPos + plat.width &&
        doodlerX + doodlerSize > plat.xPos &&
        doodlerY + doodlerSize < plat.yPos + plat.height &&
        doodlerY + doodlerSize > plat.yPos &&
        doodlerVelocity > 0
      ) {
        doodlerVelocity = -10;
      }
  }});
  
  if(doodlerY > height) {
    if(score > highScore) {
      highScore = score;
    }
    gameStarted = false;
    platformList = [];
  }
  
  // screen wraps from left to right
  if(doodlerX < -doodlerSize) {
    doodlerX = width;
  } else if(doodlerX > width) {
    doodlerX = -doodlerSize;
  }
}
// ===========================
//  bugkiller
// ===========================

