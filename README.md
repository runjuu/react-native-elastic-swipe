# react-native-elastic-swipe
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Runjuu/react-native-elastic-swipe/pulls)
[![npm version](https://badge.fury.io/js/react-native-elastic-swipe.svg)](https://badge.fury.io/js/react-native-elastic-swipe)

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

### Demo
<p align="center">
  <a href="https://github.com/Runjuu/SongLink">
    <img src="https://i.imgur.com/M6RGAwG.gif" width="375" />
  </a>
</p>
