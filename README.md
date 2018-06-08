# react-native-elastic-swipe
A simple react native swipe component with elastic effect.

```bash
npm install react-native-elastic-swipe
```

### Props
```typescript
interface Props {
  friction?: number
  criticalOffsetX?: number
  criticalOffsetY?: number
  swipeHorizontally?: boolean
  swipeVertically?: boolean
  onChangeReachStateOfHorizontal?(isReachedCriticalOffsetX: boolean): void
  onChangeReachStateOfVertical?(isReachedCriticalOffsetY: boolean): void
  onSwipeMove?(e: GestureResponderEvent, gestureState: PanResponderGestureState): void
  onSwipeEnd?(e: GestureResponderEvent, gestureState: PanResponderGestureState): void
  shouldSetPanResponder?(e: GestureResponderEvent, gestureState: PanResponderGestureState): boolean
}
```

### Example
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
