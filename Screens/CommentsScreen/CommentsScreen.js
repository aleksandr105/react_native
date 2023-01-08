import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import { styles } from "./CommentsScreenStyle";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { Ionicons } from "@expo/vector-icons";
import dateFormat, { masks, i18n } from "dateformat";

const db = getDatabase();

i18n.monthNames = [
  "янв",
  "фев",
  "мар",
  "апр",
  "май",
  "июнь",
  "июль",
  "авг",
  "сен",
  "окт",
  "ноя",
  "дек",
  "январь",
  "февраль",
  "март",
  "апрель",
  "май",
  "июнь",
  "июль",
  "август",
  "сентябырь",
  "октябырь",
  "ноябырь",
  "декабырь",
];

export const CommentsScreen = ({ route }) => {
  const [coment, setComent] = useState("");
  const { userName, userId, userPhoto } = useSelector((state) => state.auth);
  const [allComments, setallComments] = useState([]);
  const [allrefsPhoto, setAllrefsPhoto] = useState(null);
  const [allCommentsWithPhoto, setAllCommentsWithPhoto] = useState([]);

  const { id, photo } = route.params;

  useEffect(() => {
    getComments();
  }, []);

  useEffect(() => {
    if (allrefsPhoto && allComments !== []) {
      masks.hammerTime = 'dd mmmm, yyyy "|" HH:MM ';

      const updatedArr = allComments
        .sort((elA, elB) => elB.comentTime - elA.comentTime)
        .map((el) => {
          if (allrefsPhoto[el.userId]) {
            return {
              ...el,
              ...allrefsPhoto[el.userId],
              comentTime: dateFormat(el.comentTime, "hammerTime"),
            };
          }

          return { ...el, comentTime: dateFormat(el.comentTime, "hammerTime") };
        });

      setAllCommentsWithPhoto(updatedArr);
    }
  }, [allrefsPhoto, allComments]);

  const getComments = async () => {
    await onValue(ref(db, "avatars/"), (snapshot) => {
      if (!snapshot.val()) return;

      setAllrefsPhoto(snapshot.val());
    });

    await onValue(ref(db, "posts/" + id), (snapshot) => {
      if (!snapshot.val()?.coments) return;

      setallComments(Object.values(snapshot.val().coments));
    });
  };

  const createComent = async () => {
    Keyboard.dismiss();
    set(ref(db, "posts/" + id + "/coments/" + uuidv4()), {
      userId,
      coment,
      userName,
      comentTime: Date.now(),
    });

    setComent("");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        enabled
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={150}
      >
        <View style={styles.container}>
          <Image source={{ uri: photo }} style={styles.image} />
          <FlatList
            initialNumToRender={5}
            contentContainerStyle={{ flexGrow: 1 }}
            data={allCommentsWithPhoto}
            keyExtractor={(item, index) => uuidv4()}
            renderItem={({ item, index }) => (
              <View
                style={{
                  ...styles.commentWrapper,
                  marginBottom: allComments.length - 1 === index ? 31 : 26,
                }}
              >
                <Image
                  source={{ uri: item.userPhoto }}
                  style={styles.userImage}
                />

                <View style={{ flex: 1, paddingRight: 16 }}>
                  <Text style={styles.userName}>{item.userName}</Text>
                  <Text style={styles.commentText}>{item.coment}</Text>
                  <Text style={styles.timeText}>{item.comentTime}</Text>
                </View>
              </View>
            )}
          />
        </View>
        <View
          style={{
            position: "relative",
            marginHorizontal: 15,
          }}
        >
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
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
