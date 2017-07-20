"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactTextareaAutosize = require("react-textarea-autosize");

var _reactTextareaAutosize2 = _interopRequireDefault(_reactTextareaAutosize);

var _reactPopover = require("react-popover");

var _reactPopover2 = _interopRequireDefault(_reactPopover);

var _ImagePopover = require("./ImagePopover.js");

var _ImagePopover2 = _interopRequireDefault(_ImagePopover);

var _megadraft = require("megadraft");

var _aphrodite = require("aphrodite");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2017, Itai Reuveni <itaireuveni@gmail.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * License: MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var BlockContent = _megadraft.MegadraftPlugin.BlockContent,
    BlockData = _megadraft.MegadraftPlugin.BlockData,
    BlockInput = _megadraft.MegadraftPlugin.BlockInput,
    CommonBlock = _megadraft.MegadraftPlugin.CommonBlock;

var Block = function (_Component) {
  _inherits(Block, _Component);

  function Block(props) {
    _classCallCheck(this, Block);

    var _this = _possibleConstructorReturn(this, (Block.__proto__ || Object.getPrototypeOf(Block)).call(this, props));

    _this._handleCaptionChange = _this._handleCaptionChange.bind(_this);
    _this._clearPlaceholder = _this._clearPlaceholder.bind(_this);
    _this._putPlaceholder = _this._putPlaceholder.bind(_this);
    _this.changeWidth = _this.changeWidth.bind(_this);
    _this.state = {
      placeholder: "Add a caption here",
      open: false,
      width: '50%'
    };

    _this.actions = [{ "key": "delete", "icon": _megadraft.MegadraftIcons.DeleteIcon, "action": _this.props.container.remove }];
    return _this;
  }

  _createClass(Block, [{
    key: "_handleCaptionChange",
    value: function _handleCaptionChange(event) {
      this.props.container.updateData({ caption: event.target.value });
    }
  }, {
    key: "_clearPlaceholder",
    value: function _clearPlaceholder(event) {
      this.setState({ placeholder: "" });
    }
  }, {
    key: "_putPlaceholder",
    value: function _putPlaceholder(event) {
      this.setState({ placeholder: "Add a caption here" });
    }
  }, {
    key: "handleClick",
    value: function handleClick(e) {
      this.setState({ open: !this.state.open });
    }
  }, {
    key: "handleClose",
    value: function handleClose(e) {
      this.setState({ open: false });
    }
  }, {
    key: "changeWidth",
    value: function changeWidth(width) {
      console.log(width);
      this.setState({ width: width });
    }
  }, {
    key: "render",
    value: function render() {
      if (this.props.data.imageFile) {
        return _react2.default.createElement(
          "div",
          null,
          this.props.blockProps.getInitialReadOnly() ? _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
              "p",
              null,
              "\"HELLO\""
            )
          ) : _react2.default.createElement(
            "div",
            { className: (0, _aphrodite.css)(styles.inputWrapper) },
            _react2.default.createElement(
              "div",
              { className: (0, _aphrodite.css)(styles.imageDiv) },
              _react2.default.createElement(
                _reactPopover2.default,
                {
                  className: (0, _aphrodite.css)(styles.popover),
                  body: _react2.default.createElement(_ImagePopover2.default, { changeWidth: this.changeWidth }),
                  preferPlace: "above",
                  onOuterAction: this.handleClick.bind(this),
                  isOpen: this.state.open },
                _react2.default.createElement("img", {
                  src: this.props.data.imageFile[0].preview,
                  ref: "image",
                  className: (0, _aphrodite.css)(styles.image),
                  style: { width: this.state.width },
                  onClick: this.handleClick.bind(this)
                })
              )
            ),
            _react2.default.createElement(_reactTextareaAutosize2.default, {
              onFocus: this._clearPlaceholder,
              onBlur: this._putPlaceholder,
              id: "caption",
              rows: 1,
              placeholder: this.state.placeholder,
              className: (0, _aphrodite.css)(styles.input),
              onChange: this._handleCaptionChange,
              value: this.props.data.caption
            })
          )
        );
      } else {
        return _react2.default.createElement(
          "div",
          { className: (0, _aphrodite.css)(styles.titleBlock) },
          this.props.blockProps.getInitialReadOnly() ? _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
              "p",
              null,
              "\"HELLO\""
            )
          ) : _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
              "p",
              null,
              "\"WORLD\""
            )
          )
        );
      }
    }
  }]);

  return Block;
}(_react.Component);

exports.default = Block;


var styles = _aphrodite.StyleSheet.create({
  inputWrapper: {
    width: '100%',
    textAlign: 'center'

  },
  input: {
    border: 'none',
    outline: 'none',
    fontSize: '24px',
    paddingLeft: '15px',
    paddingBottom: '15px',
    width: '100%',
    textAlign: 'center'
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
    zIndex: '2'
  }
});