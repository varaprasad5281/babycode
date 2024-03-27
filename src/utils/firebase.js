// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJX9c5lG57fGVBK2_ANm7WncrLWSPk2gE",
  authDomain: "babycode-b022d.firebaseapp.com",
  projectId: "babycode-b022d",
  storageBucket: "babycode-b022d.appspot.com",
  messagingSenderId: "1082563776593",
  appId: "1:1082563776593:web:da5eace5c2aa739d08a870"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);