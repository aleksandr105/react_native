import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { styles } from "./HomeStyle";
import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";

const db = getDatabase();

export const Home = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const { userName, email, userPhoto } = useSelector((state) => state.auth);

  const getAllPosts = () => {
    const starCountRef = ref(db, "posts/");

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      if (data)
        setPosts(Object.keys(data).map((el) => ({ ...data[el], id: el })));
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <Image source={{ uri: userPhoto }} style={styles.imageUser} />
        <View>
          <Text style={styles.stringName}>{userName}</Text>
          <Text style={styles.stringEmail}>{email}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={{ paddingBottom: 32, paddingTop: index === 0 ? 16 : 0 }}>
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
  );
};
