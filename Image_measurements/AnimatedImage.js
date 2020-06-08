import React, { Component } from 'react'
import {
  StyleSheet,
  Animated,
  View,
} from 'react-native'
import { createResponder } from 'react-native-gesture-responder'

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  draggable: {
    height: 400,
    width: 50,
  },
})

export default class WorldMap extends Component {
  constructor(props) {
    super(props)

    this.state = {
      x: new Animated.Value(0),
      y: new Animated.Value(0),
    }
  }
  componentWillMount() {
    this.Responder = createResponder({
      onStartShouldSetResponder: () => true,
      onStartShouldSetResponderCapture: () => true,
      onMoveShouldSetResponder: () => true,
      onMoveShouldSetResponderCapture: () => true,
      onResponderMove: (evt, gestureState) => {
        this.pan(gestureState)
      },
      onPanResponderTerminationRequest: () => true,
    })
  }
  pan = (gestureState) => {
    const { x, y } = this.state
    const maxX = 250
    const minX = 0
    const maxY = 250
    const minY = 0

    const xDiff = gestureState.moveX - gestureState.previousMoveX
    const yDiff = gestureState.moveY - gestureState.previousMoveY
    let newX = x._value + xDiff
    let newY = y._value + yDiff

    if (newX < minX) {
      newX = minX
    } else if (newX > maxX) {
      newX = maxX
    }

    if (newY < minY) {
      newY = minY
    } else if (newY > maxY) {
      newY = maxY
    }

    x.setValue(newX)
    y.setValue(newY)
  }
  render() {
    const {
      x, y,
    } = this.state
    const imageStyle = { left: x, top: y }

    return (
      <View
        style={styles.container}
      >
        <Animated.Image
          source={require('./img.png')}
          {...this.Responder}
          resizeMode={'contain'}
          style={[styles.draggable, imageStyle]}
        />
    </View>

    )
  }
}