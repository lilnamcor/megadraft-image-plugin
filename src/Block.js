/*
 * Copyright (c) 2017, Itai Reuveni <itaireuveni@gmail.com>
 *
 * License: MIT
 */

import React, {Component} from "react";

import TextAreaAutoSize from "react-textarea-autosize";

import Popover from "react-simple-popover";

import {MegadraftPlugin, MegadraftIcons} from "megadraft";

import {StyleSheet, css} from 'aphrodite';

const {BlockContent, BlockData, BlockInput, CommonBlock} = MegadraftPlugin;


export default class Block extends Component {
  constructor(props) {
    super(props);

    this._handleCaptionChange = ::this._handleCaptionChange;
    this._clearPlaceholder = ::this._clearPlaceholder;
    this._putPlaceholder = ::this._putPlaceholder;
    this.state = {
        placeholder: "Add a caption here",
        open: false,
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
                      <img
                        src={this.props.data.imageFile[0].preview}
                        ref="image"
                        className={css(styles.image)}
                        onClick={this.handleClick.bind(this)}
                      />
                      <Popover
                        placement='top'
                        container={this}
                        className={css(styles.popover)}
                        target={this.refs.image}
                        show={this.state.open}
                        onHide={this.handleClose.bind(this)} >
                        <p>This is popover</p>
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
    width: '100%',
    height: 'auto',
    overflow: 'hidden'
  },
  popover: {
    marginTop: "-50px",
  },
})

