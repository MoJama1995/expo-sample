import React from "react";
import { Asset } from "expo-asset";
import { AR } from "expo";
// Let's alias ExpoTHREE.AR as ThreeAR so it doesn't collide with Expo.AR.
import ExpoTHREE, { AR as ThreeAR, THREE } from "expo-three";
// Let's also import `expo-graphics`
// expo-graphics manages the setup/teardown of the gl context/ar session, creates a frame-loop, and observes size/orientation changes.
// it also provides debug information with `isArCameraStateEnabled`
import { View as GraphicsView } from "expo-graphics";
import { Text } from "react-native";

const asset = Expo.Asset.fromModule(require("./assets/northcoderslogo.png"));

export default class ArFrame extends React.Component {
  componentDidMount() {
    // Turn off extra warnings
    THREE.suppressExpoWarnings(true);
    ThreeAR.suppressWarnings();
  }

  render() {
    // You need to add the `isArEnabled` & `arTrackingConfiguration` props.
    // `isArRunningStateEnabled` Will show us the play/pause button in the corner.
    // `isArCameraStateEnabled` Will render the camera tracking information on the screen.
    // `arTrackingConfiguration` denotes which camera the AR Session will use.
    // World for rear, Face for front (iPhone X only)
    return (
      <GraphicsView
        style={{ flex: 1 }}
        onContextCreate={this.onContextCreate}
        onRender={this.onRender}
        onResize={this.onResize}
        isArEnabled
        isArRunningStateEnabled
        isArCameraStateEnabled
        arTrackingConfiguration={"ARWorldTrackingConfiguration"}
      />
    );
  }

  // When our context is built we can start coding 3D things.
  onContextCreate = async ({ gl, scale: pixelRatio, width, height }) => {
    // This will allow ARKit to collect Horizontal surfaces
    AR.setPlaneDetection("horizontal");

    // Create a 3D renderer
    this.renderer = new ExpoTHREE.Renderer({
      gl,
      pixelRatio,
      width,
      height
    });

    // We will add all of our meshes to this scene.
    this.scene = new THREE.Scene();
    // This will create a camera texture and use it as the background for our scene
    this.scene.background = new ThreeAR.BackgroundTexture(this.renderer);
    // Now we make a camera that matches the device orientation.
    // Ex: When we look down this camera will rotate to look down too!
    this.camera = new ThreeAR.Camera(width, height, 0.01, 1000);

    await asset.downloadAsync();

    await AR.setDetectionImagesAsync({
      myDopeImage: {
        /**
         * The local uri of the image, this can be obtained with Expo.Asset.fromModule()
         */
        uri: asset.localUri,
        /**
         * Name used to identify the Image Anchor returned in a `onAnchorsDidUpdate` listener.
         */
        name: "myDopeImage",
        /**
         * Real-world size in meters.
         */
        width: 0.1
      }
    });

    AR.onAnchorsDidUpdate(({ anchors, eventType }) => {
      for (let anchor of anchors) {
        if (anchor.type === AR.AnchorType.Image) {
          const { identifier, image, transform } = anchor;

          if (eventType === AR.AnchorEventType.Add) {
            return <Text>This works!</Text>;
          } else if (eventType === AR.AnchorEventType.Remove) {
            // Remove that node
          } else if (eventType === AR.AnchorEventType.Update) {
            // Update whatever node
          }
        }
      }
    });

    // Setup a light so we can see the cube color
    // AmbientLight colors all things in the scene equally.
    this.scene.add(new THREE.AmbientLight(0xffffff));

    // Create this cool utility function that let's us see all the raw data points.
    this.points = new ThreeAR.Points();
    // Add the points to our scene...
    this.scene.add(this.points);
  };

  // When the phone rotates, or the view changes size, this method will be called.
  onResize = ({ x, y, scale, width, height }) => {
    // Let's stop the function if we haven't setup our scene yet
    if (!this.renderer) {
      return;
    }
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(scale);
    this.renderer.setSize(width, height);
  };

  // Called every frame.
  onRender = () => {
    // This will make the points get more rawDataPoints from Expo.AR
    this.points.update();
    // Finally render the scene with the AR Camera
    this.renderer.render(this.scene, this.camera);
  };
}
