# react-native-elastic-swipe
具有阻力效果的滑动组件

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

### 摩擦力
`friction`的值越大，交互时的效果越明显，默认值为`6`

### 滑动方向
- swipeHorizontally
  - 水平滑动，默认为`false`
- swipeVertically
  - 垂直滑动，默认为`false`

### 触发事件
当对应方向的滑动距离大于等于对应的 `criticalOffset*` 时，会触发对应的 `onChangeReachStateOf*` 方法，此时 `isReached` 为 `true`；

反过来，当滑动距离小于对应的 `criticalOffset*` 时，触发方法时，`isReached` 为 `false`

### 例子
```jsx
import Swipe from "react-native-elastic-swipe";
  
  ...
  render() {
    return (
      <Swipe
        friction={5}
        swipeHorizontally
        criticalOffsetX={21}
        onSwipeMove={this.onSwipeMove}
        onSwipeEnd={this.onSwipeEnd}
        onChangeReachStateOfHorizontal={this.onChangeReachStateOfHorizontal}
      >
        <View />    
      </Swipe>
    );
  }
  ...
```
