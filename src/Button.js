/*
 * Copyright (c) 2017, Itai Reuveni <itaireuveni@gmail.com>
 *
 * License: MIT
 */

import React, {Component} from "react";

import Dropzone from "react-dropzone";

import Modal from "react-modal";

import {StyleSheet, css} from 'aphrodite';

import FaTimes from 'react-icons/lib/fa/times-circle';

import Icon from "./icon.js";
import constants from "./constants";
import {insertDataBlock} from "megadraft";

// IPFS Config
import { ipfsConfig, IPFS_ADDRESS } from './ipfs-config';
import { uploadFiles } from './ipfs-helper';

const IPFS = window.Ipfs;

export default class Button extends Component {
  constructor(props) {
    super(props);

    this._closeModal = ::this._closeModal;
    this.state = {
      open: false,
    }
  }

  onDrop(acceptedFiles, rejectedFiles) {
    if (acceptedFiles.length > 0) {
      uploadFiles(acceptedFiles, this.node).then(result => {
        var imageHash = result[0].hash;
        const data = {
          type: constants.PLUGIN_TYPE,
          imagePreview: acceptedFiles[0].preview,
          imageHash: imageHash,
        }
        this.props.onChange(insertDataBlock(this.props.editorState, data));
      })
    } else {
      this.setState({open: true})
    }
  }

  componentDidMount() {
    if (IPFS) {
      this.node = new IPFS(ipfsConfig);
    }
  }

  _closeModal() {
    this.setState({open: false})
  }

  render() {
    return (
      <div className={css(styles.imageButton)}>
        <Dropzone
          className={this.props.className}
          onDrop={(acceptedFiles, rejectedFiles) => this.onDrop(acceptedFiles, rejectedFiles)}
          multiple={false}
          title={constants.PLUGIN_NAME}
          accept="image/*">
          <Icon className="sidemenu__button__icon" />
        </Dropzone>
        <Modal
          isOpen={this.state.open}
          overlayClassName = {css(styles.overlay)}
          className={css(styles.content)}
          onRequestClose={this._closeModal}
          aria={{
            labelledby: "heading",
            describedby: "full_description",
            xbutton: "xbutton"
          }}>
          <div>
            <h1 id="heading">Uh oh!</h1>
            <div id="full_description">
              <p>The file you tried to upload is a type we do not understand.</p>
              <p>Supported image formats are JPEG, PNG, and GIF.</p>
            </div>
            <div onClick={this._closeModal} id='xbutton' className={css(styles.xButton)}>
              <FaTimes/>
            </div>
            <button onClick={this._closeModal} className={css(styles.okButton)}>Ok</button>
          </div>
        </Modal>
      </div>
    );
  }
}

var styles = StyleSheet.create({
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    zIndex: '2',
  },
  imageButton: {
    marginLeft: '2px',
  },
  content: {
    position: 'absolute',
    top: '-250px',
    left: '0px',
    right: '0px',
    bottom: '0px',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  },
  okButton: {
    borderRadius: '10px',
    background: 'white',
    color: '#02b875',
    borderColor: '#02b875',
    cursor: 'pointer',
    borderStyle: 'solid',
    borderWidth: '1px',
    paddingLeft: '15px',
    paddingRight: '15px',
  },
  xButton: {
    position: 'absolute',
    top: 260,
    right: 10,
    cursor: 'pointer',
    fontSize: '30px',
  }
})
