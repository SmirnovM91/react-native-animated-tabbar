import React, { useMemo, memo } from 'react';
import { View, Text } from 'react-native';
import Animated from 'react-native-reanimated'; // @ts-ignore 😞

import MaskedView from '@react-native-community/masked-view';
import { Svg, Circle } from 'react-native-svg';
import { useValues, transformOrigin, toRad } from 'react-native-redash'; // @ts-ignore 😞

import isEqual from 'lodash.isequal';
import { DEFAULT_ITEM_INNER_SPACE, DEFAULT_ITEM_OUTER_SPACE, DEFAULT_INDICATOR_VISIBILITY, DEFAULT_INDICATOR_SIZE, DEFAULT_INDICATOR_COLOR } from '../constants';
import { styles } from './styles';
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const {
  add,
  interpolate,
  sub,
  max,
  divide,
  multiply,
  Extrapolate
} = Animated;

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
  } = useMemo(() => {
    let _itemInnerVerticalSpace,
        _itemInnerHorizontalSpace,
        _itemOuterVerticalSpace,
        _itemOuterHorizontalSpace = 0;

    if (typeof itemInnerSpace === 'number') {
      _itemInnerVerticalSpace = itemInnerSpace;
      _itemInnerHorizontalSpace = itemInnerSpace;
    } else {
      var _itemInnerSpace$verti, _itemInnerSpace$horiz;

      _itemInnerVerticalSpace = (_itemInnerSpace$verti = itemInnerSpace === null || itemInnerSpace === void 0 ? void 0 : itemInnerSpace.vertical) !== null && _itemInnerSpace$verti !== void 0 ? _itemInnerSpace$verti : DEFAULT_ITEM_INNER_SPACE;
      _itemInnerHorizontalSpace = (_itemInnerSpace$horiz = itemInnerSpace === null || itemInnerSpace === void 0 ? void 0 : itemInnerSpace.horizontal) !== null && _itemInnerSpace$horiz !== void 0 ? _itemInnerSpace$horiz : DEFAULT_ITEM_INNER_SPACE;
    }

    if (typeof itemOuterSpace === 'number') {
      _itemOuterVerticalSpace = itemOuterSpace;
      _itemOuterHorizontalSpace = itemOuterSpace;
    } else {
      var _itemOuterSpace$verti, _itemOuterSpace$horiz;

      _itemOuterVerticalSpace = (_itemOuterSpace$verti = itemOuterSpace === null || itemOuterSpace === void 0 ? void 0 : itemOuterSpace.vertical) !== null && _itemOuterSpace$verti !== void 0 ? _itemOuterSpace$verti : DEFAULT_ITEM_OUTER_SPACE;
      _itemOuterHorizontalSpace = (_itemOuterSpace$horiz = itemOuterSpace === null || itemOuterSpace === void 0 ? void 0 : itemOuterSpace.horizontal) !== null && _itemOuterSpace$horiz !== void 0 ? _itemOuterSpace$horiz : DEFAULT_ITEM_OUTER_SPACE;
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
  } = useMemo(() => {
    var _ref;

    return {
      indicatorVisibility: _indicatorVisible !== null && _indicatorVisible !== void 0 ? _indicatorVisible : DEFAULT_INDICATOR_VISIBILITY,
      indicatorColor: (_ref = _indicatorColor !== null && _indicatorColor !== void 0 ? _indicatorColor : labelStyleOverride === null || labelStyleOverride === void 0 ? void 0 : labelStyleOverride.color) !== null && _ref !== void 0 ? _ref : DEFAULT_INDICATOR_COLOR,
      indicatorSize: _indicatorSize !== null && _indicatorSize !== void 0 ? _indicatorSize : DEFAULT_INDICATOR_SIZE
    };
  }, [_indicatorVisible, _indicatorColor, _indicatorSize, labelStyleOverride]); //#endregion
  //#region variables

  const [labelWidth, labelHeight] = useValues(0, 0);
  const containerHeight = useMemo(() => iconSize + itemInnerVerticalSpace * 2, [iconSize, itemInnerVerticalSpace]);
  const containerWidth = max(add(labelWidth, itemInnerHorizontalSpace * 2), iconSize + itemInnerHorizontalSpace * 2); //#endregion
  //#region styles

  const outerContainerStyle = [styles.outerContainer, {
    paddingHorizontal: itemOuterHorizontalSpace,
    paddingVertical: itemOuterVerticalSpace
  }];
  const containerStyle = [styles.container, {
    width: containerWidth,
    height: containerHeight
  }]; // label styles

  const labelContainerStyle = [styles.labelContainer, {
    transform: [{
      translateY: interpolate(animatedFocus, {
        inputRange: [0, 1],
        outputRange: [multiply(labelHeight, 0.5), multiply(divide(labelHeight, 2), -1)],
        extrapolate: Extrapolate.CLAMP
      })
    }]
  }];
  const labelStyle = [styles.label, labelStyleOverride];
  const labelMaskStyle = [styles.mask, {
    width: containerWidth,
    height: multiply(labelHeight, 1.5),
    transform: transformOrigin({
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

  const iconContainerStyle = [styles.iconContainer, {
    transform: [{
      translateY: interpolate(animatedFocus, {
        inputRange: [0, 1],
        outputRange: [iconSize * -0.5, iconSize * -1.5],
        extrapolate: Extrapolate.CLAMP
      })
    }]
  }];
  const iconStyle = [styles.icon, {
    minHeight: iconSize,
    minWidth: iconSize
  }];
  const iconMaskStyle = [styles.mask, {
    width: containerWidth,
    height: iconSize,
    transform: transformOrigin({
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
        outputRange: [0, toRad(isRTL ? -15 : 15)],
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
    }) : /*#__PURE__*/React.createElement(IconComponent, {
      animatedFocus: animatedFocus,
      color: icon.color,
      size: iconSize
    });
  };

  return /*#__PURE__*/React.createElement(Animated.View, {
    style: outerContainerStyle
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: containerStyle
  }, /*#__PURE__*/React.createElement(MaskedView, {
    style: styles.root,
    maskElement: /*#__PURE__*/React.createElement(Animated.View, {
      style: iconMaskStyle
    })
  }, /*#__PURE__*/React.createElement(Animated.View, {
    pointerEvents: "none",
    style: iconContainerStyle
  }, /*#__PURE__*/React.createElement(View, {
    style: iconStyle
  }, renderIcon()))), /*#__PURE__*/React.createElement(MaskedView, {
    style: styles.root,
    maskElement: /*#__PURE__*/React.createElement(Animated.View, {
      style: labelMaskStyle
    })
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: labelContainerStyle
  }, /*#__PURE__*/React.createElement(Text, {
    numberOfLines: 1,
    style: labelStyle,
    onLayout: handleLabelLayout
  }, label))), indicatorVisibility && /*#__PURE__*/React.createElement(AnimatedSvg, {
    style: [styles.root, {
      left: sub(divide(containerWidth, 2), indicatorSize / 2),
      top: sub(containerHeight, indicatorSize)
    }],
    width: indicatorSize,
    height: indicatorSize
  }, /*#__PURE__*/React.createElement(AnimatedCircle, {
    r: animatedIndicatorSize,
    translateY: indicatorSize / 2,
    translateX: indicatorSize / 2,
    fill: indicatorColor
  }))));
};

const FlashyTabBarItem = /*#__PURE__*/memo(FlashyTabBarItemComponent, isEqual);
export default FlashyTabBarItem;
//# sourceMappingURL=FlashyTabBarItem.js.map