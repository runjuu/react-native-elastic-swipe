import * as React from 'react';
import { Animated, GestureResponderEvent, PanResponderGestureState, PanResponderInstance } from 'react-native';
interface Props {
    friction?: number;
    criticalOffsetX?: number;
    criticalOffsetY?: number;
    swipeHorizontally?: boolean;
    swipeVertically?: boolean;
    onSwipeMove?(e: GestureResponderEvent, gestureState: PanResponderGestureState): void;
    onSwipeEnd?(e: GestureResponderEvent, gestureState: PanResponderGestureState): void;
    onChangeReachStateOfHorizontal?(isReached: boolean): void;
    onChangeReachStateOfVertical?(isReached: boolean): void;
    shouldSetPanResponder?(e: GestureResponderEvent, gestureState: PanResponderGestureState): boolean;
}
interface State {
    translate: Animated.ValueXY;
}
export default class ElasticSwipe extends React.Component<Props, State> {
    static defaultProps: Props;
    panResponder: PanResponderInstance;
    state: State;
    private makePanResponder;
    private shouldSetPanResponder;
    private onSwipeMove;
    private onSwipeEnd;
    lastHorizontalReachState: boolean;
    private checkIfChangedHorizontalReachState;
    lastVerticalReachState: boolean;
    private checkIfChangedVerticalReachState;
    private calculateOffset;
    private onPanResponderMove;
    private resetTranslate;
    constructor(props: Props);
    render(): JSX.Element;
}
export {};
