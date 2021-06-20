var dogImg , happydogImg
var dog
var database
var foodS , foodStock

function preload(){
	//load images here
  dogImg = loadImage("images/Dog.png")
  happydogImg = loadImage("images/happydog.png")
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  
  foodStock = database.ref("Food")
  foodStock.on("value", readStock)
  foodStock.set(20)
  
  dog = createSprite("300,300")
  dog.addImage(dogImg)
  dog.scale = 0.3

}


function draw() {  
  background(46,139,87)
  
  if(foodS == undefined ) {
    textSize(20)
    fill(225)
    text("PRESS UP ARROW KEY TO FEED KILLER MILK", 50,250)
    text("FOOD LEFT: "+foodS, 100,100)
  }

  if(keyIsDown(UP_ARROW)) {
    writeStock(foodS)
    dog.addImage(happydogImg) ;
  }

  if(keyWentUp(UP_ARROW)) {
    dog.addImage(dogImg)
  }
  
  drawSprites();
}

function writeStock(x) {

  x = x-1
  
  database.ref('/').update({
    food:x
  })
}

function readStock(data) {
  foodS = data.val();
}


