import React from 'react';
var PropTypes = require('prop-types');
import { Platform, ViewPropTypes, TouchableNativeFeedback, TouchableOpacity } from 'react-native'

const IS_ANDROID = Platform.OS === 'android'
const IS_RIPPLE_EFFECT_SUPPORTED = Platform.Version >= 21 && IS_ANDROID

const TouchableView = ({ isRippleDisabled, rippleColor, children, style, ...props }) => {
  if (IS_RIPPLE_EFFECT_SUPPORTED && !isRippleDisabled) {
    const background = TouchableNativeFeedback.Ripple('#FFF')
    return (
      <TouchableNativeFeedback {...props} background={background}>
        <View style={style}>{children}</View>
      </TouchableNativeFeedback>
    )
  } else {
    return (
      <TouchableOpacity {...props} style={style}>
        {children}
      </TouchableOpacity>
    )
  }
}

TouchableView.propTypes = {
  isRippleDisabled: PropTypes.bool,
  rippleColor: PropTypes.string,
  children: PropTypes.any,
  style: ViewPropTypes.style
}

export default TouchableView
