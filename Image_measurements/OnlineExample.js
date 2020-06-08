import React from 'react';
import { StyleSheet, View, Text, Dimensions, Animated, PanResponder } from 'react-native';

export default function Drag() {
  const dropZoneValues = React.useRef(null);
  const pan = React.useRef(new Animated.ValueXY());
  const [bgColor, setBgColor] = React.useState('#2c3e50');

  const isDropZone = React.useCallback((gesture) => {
    const dz = dropZoneValues.current;
    return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
  }, []);

  const onMove = React.useCallback((_, gesture) => {
    if (isDropZone(gesture)) setBgColor('red');
    else setBgColor('#2c3e50');
  }, [isDropZone]);

  const setDropZoneValues = React.useCallback((event) => {
    dropZoneValues.current = event.nativeEvent.layout;
  });

  const panResponder = React.useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,

    onPanResponderGrant: (evt, gestureState) => {
      pan.current.setOffset({x: pan.current.x._value, y: pan.current.y._value});
      pan.current.setValue({x: 0, y: 0});
    },

    onPanResponderMove: Animated.event([null, {
      dx  : pan.current.x,
      dy  : pan.current.y
    }], {
      listener: onMove
    }),
    onPanResponderRelease: (e, gesture) => {
      if (!isDropZone(gesture)) {
        Animated.spring(
          pan.current,
          {toValue:{x:0 - pan.current.x._offset,y: 0- pan.current.y._offset}}
        ).start(() => {
            pan
                .current
                .setValue({x: 0, y: 0})
            pan
                .current
                .setOffset({x: 0, y: 0})
        });
      }
      else {
        pan.current.flattenOffset()
      }
    }
  }), []);

  return (
    <View style={styles.mainContainer}>
      <View
        onLayout={setDropZoneValues}
        style={[styles.dropZone, {backgroundColor: bgColor}]}
      >
        <Text style={styles.text}>Drop me here!</Text>
      </View>
      <View style={styles.draggableContainer}>
        <Animated.View
          {...panResponder.panHandlers}
          style={[pan.current.getLayout(), styles.circle]}
        >
          <Text style={styles.text}>Drag me!</Text>
        </Animated.View>
      </View>
    </View>
  );
}

let CIRCLE_RADIUS = 36;
let Window = Dimensions.get('window');
let styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  dropZone: {
    height  : 100,
    backgroundColor:'#2c3e50'
  },
  text        : {
    marginTop   : 25,
    marginLeft  : 5,
    marginRight : 5,
    textAlign   : 'center',
    color       : '#fff'
  },
  draggableContainer: {
    position    : 'absolute',
    top         : Window.height/2 - CIRCLE_RADIUS,
    left        : Window.width/2 - CIRCLE_RADIUS,
  },
  circle: {
    backgroundColor     : '#1abc9c',
    width               : CIRCLE_RADIUS*2,
    height              : CIRCLE_RADIUS*2,
    borderRadius        : CIRCLE_RADIUS
  }
});