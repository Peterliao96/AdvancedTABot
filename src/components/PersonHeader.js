import React, {Component} from 'react';
var PropTypes = require('prop-types');
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Alert,
  Modal
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

export default class PersonHeader extends Component{

  constructor(props){
    super(props);
    this.state = {
      index: 0,
      modalVisible: false
    };
  }

  render(){
    const images = [{
      url:this.props.avatar,
      freeHeight:true
    }]
    const {avatar, name, description} = this.props;
    return(
      <ImageBackground style={styles.headerBackground} source={require('../images/drawerImage.png')}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => this.setState({modalVisible:true})}>
          <View style={styles.profilepicWrap}>
            <Image style={styles.profiepic} source={{uri:avatar}}/>
          </View>
        </TouchableOpacity>
        <Modal
      visible={this.state.modalVisible}
      transparent={true}
      onRequestClose={() => this.setState({ modalVisible: false })}
    >
      <ImageViewer
        imageUrls={images}
        onClick={(onCancel) => {onCancel()}}
        index={this.state.index}
        onSwipeDown={() => {
          console.log('onSwipeDown');
        }}
        enableSwipeDown={true}
      />
    </Modal>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.pos}>{description}</Text>
        </View>
      </ImageBackground>
    )
  }
}



const styles = StyleSheet.create({
  headerBackground:{
    flex:1,
    width: null,
    alignSelf: 'stretch'
  },
  header : {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  profilepicWrap:{
    width: 120,
    height: 120,
    borderRadius:60,
    borderColor: 'rgba(0,0,0,0.4)',
    borderRadius:16
  },
  profiepic:{
    flex:1,
    width:null,
    alignSelf:'stretch',
    borderRadius:60,
    borderColor:'#FFF',
    borderWidth:4
  },
  name:{
    marginTop:20,
    fontSize:16,
    color:'#FFF',
    fontWeight:'bold'
  },
  pos:{
    fontSize:14,
    color:'#0394c0',
    fontWeight:'300',
    fontStyle:'italic'
  }
})
