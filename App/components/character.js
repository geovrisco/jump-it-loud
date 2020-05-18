import React,{Component} from 'react'
import { View, Image } from 'react-native'
import Fox from '../assets/foxchara.gif'
import Images from '../assets/index'

export default class Character extends Component{

  render(){
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height /2 ;

    let image = Images['fox' + this.props.pose]
    // console.log('Characters',{x,y,width,height})
    return (
      <Image style={
        {
          position:'absolute',
          top: y,
          left: x,
          width:width,
          height:height,
          }}
          source={image}
          
          >
      </Image>
    )
  }


}