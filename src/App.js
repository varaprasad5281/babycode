import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home/Home";
import BottomTabs from "./components/BottomTabs";
import Signin from "./pages/Signin/Signin";
import { AuthContextProvider } from "./context/AuthContext";
import { ProtectRoutes, PublicRoutes } from "./components/ProtectRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthContextProvider>
      <Toaster position="top-center"/>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectRoutes>
              <Header />
              <Home />
              <BottomTabs />
            </ProtectRoutes>
          }
        />
        <Route
          path="/signin"
          element={
            <PublicRoutes>
              <Signin />
            </PublicRoutes>
          }
        />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
