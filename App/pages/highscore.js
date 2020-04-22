import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, StatusBar,TouchableOpacity ,Button, Image, KeyboardAvoidingView, Platform} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios'
import ButtonSubmit from '../assets/btn-submit.png'
import ButtonCancel from '../assets/btn-cancel.png'

const SubmitLeaderBoard = (props) => {
  const[score,setScore] = useState(0)
  const[name,setName]= useState('player')

  const onChangeTexinput = (e)=>{
    setName(e)
  }

  const postHighscore = async ()=>{
    try {
      const response = await axios.post('http://ec2-3-0-96-195.ap-southeast-1.compute.amazonaws.com:3001/leaderboard',{
        name:name,
        score: Number(props.localScore)
      })

      props.toggleSubmitHighscore()
    } catch (error) {
    }
  }
  

  useEffect(()=>{
    setScore(props.localScore)
  })

  return(
    <KeyboardAvoidingView  behavior={Platform.OS == "ios"? "padding" : "height"}>
        <TextInput style={styles.TextInput} onChangeText={(e) => onChangeTexinput(e)} placeholder="Type Your Name Here..."></TextInput>
      <View style={{flexDirection:"row", marginTop:20}} >
        <TouchableOpacity onPress={() => postHighscore ()}>
          <Image resizeMode="stretch"  style={{width:100, height:38}} source={ButtonSubmit}></Image>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> props.toggleSubmitHighscore()}>
          <Image resizeMode="stretch"  style={{width:100, height:38}} source={ButtonCancel}></Image>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  TextInput:{
    backgroundColor:"rgba(255,255,255,0.6)",
    height:40,
    borderTopWidth:2,
    borderBottomWidth:2,
    borderLeftWidth:2,
    borderRightWidth:2,
    borderRadius:20,
    paddingLeft:20,
    fontSize:15,
    fontFamily:'pixelboy'
  }
})


export default SubmitLeaderBoard