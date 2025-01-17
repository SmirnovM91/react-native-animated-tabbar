function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useMemo, useCallback, useEffect, useRef } from 'react';
import { useSafeArea } from 'react-native-safe-area-context';
import { AnimatedTabBarView } from './AnimatedTabBarView';
import { useStableCallback } from './utilities';
import { useTabBarVisibility } from './hooks';
import Animated, { interpolate, Extrapolate, useCode, cond, eq, call, onChange } from 'react-native-reanimated';
import { useValue } from 'react-native-redash';
export function AnimatedTabBar(props) {
  // props
  const {
    tabs,
    state,
    navigation,
    descriptors,
    onTabPress,
    onTabLongPress,
    style: overrideStyle,
    safeAreaInsets: overrideSafeAreaInsets,
    ...rest
  } = props; //#region variables

  const tabBarContainerRef = useRef(null);
  const isReactNavigation5 = useMemo(() => Boolean(state), [state]);
  const tabBarHeight = useValue(0);
  const CommonActions = useMemo(() => {
    if (isReactNavigation5) {
      const {
        CommonActions: _CommonActions
      } = require('@react-navigation/native');

      return _CommonActions;
    } else {
      return undefined;
    }
  }, [isReactNavigation5]);
  const {
    index: navigationIndex,
    key: navigationKey,
    routes
  } = useMemo(() => {
    if (isReactNavigation5) {
      return state;
    } else {
      return {
        index: navigation.state.index,
        routes: navigation.state.routes,
        key: ''
      };
    }
  }, [state, navigation, isReactNavigation5]);
  const shouldShowTabBar = useMemo(() => {
    var _options$tabBarVisibl;

    /**
     * In React Navigation 4 the router view takes care of
     * hiding the tab bar.
     */
    if (!isReactNavigation5) {
      return true;
    }

    const route = routes[navigationIndex];
    const {
      options
    } = descriptors[route.key];
    return (_options$tabBarVisibl = options.tabBarVisible) !== null && _options$tabBarVisibl !== void 0 ? _options$tabBarVisibl : true;
  }, [isReactNavigation5, routes, descriptors, navigationIndex]);
  const shouldShowTabBarAnimated = useTabBarVisibility(shouldShowTabBar);
  const getRouteTitle = useCallback(route => {
    if (isReactNavigation5) {
      const {
        options
      } = descriptors[route.key];
      return options.tabBarLabel !== undefined && typeof options.tabBarLabel === 'string' ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;
    } else {
      return route.key;
    }
  }, [isReactNavigation5, descriptors]);
  const getRouteTabConfigs = useCallback(route => {
    if (isReactNavigation5) {
      return tabs[route.name];
    } else {
      return tabs[route.key];
    }
  }, [isReactNavigation5, tabs]);
  const routesWithTabConfig = useMemo(() => {
    return routes.reduce((result, route) => {
      result[route.key] = {
        title: getRouteTitle(route),
        ...getRouteTabConfigs(route)
      };
      return result;
    }, {});
  }, [routes, getRouteTitle, getRouteTabConfigs]); //#endregion
  //#region styles

  const {
    bottom: _safeBottomArea
  } = useSafeArea();
  const safeBottomArea = useMemo(() => {
    var _overrideSafeAreaInse;

    return (_overrideSafeAreaInse = overrideSafeAreaInsets === null || overrideSafeAreaInsets === void 0 ? void 0 : overrideSafeAreaInsets.bottom) !== null && _overrideSafeAreaInse !== void 0 ? _overrideSafeAreaInse : _safeBottomArea;
  }, [overrideSafeAreaInsets, _safeBottomArea]);
  const style = useMemo(() => ({ // @ts-ignore
    ...overrideStyle,
    paddingBottom: safeBottomArea
  }), [overrideStyle, safeBottomArea]);
  const containerStyle = useMemo(() => ({
    bottom: 0,
    left: 0,
    right: 0,
    transform: [{
      translateY: interpolate(shouldShowTabBarAnimated, {
        inputRange: [0, 1],
        outputRange: [tabBarHeight, 0],
        extrapolate: Extrapolate.CLAMP
      })
    }]
  }), // eslint-disable-next-line react-hooks/exhaustive-deps
  []); //#endregion
  //#region callbacks

  const handleIndexChange = useStableCallback(index => {
    if (isReactNavigation5) {
      const focused = index === navigationIndex;
      const {
        key,
        name
      } = routes[index];
      const event = navigation.emit({
        type: 'tabPress',
        target: key,
        canPreventDefault: true
      });

      if (!focused && !event.defaultPrevented) {
        navigation.dispatch({ ...CommonActions.navigate(name),
          target: navigationKey
        });
      }
    } else {
      onTabPress({
        route: routes[index]
      });
    }
  });
  const handleLongPress = useStableCallback(index => {
    if (isReactNavigation5) {
      const {
        key
      } = routes[index];
      navigation.emit({
        type: 'tabLongPress',
        target: key
      });
    } else {
      onTabLongPress({
        route: routes[index]
      });
    }
  });
  const handleLayout = useCallback(({
    nativeEvent: {
      layout: {
        height
      }
    }
  }) => {
    tabBarHeight.setValue(height);
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  []); //#endregion
  //#region effects

  useCode(() => onChange(shouldShowTabBarAnimated, cond(eq(shouldShowTabBarAnimated, 1), call([], () => {
    if (tabBarContainerRef.current) {
      // @ts-ignore
      tabBarContainerRef.current.setNativeProps({
        style: {
          position: 'relative'
        }
      });
    }
  }))), []);
  useEffect(() => {
    if (!shouldShowTabBar) {
      if (tabBarContainerRef.current) {
        // @ts-ignore
        tabBarContainerRef.current.setNativeProps({
          style: {
            position: 'absolute'
          }
        });
      }
    }
  }, [shouldShowTabBar]); //#endregion
  // render

  return /*#__PURE__*/React.createElement(Animated.View, {
    ref: tabBarContainerRef,
    style: containerStyle,
    onLayout: handleLayout
  }, /*#__PURE__*/React.createElement(AnimatedTabBarView, _extends({
    index: navigationIndex,
    onIndexChange: handleIndexChange,
    onLongPress: handleLongPress,
    tabs: routesWithTabConfig,
    style: style
  }, rest)));
}
//# sourceMappingURL=AnimatedTabBar.js.map