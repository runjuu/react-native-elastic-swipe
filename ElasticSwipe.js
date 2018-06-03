(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('react-native')) :
    typeof define === 'function' && define.amd ? define(['react', 'react-native'], factory) :
    (global.ElasticSwipe = factory(global.React,global.reactNative));
}(this, (function (React,reactNative) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };

    var ElasticSwipe = /** @class */ (function (_super) {
        __extends(ElasticSwipe, _super);
        function ElasticSwipe(props) {
            var _this = _super.call(this, props) || this;
            _this.state = {
                translate: new reactNative.Animated.ValueXY({ x: 0, y: 0 }),
            };
            _this.lastHorizontalReachState = false;
            _this.lastVerticalReachState = false;
            _this.onSwipeEnd = _this.onSwipeEnd.bind(_this);
            _this.calculateOffset = _this.calculateOffset.bind(_this);
            _this.resetTranslate = _this.resetTranslate.bind(_this);
            _this.onPanResponderMove = _this.onPanResponderMove.bind(_this);
            _this.shouldSetPanResponder = _this.shouldSetPanResponder.bind(_this);
            _this.panResponder = _this.makePanResponder();
            return _this;
        }
        ElasticSwipe.prototype.makePanResponder = function () {
            return reactNative.PanResponder.create({
                onStartShouldSetPanResponder: this.shouldSetPanResponder,
                onMoveShouldSetPanResponderCapture: this.shouldSetPanResponder,
                onPanResponderMove: this.onPanResponderMove,
                onPanResponderRelease: this.resetTranslate,
                onPanResponderTerminate: this.resetTranslate,
            });
        };
        ElasticSwipe.prototype.shouldSetPanResponder = function (e, gestureState) {
            if (this.props.shouldSetPanResponder) {
                return this.props.shouldSetPanResponder(e, gestureState);
            }
            else {
                var isMoveHorizontally = !!this.props.swipeHorizontally && Math.abs(gestureState.dx) > 1;
                var isMoveVertically = !!this.props.swipeVertically && Math.abs(gestureState.dy) > 1;
                return isMoveHorizontally || isMoveVertically;
            }
        };
        ElasticSwipe.prototype.onSwipeMove = function (e, gestureState) {
            var isSwipeVertically = this.props.swipeVertically && Math.abs(gestureState.dy) > 5;
            var isSwipeHorizontally = this.props.swipeHorizontally && Math.abs(gestureState.dx) > 5;
            if (this.props.onSwipeMove && (isSwipeVertically || isSwipeHorizontally)) {
                this.props.onSwipeMove(e, gestureState);
            }
        };
        ElasticSwipe.prototype.onSwipeEnd = function (e, gestureState) {
            if (this.props.onSwipeEnd) {
                this.props.onSwipeEnd(e, gestureState);
            }
        };
        ElasticSwipe.prototype.checkIfChangedHorizontalReachState = function (isReached) {
            var isReachStatusChanged = isReached !== this.lastHorizontalReachState;
            if (this.props.onChangeReachStateOfHorizontal && this.props.swipeHorizontally && isReachStatusChanged) {
                this.props.onChangeReachStateOfHorizontal(isReached);
                this.lastHorizontalReachState = isReached;
            }
        };
        ElasticSwipe.prototype.checkIfChangedVerticalReachState = function (isReached) {
            var isReachStatusChanged = isReached !== this.lastVerticalReachState;
            if (this.props.onChangeReachStateOfVertical && this.props.swipeVertically && isReachStatusChanged) {
                this.props.onChangeReachStateOfVertical(isReached);
                this.lastVerticalReachState = isReached;
            }
        };
        ElasticSwipe.prototype.calculateOffset = function (offset) {
            return offset + ((1 / Number(this.props.friction) - 1) * offset);
        };
        ElasticSwipe.prototype.onPanResponderMove = function (e, gestureState) {
            var dx = gestureState.dx, dy = gestureState.dy;
            var x = this.props.swipeHorizontally ? this.calculateOffset(dx) : 0;
            var y = this.props.swipeVertically ? this.calculateOffset(dy) : 0;
            this.checkIfChangedHorizontalReachState(Number(this.props.criticalOffsetX) <= x);
            this.checkIfChangedVerticalReachState(Number(this.props.criticalOffsetY) <= y);
            this.onSwipeMove(e, gestureState);
            this.state.translate.setValue({ x: x, y: y });
        };
        ElasticSwipe.prototype.resetTranslate = function (e, gestureState) {
            this.onSwipeEnd(e, gestureState);
            reactNative.Animated.spring(this.state.translate, {
                toValue: { x: 0, y: 0 },
                friction: 20,
            }).start();
        };
        ElasticSwipe.prototype.render = function () {
            var style = {
                transform: this.state.translate.getTranslateTransform()
            };
            return (React.createElement(reactNative.Animated.View, __assign({}, this.panResponder.panHandlers, { style: [styles.container, style] }), this.props.children));
        };
        ElasticSwipe.defaultProps = {
            criticalOffsetX: 60,
            criticalOffsetY: 60,
            friction: 6,
            swipeHorizontally: false,
            swipeVertically: false,
        };
        return ElasticSwipe;
    }(React.Component));
    var styles = reactNative.StyleSheet.create({
        container: {},
    });

    return ElasticSwipe;

})));
