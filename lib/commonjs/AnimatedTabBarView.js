"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimatedTabBarView = AnimatedTabBarView;

var _react = _interopRequireWildcard(require("react"));

var _reactNativeReanimated = _interopRequireDefault(require("react-native-reanimated"));

var _reactNativeRedash = require("react-native-redash");

var _presets = _interopRequireDefault(require("./presets"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const {
  proc,
  call
} = _reactNativeReanimated.default;
/**
 * @DEV
 * this is needed for react-native-svg to animate on the native thread.
 * @external (https://github.com/software-mansion/react-native-reanimated/issues/537)
 */

_reactNativeReanimated.default.addWhitelistedNativeProps({
  width: true,
  stroke: true,
  backgroundColor: true
});

function AnimatedTabBarView(props) {
  // props
  const {
    index: controlledIndex,
    onIndexChange,
    onLongPress,
    tabs: _tabs,
    preset = 'bubble',
    style,
    itemInnerSpace,
    itemOuterSpace,
    itemContainerWidth,
    iconSize,
    duration,
    easing,
    isRTL,
    ...rest
  } = props; // verify props

  if (!Object.keys(_presets.default).includes(preset)) {
    throw new Error("Wrong preset been provided. expected one of these: [".concat(Object.keys(_presets.default).join(', '), "], but found \"").concat(preset, "\"."));
  } // variables


  const selectedIndex = (0, _reactNativeRedash.useValue)(controlledIndex);
  const tabs = (0, _react.useMemo)(() => {
    return Object.keys(_tabs).map(key => {
      return _tabs[key].title && _tabs[key].key ? _tabs[key] : {
        title: key,
        key: "tab-".concat(key),
        ..._tabs[key]
      };
    });
  }, [_tabs]); //#region Effects

  const indexRef = (0, _react.useRef)(controlledIndex);
  /**
   * @DEV
   * here we listen to the controlled index and update
   * selectedIndex value.
   */

  (0, _react.useEffect)(() => {
    selectedIndex.setValue(controlledIndex); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlledIndex]);
  /**
   * @DEV
   * here we listen to selectedIndex and call `onIndexChange`
   */

  const animatedOnChange = (0, _react.useMemo)(() => proc(index => call([index], args => {
    if (onIndexChange) {
      indexRef.current = args[0];
      onIndexChange(args[0]);
    }
  })), // eslint-disable-next-line react-hooks/exhaustive-deps
  []); //#endregion

  const PresetComponent = _presets.default[preset].component; // render

  return /*#__PURE__*/_react.default.createElement(PresetComponent, _extends({
    style: style,
    selectedIndex: selectedIndex,
    animatedOnChange: animatedOnChange // @ts-ignore
    ,
    tabs: tabs,
    itemInnerSpace: itemInnerSpace,
    itemOuterSpace: itemOuterSpace,
    itemContainerWidth: itemContainerWidth,
    iconSize: iconSize,
    duration: duration,
    easing: easing,
    isRTL: isRTL,
    onLongPress: onLongPress
  }, rest));
}
//# sourceMappingURL=AnimatedTabBarView.js.map