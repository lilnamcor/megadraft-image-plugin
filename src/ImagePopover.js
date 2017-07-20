/***
 * Reference popover component for the content inside popover 
 * @patr
 */

import React, { Component } from "react";

// NPM Modules
import { StyleSheet, css } from 'aphrodite';
import Popover from 'react-popover';

// Components
import SvgIcon from './icons/SvgIcon';
import { smallIcon, mediumIcon, largeIcon } from './icons/svg';

const ICONS = [
  {id: 'small', icon: smallIcon, size: '25%'},
  {id: 'medium', icon: mediumIcon, size: '50%'},
  {id: 'large', icon: largeIcon, size: '100%'},
]

export default class ImageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 'medium',
    }
  }

  setSize(size, id) {
    this.props.changeWidth(size);

    this.setState({
      active: icon.id
    });
  }

  render() {
    var icons = ICONS.map((icon, index) => {
      var fill = this.state.active === icon.id ? '#48e79a' : '#fff';
      var style = {fill: fill};
      return (
        <SvgIcon fill={style} key={icon.id} path={icon.icon} onClick={() => this.setSize(icon.size, icon.id)} />
      );
    });
    return (
      <div className={css(styles.reference)}>
        { icons }
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
    'border-radius': '5px',
    background: '#303030',
    boxShadow: '0 3px 10px 0 rgba(0,0,0,0.3)',
    border: '3px solid rgba(0,0,0,0.1)',
    textAlign: 'center',
    zIndex: '2',
    padding: '10px',
  }
});
