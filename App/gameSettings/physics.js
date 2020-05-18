import Matter, { World } from 'matter-js'
import Constants from '../gameSettings/constants'
import Obstacle from '../components/obstacle'

let obstacles = 0
let generate = false
let isOffScreen = false
let currentObstacle=null
let thick = 0
let pose = 1
let movementX = -7

const randomHeight = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const obstacleGenerator = (x, world, entities) => {
  let obstacleHeight1 = randomHeight(50, 200)


  let obstacle1 = Matter.Bodies.rectangle(
      x, 
      Constants.MAX_HEIGHT - 75 - (obstacleHeight1/2), 
      Constants.OBSTACLE_WIDTH, 
      obstacleHeight1, 
      {isStatic: true, label: 'obstacle'}
    )

  Matter.World.add(world, [obstacle1])

  entities["obstacle"] = {
    body: obstacle1,
    size:[Constants.OBSTACLE_WIDTH, obstacleHeight1],
    renderer: Obstacle
  }
  generate = true

  obstacles += 1

  currentObstacle=entities["obstacle"]
}

export const resetObstacles = () =>{
  obstacles = 0
  generate=false
  thick = 0
  movementX = -7
}

const physics = (entities, {dispatch, time }) =>{
  let engine = entities.physics.engine;
  let character = entities.character.body
  let RNSoundLevel = entities.physics.RNSoundLevel
  let world = entities.physics.world
  

  thick +=1 ;
  if (thick % 5 === 0){
    pose = pose + 1 
    if(pose>2){
      pose = 1
    }
    entities.character.pose = pose
    
  }
  if(character.position.y < Constants.MAX_HEIGHT -100){
    entities.character.pose=2
  }
  RNSoundLevel.onNewFrame = (data) => {
    if(character.position.y > Constants.MAX_HEIGHT - 100) {
      if(data.value > -40 && data.value <= -15){
        Matter.Body.setVelocity(character, {x: character.velocity.x , y: -20})
      }else if (data.value > -15 && data.value <= -5){
        Matter.Body.setVelocity(character, {x: character.velocity.x , y: -25})
      }else if (data.value > -5){
        Matter.Body.setVelocity(character, {x: character.velocity.x , y: -30})
      }
    }
  }

  if(!generate){
   obstacleGenerator(Constants.MAX_WIDTH * 1.5, world, entities) 
  }

  if(thick % 400 === 0){
    movementX --
  }
  Matter.Engine.update(engine,time.delta)
  dispatch({type:'score'})

  
  Object.keys(entities).forEach(key => {
    
    if(key.indexOf("obstacle") === 0){
      Matter.Body.translate(entities[key].body, {x: movementX, y: 0})
      
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