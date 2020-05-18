import React,{Component} from 'react'
import { View ,Image } from 'react-native'

let floor_image=require('../assets/tanah_batu.png')

export default class Floor extends Component{

  render(){
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height /2 ;

    const imageIterations = Math.ceil(width / height);

    return (
      <View style={
        {
          position:'absolute',
          top: y,
          left: x,
          width:width,
          height:height,
          overflow: 'hidden',
          flexDirection: 'row'
          }}>
          {
            Array.apply(null, Array(imageIterations)).map((el,index)=>{
              return <Image style={{ width: height, height: height }} key={index} resizeMode="stretch" source={floor_image} />
            })
          }
      </View>
    )
  }
}