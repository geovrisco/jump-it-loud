import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity} from 'react-native'
import constants from '../gameSettings/constants'
import axios from 'axios'
import LeaderboardImage from '../assets/LEADERBOARD.png'
import ButtonHome from '../assets/btn-home2.png'

const leaderboard = (props) => {
    const [board, setBoard] = useState([])
    
    const getBoard = async () => {
        try{
            
            let result = await axios.get('http://ec2-3-0-96-195.ap-southeast-1.compute.amazonaws.com:3001/leaderboard')
            
            result.data.leaderBoard.sort((a, b)=> b.score - a.score)
            
            setBoard(result.data.leaderBoard)
        }catch(err){
            
        }
    }

    useEffect(()=>{
        getBoard()
    }, [])

    return(
        <View style={styles.container}>
          <ImageBackground style={styles.board} source={LeaderboardImage}>
            <View style={styles.scoreContainer}>
              {
                board.map((data, index) => index < 5 ? (
                <View style={styles.scoreData} key={index}>
                  <Text style={styles.number}>{`${index+1}`}</Text>
                  <Text style={styles.name}>{data.name}</Text>
                  <Text style={styles.score}>{`${data.score}`}</Text>
                </View>) : <View key={index}></View> )
              }
            </View>
          </ImageBackground>
          <TouchableOpacity style={{marginTop:10,}} onPress={()=> props.toggleLeaderBoard()}>
            <Image  style={styles.buttonHome} resizeMode="stretch" source={ButtonHome}></Image>
          </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      position:"absolute",
      top:0,
      left:1,
      right:0,
      bottom:0,
      width:constants.MAX_WIDTH,
      height:constants.MAX_HEIGHT,
      alignItems:'center',
      justifyContent:"center"
    },

    scoreData: {
      flex: 0,
      flexDirection: 'row',
      marginTop: 15
    },

    board: {
      width: constants.MAX_WIDTH * 0.8, 
      height: constants.MAX_WIDTH *0.8 *1.2 ,
      alignItems: 'center',
      justifyContent: 'center'
    }, 

    scoreContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 100
    },

    buttonHome: {
      width: 100,
      height: 40
    },
    number:{
      fontSize:17,
      width:20,
      fontFamily:"pixelboy"
    },
    name:{
      fontSize:17,
      width:145 ,
      fontFamily:"pixelboy"
    },
    score:{
      fontSize:17,
      width:50,
      fontFamily:"pixelboy"
    }
})

export default leaderboard