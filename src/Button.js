/*
 * Copyright (c) 2017, Itai Reuveni <itaireuveni@gmail.com>
 *
 * License: MIT
 */

import React, {Component} from "react";

import Dropzone from "react-dropzone";

import Icon from "./icon.js";
import constants from "./constants";
import {insertDataBlock} from "megadraft";


export default class Button extends Component {
  constructor(props) {
    super(props);
  }

  onDrop(acceptedFiles, rejectedFiles) {
    const data = {
      type:constants.PLUGIN_TYPE,
      imageFile: acceptedFiles
    }
    this.props.onChange(insertDataBlock(this.props.editorState, data));
  }

  render() {
    return (
      <Dropzone
        className={this.props.className}
        onDrop={(acceptedFiles, rejectedFiles) => this.onDrop(acceptedFiles, rejectedFiles)}
        multiple={false}
        title={constants.PLUGIN_NAME}
        accept="image/*"
        style={{marginLeft: '2px'}}>
        <Icon className="sidemenu__button__icon" />
      </Dropzone>
    );
  }
}
