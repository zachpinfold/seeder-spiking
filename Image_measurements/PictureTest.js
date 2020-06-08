import React, { Component } from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
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
class PictureTest extends Component {
  state = {
    bottomPotClick: null,
    topPotClick: null,
    topPlantClick: null,
    pressCount: 0,
  };

  handleTouch = (event) => {
    const { locationY, locationX, pageX, pageY } = event.nativeEvent;
    // console.log(this.state.firstClick)
    if (this.state.pressCount === 0) {
      this.setState({ bottomPotClick: locationY, pressCount: 1 });
    }
    // console.log(this.state.firstClick)
    if (this.state.pressCount === 1) {
      this.setState({ topPotClick: locationY, pressCount: 2 });
    }
    // console.log(this.state.secondClick)
    if (this.state.pressCount === 2) {
      this.setState({ topPlantClick: locationY, pressCount: 3 });
    }
    //   console.log(this.state.thirdClick)
  };

  calculateDistance = () => {
    console.log(this.state)
    const { bottomPotClick, topPotClick, topPlantClick } = this.state;
    const potHeight = 14.5;
    const unit = (bottomPotClick - topPotClick) / potHeight;
    const plantHeight = (topPotClick - topPlantClick) / unit;
    console.log(plantHeight + "  ----PLANT HEIGHT")
};


  resetMeasure = () => {
      this.setState({
        bottomPotClick: null,
        topPotClick: null,
        topPlantClick: null,
        pressCount: 0,
      })
  }


  render() {
    return (
      <View>
        {/* <Image
          onTouchStart={this.handleTouch}
          style={styles.logo}
          source={{
            uri: "https://i.ibb.co/kBHS5rH/plant2.jpg",
          }}
        /> */}
        <Image
          onTouchStart={this.handleTouch}
          style={styles.logo}
          source={{
            uri: "https://i.ibb.co/nfnXnrH/pepper-plant-1.jpg",
          }}
        />

        <Button title={"calculate"} onPress={this.calculateDistance} />
        <Button title={"refresh"} onPress={this.resetMeasure} />
        <Button title="homepage" onPress={() => history.push("/")} />

      </View>
    );
  }
}

export default PictureTest;
