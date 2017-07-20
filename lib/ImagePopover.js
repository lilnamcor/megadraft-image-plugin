'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _reference;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _aphrodite = require('aphrodite');

var _reactPopover = require('react-popover');

var _reactPopover2 = _interopRequireDefault(_reactPopover);

var _SvgIcon = require('./icons/SvgIcon');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

var _svg = require('./icons/svg');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /***
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Reference popover component for the content inside popover 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @patr
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// NPM Modules


// Components


var ICONS = [{ id: 'small', icon: _svg.smallIcon, width: '50%' }, { id: 'medium', icon: _svg.mediumIcon, width: '75%' }, { id: 'large', icon: _svg.largeIcon, width: '99%' }];

var ImageComponent = function (_Component) {
  _inherits(ImageComponent, _Component);

  function ImageComponent(props) {
    _classCallCheck(this, ImageComponent);

    return _possibleConstructorReturn(this, (ImageComponent.__proto__ || Object.getPrototypeOf(ImageComponent)).call(this, props));
  }

  _createClass(ImageComponent, [{
    key: 'setSize',
    value: function setSize(width, id) {
      this.props.changeWidth(width);

      this.setState({
        active: id
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var icons = ICONS.map(function (icon, index) {
        var fill = _this2.props.width === icon.width ? '#48e79a' : '#fff';
        var style = { fill: fill };
        return _react2.default.createElement(
          'div',
          { onClick: function onClick() {
              return _this2.setSize(icon.width, icon.id);
            }, className: (0, _aphrodite.css)(styles.button) },
          _react2.default.createElement(_SvgIcon2.default, { fill: style, key: icon.id, path: icon.icon })
        );
      });
      return _react2.default.createElement(
        'div',
        { className: (0, _aphrodite.css)(styles.reference) },
        icons
      );
    }
  }]);

  return ImageComponent;
}(_react.Component);

exports.default = ImageComponent;


var styles = _aphrodite.StyleSheet.create({
  button: {
    cursor: 'pointer'
  },
  reference: (_reference = {
    fontFamily: 'Roboto',
    fontSize: '13px',
    fontWeight: '300',
    background: 'black',
    'border-radius': '5px'
  }, _defineProperty(_reference, 'background', '#303030'), _defineProperty(_reference, 'boxShadow', '0 3px 10px 0 rgba(0,0,0,0.3)'), _defineProperty(_reference, 'border', '3px solid rgba(0,0,0,0.1)'), _defineProperty(_reference, 'textAlign', 'center'), _defineProperty(_reference, 'zIndex', '2'), _defineProperty(_reference, 'padding', '10px'), _defineProperty(_reference, 'display', 'flex'), _defineProperty(_reference, 'width', '90px'), _defineProperty(_reference, 'justifyContent', 'space-between'), _reference)
});