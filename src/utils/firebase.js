import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYgbHcOme6RD1Vxbj9cHM-e1hKEhXdWyI",
  authDomain: "store-management-e8c6c.firebaseapp.com",
  projectId: "store-management-e8c6c",
  storageBucket: "store-management-e8c6c.appspot.com",
  messagingSenderId: "533231583994",
  appId: "1:533231583994:web:8fef0e8ab30d55c74f7f43",
  measurementId: "G-C5047V9P0V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
