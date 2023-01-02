import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  RegistrationScreen,
  LoginScreen,
  PostsScreen,
  CreatePostsScreen,
  ProfileScreen,
} from "../Screens";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const MainScrenes = createBottomTabNavigator();
const AuthScrenes = createStackNavigator();

export const router = (auth) => {
  if (!auth) {
    return (
      <AuthScrenes.Navigator>
        <AuthScrenes.Screen
          name="Register"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <AuthScrenes.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </AuthScrenes.Navigator>
    );
  }

  return (
    <MainScrenes.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerTitleAlign: "center",
      }}
    >
      <MainScrenes.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarIcon: (focused, size, color) => (
            <Feather name="grid" size={24} style={{ color: "#212121" }} />
          ),
          tabBarActiveBackgroundColor: "#FF6C00",
          tabBarItemStyle: { borderRadius: 20, width: 70, height: 40 },
          headerShown: false,
        }}
      />
      <MainScrenes.Screen
        name="Создать публикацию"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: (focused, size, color) => (
            <AntDesign
              name="plus"
              size={24}
              style={{ width: 24, height: 24, color: "#212121" }}
            />
          ),
          tabBarActiveBackgroundColor: "#FF6C00",
          tabBarItemStyle: { borderRadius: 20, width: 70, height: 40 },
        }}
      />
      <MainScrenes.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: (focused, size, color) => (
            <Feather name="user" size={24} style={{ color: "#212121" }} />
          ),
          tabBarActiveBackgroundColor: "#FF6C00",
          tabBarItemStyle: { borderRadius: 20, width: 70, height: 40 },
          headerShown: false,
        }}
      />
    </MainScrenes.Navigator>
  );
};
