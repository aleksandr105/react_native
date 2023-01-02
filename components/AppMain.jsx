import { NavigationContainer } from "@react-navigation/native";
import { router } from "../router/router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authStateChangeUser } from "../redux/auth/authOperation";
import { authSlice } from "../redux/auth/authReducer";

export const AppMain = () => {
  const dispatch = useDispatch();

  const { stateChange, refresh } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(authSlice.actions.refreshing({ loading: true }));
    dispatch(authStateChangeUser());
  }, [stateChange]);

  const routing = router(stateChange);

  return <NavigationContainer>{!refresh && routing}</NavigationContainer>;
};
