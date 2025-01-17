import React, { useMemo, memo, useCallback } from 'react';
import Animated from 'react-native-reanimated';
import { transformOrigin, useValue } from 'react-native-redash'; // @ts-ignore 😞

import isEqual from 'lodash.isequal';
import { useStableCallback } from '../../../utilities';
import { DEFAULT_ITEM_INNER_SPACE, DEFAULT_ITEM_OUTER_SPACE } from '../constants';
import { styles } from './styles';
const {
  interpolate,
  divide,
  Extrapolate
} = Animated;

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
  }, [itemInnerSpace, itemOuterSpace]); //#endregion
  //#region variables

  const labelHeight = useValue(0); //#endregion
  //#region styles

  const outerContainerStyle = useMemo(() => [styles.outerContainer, {
    paddingHorizontal: itemOuterHorizontalSpace,
    paddingVertical: itemOuterVerticalSpace
  }], [itemOuterHorizontalSpace, itemOuterVerticalSpace]);
  const innerContainerStyle = useMemo(() => [styles.innerContainer, {
    paddingHorizontal: itemInnerHorizontalSpace,
    paddingVertical: itemInnerVerticalSpace,
    opacity: interpolate(animatedFocus, {
      inputRange: [0, 1],
      outputRange: [inactiveOpacity, 1],
      extrapolate: Extrapolate.CLAMP
    }),
    transform: transformOrigin({
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
  const iconContainerStyle = [styles.iconContainer, {
    minHeight: iconSize,
    minWidth: iconSize,
    ...(animation === 'iconWithLabelOnFocus' ? {
      transform: transformOrigin({
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
  const labelStyle = useMemo(() => [styles.label, labelStyleOverride, {
    marginTop: itemInnerVerticalSpace / 2,
    opacity: animation === 'iconWithLabelOnFocus' ? animatedFocus : 1
  }], [labelStyleOverride, itemInnerVerticalSpace, animation, animatedFocus]); //#endregion
  //#region callbacks

  const handleLabelLayout = useStableCallback(({
    nativeEvent: {
      layout: {
        height
      }
    }
  }) => requestAnimationFrame(() => {
    labelHeight.setValue(height);
  })); //#endregion
  // render

  const renderIcon = useCallback(() => {
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
  }, [icon, iconSize, animatedFocus]);
  const renderLabel = useCallback(() => {
    return animation !== 'iconOnly' ? /*#__PURE__*/React.createElement(Animated.Text, {
      onLayout: handleLabelLayout,
      style: labelStyle
    }, label) : null;
  }, [label, animation, labelStyle, handleLabelLayout]);
  return /*#__PURE__*/React.createElement(Animated.View, {
    style: outerContainerStyle
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: innerContainerStyle
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: iconContainerStyle
  }, renderIcon()), renderLabel()));
};

const MaterialTabBarItem = /*#__PURE__*/memo(MaterialTabBarItemComponent, isEqual);
export default MaterialTabBarItem;
//# sourceMappingURL=MaterialTabBarItem.js.map