import Matter, { World } from 'matter-js'
import Constants from '../gameSettings/constants'
import Obstacle from '../components/obstacle'

let obstacles = 0
let generate = false
let isOffScreen = false

const randomHeight = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const obstacleGenerator = (x, world, entities) => {
  let obstacleHeight1 = randomHeight(150, 500)


  let obstacle1 = Matter.Bodies.rectangle(
      x, 
      Constants.MAX_HEIGHT - 100, 
      Constants.OBSTACLE_WIDTH, 
      obstacleHeight1, 
      {isStatic: true}
    )

  Matter.World.add(world, [obstacle1])

  entities["obstacle"] = {
    body: obstacle1,
    size:[Constants.OBSTACLE_WIDTH, obstacleHeight1],
    color: "red",
    renderer: Obstacle
  }
  generate = true

  obstacles += 1
}

const physics = (entities, {touches, time }) =>{
  let engine = entities.physics.engine;
  let character = entities.character.body
  let RNSoundLevel = entities.physics.RNSoundLevel
  let world = entities.physics.world

  RNSoundLevel.onNewFrame = (data) => {
    if(character.position.y > Constants.MAX_HEIGHT - 100) {
      if(data.value > -20 && data.value <= -10){
        Matter.Body.setVelocity(character, {x: character.velocity.x , y: -10})
      }else if (data.value > -10){
        Matter.Body.setVelocity(character, {x: character.velocity.x , y: -15})
      }
    }
  }


  if(!generate){
    obstacleGenerator(Constants.MAX_WIDTH + 25  - 100, world, entities)
    obstacleGenerator(Constants.MAX_WIDTH * 1.35 - 100, world, entities)
    
  }

  Matter.Engine.update(engine,time.delta)

  Object.keys(entities).forEach(key => {
    
    if(key.indexOf("obstacle") === 0){
      Matter.Body.translate(entities[key].body, {x: -7, y: 0})

        if(entities[key].body.position.x <= -1 * (Constants.OBSTACLE_WIDTH / 2)){
          let obstacleIndex = parseInt(key.replace("obstacle", ""));
          delete(entities["obstacle"])
          generate=false;
        }
    }
  })

  return entities;
}

export default physics