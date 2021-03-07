//Vedansh Saha
//vnsssaha@gmail.com

//Variables
var player;
var a;
var health = 100;
var astGroup;
var level = 1;
const END = 0;
const PLAY = 1;
var gameState = PLAY;

if(level === 1){
//F preload
function preload() {
  rocketImg = loadAnimation("rocket.png", "r2.png");

  shadeImg = loadImage("shade.png");

  a1 = loadImage("asteroid1.png");
  a2 = loadImage("asteroid2.png");
  a3 = loadImage("asteroid3.png");

  w1 = loadImage("wreckage1.png");
  w2 = loadImage("wreckage2.png");
  w3 = loadImage("wreckage3.png");

  bulletImg = loadImage("bullet.png");

  bg = loadImage("background.png");

  dg = loadAnimation("dan.png");
}

//F setup
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  img = createSprite(width / 2, height / 2, width, height);
  img.addImage(bg);

  player = createSprite(80, windowHeight / 2, 50, 50);
  player.addAnimation("norm", rocketImg);
  // player.frameDelay = 0.5
  player.addAnimation("danger", dg);
  player.scale = 1.25;

  bullet = createSprite(windowWidth + 11, 300, 50, 50);
  bullet.addImage(bulletImg);
  bullet.scale = 0.15;
  bullet.visible = false;

  astGroup = new Group();

  g1 = new Group();
  g2 = new Group();
  g3 = new Group();
}

//F draw
function draw() {
  background(bg);
  //   canvas.width = windowWidth;
  //   canvas.height = windowHeight;

  if (keyDown("left")) {
    player.x -= 10;
  }
  if (keyDown("right")) {
    player.x += 10;
  }

  if (keyDown("up")) {
    player.y -= 10;
  }
  if (keyDown("down")) {
    player.y += 10;
  }

  if (player.isTouching(astGroup)) {
    health -= 1;
    player.changeAnimation("danger");
  } else {
    player.changeAnimation("norm");
  }

  //console.log(health);
  if (bullet.isTouching(g3)) {
    g3.destroyEach();
    bullet.x = windowWidth + 11;
  }

  if (bullet.isTouching(g2)) {
    g2.destroyEach();
    bullet.x = windowWidth + 11;
  }

  if (bullet.isTouching(g1)) {
    g1.destroyEach();
    bullet.x = windowWidth + 11;
  }

  spa1();
  spa2();
  spa3();
  //blocks
  block(player, 70, 70, 0, 0);
  block(player, windowWidth - 80, windowWidth - 80, 1, 0);
  block(player, windowHeight - 70, windowHeight - 70, 0, 1);
  block(player, 70, 70, 1, 1);

  //console.log(randomNumber(1,10))

  drawSprites();
}

function keyPressed() {
  if (keyCode === 32) {
    if (bullet.x > windowWidth + 10) {
      bullet.x = player.x - 10;
      bullet.y = player.y;
      bullet.visible = true;
      bullet.velocityX = 24;
      player.depth = bullet.depth + 1;
    }
  }
}

//block
function block(object, d1, d2, fb, xy) {
  if (xy === 0) {
    if (fb === 0) {
      if (object.x < d1) {
        object.x = d2;
      }
    } else {
      if (object.x > d1) {
        object.x = d2;
      }
    }
  } else {
    if (fb === 0) {
      if (object.y > d1) {
        object.y = d2;
      }
    } else {
      if (object.y < d1) {
        object.y = d2;
      }
    }
  }
}

//spa1
function spa1() {
  if (frameCount % 60 === 0) {
    var ast = createSprite(windowWidth, random(70, windowHeight - 70));
    var rand = round(random(1, 3));
    switch (rand) {
      case 1:
        a = a1;
        break;

      case 2:
        a = a2;
        break;

      case 3:
        a = a3;
        break;
    }
    ast.addImage(a);
    ast.velocityX = -12;
    ast.lifetime = 600;
    astGroup.add(ast);
    g1.add(ast);
  }
}
//spa2
function spa2() {
  if (frameCount % 65 === 0) {
    var ast = createSprite(windowWidth, random(70, windowHeight - 70));
    var rand = round(random(1, 3));
    ast.scale = 0.75;
    ast.lifetime = 600;

    switch (rand) {
      case 1:
        a = a1;
        break;

      case 2:
        a = a2;
        break;

      case 3:
        a = a3;
        break;
    }
    ast.addImage(a);
    ast.velocityX = -12;
    astGroup.add(ast);
    g2.add(ast);
  }
}
//spa3
function spa3() {
  if (frameCount % 80 === 0) {
    var ast = createSprite(windowWidth, random(70, windowHeight - 70));
    var rand = round(random(1, 3));
    ast.scale = 1.25;
    ast.lifetime = 600;

    switch (rand) {
      case 1:
        a = a1;
        break;

      case 2:
        a = a2;
        break;

      case 3:
        a = a3;
        break;
    }
    ast.addImage(a);
    ast.velocityX = -12;
    astGroup.add(ast);
    g3.add(ast);
  }
}
}