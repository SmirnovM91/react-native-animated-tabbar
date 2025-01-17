"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _lodash = _interopRequireDefault(require("lodash.isequal"));

var _reactNativeRedash = require("react-native-redash");

var _styles = require("./styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// @ts-ignore 😞
const AnimatedCircle = _reactNativeReanimated.default.createAnimatedComponent(_reactNativeSvg.Circle);

const SCREEN_WIDTH = _reactNative.Dimensions.get('screen').width;

const MaterialTabBarRippleComponent = ({
  selectedIndex,
  tabs,
  tabItemPositions,
  animatedFocusValues,
  width = SCREEN_WIDTH,
  height = 0
}) => {
  //#region variables
  const svgRef = (0, _react.useRef)(null);
  const animatedMounted = (0, _reactNativeRedash.useValue)(0);
  const animatedValue = (0, _reactNativeRedash.get)(animatedFocusValues, selectedIndex, new _reactNativeReanimated.Value(1));
  const animatedColors = (0, _reactNativeRedash.useValues)(...tabs.map(item => (0, _reactNative.processColor)(item.ripple.color))); //#endregion
  //#region styles

  const containerStyle = (0, _react.useMemo)(() => [_styles.styles.container, {
    width,
    height
  }], [width, height]); //#endregion
  //#region Ripple

  const animatedXs = (0, _reactNativeRedash.useValues)(...tabItemPositions.map(item => item.x + item.width / 2));
  const animatedCircleX = (0, _reactNativeRedash.get)(animatedXs, selectedIndex, new _reactNativeReanimated.default.Value(0));
  const animatedYs = (0, _reactNativeRedash.useValues)(...tabItemPositions.map(item => item.y + item.height / 2));
  const animatedCircleY = (0, _reactNativeRedash.get)(animatedYs, selectedIndex, new _reactNativeReanimated.default.Value(0));
  const animatedRadius = animatedXs.map(x => (0, _reactNativeReanimated.add)(width / 2, (0, _reactNativeReanimated.abs)((0, _reactNativeReanimated.sub)(width / 2, x))));
  const animatedCircleRadius = (0, _reactNativeReanimated.interpolate)(animatedValue, {
    inputRange: [0, 1],
    outputRange: [0, (0, _reactNativeRedash.get)(animatedRadius, selectedIndex, new _reactNativeReanimated.default.Value(0))],
    extrapolate: _reactNativeReanimated.Extrapolate.CLAMP
  });
  const animatedCircleFill = (0, _reactNativeRedash.get)(animatedColors, selectedIndex, new _reactNativeReanimated.default.Value((0, _reactNative.processColor)('white'))); //#endregion
  //#region callbacks

  const setSVGBackground = (0, _reactNativeReanimated.call)([selectedIndex], args => {
    // @ts-ignore
    svgRef.current.setNativeProps({
      backgroundColor: tabs[args[0]].ripple.color
    });
  }); //#endregion
  //#region effects

  (0, _reactNativeReanimated.useCode)(() => [(0, _reactNativeReanimated.onChange)(animatedValue, (0, _reactNativeReanimated.cond)((0, _reactNativeReanimated.eq)(animatedValue, 1), setSVGBackground)), (0, _reactNativeReanimated.cond)((0, _reactNativeReanimated.eq)(animatedMounted, 0), [setSVGBackground, (0, _reactNativeReanimated.set)(animatedMounted, 1)])], [selectedIndex]); //#endregion

  return /*#__PURE__*/_react.default.createElement(_reactNativeSvg.default, {
    ref: svgRef,
    pointerEvents: "none",
    width: width,
    height: height,
    style: containerStyle
  }, /*#__PURE__*/_react.default.createElement(AnimatedCircle, {
    pointerEvents: "none",
    fill: animatedCircleFill,
    r: animatedCircleRadius,
    cy: animatedCircleY,
    cx: animatedCircleX
  }));
};

const MaterialTabBarRipple = /*#__PURE__*/(0, _react.memo)(MaterialTabBarRippleComponent, _lodash.default);
var _default = MaterialTabBarRipple;
exports.default = _default;
//# sourceMappingURL=MaterialTabBarRipple.js.map