/*
 * Copyright (c) 2017, Itai Reuveni <itaireuveni@gmail.com>
 *
 * License: MIT
 */

import React, {Component} from "react";

import TextAreaAutoSize from "react-textarea-autosize";

import Popover from "react-popover";

import ImagePopover from './ImagePopover.js';

import {MegadraftPlugin, MegadraftIcons} from "megadraft";

import {StyleSheet, css} from 'aphrodite';

const {BlockContent, BlockData, BlockInput, CommonBlock} = MegadraftPlugin;


export default class Block extends Component {

  constructor(props) {
    super(props);

    this._handleCaptionChange = ::this._handleCaptionChange;
    this._clearPlaceholder = ::this._clearPlaceholder;
    this._putPlaceholder = ::this._putPlaceholder;
    this.changeWidth = ::this.changeWidth;
    this.state = {
        placeholder: "Add a caption here",
        open: false,
        width: '50%',
    }

    this.actions = [
      {"key": "delete", "icon": MegadraftIcons.DeleteIcon, "action": this.props.container.remove}
    ];
  }

  _handleCaptionChange(event) {
    this.props.container.updateData({caption: event.target.value});
  }

  _clearPlaceholder(event) {
    this.setState({placeholder: ""});
  }

  _putPlaceholder(event) {
    this.setState({placeholder: "Add a caption here"});
  }

  handleClick(e) {
    this.setState({open: !this.state.open});
  }

  handleClose(e) {
    this.setState({open: false});
  }

  changeWidth(width) {
    console.log(width);
    this.setState({width: width});
  }

  render(){
    if (this.props.data.imageFile) {
      return (
        <div>
          {this.props.blockProps.getInitialReadOnly()
            ?   <div>
                  <p>"HELLO"</p>
                </div>
            :   <div className={css(styles.inputWrapper)}>
                    <div className={css(styles.imageDiv)}>
                      <Popover
                        className={css(styles.popover)}
                        body={<ImagePopover changeWidth={this.changeWidth}/>}
                        preferPlace='above'
                        onOuterAction={this.handleClick.bind(this)}
                        isOpen={this.state.open}>
                        <img
                          src={this.props.data.imageFile[0].preview}
                          ref='image'
                          className={css(styles.image)}
                          style={{width:this.state.width}}
                          onClick={this.handleClick.bind(this)}
                        />
                      </Popover>
                    </div>
                    <TextAreaAutoSize
                      onFocus={this._clearPlaceholder}
                      onBlur={this._putPlaceholder}
                      id='caption'
                      rows={1}
                      placeholder={this.state.placeholder}
                      className={css(styles.input)}
                      onChange={this._handleCaptionChange}
                      value={this.props.data.caption}
                    />
                </div>
          }
        </div>
      );
    }
    else {
      return (
        <div className={css(styles.titleBlock)}>
          {this.props.blockProps.getInitialReadOnly()
            ?   <div>
                  <p>"HELLO"</p>
                </div>
            :   <div>
                  <p>"WORLD"</p>
                </div>
          }
        </div>
      );
    }
  }
}

var styles = StyleSheet.create({
  inputWrapper: {
    width: '100%',
    textAlign: 'center',

  },
  input: {
    border: 'none',
    outline: 'none',
    fontSize: '24px',
    paddingLeft: '15px',
    paddingBottom: '15px',
    width: '100%',
    textAlign: 'center',
  },
  imageDiv: {
    position: 'relative',
    height: '100%',
    width: '100%',
    overflow: 'hidden'
  },
  image: {
    height: 'auto',
    overflow: 'hidden'
  },
  popover: {
    zIndex: '2',
  },
})

