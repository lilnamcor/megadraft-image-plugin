"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /*
                                                                                                                                                                                                                                                                   * Copyright (c) 2017, Itai Reuveni <itaireuveni@gmail.com>
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * License: MIT
                                                                                                                                                                                                                                                                   */

var _megadraft = require("megadraft");

var _Button = require("./Button");

var _Button2 = _interopRequireDefault(_Button);

var _Block = require("./Block");

var _Block2 = _interopRequireDefault(_Block);

var _constants = require("./constants");

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createImagePlugin = function createImagePlugin(options) {
  return _extends({
    title: _constants2.default.PLUGIN_NAME,
    type: _constants2.default.PLUGIN_TYPE,
    buttonComponent: _Button2.default,
    blockComponent: _Block2.default
  }, options);
};

exports.default = createImagePlugin;