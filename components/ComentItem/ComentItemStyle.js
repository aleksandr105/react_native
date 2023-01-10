import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  commentWrapper: {
    flexDirection: "row",
  },
  userImage: {
    borderRadius: 50,
    width: 28,
    height: 28,
    backgroundColor: "silver",
    marginRight: 16,
  },
  userName: {
    color: "#212121",
    fontSize: 16,
    fontFamily: "Roboto-Medium",
  },
  commentText: {
    fontFamily: "Roboto-Regular",
    color: "#212121",
    fontSize: 13,
  },
  timeText: {
    marginTop: 3,
    fontSize: 10,
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    textAlign: "right",
  },
});
