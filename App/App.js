import React,{useEffect,useState,Component} from 'react';
import { StyleSheet, Text, View, StatusBar,TouchableOpacity ,Button} from 'react-native';
import RNSoundLevel from 'react-native-sound-level'
import Constants from './gameSettings/constants'
import {GameEngine} from 'react-native-game-engine'
import Matter from 'matter-js'
import * as Permissions from 'expo-permissions'
import Character from './components/character'
import Physics from './gameSettings/physics'
import Floor from './components/floor'
// import Obstacle from './components/obstacle'

// const randomHeight = (min, max) => {
//   return Math.floor(Math.random() * (max - min + 1) + min)
// }

export default class App extends Component {
  constructor(props){
    super(props)
    this.gameEngine = null;
    this.entities = this.setupWorld()
    this.state = {
      rawValue:0,
      valueInDb:0
    }
  }

  async getPermission(){
    const {status, expires, permissions} = await Permissions.askAsync(Permissions.AUDIO_RECORDING)
    if (status !== 'granted'){
      
    }else {
      console.log('sukses')
    }
  }
  
  setupWorld = () =>{
    // console.log(Matter)

    let engine = Matter.Engine.create({ enableSleeping:false})
    let world = engine.world;
    // console.log(world)
    let character = Matter.Bodies.rectangle(Constants.MAX_WIDTH / 4, Constants.MAX_HEIGHT-100, 50,50)
    let floor  = Matter.Bodies.rectangle(Constants.MAX_WIDTH/2, Constants.MAX_HEIGHT - 50, Constants.MAX_WIDTH,50, {isStatic:true})
    // let obstacle1 = Matter.Bodies.rectangle(Constants.MAX_WIDTH - (Constants.OBSTACLE_WIDTH/2), Constants.MAX_HEIGHT - 100, Constants.OBSTACLE_WIDTH, 100, {isStatic: true})
    // let obstacle2 = Matter.Bodies.rectangle(Constants.MAX_WIDTH * 2 - (Constants.OBSTACLE_WIDTH/2), Constants.MAX_HEIGHT - 100, Constants.OBSTACLE_WIDTH, 100, {isStatic: true})

    Matter.World.add(world, [character,floor])

    return{
      physics: {engine, world, RNSoundLevel},
      character: {body:character, size:[50,50], color:"blue", renderer: Character},
      floor: {body:floor, size:[Constants.MAX_WIDTH,50], color:"red", renderer: Floor},
      // obstacle1: {body: obstacle1, size:[Constants.OBSTACLE_WIDTH, randomHeight(200, 500)], color:"red", renderer: Obstacle},
      // obstacle2: {body: obstacle2, size:[Constants.OBSTACLE_WIDTH, randomHeight(200, 500)], color:"red", renderer: Obstacle}
    }
  }



  componentDidMount(){
    // RNSoundLevel.stop()
    this.getPermission()
    console.log('mulai')
    RNSoundLevel.start()
    RNSoundLevel.onNewFrame = (data) =>{
            this.setState({
              rawValue:data.rawValue,
        valueInDb:data.value
      })
      // console.log(this.state.rawValue)
    }
    // console.log(this.state)
  }

  render(){
    return(
      <View style={styles.container}>
        <GameEngine
          ref={(ref) => { this.gameEngine = ref}}
          style={styles.gameContainer}
          systems = {[Physics]}
          entities= {this.entities}
          running={true}
        />
        <View style={{position:"absolute", top:30,left:0,bottom:0,right:0,flex:1}}>
          <Button title="stop"
            onPress={RNSoundLevel.stop}
          >
          </Button>
        <Button title="start" onPress={RNSoundLevel.start}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
