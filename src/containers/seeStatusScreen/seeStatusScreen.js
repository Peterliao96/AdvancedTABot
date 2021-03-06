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
import {changeSeeStatus} from '../../actions/changeSeeStatus';
import {Avatar,List, ListItem} from 'react-native-elements'
import { COLOR, ThemeProvider, Toolbar, Badge, IconToggle } from 'react-native-material-ui';
import CustomButton from '../../components/CustomButton'
class SeeStatusScreen extends Component{
  static propTypes = {
    logout: PropTypes.func
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerTitle:'See Status',
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

  async chooseStatus(id, seeStatus){
    const data = {
      id:id,
      seeStatus:seeStatus
    }
    this.props.onChangeSeeStatus(data)
  }

  render() {
    const data = [{
      id:'1',
      seeStatus:1,
      icon:'done',
      title:'All friends can see'
    },{
      id:'2',
      seeStatus:2,
      icon:'done',
      title:'Only me can see'
    },{
      id:'3',
      seeStatus:3,
      icon:'done',
      title:'Some friends can see'
    }]
    const {status:{seeStatus}} = this.props
    return (
      <List
    containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}
  >
    <FlatList
      data={data}
      extraData={this.props}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity>
          <ListItem
            title={item.title}
            hideChevron={seeStatus === item.seeStatus ? false : true}
            rightIcon={{name:seeStatus === item.seeStatus ? item.icon : null}}
            containerStyle={{ borderBottomWidth: 0 }}
            onPress={this.chooseStatus.bind(this,item.id,item.seeStatus)}
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
  status:state.status
})

const mapDispatchToProps = (dispatch) => ({
  onChangeSeeStatus: data => dispatch(changeSeeStatus(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(SeeStatusScreen)

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
