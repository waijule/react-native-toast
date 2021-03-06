'use strict';

const ReactNative = require('react-native');
const {
    NativeModules,
} = ReactNative;

const RCTToast = NativeModules.Toaster;
const Toast = {};

const optionsBuilder = function () {
  // defaults
    let message = null;
    let duration = 'short';
    let position = 'center';
    let addPixelsY = 0;

    return {
        withMessage: function (m) {
            message = m;
            return this;
        },

        withDuration: function (d) {
            duration = d;
            return this;
        },

        withPosition: function (p) {
            position = p;
            return this;
        },

        withAddPixelsY: function (y) {
            addPixelsY = y;
            return this;
        },

        build: function () {
            return {
                message: message,
                duration: duration,
                position: position,
                addPixelsY: addPixelsY,
            };
        },
    };
};

const showWithOptions = function (options) {
    RCTToast.show(options);
};

const showToast = function (message, duration, position, offsetY) {
    showWithOptions(
      optionsBuilder()
          .withMessage(message || '未知数据')
          .withDuration(duration)
          .withPosition(position)
          .withAddPixelsY(offsetY || 0)
          .build()
      );
};

Toast.showShortTop = function (message) {
    showToast(message, 'short', 'top');
};

Toast.showShortCenter = function (message) {
    showToast(message, 'short', 'center');
};

Toast.showShortBottom = function (message) {
    showToast(message, 'short', 'bottom');
};

Toast.showLongTop = function (message) {
    showToast(message, 'long', 'top');
};

Toast.showLongCenter = function (message) {
    showToast(message, 'long', 'center');
};

Toast.showLongBottom = function (message) {
    showToast(message, 'long', 'bottom');
};

Toast.show = function (message) {
    showToast(message, 'short', 'bottom');
};

Toast.showFlexibleLongTop = function (message, offsetY) {
    showToast(message, 'long', 'top', offsetY);
};

Toast.hide = function () {
    RCTToast.hide();
};

module.exports = Toast;
