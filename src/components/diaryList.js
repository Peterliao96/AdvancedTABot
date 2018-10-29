import React, { Component } from 'react';
var PropTypes = require('prop-types');
import {View, Image, Text, TouchableOpacity,StyleSheet,Dimensions,Modal} from 'react-native';
import moment from 'moment'
import {connect}  from 'react-redux';
import ImageViewer from 'react-native-image-zoom-viewer';
import {setZoomViewModalVisible} from '../actions/setModalVisible'
import {Avatar} from 'react-native-elements';
import { Header, Title, Left, Icon, Right, Button, Body, Content, Card, CardItem,ListItem,List } from "native-base";
var width = Dimensions.get('window').width; //full width

class DiaryList extends Component {

  render(){
    const {images,avatar,text,name,lastTime,location,setZoomViewModal} = this.props
    const {diary:{zoomViewModalVisible}} = this.props
    const imagesUrls = images.map(item => {
      insertObject = {}
      insertObject.url = item.image
      insertObject.freeHeight = true
      return insertObject
    })
    return (
      <ListItem >
        <View style={{flexDirection:'column',marginLeft:0}}>
          <View style={{flexDirection:'row'}}>
            <Avatar size="medium" rounded source={{uri:avatar}}/>
            <Text style={{marginTop:7,marginLeft:15}}>{name}</Text>
          </View>
          <View style={{marginTop:20,marginLeft:10}}><Text>{text}</Text></View>
          <View style={{flexDirection: 'column'}}>
            <View style={{backgroundColor:'white',height:images.length === 0 ? 0 : 120,flexDirection:'row'}}>
              {images.map(data => {
                if(images.indexOf(data) <= 2){
                  return (
                    <View>
                    <TouchableOpacity onPress={() => this.props.setZoomViewModal(true)}>
                    <Image style={{width:100,height:100,margin:10}} source={{uri:data.image}}/>
                    </TouchableOpacity>
                    <Modal
                  visible={zoomViewModalVisible}
                  transparent={true}
                  onRequestClose={() => this.props.setZoomViewModal(false)}
                >
                  <ImageViewer
                    imageUrls={imagesUrls}
                    onClick={(onCancel) => {onCancel()}}
                    index={images.indexOf(data)}
                    onSwipeDown={() => {
                      console.log('onSwipeDown');
                    }}
                    enableSwipeDown={true}
                  />
                </Modal>
                </View>
                  )
                }
              })}
            </View>
            <View style={{backgroundColor:'white',height:images.length < 4 ? 0 : 120,flexDirection:'row'}}>
            {images.map(data => {
              if(images.indexOf(data) >=3 && images.indexOf(data) <= 5){
                return (
                  <View>
                  <TouchableOpacity onPress={() => this.props.setZoomViewModal(true)}>
                  <Image style={{width:100,height:100,margin:10}} source={{uri:data.image}}/>
                  </TouchableOpacity>
                  <Modal
                visible={zoomViewModalVisible}
                transparent={true}
                onRequestClose={() => this.props.setZoomViewModal(false)}
              >
                <ImageViewer
                  imageUrls={imagesUrls}
                  onClick={(onCancel) => {onCancel()}}
                  index={images.indexOf(data)}
                  onSwipeDown={() => {
                    console.log('onSwipeDown');
                  }}
                  enableSwipeDown={true}
                />
              </Modal>
              </View>
                )
              }
            })}
            </View>
            <View style={{backgroundColor:'white',height:images.length < 7 ? 0 : 120,flexDirection:'row'}}>
            {images.map(data => {
              if(images.indexOf(data) >=6 && images.indexOf(data) <= 8){
                return (
                  <View>
                  <TouchableOpacity onPress={() => this.props.setZoomViewModal(true)}>
                  <Image style={{width:100,height:100,margin:10}} source={{uri:data.image}}/>
                  </TouchableOpacity>
                  <Modal
                visible={zoomViewModalVisible}
                transparent={true}
                onRequestClose={() => this.props.setZoomViewModal(false)}
              >
                <ImageViewer
                  imageUrls={imagesUrls}
                  onClick={(onCancel) => {onCancel()}}
                  index={images.indexOf(data)}
                  onSwipeDown={() => {
                    console.log('onSwipeDown');
                  }}
                  enableSwipeDown={true}
                />
              </Modal>
              </View>
                )
              }
            })}
            </View>
            <View>
              <Text style={{marginLeft:10,fontSize:10}}>{location}</Text>
            </View>
            <View>
            <Text style={{
              backgroundColor: 'transparent',
              fontSize: 8,
              color: '#000',
              marginLeft:10,
              marginTop:10
            }}>
              {moment(lastTime).from(Date.now())}
              </Text>
            </View>
          </View>
        </View>
      </ListItem>
    )
  }
}
const mapStateToProps = (state) => ({
  diary:state.diary
})
const mapDispatchToProps = (dispatch) => ({
  setZoomViewModal: data => {dispatch(setZoomViewModalVisible(data))}
})
export default connect(mapStateToProps,mapDispatchToProps)(DiaryList);
