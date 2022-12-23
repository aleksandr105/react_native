import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 32,
    paddingBottom: 110,
    paddingHorizontal: 16,
    height: 450,
  },

  text: {
    fontSize: 30,
    color: "#212121",
    marginBottom: 33,
    fontSize: 30,
    textAlign: "center",
    fontFamily: "Roboto-Medium",
  },
  input: {
    height: 50,
    padding: 16,
    backgroundColor: "#F6F6F6",
    color: "#000000",
  },
  inputPass: {
    height: 50,
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 95,
    backgroundColor: "#F6F6F6",
    position: "relative",
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6C00",
    height: 50,
    borderRadius: 100,
    marginTop: 43,
  },
  btnText: {
    color: "#ffff",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  btnShow: {
    position: "absolute",
    right: 15,
    top: 15,
  },
  btnShowText: {
    color: "#1B4371",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  btnToRegister: {
    marginTop: 16,
    width: 267,
  },
  btnTextToRegister: {
    color: "#1B4371",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
});
