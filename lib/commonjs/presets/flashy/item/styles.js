"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = void 0;

var _reactNative = require("react-native");

const styles = _reactNative.StyleSheet.create({
  root: { ..._reactNative.StyleSheet.absoluteFillObject
  },
  outerContainer: {// overflow: 'hidden',
  },
  container: {
    alignSelf: 'center'
  },
  iconContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
    justifyContent: 'center'
  },
  icon: {},
  labelContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
    justifyContent: 'center'
  },
  label: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600'
  },
  mask: {
    backgroundColor: 'white',
    position: 'absolute'
  },
  indicator: {
    position: 'absolute'
  }
});

exports.styles = styles;
//# sourceMappingURL=styles.js.map