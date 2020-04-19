import Matter from 'matter-js'
import Constants from '../gameSettings/constants'

const physics = (entities, {touches, time }) =>{
  let engine = entities.physics.engine;
  let character = entities.character.body
  let RNSoundLevel = entities.physics.RNSoundLevel

  RNSoundLevel.onNewFrame = (data) => {
    // console.log(data)
    if(character.position.y > Constants.MAX_HEIGHT - 100) {
      if(data.value > -20 && data.value <= -10){
        Matter.Body.setVelocity(character, {x: character.velocity.x , y: -10})
      }else if (data.value > -10){
        Matter.Body.setVelocity(character, {x: character.velocity.x , y: -15})
      }
    }
  }

  Matter.Engine.update(engine,time.delta)



  return entities;
}

export default physics