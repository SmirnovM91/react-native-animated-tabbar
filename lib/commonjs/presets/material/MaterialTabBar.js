"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _lodash = _interopRequireDefault(require("lodash.isequal"));

var _item = _interopRequireDefault(require("./item"));

var _ripple = _interopRequireDefault(require("./ripple"));

var _rawButton = _interopRequireDefault(require("../../components/rawButton"));

var _constants = require("./constants");

var _withTransition = require("../../withTransition");

var _utilities = require("../../utilities");

var _styles = require("./styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const MaterialTabBarComponent = ({
  selectedIndex,
  tabs,
  duration = _constants.DEFAULT_ITEM_ANIMATION_DURATION,
  easing = _constants.DEFAULT_ITEM_ANIMATION_EASING,
  animation = _constants.DEFAULT_CONFIG_ANIMATION,
  inactiveOpacity = _constants.DEFAULT_CONFIG_INACTIVE_OPACITY,
  inactiveScale = _constants.DEFAULT_CONFIG_INACTIVE_SCALE,
  itemInnerSpace = _constants.DEFAULT_ITEM_INNER_SPACE,
  itemOuterSpace = _constants.DEFAULT_ITEM_OUTER_SPACE,
  itemContainerWidth = _constants.DEFAULT_ITEM_CONTAINER_WIDTH,
  iconSize = _constants.DEFAULT_ITEM_ICON_SIZE,
  isRTL = _constants.DEFAULT_ITEM_LAYOUT_DIRECTION,
  style: containerStyleOverride,
  onLongPress = _utilities.noop,
  animatedOnChange
}) => {
  //#region variables
  const [containerLayout, setContainerLayout] = (0, _react.useState)({
    width: 0,
    height: 0
  });
  const [tabsPosition, setTabsPosition] = (0, _react.useState)([]);
  const animatedFocusValues = (0, _react.useMemo)(() => tabs.map((_, index) => (0, _withTransition.withTransition)({
    index,
    selectedIndex,
    duration,
    easing
  })), // eslint-disable-next-line react-hooks/exhaustive-deps
  [tabs, duration, easing]); //#endregion
  //#region Styles

  const containerStyle = (0, _react.useMemo)(() => {
    var _selectedIndex$_value;

    return [_styles.styles.container, containerStyleOverride, {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      // @ts-ignore
      backgroundColor: tabs[(_selectedIndex$_value = selectedIndex._value) !== null && _selectedIndex$_value !== void 0 ? _selectedIndex$_value : 0].ripple.color
    }];
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [containerStyleOverride, isRTL]);
  const rawButtonStyle = (0, _react.useMemo)(() => itemContainerWidth === 'fill' ? {
    flex: 1
  } : {}, [itemContainerWidth]); //#endregion
  //#region callbacks

  const handleTabItemLayout = (0, _utilities.useStableCallback)((index, position) => {
    setTabsPosition(state => {
      return { ...state,
        [index]: position
      };
    });
  });
  const handleContainerLayout = (0, _utilities.useStableCallback)(({
    nativeEvent: {
      layout: {
        height,
        width
      }
    }
  }) => {
    setContainerLayout({
      height,
      width
    });
  }); //#endregion
  // render

  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: containerStyle,
    onLayout: handleContainerLayout
  }, Object.keys(tabsPosition).length === tabs.length ? /*#__PURE__*/_react.default.createElement(_ripple.default, {
    tabs: tabs,
    tabItemPositions: Object.values(tabsPosition),
    selectedIndex: selectedIndex,
    animatedFocusValues: animatedFocusValues,
    width: containerLayout.width,
    height: containerLayout.height
  }) : null, tabs.map(({
    key,
    title,
    ...configs
  }, index) => {
    return /*#__PURE__*/_react.default.createElement(_rawButton.default, {
      key: key,
      index: index,
      selectedIndex: selectedIndex,
      accessibilityLabel: title,
      style: rawButtonStyle,
      animatedOnChange: animatedOnChange,
      onLayout: handleTabItemLayout,
      onLongPress: onLongPress
    }, /*#__PURE__*/_react.default.createElement(_item.default, _extends({
      index: index,
      animatedFocus: animatedFocusValues[index],
      animation: animation,
      inactiveOpacity: inactiveOpacity,
      inactiveScale: inactiveScale,
      label: title,
      itemInnerSpace: itemInnerSpace,
      itemOuterSpace: itemOuterSpace,
      itemContainerWidth: itemContainerWidth,
      iconSize: iconSize,
      isRTL: isRTL
    }, configs)));
  }));
};

const MaterialTabBar = /*#__PURE__*/(0, _react.memo)(MaterialTabBarComponent, _lodash.default);
var _default = MaterialTabBar;
exports.default = _default;
//# sourceMappingURL=MaterialTabBar.js.map