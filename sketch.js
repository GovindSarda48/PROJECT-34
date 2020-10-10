//Create variables here


var dog,happyDog,foodS,foodStock,database;
function preload()
{
  //load images here
  dogIMG = loadImage("Dog.png");
  happyDogIMG = loadImage("happydog.png");
}

function setup() {
	createCanvas(500, 500);
  
  database = firebase.database();

  dog = createSprite(250,250,100,100);
  dog.addImage(dogIMG);
  dog.scale = 0.2;


  foodStock = database.ref('food');
  foodStock.on('value',readStock,showError);
}


function draw() {  
background(46, 139, 87);


if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDogIMG);

}
  drawSprites();
  //add styles here
 
textSize(20);
fill("white");
stroke("black");
text("FOOD REMAINING :"+foodS,150,180);
textSize(20);
fill("black");
text("PRESS UP ARROW TO FEED THE DOG MILK!",50,100);

}

function readStock(data){
  foodS = data.val();
  console.log(foodS);

}

function writeStock(x){

  
  if(x<=0){
    x=0;
  }

  if(x>0){
    x=x-1;
  }

 
  database.ref('/').update({
    'food':x
  })
 
}

function showError(){
  console.log("ERROR!");
}



