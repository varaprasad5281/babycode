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
import Sidebar from "./components/Sidebar";
import Stories from "./pages/Stories/Stories";
import { PrivateRoute } from "./components/ProtectRoutes";
import Shop from "./pages/Shop/Shop";
import Feedback from "./pages/Feedback/Feedback";
import Speaking from "./pages/Speaking/Speaking";
import Listening from "./pages/Listening/Listening";
import Reading from "./pages/Reading/Reading";
import Writing from "./pages/Writing/Writing";
import Vocabulary from "./pages/Vocabulary/Vocabulary";
import Classes from "./pages/Classes/Classes";
import StudentNews from "./pages/StudentNews/StudentNews";
import BookIeltsExam from "./pages/BookIeltsExam/BookIeltsExam";
import PracticeMockTest from "./pages/PracticeMockTest/PracticeMockTest";

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
            <Route path="/" element={<Sidebar />}>
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
            </Route>
            <Route
              path="/stories"
              element={
                <PrivateRoute>
                  {/* <Header /> */}
                  <Stories />
                  <BottomTabs />
                </PrivateRoute>
              }
            />
            <Route
              path="/shop"
              element={
                <PrivateRoute>
                  {/* <Header /> */}
                  <Shop />
                  <BottomTabs />
                </PrivateRoute>
              }
            />
            <Route
              path="/feedback"
              element={
                <PrivateRoute>
                  {/* <Header /> */}
                  <Feedback />
                  <BottomTabs />
                </PrivateRoute>
              }
            />
            <Route
              path="/speaking"
              element={
                <PrivateRoute>
                  {/* <Header /> */}
                  <Speaking />
                  <BottomTabs />
                </PrivateRoute>
              }
            />
            <Route
              path="/listening"
              element={
                <PrivateRoute>
                  {/* <Header /> */}
                  <Listening />
                  <BottomTabs />
                </PrivateRoute>
              }
            />
            <Route
              path="/reading"
              element={
                <PrivateRoute>
                  {/* <Header /> */}
                  <Reading />
                  <BottomTabs />
                </PrivateRoute>
              }
            />
            <Route
              path="/writing"
              element={
                <PrivateRoute>
                  {/* <Header /> */}
                  <Writing />
                  <BottomTabs />
                </PrivateRoute>
              }
            />
            <Route
              path="/vocabulary"
              element={
                <PrivateRoute>
                  {/* <Header /> */}
                  <Vocabulary />
                  <BottomTabs />
                </PrivateRoute>
              }
            />
            <Route
              path="/classes"
              element={
                <PrivateRoute>
                  {/* <Header /> */}
                  <Classes />
                  <BottomTabs />
                </PrivateRoute>
              }
            />
            <Route
              path="/student-news"
              element={
                <PrivateRoute>
                  {/* <Header /> */}
                  <StudentNews />
                  <BottomTabs />
                </PrivateRoute>
              }
            />
            <Route
              path="/book-ielts-exam"
              element={
                <PrivateRoute>
                  {/* <Header /> */}
                  <BookIeltsExam />
                  <BottomTabs />
                </PrivateRoute>
              }
            />
            <Route
              path="/practice-mock-test"
              element={
                <PrivateRoute>
                  {/* <Header /> */}
                  <PracticeMockTest />
                  <BottomTabs />
                </PrivateRoute>
              }
            />
          </Routes>
        </ModalWrapper>
      </AuthContextProvider>
    </Provider>
  );
}

export default App;
