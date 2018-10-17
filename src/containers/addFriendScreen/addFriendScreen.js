import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
var PropTypes = require('prop-types');
import {List, ListItem} from 'react-native-elements';
import CustomButton from '../../components/CustomButton'
class AddFriendScreen extends Component{

  render() {
    const {user: {userInfo}} = this.props
    return (
      <View>
      <List
    containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}
  >
      <FlatList
        data={userInfo}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity>
            <ListItem
              roundAvatar
              title={item.fullName}
              subtitle={item.description}
              onPress={() => this.props.navigation.push('UserProfileScreen',{UserId:item.UserId, fullName:item.fullName, avatar:item.avatar,description:item.description})}
              avatar={{uri:item.avatar}}
              containerStyle={{ borderBottomWidth: 0 }}
            />
            </TouchableOpacity>
          )
        }}
        keyExtractor={(item,index) => item.UserId}
      />
      </List>
        <CustomButton
          text={'Create a bot'}
          onPress={() => this.props.navigation.navigate('CreateBotScreen')}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps,null)(AddFriendScreen)

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
