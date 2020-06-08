import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Home from "./Home";
import { render } from "react-dom";
import {
  NativeRouter,
  Switch,
  Route,
  OnlineExample,
} from "react-router-native";
import Products from "./Todo";
import PictureTest from "./PictureTest";
import PanTest from "./PanTest";
import PickerTest from './PickerTest'
import AnimatedImage from './AnimatedImage'


function App() {
  // render()  {
  return (
    <NativeRouter>
      <View style={styles.container}>
        <Switch>
          <Route exact path="/" component={PanTest} />
          <Route exact path="/todo" component={Products} />
          <Route exact path="/picture" component={PickerTest} />
        </Switch>
      </View>
    </NativeRouter>
  );
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
