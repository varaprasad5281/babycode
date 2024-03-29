import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home/Home";
import BottomTabs from "./components/BottomTabs";
import { AuthContextProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import ModalWrapper from "./components/ModalWrapper";
import { Provider } from "react-redux";
import { store } from "./utils/redux/store";
import { useEffect } from "react";
import { generateNotificationToken, messaging } from "./utils/firebase";
import { onMessage } from "firebase/messaging";
import { toast } from "react-hot-toast";

function App() {
  // request permission to send notifications
  useEffect(() => {
    const requestNotificationPermission = async () => {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        generateNotificationToken();
      }
      onMessage(messaging, (payload) => {
        toast(payload.notification.body, {
          icon: payload.notification?.image && (
            <img
              src={payload.notification.image}
              className="w-10 h-10 object-contain"
              alt="icon"
            />
          ),
        });
      });
    };
    requestNotificationPermission();
  }, []);

  return (
    <Provider store={store}>
      <AuthContextProvider>
        <Toaster position="top-center" />
        <ModalWrapper>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <Home />
                  <BottomTabs />
                </>
              }
            />
          </Routes>
        </ModalWrapper>
      </AuthContextProvider>
    </Provider>
  );
}

export default App;
