import React, { useRef, useState } from "react";
import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  Text,
  Image,
  Button,
} from "react-native";

export default function App() {
  const [bottomPotClick, setBottomPotClick] = useState(0);
  const [topPotClick, setTopPotClick] = useState(null);
  const [topPlantClick, setTopPlantClick] = useState(null);
  const pressCount = useRef(0);

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
      onPanResponderEnd: (e, gestureState)  => {
      },
      onPanResponderRelease: (e, gestureState) => {
        const { moveY } = gestureState;
        console.log(pressCount)
        if (pressCount.current === 0) {
          pressCount.current++
          setBottomPotClick(moveY);
        } else
        if (pressCount.current === 1) {
          pressCount.current++
          setTopPotClick(moveY);
        }
        else
        if (pressCount.current === 2) {
          pressCount.current++
          setTopPlantClick(moveY);
        }
        pan.flattenOffset();
      },
    })
  ).current;


  const calculateDistance = () => {
    console.log("hello");
    const potHeight = 14.5;
    const unit = (bottomPotClick - topPotClick) / potHeight;
    const plantHeight = (topPotClick - topPlantClick) / unit;
    console.log(bottomPotClick, topPotClick, topPlantClick);
    console.log(plantHeight + "CM  ----PLANT HEIGHT");
  };

  return (
    <View style={styles.container}>
      <Text>{bottomPotClick}</Text>
      <Text>{pressCount.current}</Text>
      <Text style={styles.titleText}>Drag this box!</Text>
      <Image
        // onTouchStart={this.handleTouch}
        style={styles.logo}
        source={{
          uri: "https://i.ibb.co/zJB6Q1x/yetanotherplant.jpg",
        }}
      />
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
        {...panResponder.panHandlers}
      >
        <View style={styles.box} />
        <View style={styles.box2} />
        <View style={styles.box3} />
      </Animated.View>

      
      <Button title={"calculate"} onPress={calculateDistance} />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     paddingTop: 50,
//   },
//   tinyLogo: {
//     width: 50,
//     height: 50,
//   },
//   logo: {
//     width: 300,
//     height: 500,
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold",
  },
  box: {
    position: 'absolute',
    height: 50,
    width: 50,
    opacity: 0.5,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  box2: {
    position: 'absolute',
    height: 2,
    width: 50,
    marginTop: 25,
    opacity: 1,
    backgroundColor: "green",
    borderRadius: 5,
  },
  box3: {
    position: 'absolute',
    height: 50,
    width: 2,
    marginLeft: 25,
    opacity: 1,
    backgroundColor: "green",
    borderRadius: 5,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 300,
    height: 500,
  },
});
