import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { styles } from "./CommentsScreenStyle";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { Ionicons } from "@expo/vector-icons";

const db = getDatabase();

export const CommentsScreen = ({ route }) => {
  const [coment, setComent] = useState("");
  const { userName, userId, userPhoto } = useSelector((state) => state.auth);
  const [allComments, setallComments] = useState([]);

  const { id, photo } = route.params;

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    await onValue(ref(db, "posts/" + id), (snapshot) => {
      if (!snapshot.val()?.coments) return;

      setallComments(Object.values(snapshot.val().coments));
    });
  };

  const createComent = async () => {
    set(ref(db, "posts/" + id + "/coments/" + uuidv4()), {
      userId,
      coment,
      userName,
    });
    setComent("");
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.image} />
      <View style={{ justifyContent: "space-between", flex: 1 }}>
        <FlatList
          data={allComments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View
              style={{
                ...styles.commentWrapper,
                marginBottom: allComments.length - 1 === index ? 31 : 26,
              }}
            >
              <View style={styles.userInfoWrapper}>
                <Image source={{ uri: userPhoto }} style={styles.userImage} />
                <Text style={styles.userName}>{item.userName}</Text>
              </View>
              <View
                style={{ paddingTop: 20, paddingLeft: 60, paddingRight: 16 }}
              >
                <Text style={styles.commentText}>{item.coment}</Text>
              </View>
            </View>
          )}
        />

        <View style={{ position: "relative" }}>
          <TextInput
            placeholder="Комментировать..."
            style={styles.input}
            onChangeText={setComent}
            value={coment}
          />
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.9}
            onPress={createComent}
            disabled={coment.trim() === ""}
          >
            <Ionicons name="arrow-up" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
