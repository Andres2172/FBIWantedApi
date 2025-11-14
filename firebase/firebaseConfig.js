// ./firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA1dpb4UTH18EyrVO2Lcwxjtc09nhqa0lk",
  authDomain: "fbi-wanted-api.firebaseapp.com",
  projectId: "fbi-wanted-api",
  storageBucket: "fbi-wanted-api.firebasestorage.app",
  messagingSenderId: "68989394662",
  appId: "1:68989394662:web:ad7cdd6c4c567370562527"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);