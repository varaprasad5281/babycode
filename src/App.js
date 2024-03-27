import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home/Home";
import BottomTabs from "./components/BottomTabs";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header />
            <Home/>
            <BottomTabs/>
          </>
        }
      />
    </Routes>
  );
}

export default App;
