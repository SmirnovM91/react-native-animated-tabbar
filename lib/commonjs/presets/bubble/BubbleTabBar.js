"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _lodash = _interopRequireDefault(require("lodash.isequal"));

var _item = _interopRequireDefault(require("./item"));

var _rawButton = _interopRequireDefault(require("../../components/rawButton"));

var _constants = require("./constants");

var _withTransition = require("../../withTransition");

var _utilities = require("../../utilities");

var _styles = require("./styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const BubbleTabBarComponent = ({
  selectedIndex,
  tabs,
  duration = _constants.DEFAULT_ITEM_ANIMATION_DURATION,
  easing = _constants.DEFAULT_ITEM_ANIMATION_EASING,
  itemInnerSpace = _constants.DEFAULT_ITEM_INNER_SPACE,
  itemOuterSpace = _constants.DEFAULT_ITEM_OUTER_SPACE,
  itemContainerWidth = _constants.DEFAULT_ITEM_CONTAINER_WIDTH,
  iconSize = _constants.DEFAULT_ITEM_ICON_SIZE,
  isRTL = _constants.DEFAULT_ITEM_LAYOUT_DIRECTION,
  style: containerStyleOverride,
  animatedOnChange,
  onLongPress = _utilities.noop
}) => {
  //#region variables
  const animatedFocusValues = (0, _react.useMemo)(() => tabs.map((_, index) => (0, _withTransition.withTransition)({
    index,
    selectedIndex,
    duration,
    easing
  })), // eslint-disable-next-line react-hooks/exhaustive-deps
  [tabs, duration, easing]); //#endregion
  //#region styles

  const containerStyle = (0, _react.useMemo)(() => [_styles.styles.container, containerStyleOverride, {
    flexDirection: isRTL ? 'row-reverse' : 'row'
  }], [containerStyleOverride, isRTL]); //#endregion
  // render

  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: containerStyle
  }, tabs.map(({
    key,
    title,
    ...configs
  }, index) => {
    return /*#__PURE__*/_react.default.createElement(_rawButton.default, {
      key: key,
      index: index,
      selectedIndex: selectedIndex,
      accessibilityLabel: title,
      animatedOnChange: animatedOnChange,
      onLongPress: onLongPress
    }, /*#__PURE__*/_react.default.createElement(_item.default, _extends({
      index: index,
      animatedFocus: animatedFocusValues[index],
      label: title,
      itemInnerSpace: itemInnerSpace,
      itemOuterSpace: itemOuterSpace,
      itemContainerWidth: itemContainerWidth,
      iconSize: iconSize,
      isRTL: isRTL
    }, configs)));
  }));
};

const BubbleTabBar = /*#__PURE__*/(0, _react.memo)(BubbleTabBarComponent, _lodash.default);
var _default = BubbleTabBar;
exports.default = _default;
//# sourceMappingURL=BubbleTabBar.js.map