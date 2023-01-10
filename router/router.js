import { createStackNavigator } from "@react-navigation/stack";
import {
  RegistrationScreen,
  LoginScreen,
  PostsScreen,
  MapScreen,
  CommentsScreen,
} from "../Screens";

const AuthScrenes = createStackNavigator();
const MainScrenes = createStackNavigator();

export const Router = ({ stateChange }) => {
  if (!stateChange) {
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
        headerTitleAlign: "center",
        headerStyle: { borderBottomColor: "#BDBDBD", borderBottomWidth: 1 },
      }}
    >
      <MainScrenes.Screen
        name="Posts"
        component={PostsScreen}
        options={{ headerShown: false }}
      />

      <MainScrenes.Screen name="Локация" component={MapScreen} />

      <MainScrenes.Screen name="Комментарии" component={CommentsScreen} />
    </MainScrenes.Navigator>
  );
};
