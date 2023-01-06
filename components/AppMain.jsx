import { NavigationContainer } from "@react-navigation/native";
import { router } from "../router/router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authStateChangeUser } from "../redux/auth/authOperation";

export const AppMain = () => {
  const dispatch = useDispatch();

  const { stateChange, refresh } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, [stateChange]);

  const routing = router(stateChange);

  return <NavigationContainer>{!refresh && routing}</NavigationContainer>;
};
