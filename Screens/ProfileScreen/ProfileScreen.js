import { View, Text } from "react-native";
import { styles } from "./ProfileScreenStyle";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getDatabase, ref, onValue } from "firebase/database";

const db = getDatabase();

export const ProfileScreen = () => {
  const { userId: id } = useSelector((state) => state.auth);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    await onValue(ref(db, "posts/"), (snapshot) => {
      if (!snapshot.val()) return;

      const allUserPosts = Object.values(snapshot.val()).filter(
        (el) => el.userId === id
      );
      setUserPosts(allUserPosts);
    });
  };

  return (
    <View>
      <Text style={styles.text}>ProfileScreen page</Text>
    </View>
  );
};
