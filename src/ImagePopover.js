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
  {id: 'small', icon: smallIcon, width: '50%'},
  {id: 'medium', icon: mediumIcon, width: '75%'},
  {id: 'large', icon: largeIcon, width: '99%'},
]

export default class ImageComponent extends Component {
  constructor(props) {
    super(props);
  }

  setSize(width, id) {
    this.props.changeWidth(width);

    this.setState({
      active: id
    });
  }

  render() {
    var icons = ICONS.map((icon, index) => {
      var fill = this.props.width === icon.width ? '#48e79a' : '#fff';
      var style = {fill: fill};
      return (
        <div onClick={() => this.setSize(icon.width, icon.id)} className={css(styles.button)}>
          <SvgIcon fill={style} key={icon.id} path={icon.icon} />
        </div>
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
  button: {
    cursor: 'pointer',
  },
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
    display: 'flex',
    width: '90px',
    justifyContent: 'space-between',
  }
});
