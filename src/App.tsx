import "./App.css";
import { useState, useMemo, useCallback } from "react";
import MainScreen from "./pages/MainScreen";
import About from "./pages/About";
import { Routes, Route } from "react-router-dom";
import SideBar from "./pages/SideBar";
import useDarkMode from "./hooks/useDarkMode";
import Header from "./components/Header";

function App() {
  const [darkMode, setDarkMode] = useDarkMode();
  const [openMenu, setOpenMenu] = useState(false);
  const [loading, setLoading] = useState(true);

  const bgColorClass = useMemo(() => {
    if (darkMode && openMenu) return "bg-gray-800";
    else if (darkMode && !openMenu) return "bg-gray-900";
    else if (!darkMode && openMenu) return "bg-gray-50";
    else return "bg-white";
  }, [darkMode, openMenu]);

  const handleFinishLoadingImage = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <div
        className={bgColorClass}
        style={{
          display: loading ? "none" : "block",
          transition: "transform .5s",
          transform: openMenu ? "translateX(250px)" : "translateX(0px)",
        }}
      >
        <Header
          darkMode={darkMode}
          handleMenu={() => setOpenMenu(!openMenu)}
          onFinishLoadingImage={handleFinishLoadingImage}
        />
        <SideBar handleMenu={() => setOpenMenu(!openMenu)} />
        {!loading && (
          <Routes>
            <Route
              path="/"
              element={
                <MainScreen
                  darkMode={darkMode}
                  onModeChange={() => setDarkMode(!darkMode)}
                  bgColorClass={bgColorClass}
                />
              }
            />
            <Route path="about" element={<About />} />
          </Routes>
        )}
      </div>

      {loading && <span>Loading </span>}
    </>
  );
}

export default App;
