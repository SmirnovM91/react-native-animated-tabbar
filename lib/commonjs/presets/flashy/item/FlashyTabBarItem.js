"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeReanimated = _interopRequireDefault(require("react-native-reanimated"));

var _maskedView = _interopRequireDefault(require("@react-native-community/masked-view"));

var _reactNativeSvg = require("react-native-svg");

var _reactNativeRedash = require("react-native-redash");

var _lodash = _interopRequireDefault(require("lodash.isequal"));

var _constants = require("../constants");

var _styles = require("./styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// @ts-ignore 😞
// @ts-ignore 😞
const AnimatedSvg = _reactNativeReanimated.default.createAnimatedComponent(_reactNativeSvg.Svg);

const AnimatedCircle = _reactNativeReanimated.default.createAnimatedComponent(_reactNativeSvg.Circle);

const {
  add,
  interpolate,
  sub,
  max,
  divide,
  multiply,
  Extrapolate
} = _reactNativeReanimated.default;

const FlashyTabBarItemComponent = ({
  animatedFocus,
  label,
  icon,
  labelStyle: labelStyleOverride,
  itemInnerSpace,
  itemOuterSpace,
  iconSize,
  indicator,
  isRTL
}) => {
  //#region extract props
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
  }, [itemInnerSpace, itemOuterSpace]);
  const {
    size: _indicatorSize,
    color: _indicatorColor,
    visible: _indicatorVisible
  } = indicator || {
    size: undefined,
    color: undefined,
    visible: undefined
  };
  const {
    indicatorVisibility,
    indicatorColor,
    indicatorSize
  } = (0, _react.useMemo)(() => {
    var _ref;

    return {
      indicatorVisibility: _indicatorVisible !== null && _indicatorVisible !== void 0 ? _indicatorVisible : _constants.DEFAULT_INDICATOR_VISIBILITY,
      indicatorColor: (_ref = _indicatorColor !== null && _indicatorColor !== void 0 ? _indicatorColor : labelStyleOverride === null || labelStyleOverride === void 0 ? void 0 : labelStyleOverride.color) !== null && _ref !== void 0 ? _ref : _constants.DEFAULT_INDICATOR_COLOR,
      indicatorSize: _indicatorSize !== null && _indicatorSize !== void 0 ? _indicatorSize : _constants.DEFAULT_INDICATOR_SIZE
    };
  }, [_indicatorVisible, _indicatorColor, _indicatorSize, labelStyleOverride]); //#endregion
  //#region variables

  const [labelWidth, labelHeight] = (0, _reactNativeRedash.useValues)(0, 0);
  const containerHeight = (0, _react.useMemo)(() => iconSize + itemInnerVerticalSpace * 2, [iconSize, itemInnerVerticalSpace]);
  const containerWidth = max(add(labelWidth, itemInnerHorizontalSpace * 2), iconSize + itemInnerHorizontalSpace * 2); //#endregion
  //#region styles

  const outerContainerStyle = [_styles.styles.outerContainer, {
    paddingHorizontal: itemOuterHorizontalSpace,
    paddingVertical: itemOuterVerticalSpace
  }];
  const containerStyle = [_styles.styles.container, {
    width: containerWidth,
    height: containerHeight
  }]; // label styles

  const labelContainerStyle = [_styles.styles.labelContainer, {
    transform: [{
      translateY: interpolate(animatedFocus, {
        inputRange: [0, 1],
        outputRange: [multiply(labelHeight, 0.5), multiply(divide(labelHeight, 2), -1)],
        extrapolate: Extrapolate.CLAMP
      })
    }]
  }];
  const labelStyle = [_styles.styles.label, labelStyleOverride];
  const labelMaskStyle = [_styles.styles.mask, {
    width: containerWidth,
    height: multiply(labelHeight, 1.5),
    transform: (0, _reactNativeRedash.transformOrigin)({
      x: 0,
      y: 0
    }, {
      translateY: interpolate(animatedFocus, {
        inputRange: [0.25, 1],
        outputRange: [0, divide(sub(containerHeight, multiply(labelHeight, 1.5)), 2)],
        extrapolate: Extrapolate.CLAMP
      }) // rotate: interpolate(animatedFocus, {
      //   inputRange: [0, 0.5],
      //   outputRange: [toRad(0), toRad(isRTL ? -15 : 15)],
      //   extrapolate: Extrapolate.CLAMP,
      // }),

    })
  }]; // icon

  const iconContainerStyle = [_styles.styles.iconContainer, {
    transform: [{
      translateY: interpolate(animatedFocus, {
        inputRange: [0, 1],
        outputRange: [iconSize * -0.5, iconSize * -1.5],
        extrapolate: Extrapolate.CLAMP
      })
    }]
  }];
  const iconStyle = [_styles.styles.icon, {
    minHeight: iconSize,
    minWidth: iconSize
  }];
  const iconMaskStyle = [_styles.styles.mask, {
    width: containerWidth,
    height: iconSize,
    transform: (0, _reactNativeRedash.transformOrigin)({
      x: 0,
      y: 0
    }, {
      translateY: interpolate(animatedFocus, {
        inputRange: [0, 1],
        outputRange: [itemInnerVerticalSpace, iconSize * -1.5],
        extrapolate: Extrapolate.CLAMP
      }),
      rotate: interpolate(animatedFocus, {
        inputRange: [0, 0.5],
        outputRange: [0, (0, _reactNativeRedash.toRad)(isRTL ? -15 : 15)],
        extrapolate: Extrapolate.CLAMP
      })
    })
  }]; // indicator

  const animatedIndicatorSize = interpolate(animatedFocus, {
    inputRange: [0.5, 1],
    outputRange: [0, indicatorSize / 2],
    extrapolate: Extrapolate.CLAMP
  }); //#endregion
  // callbacks

  const handleLabelLayout = ({
    nativeEvent: {
      layout: {
        height,
        width
      }
    }
  }) => requestAnimationFrame(() => {
    labelWidth.setValue(width);
    labelHeight.setValue(height);
  }); // render


  const renderIcon = () => {
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
  };

  return /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: outerContainerStyle
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: containerStyle
  }, /*#__PURE__*/_react.default.createElement(_maskedView.default, {
    style: _styles.styles.root,
    maskElement: /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
      style: iconMaskStyle
    })
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    pointerEvents: "none",
    style: iconContainerStyle
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: iconStyle
  }, renderIcon()))), /*#__PURE__*/_react.default.createElement(_maskedView.default, {
    style: _styles.styles.root,
    maskElement: /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
      style: labelMaskStyle
    })
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: labelContainerStyle
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    numberOfLines: 1,
    style: labelStyle,
    onLayout: handleLabelLayout
  }, label))), indicatorVisibility && /*#__PURE__*/_react.default.createElement(AnimatedSvg, {
    style: [_styles.styles.root, {
      left: sub(divide(containerWidth, 2), indicatorSize / 2),
      top: sub(containerHeight, indicatorSize)
    }],
    width: indicatorSize,
    height: indicatorSize
  }, /*#__PURE__*/_react.default.createElement(AnimatedCircle, {
    r: animatedIndicatorSize,
    translateY: indicatorSize / 2,
    translateX: indicatorSize / 2,
    fill: indicatorColor
  }))));
};

const FlashyTabBarItem = /*#__PURE__*/(0, _react.memo)(FlashyTabBarItemComponent, _lodash.default);
var _default = FlashyTabBarItem;
exports.default = _default;
//# sourceMappingURL=FlashyTabBarItem.js.map