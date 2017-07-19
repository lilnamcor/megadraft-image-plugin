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
    this.onClick = ::this.onClick;
  }

  onClick(e) {
    document.getElementById('fileinput').click();
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
      <div>
        <Dropzone 
          id='fileinput'
          onDrop={(acceptedFiles, rejectedFiles) => this.onDrop(acceptedFiles, rejectedFiles)}
          multiple={false}
          style={{display: "none"}}>
        </Dropzone>
        <button className={this.props.className} type="button" onClick={this.onClick} title={constants.PLUGIN_NAME}>
          <Icon className="sidemenu__button__icon" />
        </button>
      </div>
    );
  }
}
