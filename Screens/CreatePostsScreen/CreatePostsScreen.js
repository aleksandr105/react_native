import {
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native";
import { styles } from "./CreatePostsScreenStyle";
import { Camera, CameraType } from "expo-camera";
import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";
import { useState, useEffect, useRef } from "react";
import * as Location from "expo-location";
import { useSelector } from "react-redux";
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { getDatabase, set, ref as refDatabase } from "firebase/database";
import { app } from "../../firebase/config";
import { v4 as uuidv4 } from "uuid";
import { useIsFocused } from "@react-navigation/native";

const storage = getStorage();
const database = getDatabase(app);

export const CreatePostsScreen = ({ navigation }) => {
  const [refPhoto, setRefPhoto] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [locality, setLocality] = useState("");
  const [nameLocality, setNameLocality] = useState("");
  const [playCamera, setPlayCamera] = useState(false);
  const [width, setWidth] = useState(Dimensions.get("window").width);
  const [refscroll, setRefscroll] = useState(null);
  const [keyboardStatus, setKeyboardStatus] = useState(null);

  const refScrollView = useRef();

  const isFocused = useIsFocused();

  const { userId, userName } = useSelector((state) => state.auth);

  useEffect(() => setPlayCamera(false), [isFocused]);

  const DataIsReady =
    photo && nameLocality.trim() !== "" && locality.trim() !== "";

  useEffect(() => {
    setRefscroll(refScrollView.current);
    (async () => {
      const { status: statusCamera } =
        await Camera.requestCameraPermissionsAsync();

      let { status } = await Location.requestForegroundPermissionsAsync();
    })();

    const saveSize = () => {
      const sizeWith = Math.round(Dimensions.get("window").width);
      setWidth(sizeWith);
    };

    const event = Dimensions.addEventListener("change", saveSize);

    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });

    return () => {
      event.remove();
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  if (keyboardStatus) refscroll?.scrollToEnd();

  const takePhoto = async () => {
    const { uri } = await refPhoto.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    setPhoto(uri);
    setLocation(location);
    setPlayCamera(false);
    console.log(playCamera);
    console.log(photo);
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
      createTime: Date.now(),
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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        enabled
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {!playCamera && (
          <ScrollView style={styles.container} ref={refScrollView}>
            <View style={styles.cameraWrapper}>
              <View style={{ ...styles.btnContainer, left: width / 2 - 45 }}>
                <TouchableOpacity
                  style={styles.btnCamera}
                  onPress={() => (!photo ? setPlayCamera(true) : clearData())}
                >
                  {!photo && (
                    <MaterialIcons
                      name="photo-camera"
                      size={24}
                      color="#FFFFFF"
                    />
                  )}
                  {photo && <Feather name="trash-2" size={24} color="red" />}
                </TouchableOpacity>
              </View>

              {photo && <Image source={{ uri: photo }} style={styles.camera} />}
            </View>

            <Text style={styles.text}>
              {!photo ? "Сделайте фото" : "Удалить фото"}
            </Text>

            <View style={{ justifyContent: "flex-end" }}>
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
            <View style={{ alignItems: "center", marginTop: "5%" }}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btnDelete}
                onPress={clearData}
              >
                <Feather name="trash-2" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
        {playCamera && (
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
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
