import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    paddingTop: 32,
    flex: 1,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6C00",
    height: 34,
    width: 34,
    borderRadius: 50,
    position: "absolute",
    right: 10,
    top: 8,
  },
  input: {
    height: 50,
    borderColor: "E8E8E8",
    borderWidth: 1,
    borderRadius: 100,
    paddingLeft: 20,
    paddingRight: 55,
    backgroundColor: "#FFF",
  },
  image: {
    height: 240,
    borderRadius: 8,
    marginBottom: 32,
  },
  userImage: {
    borderRadius: 50,
    width: 28,
    height: 28,
    backgroundColor: "silver",
    marginRight: 16,
  },
  commentWrapper: {
    flexDirection: "row",
  },
  commentText: {
    fontFamily: "Roboto-Regular",
    color: "#212121",
    fontSize: 13,
  },
  userName: {
    color: "#212121",
    fontSize: 16,
    fontFamily: "Roboto-Medium",
  },
  timeText: {
    marginTop: 3,
    fontSize: 10,
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    textAlign: "right",
  },
});
