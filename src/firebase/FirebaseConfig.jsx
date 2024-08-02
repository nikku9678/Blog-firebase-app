// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlOShAlAkKKrGazbmwehHVCctfT-ooQdQ",
  authDomain: "blog-app-36f36.firebaseapp.com",
  projectId: "blog-app-36f36",
  storageBucket: "blog-app-36f36.appspot.com",
  messagingSenderId: "177576622350",
  appId: "1:177576622350:web:58a0d57d79a9cd22757f5f",
  measurementId: "G-TK7JHY8K6R"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDb = getFirestore(app);
const auth = getAuth(app);
const storage  = getStorage(app);

export {fireDb, auth, storage}