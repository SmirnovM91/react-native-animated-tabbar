function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useMemo, memo } from 'react';
import { View } from 'react-native'; // @ts-ignore 😞

import isEqual from 'lodash.isequal';
import BubbleTabBarItem from './item';
import RawButton from '../../components/rawButton';
import { DEFAULT_ITEM_ANIMATION_DURATION, DEFAULT_ITEM_ANIMATION_EASING, DEFAULT_ITEM_INNER_SPACE, DEFAULT_ITEM_OUTER_SPACE, DEFAULT_ITEM_ICON_SIZE, DEFAULT_ITEM_LAYOUT_DIRECTION, DEFAULT_ITEM_CONTAINER_WIDTH } from './constants';
import { withTransition } from '../../withTransition';
import { noop } from '../../utilities';
import { styles } from './styles';

const BubbleTabBarComponent = ({
  selectedIndex,
  tabs,
  duration = DEFAULT_ITEM_ANIMATION_DURATION,
  easing = DEFAULT_ITEM_ANIMATION_EASING,
  itemInnerSpace = DEFAULT_ITEM_INNER_SPACE,
  itemOuterSpace = DEFAULT_ITEM_OUTER_SPACE,
  itemContainerWidth = DEFAULT_ITEM_CONTAINER_WIDTH,
  iconSize = DEFAULT_ITEM_ICON_SIZE,
  isRTL = DEFAULT_ITEM_LAYOUT_DIRECTION,
  style: containerStyleOverride,
  animatedOnChange,
  onLongPress = noop
}) => {
  //#region variables
  const animatedFocusValues = useMemo(() => tabs.map((_, index) => withTransition({
    index,
    selectedIndex,
    duration,
    easing
  })), // eslint-disable-next-line react-hooks/exhaustive-deps
  [tabs, duration, easing]); //#endregion
  //#region styles

  const containerStyle = useMemo(() => [styles.container, containerStyleOverride, {
    flexDirection: isRTL ? 'row-reverse' : 'row'
  }], [containerStyleOverride, isRTL]); //#endregion
  // render

  return /*#__PURE__*/React.createElement(View, {
    style: containerStyle
  }, tabs.map(({
    key,
    title,
    ...configs
  }, index) => {
    return /*#__PURE__*/React.createElement(RawButton, {
      key: key,
      index: index,
      selectedIndex: selectedIndex,
      accessibilityLabel: title,
      animatedOnChange: animatedOnChange,
      onLongPress: onLongPress
    }, /*#__PURE__*/React.createElement(BubbleTabBarItem, _extends({
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

const BubbleTabBar = /*#__PURE__*/memo(BubbleTabBarComponent, isEqual);
export default BubbleTabBar;
//# sourceMappingURL=BubbleTabBar.js.map