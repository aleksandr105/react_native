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
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";

const storage = getStorage();

const {
  updateUserProfile,
  authStateChange,
  authSingOut,
  refreshing,
  updateUserPhoto,
} = authSlice.actions;

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

      let photoRef = null;
      const { uid, displayName } = auth.currentUser;

      if (userPhoto) {
        const uploadPhotoToServer = async () => {
          const response = await fetch(userPhoto);
          const file = await response.blob();
          const ImagesRef = ref(storage, `userImage/${uid}`);
          await uploadBytes(ImagesRef, file);
          const refStorFile = await getDownloadURL(ref(ImagesRef));
          return refStorFile;
        };
        photoRef = await uploadPhotoToServer();
      }

      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoRef,
      });

      dispatch(
        updateUserProfile({
          userId: uid,
          userName: displayName,
          photoURL: photoRef,
        })
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
            userPhoto: user.photoURL,
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

const updateUserPhotoOperation = (newPhoto) => async (dispatch, getState) => {
  try {
    let photoRef = "null";
    const { uid } = auth.currentUser;

    if (newPhoto) {
      const uploadPhotoToServer = async () => {
        const response = await fetch(newPhoto);
        const file = await response.blob();
        const ImagesRef = ref(storage, `userImage/${uid}`);
        await uploadBytes(ImagesRef, file);
        const refStorFile = await getDownloadURL(ref(ImagesRef));
        return refStorFile;
      };
      photoRef = await uploadPhotoToServer();
    }

    await updateProfile(auth.currentUser, {
      photoURL: photoRef,
    });

    dispatch(
      updateUserPhoto({
        photoURL: photoRef,
      })
    );
  } catch (error) {
    console.log("error", error);
    console.log("error.message", error.message);
  }
};

export {
  authSingUpUser,
  authSingInUser,
  authSingOutUser,
  authStateChangeUser,
  updateUserPhotoOperation,
};
