# react-native-elastic-swipe
具有阻力的滑动组件

```typescript
interface Props {
  friction?: number
  criticalOffsetX?: number
  criticalOffsetY?: number
  swipeHorizontally?: boolean
  swipeVertically?: boolean
  onChangeReachStateOfHorizontal?(isReached: boolean): void
  onChangeReachStateOfVertical?(isReached: boolean): void
  onSwipeMove?(e: GestureResponderEvent, gestureState: PanResponderGestureState): void
  onSwipeEnd?(e: GestureResponderEvent, gestureState: PanResponderGestureState): void
  shouldSetPanResponder?(e: GestureResponderEvent, gestureState: PanResponderGestureState): boolean
}
```
