import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ImageBackground,
  Keyboard,
  Dimensions,
} from "react-native";
import { RegistrationScreen, LoginScreen } from "./Screens";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [width, setWidth] = useState(Dimensions.get("window").width);
  const [height, setHeight] = useState(Dimensions.get("window").height);

  useEffect(() => {
    const saveSize = () => {
      const sizeWith = Math.round(Dimensions.get("window").width);
      const sizeHeight = Math.round(Dimensions.get("window").height);
      setHeight(sizeHeight);
      setWidth(sizeWith);
    };

    const event = Dimensions.addEventListener("change", saveSize);

    return () => {
      event.remove();
    };
  }, []);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
          "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ImageBackground
          source={require("./assets/BG.jpg")}
          style={{ ...styles.image, width, height }}
          onLayout={onLayoutRootView}
        >
          {false && (
            <RegistrationScreen windowWidth={width} windowHeight={height} />
          )}
          {true && <LoginScreen windowWidth={width} windowHeight={height} />}
          <StatusBar style="auto" />
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
});
