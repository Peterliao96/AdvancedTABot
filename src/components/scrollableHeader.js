import React, { Component } from 'react';
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  Dimensions,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
  ImageBackground,
  FlatList
} from 'react-native';
import DiaryList from './diaryList'
import { SearchBar } from 'react-native-elements'
import ImageViewer from 'react-native-image-zoom-viewer';
import {connect} from 'react-redux';
import { COLOR, ThemeProvider, Toolbar, Badge, IconToggle,Avatar } from 'react-native-material-ui';
const HEADER_MAX_HEIGHT = 250;
const deviceW = Dimensions.get('window').width
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 0 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class ScrollableHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
      ),
      refreshing: false,
      index: 0,
      modalVisible: false
    };
  }

  _renderScrollViewContent() {
    const data = this.props.diary.diaryList;
    return (
      <View style={{flex:1,backgroundColor:'white'}}>
      <FlatList
      extraData={this.props}
      data={data}
      renderItem={({item}) => {
        return (
          <DiaryList avatar={item.avatar} name={item.name} text={item.text} images={item.images} location={item.location} lastTime={item.sendTime}/>
        )
      }}
      keyExtractor={(item,index) => item.diaryId}
      />
      </View>
    );
  }

  render() {
    // Because of content inset the scroll value will be negative on iOS so bring
    // it back to 0.
    const {diary:{diaryList}} = this.props
    const scrollY = Animated.add(
      this.state.scrollY,
      Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
    );
    const headerTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    });

    const imageOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });
    const imageTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    });

    const titleScale = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0.8],
      extrapolate: 'clamp',
    });
    const titleTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, -8],
      extrapolate: 'clamp',
    });
    const images = [{
      url:this.props.avatar,
      freeHeight:true
    }]
    const {avatar, name, description} = this.props;
    return (
      <View style={styles.fill}>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor={COLOR.blue500}
        />
        <Animated.ScrollView
          style={styles.fill}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true },
          )}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState({ refreshing: true });
                setTimeout(() => this.setState({ refreshing: false }), 1000);
              }}
              // Android offset for RefreshControl
              progressViewOffset={HEADER_MAX_HEIGHT}
            />
          }
          // iOS offset for RefreshControl
          contentInset={{
            top: HEADER_MAX_HEIGHT,
          }}
          contentOffset={{
            y: -HEADER_MAX_HEIGHT,
          }}
        >
        {this._renderScrollViewContent()}
        </Animated.ScrollView>
        <Animated.View
          pointerEvents="none"
          style={[
            styles.header,
            { transform: [{ translateY: headerTranslate }] },
          ]}
        >
          <ImageBackground style={styles.headerBackground} source={require('../images/trianglify1.png')}></ImageBackground>
          <View style={{flex:1,flexDirection:'row'}}>
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
        <View style={{flexDirection:'column',marginLeft:20}}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.pos}>{description}</Text>
          </View>
          </View>
        </Animated.View>
        <Animated.View
          style={[
            styles.bar,
            {
              transform: [
                { scale: titleScale },
                { translateY: titleTranslate },
              ],
            },
          ]}
        >
        </Animated.View>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  diary:state.diary
})

export default connect(mapStateToProps,null)(ScrollableHeader)
const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#F5FCFF",
    height: HEADER_MAX_HEIGHT,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  bar: {
    backgroundColor: 'transparent',
    marginTop: Platform.OS === 'ios' ? 0 : 38,
    height: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    color: 'white',
    fontSize: 18,
  },
  scrollViewContent: {
    // iOS uses content inset, which acts like padding.
    paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT  : 0,
  },
  row: {
    height: 10,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilepicWrap:{
    width: 100,
    height: 100,
    borderRadius:50,
    borderColor: 'rgba(0,0,0,0.4)',
    borderRadius:16,
    marginLeft:20,
    marginTop:130,
    overflow:'hidden'
  },
  profiepic:{
    flex:1,
    width:null,
    alignSelf:'stretch',
    borderRadius:50,
    borderColor:'#FFF',
    borderWidth:4
  },
  name:{
    marginTop:150,
    fontSize:16,
    color:'#FFF',
    fontWeight:'bold'
  },
  pos:{
    fontSize:14,
    color:COLOR.blue100,
    fontWeight:'300',
    fontStyle:'italic'
  },
  SubHeader : {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  headerBackground:{
    position:'absolute',
    width: deviceW,
    alignSelf: 'stretch',
    height:200
  },
});
