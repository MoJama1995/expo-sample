import React from "react";
import MapView from "react-native-maps";
import ArFrame from "./ArFrame";
import CameraExample from "./ArFrame";
import ThreeDBox from "./3dBox";
import RandomBox from "./3dBox";

export default class MapPage extends React.Component {
  state = {
    isCamera: false
  };

  render() {
    if (!this.state.isCamera) {
      return (
        <MapView
          style={{ flex: 20 }}
          initialRegion={{
            latitude: 53.486224,
            longitude: -2.240268,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03
          }}
        >
          <MapView.Marker
            onPress={this.renderCamera}
            coordinate={{
              latitude: 53.481,
              longitude: -2.2369
            }}
          />
        </MapView>
      );
    } else {
      return <RandomBox />;
    }
  }

  renderCamera = () => {
    this.setState({ isCamera: true });
  };
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center"
//   }
// });
