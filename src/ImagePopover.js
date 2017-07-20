/***
 * Reference popover component for the content inside popover 
 * @patr
 */

import React, { Component } from "react";

// NPM Modules
import { StyleSheet, css } from 'aphrodite';
import Popover from 'react-popover';

export default class ImageComponent extends Component {
  constructor(props) {
    super(props);
  }

  setSize(size) {
    this.props.changeWidth(size);
  }
  
  render() {
    return (
      <div className={css(styles.reference)}>
        <button onClick={() => this.setSize('25%')}>Small</button>
        <button onClick={() => this.setSize('50%')}>Medium</button>
        <button onClick={() => this.setSize('100%')}>Large</button>
      </div>
    );
  }
}

var styles = StyleSheet.create({
  reference: {
    fontFamily: 'Roboto',
    fontSize: '13px',
    fontWeight: '300',
    background: 'black',
    'border-radius': '22px',
    boxShadow: '0 3px 10px 0 rgba(0,0,0,0.3)',
    border: '3px solid rgba(0,0,0,0.1)',
    textAlign: 'center',
    zIndex: '2',
    padding: '10px',
  }
});
