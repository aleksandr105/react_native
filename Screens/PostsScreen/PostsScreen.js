import { styles } from "./PostsScreenStyle";
import { createStackNavigator } from "@react-navigation/stack";
import { CommentsScreen } from "../CommentsScreen";
import { Home } from "../Home";
import { MapScreen } from "../MapScreen";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { authSingOutUser } from "../../redux/auth/authOperation";

const MainScrenes = createStackNavigator();

export const PostsScreen = () => {
  const dispatch = useDispatch();
  return (
    <MainScrenes.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <MainScrenes.Screen
        name="Публикации"
        component={Home}
        options={{
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
        }}
      />
      <MainScrenes.Screen name="Локация" component={MapScreen} />

      <MainScrenes.Screen name="Комментарии" component={CommentsScreen} />
    </MainScrenes.Navigator>
  );
};
