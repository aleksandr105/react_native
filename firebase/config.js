import { initializeApp } from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCA4vbr3iTiD61bAItVjRF2AGNYp0w3PWI",
  authDomain: "rn-social-b7ba9.firebaseapp.com",
  projectId: "rn-social-b7ba9",
  storageBucket: "rn-social-b7ba9.appspot.com",
  messagingSenderId: "850905371177",
  appId: "1:850905371177:web:72e69eda2f35be87da8238",
  databaseURL:
    "https://rn-social-b7ba9-default-rtdb.europe-west1.firebasedatabase.app/",
};

export const app = initializeApp(firebaseConfig);
