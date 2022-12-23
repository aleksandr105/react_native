import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { styles } from "./stylesLogin";

const initialState = {
  email: "",
  password: "",
};

export const LoginScreen = ({ windowWidth, windowHeight }) => {
  const [showPass, setShowPass] = useState(true);
  const [focus, setFocus] = useState(null);
  const [submitData, setSubmitData] = useState(initialState);

  const RegisterSubmit = () => {
    Keyboard.dismiss();
    console.log(submitData);
    setSubmitData(initialState);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={-63}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Войти</Text>
        <View
          style={{
            marginBottom: 16,
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
          <Text style={styles.btnText}>Войти</Text>
        </TouchableOpacity>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity style={styles.btnToRegister} activeOpacity={0.9}>
            <Text style={styles.btnTextToRegister}>
              Нет аккаунта? Зарегистрироваться
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
