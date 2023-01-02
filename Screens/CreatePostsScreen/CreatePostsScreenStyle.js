import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "#FFFFFF",
  },
  cameraWrapper: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    overflow: "hidden",
  },
  camera: {
    justifyContent: "center",
    alignItems: "center",
    height: 240,
    position: "relative",
    backgroundColor: "#F6F6F6",
  },
  btnCamera: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#A3A3A3",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 100,
    marginTop: 32,
    overflow: "hidden",
  },
  btnText: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  buttonType: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "#A3A3A3",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 10,
    top: 10,
  },
  inputWraper: {
    position: "relative",
  },
  input: {
    height: 50,
    borderBottomColor: "#BDBDBD",
    borderBottomWidth: 1,
  },
  text: {
    marginTop: 8,
    fontSize: 16,
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    marginBottom: 32,
  },
  iconLocal: {
    top: 13,
    position: "absolute",
  },
  btnDelete: {
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
