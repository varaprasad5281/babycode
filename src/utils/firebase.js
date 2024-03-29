// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken } from "firebase/messaging";

// OFFICIAL FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyDTxPG75Y6yVZhx2COI7MFv-7CCZex870Q",
  authDomain: "babycode-894b7.firebaseapp.com",
  projectId: "babycode-894b7",
  storageBucket: "babycode-894b7.appspot.com",
  messagingSenderId: "538695022757",
  appId: "1:538695022757:web:ff54abecf492b8d879754c",
  measurementId: "G-647VN3XZ4E",
};

// const firebaseConfig = {
//   apiKey: "AIzaSyBqbFMQVjIKQ7bLRgRRPIiK4i3tng8MaJc",
//   authDomain: "babycode-ielts.firebaseapp.com",
//   projectId: "babycode-ielts",
//   storageBucket: "babycode-ielts.appspot.com",
//   messagingSenderId: "629596936425",
//   appId: "1:629596936425:web:844f321694170d03b83878",
//   measurementId: "G-M2EQNZZYRG",
// };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = getMessaging(app);

export const generateNotificationToken = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey:
        "BCrm9lynaDY8KQknNgBJCohEv5V3-QY6UWc1MGhdFIcg8WpuSTZeCuFnQ_K3trxxzsA4JGKURIRcmDAc5e8xR10",
      // vapidKey:
      //   "BPo2xJz0mG5DT7xO0Ny-ZxBUNUpjHJLMq61OWFcn147IKPnfTSFxy1yJ8DPapG0HWVESp8EQzy4m8iC2BskdQZU",
    });
    if (token) {
      console.table({ notificationToken: token });
      return token;
    }
  } catch (err) {
    // console.log("An error occurred while retrieving token. ", err);
    console.log(err);
  }
};
