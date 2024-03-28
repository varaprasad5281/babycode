import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, generateToken } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import {
  changeLoginModalStatus,
  setUserLoggedIn,
} from "../utils/redux/storeSlice";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  // google signin
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const response = await signInWithPopup(auth, provider);
      if (response.user) {
        console.log("SIGNIN SUCCESS ::\n", response.user);
        sessionStorage.setItem("token", response.user.accessToken);
        const user = {
          uid: response.user.uid,
          displayName: response.user.displayName,
          photoURL: response.user.photoURL,
          email: response.user.email,
          phoneNumber: response.user.phoneNumber,
        };
        const token = await generateToken();
        console.log(token);
        sessionStorage.setItem("user_details", JSON.stringify(user));
        toast.success("Signin Successful");
        dispatch(changeLoginModalStatus(false));
        dispatch(setUserLoggedIn(true));
      }
    } catch (err) {
      toast.error(err.message);
      // console.log("ERROR SIGNIN ::\n", err);
    }
  };

  // logout
  const logout = async () => {
    try {
      await signOut(auth);
      sessionStorage.clear();
      toast.success("Signout Successful");
      dispatch(setUserLoggedIn(false));
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
