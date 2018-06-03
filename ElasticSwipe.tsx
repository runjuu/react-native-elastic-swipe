import * as React from 'react';
import {
  Animated,
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
  PanResponderInstance,
  StyleSheet,
} from 'react-native';

interface Props {
  friction?: number
  criticalOffsetX?: number
  criticalOffsetY?: number
  swipeHorizontally?: boolean
  swipeVertically?: boolean
  onSwipeMove?(e: GestureResponderEvent, gestureState: PanResponderGestureState): void
  onSwipeEnd?(e: GestureResponderEvent, gestureState: PanResponderGestureState): void
  onChangeReachStateOfHorizontal?(isReached: boolean): void
  onChangeReachStateOfVertical?(isReached: boolean): void
  shouldSetPanResponder?(e: GestureResponderEvent, gestureState: PanResponderGestureState): boolean
}

interface State {
  translate: Animated.ValueXY
}

export default class ElasticSwipe extends React.Component<Props, State> {

  public static defaultProps: Props = {
    criticalOffsetX: 60,
    criticalOffsetY: 60,
    friction: 6,
    swipeHorizontally: false,
    swipeVertically: false,
  };

  panResponder: PanResponderInstance;

  state: State = {
    translate: new Animated.ValueXY({ x:0, y: 0 }),
  };

  private makePanResponder(): PanResponderInstance {
    return PanResponder.create({
      onStartShouldSetPanResponder: this.shouldSetPanResponder,
      onMoveShouldSetPanResponderCapture: this.shouldSetPanResponder,
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderRelease: this.resetTranslate,
      onPanResponderTerminate: this.resetTranslate,
    });
  }

  private shouldSetPanResponder(e: GestureResponderEvent, gestureState: PanResponderGestureState): boolean {
    if (this.props.shouldSetPanResponder) {
      return this.props.shouldSetPanResponder(e, gestureState);
    } else {
      const isMoveHorizontally = !!this.props.swipeHorizontally && Math.abs(gestureState.dx) > 1;
      const isMoveVertically = !!this.props.swipeVertically && Math.abs(gestureState.dy) > 1;
      return isMoveHorizontally || isMoveVertically;
    }
  }

  private onSwipeMove(e: GestureResponderEvent, gestureState: PanResponderGestureState) {
    const isSwipeVertically = this.props.swipeVertically && Math.abs(gestureState.dy) > 5;
    const isSwipeHorizontally = this.props.swipeHorizontally && Math.abs(gestureState.dx) > 5;
    if (this.props.onSwipeMove && (isSwipeVertically || isSwipeHorizontally)) {
      this.props.onSwipeMove(e, gestureState);
    }
  }

  private onSwipeEnd(e: GestureResponderEvent, gestureState: PanResponderGestureState) {
    if (this.props.onSwipeEnd) {
      this.props.onSwipeEnd(e, gestureState);
    }
  }

  lastHorizontalReachState = false;
  private checkIfChangedHorizontalReachState(isReached: boolean) {
    const isReachStatusChanged = isReached !== this.lastHorizontalReachState;
    if (this.props.onChangeReachStateOfHorizontal && this.props.swipeHorizontally && isReachStatusChanged) {
      this.props.onChangeReachStateOfHorizontal(isReached);
      this.lastHorizontalReachState = isReached;
    }
  }

  lastVerticalReachState = false;
  private checkIfChangedVerticalReachState(isReached: boolean) {
    const isReachStatusChanged = isReached !== this.lastVerticalReachState;
    if (this.props.onChangeReachStateOfVertical && this.props.swipeVertically && isReachStatusChanged) {
      this.props.onChangeReachStateOfVertical(isReached);
      this.lastVerticalReachState = isReached;
    }
  }

  private calculateOffset(offset: number): number {
    return offset + ((1 / Number(this.props.friction) - 1) * offset);
  }

  private onPanResponderMove(e: GestureResponderEvent, gestureState: PanResponderGestureState) {
    const { dx, dy } = gestureState;
    const x = this.props.swipeHorizontally ? this.calculateOffset(dx) : 0;
    const y = this.props.swipeVertically ? this.calculateOffset(dy) : 0;

    this.checkIfChangedHorizontalReachState(Number(this.props.criticalOffsetX) <= x);
    this.checkIfChangedVerticalReachState(Number(this.props.criticalOffsetY) <= y);
    this.onSwipeMove(e, gestureState);
    this.state.translate.setValue({ x, y });
  }

  private resetTranslate(e: GestureResponderEvent, gestureState: PanResponderGestureState) {
    this.onSwipeEnd(e, gestureState);
    Animated.spring(this.state.translate, {
      toValue: { x: 0, y: 0 },
      friction: 20,
    }).start();
  }

  constructor(props: Props) {
    super(props);
    this.onSwipeEnd = this.onSwipeEnd.bind(this);
    this.calculateOffset = this.calculateOffset.bind(this);
    this.resetTranslate = this.resetTranslate.bind(this);
    this.onPanResponderMove = this.onPanResponderMove.bind(this);
    this.shouldSetPanResponder = this.shouldSetPanResponder.bind(this);
    this.panResponder = this.makePanResponder();
  }

  render() {
    const style = {
      transform: this.state.translate.getTranslateTransform()
    };

    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[styles.container, style]}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});