import { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { styles } from "./stylesRegestration";
import { useDispatch } from "react-redux";
import { authSingUpUser } from "../../redux/auth/authOperation";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";

const initialState = {
  name: "",
  email: "",
  password: "",
  userPhoto: null,
};

export const RegistrationScreen = ({ navigation }) => {
  const [showPass, setShowPass] = useState(true);
  const [focus, setFocus] = useState(null);
  const [submitData, setSubmitData] = useState(initialState);
  const [userPhoto, setUserPhoto] = useState(null);

  const [width, setWidth] = useState(Dimensions.get("window").width);
  const [height, setHeight] = useState(Dimensions.get("window").height);

  const dispatch = useDispatch();

  useEffect(() => {
    const saveSize = () => {
      const sizeWith = Math.round(Dimensions.get("window").width);
      const sizeHeight = Math.round(Dimensions.get("window").height);
      setHeight(sizeHeight);
      setWidth(sizeWith);
    };

    const event = Dimensions.addEventListener("change", saveSize);

    return () => {
      event.remove();
    };
  }, []);

  const RegisterSubmit = () => {
    const { name, email, password } = submitData;

    if (name.trim() === "" && email.trim() === "" && password.trim() === "") {
      alert("Все поля должны быть заполнены!!!");
      return;
    }
    Keyboard.dismiss();
    dispatch(authSingUpUser(submitData));
    setSubmitData(initialState);
  };

  const addUserImage = async () => {
    if (userPhoto) {
      setUserPhoto(null);
      setSubmitData((prev) => ({ ...prev, userPhoto: null }));
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSubmitData((prev) => ({ ...prev, userPhoto: result.assets[0].uri }));
      setUserPhoto(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}
      >
        <ImageBackground
          source={require("../../assets/BG.jpg")}
          style={{ ...styles.image, width, height }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={-80}
          >
            <View style={styles.container}>
              <View
                style={{
                  ...styles.avatarContainer,
                  left: width / 2 - 60,
                  top: focus === null ? -60 : -80,
                }}
              >
                <Image source={{ uri: userPhoto }} style={styles.avatar} />
                <TouchableOpacity
                  style={{
                    ...styles.addAvatar,
                    borderColor: userPhoto ? "#747272" : "#FF6C00",
                  }}
                  activeOpacity={0.9}
                  onPress={addUserImage}
                >
                  {!userPhoto && (
                    <Image source={require("../../assets/Union.png")} />
                  )}
                  {userPhoto && (
                    <AntDesign name="close" size={20} color="#747272" />
                  )}
                </TouchableOpacity>
              </View>
              <Text style={styles.text}>Регистрация</Text>
              <View
                style={{
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: focus === "login" ? "#FF6C00" : "#E8E8E8",
                  overflow: "hidden",
                }}
              >
                <TextInput
                  style={styles.input}
                  placeholder={"Логин"}
                  onFocus={() => setFocus("login")}
                  onBlur={() => setFocus(null)}
                  onChangeText={(value) =>
                    setSubmitData((prev) => ({ ...prev, name: value }))
                  }
                  value={submitData.name}
                />
              </View>
              <View
                style={{
                  marginBottom: 16,
                  marginTop: 16,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: focus === "email" ? "#FF6C00" : "#E8E8E8",
                  overflow: "hidden",
                }}
              >
                <TextInput
                  style={styles.input}
                  placeholder={"Адрес электронной почты"}
                  keyboardType={"email-address"}
                  onFocus={() => setFocus("email")}
                  onBlur={() => setFocus(null)}
                  onChangeText={(value) =>
                    setSubmitData((prev) => ({ ...prev, email: value }))
                  }
                  value={submitData.email}
                />
              </View>
              <View
                style={{
                  borderRadius: 8,
                  borderWidth: 1,
                  overflow: "hidden",
                  borderColor: focus === "password" ? "#FF6C00" : "#E8E8E8",
                }}
              >
                <TextInput
                  style={styles.inputPass}
                  placeholder={"Пароль"}
                  secureTextEntry={showPass}
                  onFocus={() => setFocus("password")}
                  onBlur={() => setFocus(null)}
                  onChangeText={(value) =>
                    setSubmitData((prev) => ({ ...prev, password: value }))
                  }
                  value={submitData.password}
                />
                <TouchableOpacity
                  style={styles.btnShow}
                  activeOpacity={0.8}
                  onPress={() => setShowPass((prev) => !prev)}
                >
                  <Text style={styles.btnShowText}>
                    {showPass ? "Показать" : "Скрыть"}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.9}
                onPress={RegisterSubmit}
              >
                <Text style={styles.btnText}>Зарегистрироваться</Text>
              </TouchableOpacity>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity
                  style={styles.btnToLogin}
                  activeOpacity={0.9}
                  onPress={() => navigation.navigate("Login")}
                >
                  <Text style={styles.btnTextToLogin}>
                    Уже есть аккаунт? Войти
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
