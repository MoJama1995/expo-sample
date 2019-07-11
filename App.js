import { createStackNavigator, createAppContainer } from "react-navigation";
import ArFrame from "./ArFrame";
import MapPage from "./Map";
import RandomBox from "./3dBox";
import { Text, View, Button } from "react-native";
import React, { Component } from "react";

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Maps!"
          onPress={() => this.props.navigation.navigate("MapPage")}
        />
      </View>
    );
  }
}

const MainNavigator = createStackNavigator({
  HomeScreen: { screen: HomeScreen },
  MapPage: { screen: MapPage },
  Camera: { screen: ArFrame }
});

const App = createAppContainer(MainNavigator);

export default App;
