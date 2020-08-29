//Create variables here
var dog,dogImg;
var happyDog,happyDogImg;
var db;
var foodS;
var foodStock;
function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  db = firebase.database();

  dog = createSprite(250,300);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  foodStock = db.ref('Food');
  foodStock.on("value",readStock);
}

function draw() {  
  background(46, 139, 87);

  if(foodS) {
  if(keyCode === 32) {
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }
}

  drawSprites();
  fill(0);
  textSize(18);
  text("Food Remaining: "+foodS,150,150);
  text("Note: Press Space to feed the dog",100,100);
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if(x<=0) {
    x = 0;
  }else {
    x = x-1;
  }
  db.ref('/').update({
    Food: x
  })
}


