import React, { Component } from 'react';
import {
  StyleSheet,
  PanResponder,
  PixelRatio,
  View,
  ActivityIndicator,
} from 'react-native';
var PropTypes = require('prop-types');
import cssVar from './cssVar';

class SpinnerLoader extends Component{
  propTypes: {
    spinning: PropTypes.bool,
  }

  getInitialState() {
    return {
      width: 0,
      height: 0,
    };
  }

  componentWillMount() {
    this._panGesture = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => { return false },
      onStartShouldSetPanResponderCapture: (evt, gestureState) => { return false },
      onMoveShouldSetPanResponder: (evt, gestureState) => { return false },
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => { return false },
    });
  }

  overlayStyle() {
    return {
      top: 0,
      left: 0,
      height: this.state.height,
      width: this.state.width,
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
    };
  }

  onChildrenLayout(event) {
    this.setState({
      height: event.nativeEvent.layout.height,
      width:  event.nativeEvent.layout.width,
    });
  }

  renderSpinner() {
    if (!this.props.spinning || this.state.height === 0) {
      return null;
    }

    return (
      <View style={this.overlayStyle()} {...this._panGesture.panHandlers}>
        <View style={[styles.spinnerContainer, this.props.spinnerContainerStyles]}>
          <ActivityIndicator style={styles.spinner} size="large" color={cssVar('blue50')} />
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={{flex: 1}} onLayout={this.onChildrenLayout}>
        {this.props.children}
        {this.renderSpinner()}
      </View>
    );
  }

}

var styles = StyleSheet.create({
  spinnerContainer: {
    width: 60,
    height: 60,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60 / PixelRatio.get(),
    opacity: 0.70,
  },
  spinner: {
    width: 32,
    height: 32,
  },
});

export default SpinnerLoader;
