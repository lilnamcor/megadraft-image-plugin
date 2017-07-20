'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _aphrodite = require('aphrodite');

var _reactPopover = require('react-popover');

var _reactPopover2 = _interopRequireDefault(_reactPopover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /***
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Reference popover component for the content inside popover 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @patr
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// NPM Modules


var ImageComponent = function (_Component) {
  _inherits(ImageComponent, _Component);

  function ImageComponent(props) {
    _classCallCheck(this, ImageComponent);

    return _possibleConstructorReturn(this, (ImageComponent.__proto__ || Object.getPrototypeOf(ImageComponent)).call(this, props));
  }

  _createClass(ImageComponent, [{
    key: 'setSize',
    value: function setSize(size) {
      this.props.changeWidth(size);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: (0, _aphrodite.css)(styles.reference) },
        _react2.default.createElement(
          'button',
          { onClick: function onClick() {
              return _this2.setSize('25%');
            } },
          'Small'
        ),
        _react2.default.createElement(
          'button',
          { onClick: function onClick() {
              return _this2.setSize('50%');
            } },
          'Medium'
        ),
        _react2.default.createElement(
          'button',
          { onClick: function onClick() {
              return _this2.setSize('100%');
            } },
          'Large'
        )
      );
    }
  }]);

  return ImageComponent;
}(_react.Component);

exports.default = ImageComponent;


var styles = _aphrodite.StyleSheet.create({
  reference: {
    fontFamily: 'Roboto',
    fontSize: '13px',
    fontWeight: '300',
    background: 'black',
    'border-radius': '22px',
    boxShadow: '0 3px 10px 0 rgba(0,0,0,0.3)',
    border: '3px solid rgba(0,0,0,0.1)',
    textAlign: 'center',
    zIndex: '2',
    padding: '10px'
  }
});