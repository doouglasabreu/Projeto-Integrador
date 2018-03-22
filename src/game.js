'use strict'

var sky
var player
var player2

var game = new Phaser.Game(800, 600, Phaser.CANVAS,
    'game-container',
{
    preload: preload,
    create: create,
    update: update,
    render: render
})

//  -----------------------------------------
function preload() {
    game.load.image('sky', 'assets/sky.png')
    game.load.image('plane1', 'assets/airplane1.png')
}

function createPlayer(){
  var player = game.add.sprite(0, 0, 'plane1')
  player.x = game.width/2
  player.y = game.height/2

  player.SPEED_X = 350
  player.SPEED_Y = 350

  player.anchor.setTo(0.5, 0.5)
  game.physics.arcade.enable(player)
  player.body.drag.set(100)
  player.body.maxVelocity.set(player.SPEED_X)

  player.cursors =  game.input.keyboard.createCursorKeys()
  return player
}

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE)

    sky = game.add.sprite(0,0,'sky')
    sky.x = game.width/2
    sky.y = game.height/2

    sky.anchor.setTo(0.5, 0.5)
    sky.scale.setTo(2, 2)
    player = createPlayer(player)


}

function screenWrap() {
    // atravessa os cantos da tela
    if (player.x < 0) {
        player.x = game.width
    } else
    if (player.x > game.width) {
        player.x = 0
    }

    if (player.y < 0) {
        player.y = game.height
    } else
    if (player.y > game.height) {
        player.y = 0
    }
}


  function moveAndStop(){
    player.body.velocity.setTo(0, 0)

    if (player.cursors.left.isDown){
      player.body.velocity.x = -player.SPEED_X
    }else
    if (player.cursors.right.isDown){
      player.body.velocity.x = player.SPEED_X
    }

    if (player.cursors.up.isDown){
      player.body.velocity.y = -player.SPEED_Y
    }else
    if (player.cursors.down.isDown){
      player.body.velocity.y = player.SPEED_Y
    }

    player.angle = player.body.angle * 180/Math.PI

    if(player.body.velocity.getMagnitude() > player.SPEED_X){
      player.body.velocity.setMagnitude(player.SPEED_X)
    }
    screenWrap()
  }

  function moveAndTurn(){
    if(player.cursors.up.isDown){
      game.physics.arcade.accelerationFromRotation(
        player.rotation, 600, player.body.acceleration
      )
    }else {
      player.body.acceleration.set(0)
    }

    if(player.cursors.left.isDown){
      player.body.angularVelocity = -200
    }else

    if(player.cursors.right.isDown){
      player.body.angularVelocity = 200
    }else{
      player.body.angularVelocity = 0
    }
    game.world.wrap(player, 0, true)
  }


function update() {
    sky.angle += 0.3
    //moveAndStop();
    moveAndTurn(player);
}

function render() {

}
