import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity} from 'react-native'
import constants from '../gameSettings/constants'
import axios from 'axios'
import LeaderboardImage from '../assets/LEADERBOARD.png'

const leaderboard = () => {
    const [board, setBoard] = useState([])

    const getBoard = async () => {
        try{
            console.log('asdasd')
            let result = await axios.get('http://ec2-3-0-96-195.ap-southeast-1.compute.amazonaws.com:3001/leaderboard')
            
            result.data.leaderBoard.sort((a, b)=> b.score - a.score)
            console.log(result.data.leaderBoard)
            setBoard(result.data.leaderBoard)
        }catch(err){
            console.log('error fetch',err)
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
                board.map((data, index) => index < 5 ? (<View style={styles.scoreData} key={index}>
                    <Text style={{fontSize: 20, marginTop:5, fontFamily: "arial"}}>{data.name}:   {data.score}</Text>
                </View>) : '' )
              }
            </View>
          </ImageBackground>
          <TouchableOpacity style={styles.buttonHome}>
            <Text>Home</Text>
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
      marginTop: 10
    },

    board: {
      width: 410, 
      height: 500,
      alignItems: 'center',
      justifyContent: 'center'
    }, 

    scoreContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 100
    },

    buttonHome: {
      width: 85,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'grey'
    }
})

export default leaderboard