import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import ModalWrapper from "./components/ModalWrapper";
import { generateNotificationToken, messaging } from "./utils/firebase";
import { onMessage } from "firebase/messaging";
import { toast } from "react-hot-toast";
import { PrivateRoute } from "./components/ProtectRoutes";
import { useSelector } from "react-redux";
import LoadingSpinner from "./components/LoadingSpinner";
import { createJwt } from "./utils/helpers";

import Question from "./pages/Writing/Pages/components/page/questionRoute";

const Header = lazy(() => import("./components/Header"));
const Home = lazy(() => import("./pages/Home/Home"));
const BottomTabs = lazy(() => import("./components/BottomTabs"));
const Sidebar = lazy(() => import("./components/Sidebar"));
const Stories = lazy(() => import("./pages/Stories/Stories"));
const Shop = lazy(() => import("./pages/Shop/Shop"));
const Feedback = lazy(() => import("./pages/Feedback/Feedback"));
const Speaking = lazy(() => import("./pages/Speaking/Speaking"));
const Listening = lazy(() => import("./pages/Listening/Listening"));
const Reading = lazy(() => import("./pages/Reading/Reading"));
const Writing = lazy(() => import("./pages/Writing/Writing"));
const WritingQBank = lazy(() => import("./pages/Writing/Pages"));
const Vocabulary = lazy(() => import("./pages/Vocabulary/Vocabulary"));
const Classes = lazy(() => import("./pages/Classes/Classes"));
const StudentNews = lazy(() => import("./pages/StudentNews/StudentNews"));
const BookIeltsExam = lazy(() => import("./pages/BookIeltsExam/BookIeltsExam"));
const PracticeMockTest = lazy(() =>
  import("./pages/PracticeMockTest/PracticeMockTest")
);

export const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const { isLoading } = useSelector((state) => state.other);

  // Generate notification token
  useEffect(() => {
    const requestNotificationPermission = async () => {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        generateNotificationToken();
      } else {
        localStorage.removeItem("fcmToken");
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
    <Suspense fallback={<LoadingSpinner />}>
      <AuthContextProvider>
        <ScrollToTop />
        <Toaster position="top-center" />
        <ModalWrapper>
          {isLoading && <LoadingSpinner />}
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
              <Route
                path="/listening"
                element={
                  <PrivateRoute>
                    <Listening />
                  </PrivateRoute>
                }
              />{" "}
              <Route
                path="/reading"
                element={
                  <PrivateRoute>
                    <Reading />
                  </PrivateRoute>
                }
              />
              <Route
                path="/vocabulary"
                element={
                  <PrivateRoute>
                    <Vocabulary />
                  </PrivateRoute>
                }
              />
              <Route
                path="/stories"
                element={
                  <PrivateRoute>
                    {/* <Header /> */}
                    <Stories />
                    {/* <BottomTabs /> */}
                  </PrivateRoute>
                }
              />
              <Route
                path="/shop"
                element={
                  <PrivateRoute>
                    {/* <Header /> */}
                    <Shop />
                    {/* <BottomTabs /> */}
                  </PrivateRoute>
                }
              />
              <Route
                path="/feedback"
                element={
                  <PrivateRoute>
                    {/* <Header /> */}
                    <Feedback />
                    {/* <BottomTabs /> */}
                  </PrivateRoute>
                }
              />
              <Route
                path="/speaking"
                element={
                  <PrivateRoute>
                    {/* <Header /> */}
                    <Speaking />
                    {/* <BottomTabs /> */}
                  </PrivateRoute>
                }
              />
              <Route
                path="/reading"
                element={
                  <PrivateRoute>
                    {/* <Header /> */}
                    <Reading />
                    {/* <BottomTabs /> */}
                  </PrivateRoute>
                }
              />
              <Route
                path="/writing"
                element={
                  <PrivateRoute>
                    {/* <Header /> */}
                    <Writing />
                    {/* <BottomTabs /> */}
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/writing/:category"
                element={
                  <PrivateRoute>
                    {/* <Header /> */}
                    <WritingQBank />
                    {/* <BottomTabs /> */}
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/writing/:category/:question"
                element={
                  <PrivateRoute>
                    {/* <Header /> */}
                    <Question />
                    {/* <BottomTabs /> */}
                  </PrivateRoute>
                }
              />
              <Route
                path="/classes"
                element={
                  <PrivateRoute>
                    {/* <Header /> */}
                    <Classes />
                    {/* <BottomTabs /> */}
                  </PrivateRoute>
                }
              />
              <Route
                path="/student-news"
                element={
                  <PrivateRoute>
                    {/* <Header /> */}
                    <StudentNews />
                    {/* <BottomTabs /> */}
                  </PrivateRoute>
                }
              />
              <Route
                path="/book-ielts-exam"
                element={
                  <PrivateRoute>
                    {/* <Header /> */}
                    <BookIeltsExam />
                    {/* <BottomTabs /> */}
                  </PrivateRoute>
                }
              />
              <Route
                path="/practice-mock-test"
                element={
                  <PrivateRoute>
                    {/* <Header /> */}
                    <PracticeMockTest />
                    {/* <BottomTabs /> */}
                  </PrivateRoute>
                }
              />
            </Route>
          </Routes>
        </ModalWrapper>
      </AuthContextProvider>
    </Suspense>
  );
}

export default App;
