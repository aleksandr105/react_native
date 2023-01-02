import { app } from "../../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { authSlice } from "./authReducer";

const { updateUserProfile, authStateChange, authSingOut, refreshing } =
  authSlice.actions;

const auth = getAuth(app);

const authSingInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

const authSingUpUser =
  ({ name, email, password, userPhoto }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: userPhoto,
      });
      const { uid, displayName, userPhoto } = auth.currentUser;

      dispatch(
        updateUserProfile({ userId: uid, userName: displayName, userPhoto })
      );
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

const authSingOutUser = () => async (dispatch, getState) => {
  try {
    await signOut(auth);
    dispatch(authSingOut());
  } catch (error) {
    console.log("error", error);
    console.log("error.message", error.message);
  }
};

const authStateChangeUser = () => async (dispatch, getState) => {
  try {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          updateUserProfile({
            userId: user.uid,
            userName: user.displayName,
            userPhoto: user.userPhoto,
            email: user.email,
          })
        );
        dispatch(authStateChange({ stateChange: true }));
        dispatch(refreshing({ loading: false }));
      } else {
        dispatch(refreshing({ loading: false }));
        console.log("!user");
      }
    });
  } catch (error) {
    console.log("error", error);
    console.log("error.message", error.message);
    dispatch(refreshing({ loading: false }));
  }
};

export { authSingUpUser, authSingInUser, authSingOutUser, authStateChangeUser };
