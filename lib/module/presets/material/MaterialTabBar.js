function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useMemo, memo, useState } from 'react';
import { View } from 'react-native'; // @ts-ignore 😞

import isEqual from 'lodash.isequal';
import MaterialTabBarItem from './item';
import MaterialTabBarRipple from './ripple';
import RawButton from '../../components/rawButton';
import { DEFAULT_ITEM_ANIMATION_DURATION, DEFAULT_ITEM_ANIMATION_EASING, DEFAULT_ITEM_INNER_SPACE, DEFAULT_ITEM_OUTER_SPACE, DEFAULT_ITEM_ICON_SIZE, DEFAULT_ITEM_LAYOUT_DIRECTION, DEFAULT_ITEM_CONTAINER_WIDTH, DEFAULT_CONFIG_ANIMATION, DEFAULT_CONFIG_INACTIVE_OPACITY, DEFAULT_CONFIG_INACTIVE_SCALE } from './constants';
import { withTransition } from '../../withTransition';
import { noop, useStableCallback } from '../../utilities';
import { styles } from './styles';

const MaterialTabBarComponent = ({
  selectedIndex,
  tabs,
  duration = DEFAULT_ITEM_ANIMATION_DURATION,
  easing = DEFAULT_ITEM_ANIMATION_EASING,
  animation = DEFAULT_CONFIG_ANIMATION,
  inactiveOpacity = DEFAULT_CONFIG_INACTIVE_OPACITY,
  inactiveScale = DEFAULT_CONFIG_INACTIVE_SCALE,
  itemInnerSpace = DEFAULT_ITEM_INNER_SPACE,
  itemOuterSpace = DEFAULT_ITEM_OUTER_SPACE,
  itemContainerWidth = DEFAULT_ITEM_CONTAINER_WIDTH,
  iconSize = DEFAULT_ITEM_ICON_SIZE,
  isRTL = DEFAULT_ITEM_LAYOUT_DIRECTION,
  style: containerStyleOverride,
  onLongPress = noop,
  animatedOnChange
}) => {
  //#region variables
  const [containerLayout, setContainerLayout] = useState({
    width: 0,
    height: 0
  });
  const [tabsPosition, setTabsPosition] = useState([]);
  const animatedFocusValues = useMemo(() => tabs.map((_, index) => withTransition({
    index,
    selectedIndex,
    duration,
    easing
  })), // eslint-disable-next-line react-hooks/exhaustive-deps
  [tabs, duration, easing]); //#endregion
  //#region Styles

  const containerStyle = useMemo(() => {
    var _selectedIndex$_value;

    return [styles.container, containerStyleOverride, {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      // @ts-ignore
      backgroundColor: tabs[(_selectedIndex$_value = selectedIndex._value) !== null && _selectedIndex$_value !== void 0 ? _selectedIndex$_value : 0].ripple.color
    }];
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [containerStyleOverride, isRTL]);
  const rawButtonStyle = useMemo(() => itemContainerWidth === 'fill' ? {
    flex: 1
  } : {}, [itemContainerWidth]); //#endregion
  //#region callbacks

  const handleTabItemLayout = useStableCallback((index, position) => {
    setTabsPosition(state => {
      return { ...state,
        [index]: position
      };
    });
  });
  const handleContainerLayout = useStableCallback(({
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

  return /*#__PURE__*/React.createElement(View, {
    style: containerStyle,
    onLayout: handleContainerLayout
  }, Object.keys(tabsPosition).length === tabs.length ? /*#__PURE__*/React.createElement(MaterialTabBarRipple, {
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
    return /*#__PURE__*/React.createElement(RawButton, {
      key: key,
      index: index,
      selectedIndex: selectedIndex,
      accessibilityLabel: title,
      style: rawButtonStyle,
      animatedOnChange: animatedOnChange,
      onLayout: handleTabItemLayout,
      onLongPress: onLongPress
    }, /*#__PURE__*/React.createElement(MaterialTabBarItem, _extends({
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

const MaterialTabBar = /*#__PURE__*/memo(MaterialTabBarComponent, isEqual);
export default MaterialTabBar;
//# sourceMappingURL=MaterialTabBar.js.map