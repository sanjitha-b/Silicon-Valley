

var start, startImg
var skaterImg, skater,skaterImg1
var  backgroundImg, invGround
var obstacle1, obstacle2, obstacle3, obstacle4,obstacleGroup
var  point2, point3, point1,pointGroup,coinGroup
var gameOver, gameOverImg, restart, restartImg
var foodpoint,hitsound,coinpoint

var gamestate = "START"
var score = 0

function preload(){
bck1 = loadImage('Images/fp.png')
startImg = loadImage('Images/start.png')
skaterImg1 = loadAnimation("Images/skaterImg1.jpg")
skaterImg = loadAnimation("Images/skaterImg1.jpg","Images/skaterImg2.png", "Images/skaterImg3.png", "Images/skaterImg4.png","Images/skaterImg1.jpg","Images/skaterImg2.png", "Images/skaterImg3.png", "Images/skaterImg4.png")
backgroundImg = loadImage("Images/background.jpg")
obstacle1 = loadImage("Images/obstacle1.png")
obstacle2 = loadImage("Images/obstacle2.png")
obstacle3 = loadImage("Images/obstacle3.png")
obstacle4 = loadImage("Images/obstacle4.png")
point2 = loadImage("Images/point2.png")
point3 = loadImage("Images/point3.png")
point1Img = loadImage("Images/point1.png")
gameOverImg = loadImage("Images/gameOverImg.png")
restartImg = loadImage("Images/restart.png")

point = loadSound('Sound/food.mp3')
hitsound = loadSound('Sound/hit.mp3')

}

function setup(){
createCanvas(1200,700)

bckground = createSprite(600,300,500,500)
bckground.addImage(backgroundImg)
bckground.scale = 2.2



start = createSprite(1050, 250, 100,100)
start.addImage(startImg)
start.scale = 0.3

skater = createSprite(150, 450)
skater.addAnimation("skater", skaterImg)
skater.addAnimation("skaterstop", skaterImg1)

inviGround = createSprite(600,600, 1200, 20)
inviGround. visible = false


gameOver = createSprite(600,100,100,100)
gameOver.addImage(gameOverImg)
gameOver.scale = 0.3

restart = createSprite(600, 200, 100,100)
restart.addImage(restartImg)
restart.scale = 0.3

obstacleGroup = new Group()
pointGroup = new Group()
coinGroup = new Group()

}

function draw(){
    if(gamestate=='START'){
        background(bck1)
        gameOver.visible = false
        restart.visible = false
        skater.visible = false
        bckground.visible = false
        textSize (30)
        fill('black')
        text('Welcome to my Game !',500,40)
        if(mousePressedOver(start)){
            gamestate = "PLAY0"
        }
        drawSprites()
    }

    if(gamestate=='PLAY0'){
    bckground.visible = true
    skater.visible = true
    gameOver.visible = false
    restart.visible = false
    start.destroy()
    skater.changeAnimation("skaterstop", skaterImg1)
        if(keyDown('space')){
            gamestate = "PLAY"
        }
    drawSprites()
    textSize (30)
    fill('black')
    text('Press "Space" to play',300,150)

    }

    if(gamestate == "PLAY" ){

    bckground.visible = true
    skater.visible = true
    gameOver.visible = false
    restart.visible = false
    skater.changeAnimation("skater", skaterImg)
        if(skater.isTouching(pointGroup)){
        score=score+1
        point.play()
        pointGroup.destroyEach()
    }
        if(skater.isTouching(coinGroup)){
        score= score+5
        point.play()
        coinGroup.destroyEach()
    }
    
    bckground.velocityX =-3 - score/10
    if(bckground.x <500){
    
        bckground.x = 680
        
    }

    // jump
    if(keyDown("space")&& skater.y>= 350){
skater.velocityY = -12
    }
    skater.velocityY = skater.velocityY+0.7
    
    console.log(skater.y)
    obstacles()
    points()

    if(skater.isTouching(obstacleGroup)){
        gamestate = "END"
        hitsound.play()
    }
    drawSprites()
    fill("black")
    textSize(25)
    text("Score:"+ score, 1000,50)
    }

if(gamestate == "END"){
bckground.velocityX = 0
obstacleGroup.setVelocityXEach(0)
skater.changeAnimation("skaterstop", skaterImg1)
pointGroup.setVelocityXEach(0)
coinGroup.setVelocityXEach(0)
pointGroup.destroyEach()
coinGroup.destroyEach()
gameOver.visible = true
restart.visible = true
skater.velocityY = 0
if(mousePressedOver(restart)){
    gamestate = "PLAY"
    obstacleGroup.destroyEach()
   
    skater.changeAnimation("skater", skaterImg)
pointGroup.destroyEach()
coinGroup.destroyEach()
score = 0

}
drawSprites()
fill("black")
textSize(25)
text("Score:"+ score, 1000,50)
}
   
skater.collide(inviGround)
      
       
}
    
function obstacles(){
if(frameCount%200==0){
var obstacle = createSprite(300, 550)
obstacle.velocityX = -3 - score/10

var rand = Math.round(random(1,4))
if (rand == 1){
obstacle.addImage(obstacle1)
}
if (rand == 2){
    obstacle.addImage(obstacle2)
    }

    if (rand == 3){
        obstacle.addImage(obstacle3)
        }

        if (rand == 4){
            obstacle.addImage(obstacle4)
            }
obstacle.scale = 0.2
obstacleGroup.add(obstacle)
}
}

function points(){
if(frameCount%320 ==0){
    var point = createSprite(1200,350)
    point.velocityX = -4 - score/10

    var rand = Math.round(random(2,3))
    if(rand == 2){
        point.addImage(point2)
    }

    if(rand == 3){
        point.addImage(point3)
    }
    point.scale = 0.3
    
pointGroup.add(point)
}
if(frameCount%550 == 0)
for(i=600; i<800; i=i+50){
point1 = createSprite(i,300,20,20)
point1.velocityX = -4-score/10
point1.addImage(point1Img)
point1.scale = 0.15
coinGroup.add(point1)

}
}

   