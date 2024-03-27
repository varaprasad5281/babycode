import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { app, auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, query, where, getDocs, getFirestore } from "firebase/firestore";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // google signin
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const response = await signInWithPopup(auth, provider);
      if (response.user) {
        console.log("SIGNIN SUCCESS ::\n", response.user);
        sessionStorage.setItem("token", response.user.accessToken);
        const user = {
          displayName: response.user.displayName,
          photoURL: response.user.photoURL,
          email: response.user.email,
        };
        saveUserToFirestore(user)
        sessionStorage.setItem("user_details", JSON.stringify(user));
        navigate("/");
      }
    } catch (err) {
      // console.log("ERROR SIGNIN ::\n", err);
    }finally{
      // disable loader
    }
  };

  // logout
  const logout = async () => {
    try {
      await signOut(auth);
      sessionStorage.clear();
      navigate("/signin");
    } catch (err) {
      console.log("ERROR LOGOUT ::\n", err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ googleSignIn, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => useContext(AuthContext);

// save the user to firestore
const saveUserToFirestore = async (data) => {

  const firestore = getFirestore(app);
  const usersCollectionRef = collection(firestore, "users");

  // check if user with the same email already exists
  const q = query(usersCollectionRef, where("email", "==", data.email));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    try {
      // save user to firestore if not exists
      await addDoc(usersCollectionRef, data);
      console.log("user data saved to firestore");
    } catch (err) {
      console.error("error saving user data to firestore:", err);
    }
  } else {
    console.log("email already exists in firestore");
  }
};
