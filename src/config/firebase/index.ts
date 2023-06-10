import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// import { config } from 'dotenv';
// config();

const firebaseConfig = {
  apiKey: "AIzaSyD6zpIxLFaFqgjx1s3IjmKx5fqRwjRe3FE",
  authDomain: "alta-b2d24.firebaseapp.com",
  projectId: "alta-b2d24",
  storageBucket: "alta-b2d24.appspot.com",
  messagingSenderId: "360302145753",
  appId: "1:360302145753:web:df7ab100790d869d22cec8"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);