import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  wrapper: {
    marginTop: 120,
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    position: "relative",
  },
  avatarContainer: {
    position: "absolute",
  },
  avatar: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    position: "relative",
  },
  addAvatar: {
    width: 25,
    height: 25,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#FF6C00",
    backgroundColor: "#FFFFFF",
    position: "absolute",
    left: 107,
    top: 81,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  text: {
    fontSize: 30,
    color: "#212121",
    fontSize: 30,
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    paddingTop: 92,
  },
  btnLogOut: {
    top: 22,
    right: 16,
    width: 24,
    height: 24,
    position: "absolute",
    justifyContent: "flex-end",
    alignItems: "center",
    zIndex: 999,
  },
  postImage: {
    height: 240,
    borderRadius: 8,
  },
  localityText: {
    marginBottom: 8,
    marginTop: 8,
    color: "#212121",
    fontSize: 16,
    fontFamily: "Roboto-Medium",
  },
  btnWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
