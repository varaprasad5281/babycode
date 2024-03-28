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

function App() {
  return (
    <Provider store={store}>
      <AuthContextProvider>
        <ModalWrapper>
          <Toaster position="top-center" />
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
