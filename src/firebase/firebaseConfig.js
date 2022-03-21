import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAowI8sqGF3K3jL6tgURMCYMc1hj5xz6f8",
  authDomain: "fir-chat-6b30d.firebaseapp.com",
  projectId: "fir-chat-6b30d",
  storageBucket: "fir-chat-6b30d.appspot.com",
  messagingSenderId: "499689105337",
  appId: "1:499689105337:web:9e1aa5a6a005a44168b868",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
