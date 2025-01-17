"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNativeReanimated = _interopRequireDefault(require("react-native-reanimated"));

var _reactNativeRedash = require("react-native-redash");

var _lodash = _interopRequireDefault(require("lodash.isequal"));

var _utilities = require("../../../utilities");

var _constants = require("../constants");

var _styles = require("./styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// @ts-ignore 😞
const {
  interpolate,
  divide,
  Extrapolate
} = _reactNativeReanimated.default;

const MaterialTabBarItemComponent = props => {
  // props
  const {
    animatedFocus,
    animation,
    inactiveOpacity,
    inactiveScale,
    label,
    labelStyle: labelStyleOverride,
    icon,
    iconSize,
    itemInnerSpace,
    itemOuterSpace
  } = props; //#region extract props

  const {
    itemInnerVerticalSpace,
    itemInnerHorizontalSpace,
    itemOuterVerticalSpace,
    itemOuterHorizontalSpace
  } = (0, _react.useMemo)(() => {
    let _itemInnerVerticalSpace,
        _itemInnerHorizontalSpace,
        _itemOuterVerticalSpace,
        _itemOuterHorizontalSpace = 0;

    if (typeof itemInnerSpace === 'number') {
      _itemInnerVerticalSpace = itemInnerSpace;
      _itemInnerHorizontalSpace = itemInnerSpace;
    } else {
      var _itemInnerSpace$verti, _itemInnerSpace$horiz;

      _itemInnerVerticalSpace = (_itemInnerSpace$verti = itemInnerSpace === null || itemInnerSpace === void 0 ? void 0 : itemInnerSpace.vertical) !== null && _itemInnerSpace$verti !== void 0 ? _itemInnerSpace$verti : _constants.DEFAULT_ITEM_INNER_SPACE;
      _itemInnerHorizontalSpace = (_itemInnerSpace$horiz = itemInnerSpace === null || itemInnerSpace === void 0 ? void 0 : itemInnerSpace.horizontal) !== null && _itemInnerSpace$horiz !== void 0 ? _itemInnerSpace$horiz : _constants.DEFAULT_ITEM_INNER_SPACE;
    }

    if (typeof itemOuterSpace === 'number') {
      _itemOuterVerticalSpace = itemOuterSpace;
      _itemOuterHorizontalSpace = itemOuterSpace;
    } else {
      var _itemOuterSpace$verti, _itemOuterSpace$horiz;

      _itemOuterVerticalSpace = (_itemOuterSpace$verti = itemOuterSpace === null || itemOuterSpace === void 0 ? void 0 : itemOuterSpace.vertical) !== null && _itemOuterSpace$verti !== void 0 ? _itemOuterSpace$verti : _constants.DEFAULT_ITEM_OUTER_SPACE;
      _itemOuterHorizontalSpace = (_itemOuterSpace$horiz = itemOuterSpace === null || itemOuterSpace === void 0 ? void 0 : itemOuterSpace.horizontal) !== null && _itemOuterSpace$horiz !== void 0 ? _itemOuterSpace$horiz : _constants.DEFAULT_ITEM_OUTER_SPACE;
    }

    return {
      itemInnerVerticalSpace: _itemInnerVerticalSpace,
      itemInnerHorizontalSpace: _itemInnerHorizontalSpace,
      itemOuterVerticalSpace: _itemOuterVerticalSpace,
      itemOuterHorizontalSpace: _itemOuterHorizontalSpace
    };
  }, [itemInnerSpace, itemOuterSpace]); //#endregion
  //#region variables

  const labelHeight = (0, _reactNativeRedash.useValue)(0); //#endregion
  //#region styles

  const outerContainerStyle = (0, _react.useMemo)(() => [_styles.styles.outerContainer, {
    paddingHorizontal: itemOuterHorizontalSpace,
    paddingVertical: itemOuterVerticalSpace
  }], [itemOuterHorizontalSpace, itemOuterVerticalSpace]);
  const innerContainerStyle = (0, _react.useMemo)(() => [_styles.styles.innerContainer, {
    paddingHorizontal: itemInnerHorizontalSpace,
    paddingVertical: itemInnerVerticalSpace,
    opacity: interpolate(animatedFocus, {
      inputRange: [0, 1],
      outputRange: [inactiveOpacity, 1],
      extrapolate: Extrapolate.CLAMP
    }),
    transform: (0, _reactNativeRedash.transformOrigin)({
      x: 0,
      y: 0
    }, {
      scale: interpolate(animatedFocus, {
        inputRange: [0, 1],
        outputRange: [inactiveScale, 1],
        extrapolate: Extrapolate.CLAMP
      })
    })
  }], [itemInnerHorizontalSpace, itemInnerVerticalSpace, animatedFocus, inactiveOpacity, inactiveScale]);
  const iconContainerStyle = [_styles.styles.iconContainer, {
    minHeight: iconSize,
    minWidth: iconSize,
    ...(animation === 'iconWithLabelOnFocus' ? {
      transform: (0, _reactNativeRedash.transformOrigin)({
        x: 0,
        y: 0
      }, {
        translateY: interpolate(animatedFocus, {
          inputRange: [0, 1],
          outputRange: [divide(labelHeight, 2), 0],
          extrapolate: Extrapolate.CLAMP
        })
      })
    } : {})
  }];
  const labelStyle = (0, _react.useMemo)(() => [_styles.styles.label, labelStyleOverride, {
    marginTop: itemInnerVerticalSpace / 2,
    opacity: animation === 'iconWithLabelOnFocus' ? animatedFocus : 1
  }], [labelStyleOverride, itemInnerVerticalSpace, animation, animatedFocus]); //#endregion
  //#region callbacks

  const handleLabelLayout = (0, _utilities.useStableCallback)(({
    nativeEvent: {
      layout: {
        height
      }
    }
  }) => requestAnimationFrame(() => {
    labelHeight.setValue(height);
  })); //#endregion
  // render

  const renderIcon = (0, _react.useCallback)(() => {
    const IconComponent = icon.component;
    return typeof IconComponent === 'function' ? IconComponent({
      animatedFocus,
      color: icon.color,
      size: iconSize
    }) : /*#__PURE__*/_react.default.createElement(IconComponent, {
      animatedFocus: animatedFocus,
      color: icon.color,
      size: iconSize
    });
  }, [icon, iconSize, animatedFocus]);
  const renderLabel = (0, _react.useCallback)(() => {
    return animation !== 'iconOnly' ? /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.Text, {
      onLayout: handleLabelLayout,
      style: labelStyle
    }, label) : null;
  }, [label, animation, labelStyle, handleLabelLayout]);
  return /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: outerContainerStyle
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: innerContainerStyle
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: iconContainerStyle
  }, renderIcon()), renderLabel()));
};

const MaterialTabBarItem = /*#__PURE__*/(0, _react.memo)(MaterialTabBarItemComponent, _lodash.default);
var _default = MaterialTabBarItem;
exports.default = _default;
//# sourceMappingURL=MaterialTabBarItem.js.map