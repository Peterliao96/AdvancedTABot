import React, {Component} from 'react';
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from 'react-native';
const width = Dimensions('window').width;

export default class Header extends Component{

  state = {
    index: 0,
    modalVisible: false
  };

  render(){
    const images = [{
      props:{
        source:avatar
      },
      freeHeight:true
    }]
    const {name, description, avatar} = this.props;
    return (
      <Image style={styles.headerBackground} source={require('../images/drawerImage.png')}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.setState(modalVisible:true)}
            <View style={styles.profilepicWrap}>
              <Image style={style.profiepic} source={avatar} />
            </View>
          </TouchableOpacity>
                <Modal
              visible={this.state.modalVisible}
              transparent={true}
              onRequestClose={() => this.setState({ modalVisible: false })}
            >
              <ImageViewer
                imageUrls={images}
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
      </Image>
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
    width: 180,
    height: 180,
    borderRadius:100,
    borderColor: 'rgba(0,0,0,0.4)',
    borderRadius:16
  },
  profiepic:{
    flex:1,
    width:null,
    alignSelf:'stretch',
    borderRadius:100,
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
