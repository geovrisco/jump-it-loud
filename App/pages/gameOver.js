import React, {Component} from 'react'
import {Text, TextInput, KeyboardAvoidingView, View,StyleSheet, Button, TouchableOpacity, Image} from 'react-native'
import constants from '../gameSettings/constants'
import ButtonRestart from '../assets/btn-restart.png'
import ButtonHome from '../assets/btn-home.png'

export default class GameOver extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <KeyboardAvoidingView style={styles.container} >
          <View style={styles.info}>
            <View style={{alignItems:"center"}}>
              <Text style={styles.textCat}>Score</Text>
              <Text style={styles.score}>{this.props.score}</Text>
            </View>
          </View>
        
        <View style={{flexDirection:"row"}}>
          <TouchableOpacity style={{marginRight:10}} onPress={()=> this.props.restartGame()}>
            <Image source={ButtonRestart} resizeMode="stretch"  style={{width:100, height:38}}></Image>
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft:10}} onPress={()=> this.props.renderHome()}>
            <Image  source={ButtonHome} resizeMode="stretch"  style={{width:100, height:38}}></Image>
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
  textCat:{
    fontSize:20,
    fontFamily:"pixelboy"
  },
  score:{
    fontFamily:"pixelboy",
    fontSize:45,
    color:"#df7126",
  },
  info:{
    width:100,
    height:120,
    backgroundColor:"rgba(255,255,255,0.5)",
    justifyContent:"center",
    alignItems:"center",
    marginBottom:20,
    borderColor:"black",
    borderBottomWidth:4,
    borderLeftWidth:4,
    borderRightWidth:4,
    borderTopWidth:4,
    borderRadius:20
  }
})