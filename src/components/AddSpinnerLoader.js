
import React from "react";

import create from './Extension';

import SpinnerLoader  from './SpinnerLoader';

var AddSpinnerLoader = {
  extensionName: 'AddSpinnerLoader',

  optionalParams: {
    spinnerContainerStyles: 'styles for the spinner loader',
  },

  exports: {
    methods: ['start', 'stop']
  },

  getInitialState() {
    return {
      spinning: false,
    }
  },

  start() {
    this.setState({spinning: true})
  },

  stop() {
    this.setState({spinning: false})
  },

  renderExtension() {
    return (
      <SpinnerLoader
        spinning={this.state.spinning}
        spinnerContainerStyles={this.params.spinnerContainerStyles}
      >
        {this.renderComponent()}
      </SpinnerLoader>
    )
  }
};

export default create(AddSpinnerLoader);
