import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { changeLoginModalStatus, setLoading } from "../utils/redux/otherSlice";
import { login } from "../api/apiCall";
import { createJwt, generateRandomString } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import showAlert from "../components/Toast/CustomToast";
import { setUserDetails, setUserLoggedIn } from "../utils/redux/userSlice";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // google signin
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const response = await signInWithPopup(auth, provider);
      if (response.user) {
        dispatch(setLoading(true));
        let uniqueDeviceId = localStorage.getItem("uniqueDeviceId") || "";

        if (!uniqueDeviceId) {
          const randomId = generateRandomString();
          uniqueDeviceId = "tempDeviceId_" + response.user.uid + randomId;
        }

        const fcmToken = localStorage.getItem("fcmToken") || "";

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
        };

        console.table(user);

        const encryptedData = createJwt(user);
        const formData = new FormData();
        formData.append("encrptData", encryptedData);
        const result = await login(formData);
        if (!result.data.failure) {
          dispatch(setLoading(false));
          if (result.data.accountMessage !== "") {
            dispatch(changeLoginModalStatus(false));
            showAlert(
              result.data.accountMessage,
              uniqueDeviceId,
              result.data.data
            );
          } else {
            dispatch(setUserLoggedIn(true));
            dispatch(setUserDetails(result.data.data));
            localStorage.setItem("userData", JSON.stringify(result.data.data));
            if (!localStorage.getItem("uniqueDeviceId")) {
              localStorage.setItem("uniqueDeviceId", uniqueDeviceId);
            }
            toast.success("Signin Successful");
            navigate("/");
            dispatch(changeLoginModalStatus(false));
          }
        } else {
          dispatch(setLoading(false));
          if (result.data.logout) {
            errorLogout();
          } else if (result.data.tokenInvalid) {
            toast.error(result.data.errorMessage);
          } else {
            toast.error(result.data.errorMessage);
          }
        }
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      console.error("Error occurred during login:", err);
      toast.error(err.message);
    }
  };

  // logout
  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userData");
      localStorage.removeItem("paymentInformation");
      toast.success("Signout successful");
      dispatch(setUserLoggedIn(false));
      dispatch(setUserDetails({}));
      navigate("/");
    } catch (err) {
      // console.log("ERROR LOGOUT ::\n", err);
    }
  };

  // error logout
  const errorLogout = async (errMsg) => {
    try {
      await signOut(auth);
      if (!errMsg) {
        toast.error("Signed out");
      }else{
        toast.error(errMsg);
      }
      localStorage.removeItem("userData");
      localStorage.removeItem("paymentInformation");
      dispatch(setUserLoggedIn(false));
      dispatch(setUserDetails({}));
      navigate("/");
    } catch (err) {
      // console.log("ERROR LOGOUT ::\n", err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ googleSignIn, logout, user, errorLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => useContext(AuthContext);
