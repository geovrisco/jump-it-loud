import React,{Component} from 'react'
import {
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image
} from 'react-native'
// import Sound from 'react-native-sound'
import constants from '../gameSettings/constants';
import logo from '../assets/logo.png'
import bgm from '../assets/bgm.mp3'
import SoundPlayer from 'react-native-sound-player'
import LeaderBoard from '../pages/leaderboard'


const size60 = Math.round( constants.MAX_WIDTH * 0.8)

export default class HomePage extends Component{
  constructor(props){
    super(props)

  }

  

  componentDidMount(){
    console.log('===didmountHome==')
    try {
      // play the file tone.mp3
      console.log('masuk')
      SoundPlayer.playSoundFile('bgm', 'mp3')
      // or play from url
      // SoundPlayer.playUrl('https://example.com/music.mp3')
  } catch (e) {
      console.log(`cannot play the sound file`, e)
  }

  }

  componentWillUnmount(){
    SoundPlayer.stop()
  }

  render(){
    return (
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={{alignItems:"center", width:size60}}>
          <Image
            source={logo}
            style={{width:250,height:250}}
          />
          <Text style={styles.Text}>Speak Louder To Make Character Jump Higher</Text>
          <TouchableOpacity style={styles.buttonPlay} onPress={() => this.props.startGame()}>
            <Text>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonPlay} onPress={() => this.props.toggleLeaderBoard()}>
            <Text>Leader Board</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    position:"absolute",
    top:0,
    left:0,
    right:0,
    bottom:0,
    width:constants.MAX_WIDTH,
    height:constants.MAX_HEIGHT,
    alignItems:'center',
    justifyContent:"center"
  },
  texInput:{
    width:300,
    borderWidth:1,
    borderRadius:5,
    backgroundColor:"#fff"
  },
  buttonPlay:{
    width: 200,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  Text:{
    fontFamily:"pixelboy",
    fontSize:20,
    textAlign:"center",
    lineHeight:20
  }
  
});