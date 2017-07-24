"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDropzone = require("react-dropzone");

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _reactModal = require("react-modal");

var _reactModal2 = _interopRequireDefault(_reactModal);

var _aphrodite = require("aphrodite");

var _timesCircle = require("react-icons/lib/fa/times-circle");

var _timesCircle2 = _interopRequireDefault(_timesCircle);

var _icon = require("./icon.js");

var _icon2 = _interopRequireDefault(_icon);

var _constants = require("./constants");

var _constants2 = _interopRequireDefault(_constants);

var _megadraft = require("megadraft");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2017, Itai Reuveni <itaireuveni@gmail.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * License: MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Button = function (_Component) {
  _inherits(Button, _Component);

  function Button(props) {
    _classCallCheck(this, Button);

    var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props));

    _this._closeModal = _this._closeModal.bind(_this);
    _this.state = {
      open: false
    };
    return _this;
  }

  _createClass(Button, [{
    key: "onDrop",
    value: function onDrop(acceptedFiles, rejectedFiles) {
      if (acceptedFiles.length) {
        var data = {
          type: _constants2.default.PLUGIN_TYPE,
          imageFile: acceptedFiles[0],
          imageSrc: acceptedFiles[0].preview
        };
        this.props.onChange((0, _megadraft.insertDataBlock)(this.props.editorState, data));
      } else {
        this.setState({ open: true });
      }
    }
  }, {
    key: "_closeModal",
    value: function _closeModal() {
      this.setState({ open: false });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          _reactDropzone2.default,
          {
            className: this.props.className,
            onDrop: function onDrop(acceptedFiles, rejectedFiles) {
              return _this2.onDrop(acceptedFiles, rejectedFiles);
            },
            multiple: false,
            title: _constants2.default.PLUGIN_NAME,
            accept: "image/*" },
          _react2.default.createElement(_icon2.default, { className: "sidemenu__button__icon" })
        ),
        _react2.default.createElement(
          _reactModal2.default,
          {
            isOpen: this.state.open,
            overlayClassName: (0, _aphrodite.css)(styles.overlay),
            className: (0, _aphrodite.css)(styles.content),
            onRequestClose: this._closeModal,
            aria: {
              labelledby: "heading",
              describedby: "full_description",
              xbutton: "xbutton"
            } },
          _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
              "h1",
              { id: "heading" },
              "Uh oh!"
            ),
            _react2.default.createElement(
              "div",
              { id: "full_description" },
              _react2.default.createElement(
                "p",
                null,
                "The file you tried to upload is a type we do not understand."
              ),
              _react2.default.createElement(
                "p",
                null,
                "Supported image formats are JPEG, PNG, and GIF."
              )
            ),
            _react2.default.createElement(
              "div",
              { onClick: this._closeModal, id: "xbutton", className: (0, _aphrodite.css)(styles.xButton) },
              _react2.default.createElement(_timesCircle2.default, null)
            ),
            _react2.default.createElement(
              "button",
              { onClick: this._closeModal, className: (0, _aphrodite.css)(styles.okButton) },
              "Ok"
            )
          )
        )
      );
    }
  }]);

  return Button;
}(_react.Component);

exports.default = Button;


var styles = _aphrodite.StyleSheet.create({
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    zIndex: '2'
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
    textAlign: 'center'
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
    paddingRight: '15px'
  },
  xButton: {
    position: 'absolute',
    top: 260,
    right: 10,
    cursor: 'pointer',
    fontSize: '30px'
  }
});