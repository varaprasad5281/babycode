import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, generateNotificationToken } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import {
  changeLoginModalStatus,
  setUserLoggedIn,
} from "../utils/redux/storeSlice";
import { login } from "../api/apiCall";
import {
  createJwtToken,
  generateRandomString,
  getTimestamp,
} from "../utils/helpers";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  // google signin
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const response = await signInWithPopup(auth, provider);

      if (response.user) {
        let uniqueDeviceId = localStorage.getItem("unique_deviceId") || "";

        if (!uniqueDeviceId) {
          const randomId = generateRandomString();
          uniqueDeviceId = "tempDeviceId_" + response.user.uid + randomId;
        }

        let timestamp = getTimestamp();
        const fcmToken = await generateNotificationToken();

        let couponCode = "";
        if (response.user.email === "") {
          couponCode = generateRandomString();
        } else {
          couponCode = response.user.email;
        }

        const user = {
          uid: response.user.uid,
          platform: "web",
          accountType: "social",
          phoneNumber: response.user.phoneNumber || "",
          couponCodeText: couponCode,
          email: response.user.email,
          uniqueDeviceId,
          fcmToken,
          time: timestamp,
        };

        const token = createJwtToken(user);
        console.table(user);

        const formData = new FormData();
        formData.append("encrptData", token);

        const { data } = await login(formData);
        if (!data.failure) {
          localStorage.setItem("userData", JSON.stringify(data.data));
          if (!localStorage.getItem("unique_deviceId")) {
            localStorage.setItem("unique_deviceId", uniqueDeviceId);
          }
          toast.success("Signin Successful");
          dispatch(changeLoginModalStatus(false));
          dispatch(setUserLoggedIn(true));
        } else {
          toast.error("Login failed");
        }
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      console.log({ err });
      toast.error(err.message);
    }
  };

  // logout
  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userData");
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
