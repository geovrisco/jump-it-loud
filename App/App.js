import React,{Component} from 'react';
import { StyleSheet, Text, View, StatusBar,TouchableOpacity ,Button, Image} from 'react-native';
import RNSoundLevel from 'react-native-sound-level'
import Constants from './gameSettings/constants'
import {GameEngine} from 'react-native-game-engine'
import Matter from 'matter-js'
import * as Permissions from 'expo-permissions'
import Character from './components/character'
import Physics from './gameSettings/physics'
import Floor from './components/floor'
import Background from './assets/background.png'
import Obstacle from './components/obstacle';




export default class App extends Component {
  constructor(props){
    super(props)
    this.gameEngine = null;
    this.entities = this.setupWorld()
    this.state = {
      isRunning:false,
      score:0
    }
  }

  async getPermission(){
    const {status, expires, permissions} = await Permissions.askAsync(Permissions.AUDIO_RECORDING)
    if (status !== 'granted'){
      alert('This Wonderful application need audio recording permission to run on your phone')
    }else {
      console.log('sukses')
      
    }
  }

  
  setupWorld = () =>{
    // console.log(Matter)

    let engine = Matter.Engine.create({ enableSleeping:false})
    let world = engine.world;
    // console.log(world)
    let character = Matter.Bodies.rectangle(Constants.MAX_WIDTH / 4, Constants.MAX_HEIGHT-200, 50,50,{label:'character'})
    let floor  = Matter.Bodies.rectangle(Constants.MAX_WIDTH/2, Constants.MAX_HEIGHT - 50, Constants.MAX_WIDTH,50, {isStatic:true, label:'floor'})
    let obstacle = Matter.Bodies.rectangle(Constants.MAX_WIDTH / 4, Constants.MAX_HEIGHT-102, 30,30, {label:"obstacle"})
    Matter.World.add(world, [character,floor,obstacle]) 

    Matter.Events.on(engine,"collisionStart", event => {
      // console.log(event)
      let pairs = event.pairs
      let objA = pairs[0].bodyA.label
      let objB = pairs[0].bodyB.label
      // let objC = pairs[0].bodyC.label
      if(objA==='obstacle' && objB==='character'){
        // console.log(objA,objB,'nabrakcoy')
        this.gameEngine.dispatch({type:'gameOver'})
      }else if (objA==='character' && objB==='obstacle'){
        // console.log(objA,objB,'nabrakcoy2')
        this.gameEngine.dispatch({type:'gameOver'})
      }
    
    })

    return{
      physics: {engine, world, RNSoundLevel},
      character: {body:character, size:[50,50], color:"blue", renderer: Character},
      floor: {body:floor, size:[Constants.MAX_WIDTH,50], color:"red", renderer: Floor},
      obstacle : {body:obstacle, size:[30,30], color:"red", renderer: Obstacle},
    }


  }

  

  componentWillUnmount(){
    RNSoundLevel.stop()
  }

  componentDidMount(){
    // RNSoundLevel.stop()
    RNSoundLevel.start()
    this.getPermission()
    console.log('mulai=============================')
    this.setState({
      isRunning:true
    })
    }

  onEvent = (e) =>{
    console.log(e)
    

    if(e.type==='score'){
      this.setState({
        score:this.state.score+1
      })
      console.log(this.state.score)
    }
    if(e.type==='gameOver'){
      console.log('gameOver')
      this.setState({
        isRunning:false
      })
      alert('game over dong coy')
    }

  }

  render(){
    return(
      <View style={styles.container}>
        <Image source={Background} style={styles.background} resizeMode="stretch">
        </Image>
          
        <GameEngine
          ref={(ref) => { this.gameEngine = ref}}
          style={styles.gameContainer}
          systems = {[Physics]}
          entities= {this.entities}
          running={this.state.isRunning}
          onEvent={this.onEvent}
        />
        <View style={{position:"absolute", top:30,left:30,bottom:0,right:0,flex:1}}>
        <Text>{this.state.score}</Text>
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
  background:{
    position:"absolute",
    top:0,
    left:0,
    right:0,
    bottom:0,
    width:Constants.MAX_WIDTH,
    height:Constants.MAX_HEIGHT,
  }
});
