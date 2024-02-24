import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBeywT5VHFC0AxOn0yTEc-98ZIYWEuAnE4",
  authDomain: "video-7a0d8.firebaseapp.com",
  projectId: "video-7a0d8",
  storageBucket: "video-7a0d8.appspot.com",
  messagingSenderId: "527495865345",
  appId: "1:527495865345:web:1f69d4bb98d419bffbcc00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;