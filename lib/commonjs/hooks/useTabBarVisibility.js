"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTabBarVisibility = void 0;

var _react = require("react");

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _reactNativeRedash = require("react-native-redash");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useTabBarVisibility = shouldShowTabBar => {
  const _shouldShowTabBar = (0, _reactNativeRedash.useValue)(shouldShowTabBar ? 1 : 0);

  const clock = (0, _reactNativeRedash.useClock)();
  const shouldAnimate = (0, _reactNativeRedash.useValue)(0);
  const state = (0, _react.useMemo)(() => ({
    finished: new _reactNativeReanimated.default.Value(0),
    frameTime: new _reactNativeReanimated.default.Value(0),
    position: new _reactNativeReanimated.default.Value(shouldShowTabBar ? 1 : 0),
    time: new _reactNativeReanimated.default.Value(0)
  }), // eslint-disable-next-line react-hooks/exhaustive-deps
  []);
  const config = (0, _react.useMemo)(() => ({
    toValue: new _reactNativeReanimated.default.Value(0),
    easing: _reactNativeReanimated.Easing.linear,
    duration: 250
  }), []);
  const finishTiming = (0, _react.useMemo)(() => [(0, _reactNativeReanimated.stopClock)(clock), (0, _reactNativeReanimated.set)(state.finished, 0), (0, _reactNativeReanimated.set)(state.frameTime, 0), (0, _reactNativeReanimated.set)(state.time, 0)], [clock, state]); // effects

  (0, _react.useEffect)(() => {
    _shouldShowTabBar.setValue(shouldShowTabBar ? 1 : 0); // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [shouldShowTabBar]);
  return (0, _reactNativeReanimated.block)([(0, _reactNativeReanimated.onChange)(_shouldShowTabBar, [finishTiming, (0, _reactNativeReanimated.set)(shouldAnimate, 1)]), (0, _reactNativeReanimated.cond)(shouldAnimate, [(0, _reactNativeReanimated.cond)((0, _reactNativeReanimated.and)((0, _reactNativeReanimated.not)((0, _reactNativeReanimated.clockRunning)(clock)), (0, _reactNativeReanimated.not)(state.finished)), [(0, _reactNativeReanimated.set)(state.frameTime, 0), (0, _reactNativeReanimated.set)(state.time, 0), (0, _reactNativeReanimated.set)(state.finished, 0), (0, _reactNativeReanimated.set)(config.toValue, _shouldShowTabBar), (0, _reactNativeReanimated.startClock)(clock)]), (0, _reactNativeReanimated.timing)(clock, state, config), (0, _reactNativeReanimated.cond)(state.finished, [finishTiming, (0, _reactNativeReanimated.set)(shouldAnimate, 0)])]), state.position]);
};

exports.useTabBarVisibility = useTabBarVisibility;
//# sourceMappingURL=useTabBarVisibility.js.map