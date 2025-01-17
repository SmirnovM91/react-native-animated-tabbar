"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimatedTabBar = AnimatedTabBar;

var _react = _interopRequireWildcard(require("react"));

var _reactNativeSafeAreaContext = require("react-native-safe-area-context");

var _AnimatedTabBarView = require("./AnimatedTabBarView");

var _utilities = require("./utilities");

var _hooks = require("./hooks");

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _reactNativeRedash = require("react-native-redash");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function AnimatedTabBar(props) {
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

  const tabBarContainerRef = (0, _react.useRef)(null);
  const isReactNavigation5 = (0, _react.useMemo)(() => Boolean(state), [state]);
  const tabBarHeight = (0, _reactNativeRedash.useValue)(0);
  const CommonActions = (0, _react.useMemo)(() => {
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
  } = (0, _react.useMemo)(() => {
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
  const shouldShowTabBar = (0, _react.useMemo)(() => {
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
  const shouldShowTabBarAnimated = (0, _hooks.useTabBarVisibility)(shouldShowTabBar);
  const getRouteTitle = (0, _react.useCallback)(route => {
    if (isReactNavigation5) {
      const {
        options
      } = descriptors[route.key];
      return options.tabBarLabel !== undefined && typeof options.tabBarLabel === 'string' ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;
    } else {
      return route.key;
    }
  }, [isReactNavigation5, descriptors]);
  const getRouteTabConfigs = (0, _react.useCallback)(route => {
    if (isReactNavigation5) {
      return tabs[route.name];
    } else {
      return tabs[route.key];
    }
  }, [isReactNavigation5, tabs]);
  const routesWithTabConfig = (0, _react.useMemo)(() => {
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
  } = (0, _reactNativeSafeAreaContext.useSafeArea)();
  const safeBottomArea = (0, _react.useMemo)(() => {
    var _overrideSafeAreaInse;

    return (_overrideSafeAreaInse = overrideSafeAreaInsets === null || overrideSafeAreaInsets === void 0 ? void 0 : overrideSafeAreaInsets.bottom) !== null && _overrideSafeAreaInse !== void 0 ? _overrideSafeAreaInse : _safeBottomArea;
  }, [overrideSafeAreaInsets, _safeBottomArea]);
  const style = (0, _react.useMemo)(() => ({ // @ts-ignore
    ...overrideStyle,
    paddingBottom: safeBottomArea
  }), [overrideStyle, safeBottomArea]);
  const containerStyle = (0, _react.useMemo)(() => ({
    bottom: 0,
    left: 0,
    right: 0,
    transform: [{
      translateY: (0, _reactNativeReanimated.interpolate)(shouldShowTabBarAnimated, {
        inputRange: [0, 1],
        outputRange: [tabBarHeight, 0],
        extrapolate: _reactNativeReanimated.Extrapolate.CLAMP
      })
    }]
  }), // eslint-disable-next-line react-hooks/exhaustive-deps
  []); //#endregion
  //#region callbacks

  const handleIndexChange = (0, _utilities.useStableCallback)(index => {
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
  const handleLongPress = (0, _utilities.useStableCallback)(index => {
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
  const handleLayout = (0, _react.useCallback)(({
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

  (0, _reactNativeReanimated.useCode)(() => (0, _reactNativeReanimated.onChange)(shouldShowTabBarAnimated, (0, _reactNativeReanimated.cond)((0, _reactNativeReanimated.eq)(shouldShowTabBarAnimated, 1), (0, _reactNativeReanimated.call)([], () => {
    if (tabBarContainerRef.current) {
      // @ts-ignore
      tabBarContainerRef.current.setNativeProps({
        style: {
          position: 'relative'
        }
      });
    }
  }))), []);
  (0, _react.useEffect)(() => {
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

  return /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    ref: tabBarContainerRef,
    style: containerStyle,
    onLayout: handleLayout
  }, /*#__PURE__*/_react.default.createElement(_AnimatedTabBarView.AnimatedTabBarView, _extends({
    index: navigationIndex,
    onIndexChange: handleIndexChange,
    onLongPress: handleLongPress,
    tabs: routesWithTabConfig,
    style: style
  }, rest)));
}
//# sourceMappingURL=AnimatedTabBar.js.map