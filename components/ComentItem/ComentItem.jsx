import { Text, View, Image } from "react-native";
import { styles } from "./ComentItemStyle";

export const ComentItem = ({ item, index, allComments }) => {
  return (
    <View
      style={{
        ...styles.commentWrapper,
        marginBottom: allComments.length - 1 === index ? 31 : 26,
      }}
    >
      <Image source={{ uri: item.userPhoto }} style={styles.userImage} />

      <View style={{ flex: 1, paddingRight: 16 }}>
        <Text style={styles.userName}>{item.userName}</Text>
        <Text style={styles.commentText}>{item.coment}</Text>
        <Text style={styles.timeText}>{item.comentTime}</Text>
      </View>
    </View>
  );
};
