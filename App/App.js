import React,{Component} from 'react';
import { StyleSheet, Text, View, StatusBar,TouchableOpacity ,Button, Image, KeyboardAvoidingView, Platform} from 'react-native';
import RNSoundLevel from 'react-native-sound-level'
import Constants from './gameSettings/constants'
import {GameEngine} from 'react-native-game-engine'
import Matter from 'matter-js'
import * as Permissions from 'expo-permissions'
import Character from './components/character'
import Physics, {
  resetObstacles
} from './gameSettings/physics'
import Floor from './components/floor'
import Background from './assets/background.png'
import HomeDiv from './pages/home'


export default class App extends Component {
  constructor(props){
    super(props)
    this.gameEngine = null;
    this.entities = this.setupWorld()
    this.state = {
      isRunning:false,
      score:0,
      gamePlayed: false
    }
    this.startGame=this.startGame.bind(this)
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

    let character = Matter.Bodies.rectangle(Constants.MAX_WIDTH / 4, Constants.MAX_HEIGHT-102, 50,50,{label:'character'})
    let floor  = Matter.Bodies.rectangle(Constants.MAX_WIDTH/2, Constants.MAX_HEIGHT - 50, Constants.MAX_WIDTH,50, {isStatic:true, label:'floor'})
    Matter.World.add(world, [character,floor]) 

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

    }


  }

  restartGame(){
    RNSoundLevel.start()
    
    this.setState({
      isRunning:true,
      score:0
    })
    resetObstacles()
    this.gameEngine.swap(this.setupWorld())
  }

  componentWillUnmount(){
    RNSoundLevel.stop()
  }

  componentDidMount(){
    // RNSoundLevel.stop()
    RNSoundLevel.start()
    this.getPermission()
    console.log('mulai=============================')
    // this.setState({
    //   isRunning:true
    // })
    }
  startGame(){
    this.setState({
      isRunning: true,
      gamePlayed: true,
    })
  }

  onEvent = (e) =>{
    // console.log(e)
    

    if(e.type==='score'){
      this.setState({
        score:this.state.score+1
      })
      // console.log(this.state.score)
    }
    if(e.type==='gameOver'){
      console.log('gameOver')
      this.setState({
        isRunning:false
      })
      RNSoundLevel.stop()
    }

  }

  render(){
    return(
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == "ios"? "padding" : "height"}>
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
        {
          !this.state.isRunning && !this.state.gamePlayed &&
          <View style={styles.container}>
            <HomeDiv startGame={this.startGame}></HomeDiv>
          </View>
        }
        {
          !this.state.isRunning && this.state.gamePlayed && 
          <View style={styles.container}>
          <Button style={{width:100}} onPress={()=> this.restartGame()} title="restart"></Button>
          </View>
        }
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background:{
    position:"absolute",
    top:0,
    left:0,
    right:0,
    bottom:0,
    width:Constants.MAX_WIDTH,
    height:Constants.MAX_HEIGHT,
  },
  container2: {
    position:"absolute",
  },
});
