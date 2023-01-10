import { Home } from "../Home";
import { CreatePostsScreen } from "../CreatePostsScreen";
import { ProfileScreen } from "../ProfileScreen";
import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { authSingOutUser } from "../../redux/auth/authOperation";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const MainScrenes = createBottomTabNavigator();

export const PostsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  return (
    <MainScrenes.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerTitleAlign: "center",
      }}
    >
      <MainScrenes.Screen
        name="Публикации"
        component={Home}
        options={{
          tabBarIcon: (focused, size, color) => (
            <Feather name="grid" size={24} style={{ color: "#212121" }} />
          ),
          tabBarActiveBackgroundColor: "#FF6C00",
          tabBarItemStyle: { borderRadius: 20, width: 70, height: 40 },
          headerRight: () => (
            <TouchableOpacity
              style={{ paddingRight: 10 }}
              onPress={() => dispatch(authSingOutUser())}
            >
              <MaterialIcons
                name="logout"
                size={24}
                style={{ color: "#BDBDBD" }}
              />
            </TouchableOpacity>
          ),
          headerStyle: { borderBottomColor: "#BDBDBD", borderBottomWidth: 1 },
        }}
      />
      <MainScrenes.Screen
        name="Создать"
        component={CreatePostsScreen}
        options={{
          headerStyle: { borderBottomColor: "#BDBDBD", borderBottomWidth: 1 },
          tabBarStyle: { display: "none" },
          tabBarHideOnKeyboard: true,
          tabBarIcon: (focused, size, color) => (
            <AntDesign
              name="plus"
              size={24}
              style={{ width: 24, height: 24, color: "#212121" }}
            />
          ),
          tabBarActiveBackgroundColor: "#FF6C00",
          tabBarItemStyle: { borderRadius: 20, width: 70, height: 40 },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ paddingLeft: 15 }}
              activeOpacity={1}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                size={24}
                style={{ color: "#212121", opacity: 0.8 }}
              />
            </TouchableOpacity>
          ),
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
