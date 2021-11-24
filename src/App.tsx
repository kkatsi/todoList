import "./App.css";
import { useState, useEffect } from "react";
import MainScreen from "./pages/MainScreen";
import About from "./pages/About";
import { Routes, Route } from "react-router-dom";
import SideBar from "./pages/SideBar";
import useDarkMode from "./hooks/useDarkMode";
import Header from "./components/Header";

function App() {
  const [darkMode, setDarkMode] = useDarkMode();
  const [openMenu, setOpenMenu] = useState(false);
  const [bgColorClass, setBgColor] = useState("bg-white");
  function handleModeChange(): void {
    setDarkMode(!darkMode);
  }

  useEffect(() => {
    if (darkMode) {
      if (openMenu) setBgColor("bg-gray-800");
      else setBgColor("bg-gray-900");
    } else {
      if (openMenu) setBgColor("bg-gray-100");
      else setBgColor("bg-white");
    }
  }, [darkMode, openMenu]);
  return (
    <div
      className="App dark:bg-gray-800"
      style={{
        transition: "all .5s",
        transform: openMenu ? "translateX(250px)" : "translateX(0px)",
      }}
    >
      <Header darkMode={darkMode} handleMenu={() => setOpenMenu(!openMenu)} />
      <SideBar handleMenu={() => setOpenMenu(!openMenu)} />
      <Routes>
        <Route
          path="/"
          element={
            <MainScreen
              darkMode={darkMode}
              handleModeChange={handleModeChange}
              bgColorClass={bgColorClass}
            />
          }
        />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
