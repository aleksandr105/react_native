import { Text, TouchableOpacity, View, Image, TextInput } from "react-native";
import { styles } from "./CreatePostsScreenStyle";
import { Camera, CameraType } from "expo-camera";
import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { useSelector } from "react-redux";
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { getDatabase, set, ref as refDatabase } from "firebase/database";
import { app } from "../../firebase/config";
import { v4 as uuidv4 } from "uuid";

const storage = getStorage();
const database = getDatabase(app);

export const CreatePostsScreen = ({ navigation }) => {
  const [refPhoto, setRefPhoto] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [locality, setLocality] = useState("");
  const [nameLocality, setNameLocality] = useState("");

  const { userId, userName } = useSelector((state) => state.auth);

  const DataIsReady =
    photo && nameLocality.trim() !== "" && locality.trim() !== "";

  useEffect(() => {
    (async () => {
      const { status: statusCamera } =
        await Camera.requestCameraPermissionsAsync();

      let { status } = await Location.requestForegroundPermissionsAsync();
    })();
  }, []);

  const takePhoto = async () => {
    const { uri } = await refPhoto.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    setPhoto(uri);
    setLocation(location);
  };

  const sendPhoto = () => {
    navigation.navigate("Публикации");
    uploadPostToServer();
    setLocality("");
    setNameLocality("");
    setPhoto(null);
    setLocation(null);
  };

  const uploadPostToServer = async () => {
    const refPhoto = await uploadPhotoToServer();

    await set(refDatabase(database, "posts/" + uuidv4()), {
      photo: refPhoto,
      locality,
      nameLocality,
      location: location.coords,
      userName,
      userId,
    });
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const postId = Date.now().toString();
    const ImagesRef = ref(storage, `images/${postId}`);
    await uploadBytes(ImagesRef, file);
    const refStorFile = await getDownloadURL(ref(storage, `images/${postId}`));
    return refStorFile;
  };

  const clearData = () => {
    setLocality("");
    setNameLocality("");
    setPhoto(null);
    setLocation(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraWrapper}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.camera} />
        ) : (
          <Camera style={styles.camera} ref={setRefPhoto} type={type}>
            <TouchableOpacity style={styles.btnCamera} onPress={takePhoto}>
              <MaterialIcons name="photo-camera" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonType}
              onPress={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
              }}
            >
              <Ionicons name="camera-reverse-sharp" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </Camera>
        )}
      </View>
      <Text style={styles.text}>
        {!photo ? "Сделайте фото" : "Редактировать фото"}
      </Text>

      <View>
        <View style={styles.inputWraper}>
          <TextInput
            placeholder="Название..."
            style={styles.input}
            onChangeText={setNameLocality}
            value={nameLocality}
          />
        </View>
        <View style={styles.inputWraper}>
          <TextInput
            placeholder="Местность..."
            style={{
              ...styles.input,
              paddingLeft: 28,
              fontFamily: "Roboto-Regular",
            }}
            onChangeText={setLocality}
            value={locality}
          />
          <Feather
            name="map-pin"
            size={24}
            color="#BDBDBD"
            style={styles.iconLocal}
          />
        </View>
      </View>
      <TouchableOpacity
        disabled={!DataIsReady}
        style={{
          ...styles.btn,
          backgroundColor: DataIsReady ? "#FF6C00" : "#F6F6F6",
        }}
        activeOpacity={0.9}
        onPress={sendPhoto}
      >
        <Text
          style={{
            ...styles.btnText,
            color: DataIsReady ? "#ffff" : "#BDBDBD",
          }}
        >
          Опубликовать
        </Text>
      </TouchableOpacity>
      <View style={{ marginTop: "auto", alignItems: "center" }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.btnDelete}
          onPress={clearData}
        >
          <Feather name="trash-2" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
