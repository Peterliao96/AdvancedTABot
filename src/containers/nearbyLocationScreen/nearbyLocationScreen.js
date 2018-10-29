import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';
var PropTypes = require('prop-types');
import  Icon  from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {searchNearbyLocation,chooseAddress} from '../../actions/searchNearbyLocation';
import {Avatar,List, ListItem} from 'react-native-elements'
import { COLOR, ThemeProvider, Toolbar, Badge, IconToggle } from 'react-native-material-ui';
import CustomButton from '../../components/CustomButton'
class NearbyLocationScreen extends Component{
  static propTypes = {
    logout: PropTypes.func
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerTitle:'Nearby location',
      headerTintColor: 'white',
      headerStyle:{
        backgroundColor:COLOR.blue500
      },
      headerTitleStyle:{
        color:'#FFF'
      },
      headerRight:(
        <View style={{flexDirection:'row'}}>
          <Avatar  size="small" rounded source={{uri:navigation.getParam('avatar')}}/>
        </View>
    ),
    headerRightContainerStyle:{
      marginRight:20
    }
  }
}

  async chooseLocation(index){
    this.props.onChooseAddress(index)
  }

  componentDidMount(){
    this.props.onSearchNearbyLocation(this.props.navigation.getParam('location'))
  }

  render() {
    const {diary:{locations,chosenLocation}} = this.props
    const {onSearchNearbyLocation,navigation} = this.props
    const location = navigation.getParam('location')
    return (
      <List
    containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}
  >
    <FlatList
      data={locations}
      extraData={this.props}
      renderItem={({ item,index }) => {
        return (
          <TouchableOpacity>
          <ListItem
            title={item.name}
            hideChevron={chosenLocation === index ? false : true}
            rightIcon={{name:chosenLocation === index ? 'done' : null}}
            containerStyle={{ borderBottomWidth: 0 }}
            onPress={this.chooseLocation.bind(this,index)}
          />
          </TouchableOpacity>
        )
      }}
      keyExtractor={(item,index) => item.id}
    />
  </List>
    )
  }
}

const mapStateToProps = (state) => ({
  diary:state.diary
})

const mapDispatchToProps = (dispatch) => ({
  onChooseAddress: data => {dispatch(chooseAddress(data))},
  onSearchNearbyLocation:data => {dispatch(searchNearbyLocation(data))}
})

export default connect(mapStateToProps,mapDispatchToProps)(NearbyLocationScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#1976D2',
    margin: 20
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});
