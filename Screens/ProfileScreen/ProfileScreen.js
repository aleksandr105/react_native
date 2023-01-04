import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { styles } from "./ProfileScreenStyle";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getDatabase, ref, onValue } from "firebase/database";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import {
  authSingOutUser,
  updateUserPhotoOperation,
} from "../../redux/auth/authOperation";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const db = getDatabase();

export const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    userId: userIdCurrent,
    userName,
    userPhoto,
  } = useSelector((state) => state.auth);
  const [userPosts, setUserPosts] = useState([]);

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

    getAllPosts();

    return () => {
      event.remove();
    };
  }, []);

  const getAllPosts = async () => {
    await onValue(ref(db, "posts/"), (snapshot) => {
      if (!snapshot.val()) return;

      const allPosts = snapshot.val();

      const allUserPosts = Object.keys(snapshot.val())
        .map((el) => ({ ...allPosts[el], id: el }))
        .filter((el) => el.userId === userIdCurrent);
      setUserPosts(allUserPosts);
    });
  };

  const updatePhoto = async () => {
    if (userPhoto === "null") {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        dispatch(updateUserPhotoOperation(result.assets[0].uri));
      } else {
        alert("You did not select any image.");
      }
      return;
    }

    dispatch(updateUserPhotoOperation(null));
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        source={require("../../assets/BG.jpg")}
      >
        <View style={styles.wrapper}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btnLogOut}
            onPress={() => dispatch(authSingOutUser())}
          >
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </TouchableOpacity>

          <View
            style={{
              ...styles.avatarContainer,
              left: width / 2 - 60,
              top: -60,
            }}
          >
            <Image source={{ uri: userPhoto }} style={styles.avatar} />
            <TouchableOpacity
              style={{
                ...styles.addAvatar,
                borderColor: userPhoto !== "null" ? "#747272" : "#FF6C00",
              }}
              activeOpacity={0.9}
              onPress={updatePhoto}
            >
              {userPhoto !== "null" && (
                <AntDesign name="close" size={20} color="#747272" />
              )}
              {userPhoto === "null" && (
                <Image source={require("../../assets/Union.png")} />
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.text}>{userName}</Text>

          <FlatList
            data={userPosts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View
                style={{ paddingBottom: 32, paddingTop: index === 0 ? 32 : 0 }}
              >
                <Image source={{ uri: item.photo }} style={styles.postImage} />
                <Text style={styles.localityText}>{item.nameLocality}</Text>
                <View style={styles.btnWrapper}>
                  <TouchableOpacity
                    style={{ flexDirection: "row" }}
                    onPress={() =>
                      navigation.navigate("Комментарии", {
                        id: item.id,
                        photo: item.photo,
                      })
                    }
                  >
                    <Feather
                      name="message-circle"
                      size={24}
                      style={{ color: item.coments ? "#FF6C00" : "#BDBDBD" }}
                    />
                    <Text style={{ fontSize: 16, marginLeft: 6 }}>
                      {item.coments ? Object.keys(item.coments).length : 0}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ flexDirection: "row" }}
                    onPress={() =>
                      navigation.navigate("Локация", {
                        location: item.location,
                        nameLocality: item.nameLocality,
                      })
                    }
                  >
                    <Feather name="map-pin" size={24} color="#BDBDBD" />
                    <Text
                      style={{
                        color: "#212121",
                        marginLeft: 4,
                        fontSize: 16,
                        fontFamily: "Roboto-Regular",
                        textDecorationLine: "underline",
                      }}
                    >
                      {item.locality}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </ImageBackground>
    </View>
  );
};
