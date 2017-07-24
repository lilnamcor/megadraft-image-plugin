/*
 * Copyright (c) 2017, Itai Reuveni <itaireuveni@gmail.com>
 *
 * License: MIT
 */

import React, {Component} from "react";

import Dropzone from "react-dropzone";

import Modal  from "react-modal";

import {StyleSheet, css} from 'aphrodite';

import Icon from "./icon.js";
import constants from "./constants";
import {insertDataBlock} from "megadraft";


export default class Button extends Component {
  constructor(props) {
    super(props);

    this._closeModal = ::this._closeModal;
    this.state = {
      open: false,
    }
  }

  onDrop(acceptedFiles, rejectedFiles) {
    if (acceptedFiles.length) {
      const data = {
        type: constants.PLUGIN_TYPE,
        imageFile: acceptedFiles[0],
        imageSrc: acceptedFiles[0].preview,
      }
      this.props.onChange(insertDataBlock(this.props.editorState, data));
    } else {
      debugger
      this.setState({open: true})
    }
  }

  _closeModal() {
    this.setState({open: false})
  }

  render() {
    return (
      <div>
        <Dropzone
          className={this.props.className}
          onDrop={(acceptedFiles, rejectedFiles) => this.onDrop(acceptedFiles, rejectedFiles)}
          multiple={false}
          title={constants.PLUGIN_NAME}
          accept="image/*"
          style={styles}>
          <Icon className="sidemenu__button__icon" />
        </Dropzone>
        <Modal
          isOpen={this.state.open}
          onRequestClose={this._closeModal}
          aria={{
            labelledby: "heading",
            describedby: "full_description"
          }}>
          <h1 id="heading">Uh oh!</h1>
          <div id="full_description">
            <p>The file you tried to upload is a type we do not understand.</p>
            <p>Supported image formats are JPEG, PNG, and GIF.</p>
          </div>
          <button onClick={this._closeModal}>Ok</button>
        </Modal>
      </div>
    );
  }
}

var styles = {
  overlay: {
    position: 'fixed',
    top: 100,
    left: 100,
    right: 100,
    bottom: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.75)'
  },
  content: {
    position: 'absolute',
    top: '40px',
    left: '40px',
    right: '40px',
    bottom: '40px',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px'

  }
}
