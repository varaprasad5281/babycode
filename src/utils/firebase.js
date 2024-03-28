// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTxPG75Y6yVZhx2COI7MFv-7CCZex870Q",
  authDomain: "babycode-894b7.firebaseapp.com",
  projectId: "babycode-894b7",
  storageBucket: "babycode-894b7.appspot.com",
  messagingSenderId: "538695022757",
  appId: "1:538695022757:web:ff54abecf492b8d879754c",
  measurementId: "G-647VN3XZ4E"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);



// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCJX9c5lG57fGVBK2_ANm7WncrLWSPk2gE",
//   authDomain: "babycode-b022d.firebaseapp.com",
//   projectId: "babycode-b022d",
//   storageBucket: "babycode-b022d.appspot.com",
//   messagingSenderId: "1082563776593",
//   appId: "1:1082563776593:web:da5eace5c2aa739d08a870"
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);

// // Initialize Firebase Authentication and get a reference to the service
// export const auth = getAuth(app);

