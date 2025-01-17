"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _reactNativeGestureHandler = require("react-native-gesture-handler");

var _reactNativeRedash = require("react-native-redash");

var _utilities = require("../../utilities");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const {
  useCode,
  cond,
  onChange,
  eq
} = _reactNativeReanimated.default;

const RawButton = ({
  index,
  selectedIndex,
  accessibilityLabel,
  children,
  style,
  animatedOnChange,
  onLongPress,
  onLayout
}) => {
  // refs
  const rootViewRef = (0, _react.useRef)(null);
  const longPressGestureHandlerRef = (0, _react.useRef)(null); // tap gesture

  const tapGestureState = (0, _reactNativeRedash.useValue)(_reactNativeGestureHandler.State.UNDETERMINED);
  const tapGestureHandler = (0, _reactNativeRedash.useGestureHandler)({
    state: tapGestureState
  }); // long press gesture

  const longPressGestureState = (0, _reactNativeRedash.useValue)(_reactNativeGestureHandler.State.UNDETERMINED);
  const longPressGestureHandler = (0, _reactNativeRedash.useGestureHandler)({
    state: longPressGestureState
  }); // effects

  useCode(() => [onChange(tapGestureState, cond(eq(tapGestureState, _reactNativeGestureHandler.State.END), animatedOnChange(index))), onChange(longPressGestureState, cond(eq(longPressGestureState, _reactNativeGestureHandler.State.ACTIVE), (0, _reactNativeReanimated.call)([], () => {
    onLongPress(index);
  }))), onChange(selectedIndex, (0, _reactNativeReanimated.call)([selectedIndex], args => {
    // @ts-ignore
    rootViewRef.current.setNativeProps({
      accessibilityState: {
        selected: args[0] === index
      }
    });
  }))], [index]); // callbacks

  const handleContainerLayout = (0, _utilities.useStableCallback)(({
    nativeEvent: {
      layout
    }
  }) => onLayout && onLayout(index, layout));
  return /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.TapGestureHandler, _extends({
    waitFor: longPressGestureHandlerRef
  }, tapGestureHandler), /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    ref: rootViewRef,
    accessible: true,
    accessibilityLabel: accessibilityLabel,
    accessibilityRole: "button",
    accessibilityComponentType: "button",
    onLayout: handleContainerLayout,
    style: style
  }, /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.LongPressGestureHandler, _extends({
    ref: longPressGestureHandlerRef
  }, longPressGestureHandler), /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, null, children))));
};

var _default = RawButton;
exports.default = _default;
//# sourceMappingURL=RawButton.js.map