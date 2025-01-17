"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeReanimated = _interopRequireDefault(require("react-native-reanimated"));

var _reactNativeRedash = require("react-native-redash");

var _lodash = _interopRequireDefault(require("lodash.isequal"));

var _constants = require("../constants");

var _styles = require("./styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// @ts-ignore 😞
const {
  add,
  interpolate
} = _reactNativeReanimated.default;

const BubbleTabBarItemComponent = ({
  animatedFocus,
  label,
  icon,
  background,
  labelStyle: labelStyleOverride,
  itemInnerSpace,
  itemOuterSpace,
  iconSize,
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
  }, [itemInnerSpace, itemOuterSpace]); //#endregion
  //#region variables

  const labelWidth = (0, _reactNativeRedash.useValue)(0);
  /**
   * @DEV
   * min width is calculated by adding outer & inner spaces
   * with the icon size.
   */

  const minWidth = (0, _react.useMemo)(() => {
    return itemInnerHorizontalSpace * 2 + iconSize + itemOuterHorizontalSpace * 2;
  }, [itemInnerHorizontalSpace, itemOuterHorizontalSpace, iconSize]);
  /**
   * @DEV
   * max width is calculated by adding inner space with label width
   */

  const maxWidth = add(labelWidth, itemInnerHorizontalSpace, minWidth); //#endregion
  //#region styles

  const animatedIconColor = (0, _reactNativeRedash.interpolateColor)(animatedFocus, {
    inputRange: [0, 1],
    outputRange: [icon.inactiveColor, icon.activeColor]
  });
  const containerStyle = [_styles.styles.container, {
    paddingHorizontal: itemOuterHorizontalSpace,
    paddingVertical: itemOuterVerticalSpace,
    width: interpolate(animatedFocus, {
      inputRange: [0, 1],
      outputRange: [minWidth, maxWidth]
    })
  }];
  const contentContainerStyle = [_styles.styles.contentContainer, {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    paddingHorizontal: itemInnerHorizontalSpace,
    paddingVertical: itemInnerVerticalSpace,
    borderRadius: itemInnerVerticalSpace * 2 + iconSize,
    backgroundColor: (0, _reactNativeRedash.interpolateColor)(animatedFocus, {
      inputRange: [0, 1],
      outputRange: [background.inactiveColor, background.activeColor]
    })
  }];
  const labelContainerStyle = [_styles.styles.labelContainer, {
    opacity: interpolate(animatedFocus, {
      inputRange: [0.33, 1],
      outputRange: [0, 1]
    }),
    [isRTL ? 'left' : 'right']: interpolate(animatedFocus, {
      inputRange: [0, 1],
      outputRange: [0, itemInnerHorizontalSpace + itemOuterHorizontalSpace]
    })
  }];
  const iconContainerStyle = [_styles.styles.iconContainer, {
    minHeight: iconSize,
    minWidth: iconSize
  }];
  const labelStyle = [_styles.styles.label, labelStyleOverride]; //#endregion
  // callbacks

  const handleTextLayout = ({
    nativeEvent: {
      layout: {
        width
      }
    }
  }) => requestAnimationFrame(() => labelWidth.setValue(width)); // render


  const renderIcon = () => {
    const IconComponent = icon.component;
    return typeof IconComponent === 'function' ? IconComponent({
      animatedFocus,
      color: animatedIconColor,
      size: iconSize
    }) : /*#__PURE__*/_react.default.createElement(IconComponent, {
      animatedFocus: animatedFocus,
      color: animatedIconColor,
      size: iconSize
    });
  };

  return /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: containerStyle
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: contentContainerStyle
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: iconContainerStyle
  }, renderIcon())), /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: labelContainerStyle
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    onLayout: handleTextLayout,
    style: labelStyle,
    numberOfLines: 1
  }, label)));
};

const BubbleTabBarItem = /*#__PURE__*/(0, _react.memo)(BubbleTabBarItemComponent, _lodash.default);
var _default = BubbleTabBarItem;
exports.default = _default;
//# sourceMappingURL=BubbleTabBarItem.js.map