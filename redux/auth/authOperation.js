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
import { getDatabase, ref as to, set } from "firebase/database";

const db = getDatabase();

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
      if (error.message === "Firebase: Error (auth/invalid-email).") {
        alert("Не верный формат email!!!");
        return;
      }
      if (error.message === "Firebase: Error (auth/user-not-found).") {
        alert("Такого пользователя не существует!!!");
        return;
      }
      if (error.message === "Firebase: Error (auth/wrong-password).") {
        alert("Неправильний пароль!!!");
        return;
      }

      alert(error.message);
    }
  };

const authSingUpUser =
  ({ name, email, password, userPhoto }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      let photoRef = null;
      const { uid } = auth.currentUser;

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

      set(to(db, "avatars/" + uid), { userPhoto: photoRef });

      dispatch(
        updateUserProfile({
          userId: uid,
          userName: name,
          userPhoto: photoRef,
          email: email,
        })
      );
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
      if (error.message === "Firebase: Error (auth/invalid-email).") {
        alert("Не верный формат email!!!");
        return;
      }
      if (
        error.message ===
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        alert("Пароль должен быть не менее 6 символов");
        return;
      }
      alert(error.message);
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
    dispatch(refreshing({ loading: true }));
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
        console.log("юзер не зарегестрирован");
      }
    });
  } catch (error) {
    console.log("error", error);
    console.log("error.message", error.message);
    alert(error.message);
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

    set(to(db, "avatars/" + uid), { userPhoto: photoRef });
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
