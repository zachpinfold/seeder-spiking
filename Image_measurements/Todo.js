import React, { useState } from "react";
import { View, Text, Button, FlatList, StyleSheet, Image } from "react-native";

export default ({ history }) => {
  const [todos, setTodo] = useState([
    {
      text: "learn React Native",
      isComplete: false,
    },
    {
      text: "have a catch-up",
      isComplete: false,
    },
  ]);

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
      height: 300,
    },
  });
  

  return (
    <View style={styles.container}>
      <Text>To Do List </Text>
      <Button title="homepage" onPress={() => history.push("/")} />
      {/* <FlatList
        data={todos}
        renderItem={({ item }) => <Text style={styles.item}>{item.text}</Text>}
      /> */}
      <Image
              style={styles.logo}

        source={{
          uri: "https://i.ibb.co/4SN9629/53597410-2609425155741218-5149520665254035456-o.jpg",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
