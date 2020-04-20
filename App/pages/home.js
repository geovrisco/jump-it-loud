import React,{Component} from 'react'
import {
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native'
import constants from '../gameSettings/constants';



export default class HomePage extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Text>UserName</Text>
        <TextInput style={styles.texInput}></TextInput>
        <TouchableOpacity style={styles.buttonPlay} onPress={() => this.props.startGame()}>
          <Text>Play</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
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
  }
  
});