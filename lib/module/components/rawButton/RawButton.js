function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useRef } from 'react';
import Animated, { call } from 'react-native-reanimated';
import { State, TapGestureHandler, LongPressGestureHandler } from 'react-native-gesture-handler';
import { useValue, useGestureHandler } from 'react-native-redash';
import { useStableCallback } from '../../utilities';
const {
  useCode,
  cond,
  onChange,
  eq
} = Animated;

const RawButton = ({
  index,
  selectedIndex,
  accessibilityLabel,
  children,
  style,
  animatedOnChange,
  onLongPress,
  onLayout
}) => {
  // refs
  const rootViewRef = useRef(null);
  const longPressGestureHandlerRef = useRef(null); // tap gesture

  const tapGestureState = useValue(State.UNDETERMINED);
  const tapGestureHandler = useGestureHandler({
    state: tapGestureState
  }); // long press gesture

  const longPressGestureState = useValue(State.UNDETERMINED);
  const longPressGestureHandler = useGestureHandler({
    state: longPressGestureState
  }); // effects

  useCode(() => [onChange(tapGestureState, cond(eq(tapGestureState, State.END), animatedOnChange(index))), onChange(longPressGestureState, cond(eq(longPressGestureState, State.ACTIVE), call([], () => {
    onLongPress(index);
  }))), onChange(selectedIndex, call([selectedIndex], args => {
    // @ts-ignore
    rootViewRef.current.setNativeProps({
      accessibilityState: {
        selected: args[0] === index
      }
    });
  }))], [index]); // callbacks

  const handleContainerLayout = useStableCallback(({
    nativeEvent: {
      layout
    }
  }) => onLayout && onLayout(index, layout));
  return /*#__PURE__*/React.createElement(TapGestureHandler, _extends({
    waitFor: longPressGestureHandlerRef
  }, tapGestureHandler), /*#__PURE__*/React.createElement(Animated.View, {
    ref: rootViewRef,
    accessible: true,
    accessibilityLabel: accessibilityLabel,
    accessibilityRole: "button",
    accessibilityComponentType: "button",
    onLayout: handleContainerLayout,
    style: style
  }, /*#__PURE__*/React.createElement(LongPressGestureHandler, _extends({
    ref: longPressGestureHandlerRef
  }, longPressGestureHandler), /*#__PURE__*/React.createElement(Animated.View, null, children))));
};

export default RawButton;
//# sourceMappingURL=RawButton.js.map