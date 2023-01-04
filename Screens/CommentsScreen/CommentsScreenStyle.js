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
    right: 25,
    top: 8,
  },
  input: {
    height: 50,
    borderColor: "E8E8E8",
    borderWidth: 1,
    borderRadius: 100,
    paddingLeft: 20,
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
    marginRight: 8,
  },
  commentWrapper: {
    flexDirection: "row",
    position: "relative",
  },
  userInfoWrapper: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
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
    position: "absolute",
    top: 0,
    left: 60,
  },
});
