import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  imageUser: {
    marginRight: 8,
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "#BDBDBD",
  },
  userInfoContainer: {
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 32,
    marginBottom: 16,
  },
  stringName: {
    fontSize: 13,
    fontFamily: "Roboto-Bold",
    color: "#212121",
  },
  stringEmail: {
    fontSize: 11,
    fontFamily: "Roboto-Regular",
    color: "#212121",
    opacity: 0.8,
  },
  postImage: {
    height: 240,
    borderRadius: 8,
  },
  localityText: {
    color: "#212121",
    fontSize: 16,
    fontFamily: "Roboto-Medium",
  },
  btnWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeContainer: {
    marginBottom: 5,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeText: {
    fontSize: 10,
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
  },
});
