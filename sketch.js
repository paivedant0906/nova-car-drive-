var carSprite,carsGroup,c1,c2,c3,c4,c5,c6;
var bg,bg2,backgroundImage,backgroundImage2;
var PlayerCar,PlayerCarImage;
var gameState = "play";
var gameOverSprite,gameOverImage;
var restart,restartImage;
var overbg,overbgImage;
var lifeTime,HLifeTime;

var textX = 0;
function preload(){
  c1 = loadImage("car1.png");
  c2 = loadImage("car2.png");
  c3 = loadImage("car3.png");
  c4 = loadImage("car4.png");
  c5 = loadImage("car5.png");
  c6 = loadImage("car6.png");
  PlayerCarImage = loadImage("PlayerCar.png");
  backgroundImage = loadImage("bg.png");
  backgroundImage2 = loadImage("bg2.png");
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");////
  overbgImage = loadImage("overbg.png");
}

function setup() {
  createCanvas(600,800);
  
 HLifeTime = 0;
  PlayerCar = createSprite(300,700,20,20);
  PlayerCar.addImage(PlayerCarImage);
  PlayerCar.scale = 0.26;
  PlayerCar.debug = false;
  PlayerCar.setCollider("rectangle",0,0,220,450);
  gameOverSprite = createSprite(300,300,20,20);
  gameOverSprite.addImage(gameOverImage);
  gameOverSprite.scale = 0.7;
 
  restart = createSprite(300,550,20,20);
  restart.addImage(restartImage);
  restart.scale = 0.5;
   bg = createSprite(300,400,20,20);
  bg.addImage(backgroundImage);
  
  bg2 = createSprite(300,-400,20,20);
  bg2.addImage(backgroundImage2);
  bg.depth = -1;
  bg2.depth = -1;
  PlayerCar.depth +=1;
  carsGroup = createGroup();
  
}

function draw() {
  background("black");
  spawnCars();
  
  if(gameState ==="play"){
   
    textX = 20;
    bg.visible = true;
    bg2.visible = true;
    PlayerCar.visible = true;
    bg.velocityY = 4+frameCount/240;
    bg2.velocityY = 4+frameCount/240;
    lifeTime= Math.round(frameCount/60);
    
     gameOverSprite.visible = false;
    restart.visible = false;
    if(keyDown("right")){
      PlayerCar.x +=6;
    }
    if(keyDown("left")){
      PlayerCar.x -=6;
    }
    if(bg.y>1195){
      bg.y = bg2.y-800;
    }
    if(bg2.y>1195){
      bg2.y = bg.y-800;
    }
    if(PlayerCar.x>435){
      PlayerCar.x = 435;
    }
    if(PlayerCar.x<160){
      PlayerCar.x =  160;
    }
    if(PlayerCar.isTouching(carsGroup)){
      gameState = "end";
    }
  }
  if(gameState === "end"){
    carsGroup.destroyEach();
    carSprite.velocityY = 0;
    
    bg.visible = false;
    bg2.visible = false;
    PlayerCar.visible = false;
    textX = -400;
    gameOverSprite.visible = true;
    restart.visible = true;
    if(mousePressedOver(restart)){
      gameState = "play"
       PlayerCar.x = 300;
      frameCount = 0;
    }
  }
  
  drawSprites();
  textSize(30);
  fill("white");
  text("Time Alive: "+ lifeTime,textX,50);
  if(lifeTime>HLifeTime){
    HLifeTime = lifeTime;
  }
  text("Highest Time Alive: "+HLifeTime,textX,100);
  
}
function spawnCars(){
  var frameC = 100;
  if(lifeTime>55){
    frameC = 80;
  }
  if(lifeTime>80){
    frameC = 60;
  }
  if(frameCount%frameC === 0){
    var rand = Math.round(random(1,6));
    var randX = Math.round(random(1,4));
    carSprite = createSprite(200,-30,20,20);
    carSprite.velocityY = 4+frameCount/240;
    carsGroup.add(carSprite);
    carSprite.debug = false;
    switch(rand){
      case 1: carSprite.addImage(c1);
              carSprite.scale = 0.5;
              
      break;
      case 2: carSprite.addImage(c2);
              carSprite.scale = 0.3;
        carSprite.setCollider("rectangle",0,0,290,460);
      break;
      case 3: carSprite.addImage(c3);
              carSprite.scale = 0.4;
              carSprite.setCollider("rectangle",0,0,140,300);
      break;
      case 4: carSprite.addImage(c4);
              carSprite.scale = 0.5;
              carSprite.setCollider("rectangle",0,0,360,130);
      break;
      case 5: carSprite.addImage(c5);
              carSprite.scale = 0.33;
              carSprite.setCollider("rectangle",20,0,240,380);
      break;
      case 6: carSprite.addImage(c6);
        carSprite.scale = 0.35;
        carSprite.setCollider("rectangle",0,0,600,180);
        break;      
      default:
      break;
    }
    switch(randX){
      case 1: carSprite.x = 160;
      break;
      case 2: carSprite.x = 250;
      break;
      case 3: carSprite.x = 345;
      break;
      case 4: carSprite.x = 435;
      break;
      default:
      break;
    }
    if(rand === 4&&randX === 1){
      carSprite.x = 300;
    }
  }
}