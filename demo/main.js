/*
 * Copyright (c) 2017, Itai Reuveni <itaireuveni@gmail.com>
 *
 * License: MIT
 */

import React from "react";
import ReactDOM from "react-dom";
import {MegadraftEditor} from "megadraft";
import {editorStateFromRaw} from "megadraft/lib/utils";

import plugin from "../src/plugin";

import INITIAL_CONTENT from "./content";


class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: editorStateFromRaw(INITIAL_CONTENT)
    };
    this.onChange = ::this.onChange;
  }

  onChange(content) {
    this.setState({content});
  }

  uploadFile(file) {
    var data = new FormData();
    data.append('ipfsfile', file)
    return fetch('http://localhost:8080/ipfs-add', {
      method: 'post',
      body: data,
    })
    .then((result) => {
      return result.json()
      .then((json) => {
        return json.hash
      })
    })
  }

  uploadCallback(hash) {
    return `https://ipfs.io/ipfs/${hash}`
  }

  render() {
    const pluginName = "megadraft-image-plugin";
    return (
        <div className="content">
          <header>
            <h1>{pluginName} - Megadraft Plugin</h1>
          </header>

          <div className="editor">
            <MegadraftEditor plugins={[plugin({uploadFile: this.uploadFile, uploadCallback: this.uploadCallback})]} editorState={this.state.content} onChange={this.onChange} />
          </div>
        </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById("container"));
