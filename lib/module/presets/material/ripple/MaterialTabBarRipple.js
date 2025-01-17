import React, { memo, useMemo, useRef } from 'react';
import { Dimensions, processColor } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, { interpolate, useCode, call, add, sub, Extrapolate, abs, onChange, eq, cond, set, Value } from 'react-native-reanimated'; // @ts-ignore 😞

import isEqual from 'lodash.isequal';
import { useValues, get, useValue } from 'react-native-redash';
import { styles } from './styles';
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const SCREEN_WIDTH = Dimensions.get('screen').width;

const MaterialTabBarRippleComponent = ({
  selectedIndex,
  tabs,
  tabItemPositions,
  animatedFocusValues,
  width = SCREEN_WIDTH,
  height = 0
}) => {
  //#region variables
  const svgRef = useRef(null);
  const animatedMounted = useValue(0);
  const animatedValue = get(animatedFocusValues, selectedIndex, new Value(1));
  const animatedColors = useValues(...tabs.map(item => processColor(item.ripple.color))); //#endregion
  //#region styles

  const containerStyle = useMemo(() => [styles.container, {
    width,
    height
  }], [width, height]); //#endregion
  //#region Ripple

  const animatedXs = useValues(...tabItemPositions.map(item => item.x + item.width / 2));
  const animatedCircleX = get(animatedXs, selectedIndex, new Animated.Value(0));
  const animatedYs = useValues(...tabItemPositions.map(item => item.y + item.height / 2));
  const animatedCircleY = get(animatedYs, selectedIndex, new Animated.Value(0));
  const animatedRadius = animatedXs.map(x => add(width / 2, abs(sub(width / 2, x))));
  const animatedCircleRadius = interpolate(animatedValue, {
    inputRange: [0, 1],
    outputRange: [0, get(animatedRadius, selectedIndex, new Animated.Value(0))],
    extrapolate: Extrapolate.CLAMP
  });
  const animatedCircleFill = get(animatedColors, selectedIndex, new Animated.Value(processColor('white'))); //#endregion
  //#region callbacks

  const setSVGBackground = call([selectedIndex], args => {
    // @ts-ignore
    svgRef.current.setNativeProps({
      backgroundColor: tabs[args[0]].ripple.color
    });
  }); //#endregion
  //#region effects

  useCode(() => [onChange(animatedValue, cond(eq(animatedValue, 1), setSVGBackground)), cond(eq(animatedMounted, 0), [setSVGBackground, set(animatedMounted, 1)])], [selectedIndex]); //#endregion

  return /*#__PURE__*/React.createElement(Svg, {
    ref: svgRef,
    pointerEvents: "none",
    width: width,
    height: height,
    style: containerStyle
  }, /*#__PURE__*/React.createElement(AnimatedCircle, {
    pointerEvents: "none",
    fill: animatedCircleFill,
    r: animatedCircleRadius,
    cy: animatedCircleY,
    cx: animatedCircleX
  }));
};

const MaterialTabBarRipple = /*#__PURE__*/memo(MaterialTabBarRippleComponent, isEqual);
export default MaterialTabBarRipple;
//# sourceMappingURL=MaterialTabBarRipple.js.map