import React,{Component} from 'react'
import { View, Image } from 'react-native'
import Images from '../assets/batubata.png'

export default class Obstacle extends Component{

  render(){
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height /2 ;

    let obstacleRatio = width / 300;
    let obstacleHeight = 97 * obstacleRatio;
    const obstacleIteration =Math.ceil(height/obstacleHeight)

    return (
      <View style={
        {
          position:'absolute',
          top: y,
          left: x,
          width:width,
          height:height,
          overflow: "hidden",
          flexDirection: "column"
          }}>
        {Array.apply(null, Array(obstacleIteration)).map((el, idx)=> {
            return <Image style={{width: width, height: obstacleHeight}} resizeMode="stretch" key={idx} source={Images}></Image>
        })}
      </View>
    )
  }
}