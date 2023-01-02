import { styles } from "./MapScreenStyle";
import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

export const MapScreen = ({ route }) => {
  const { latitude, longitude } = route.params.location;
  const { nameLocality } = route.params;

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0021,
          longitudeDelta: 0.001,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} title={nameLocality} />
      </MapView>
    </View>
  );
};
