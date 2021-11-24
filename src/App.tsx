import "./App.css";
import MainScreen from "./pages/MainScreen";
import About from "./pages/About";
import { Routes, Route } from "react-router-dom";
import SideBar from "./pages/SideBar";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import useDarkMode from "./hooks/useDarkMode";

function App() {
  const [darkMode, setDarkMode] = useDarkMode();

  function handleModeChange(): void {
    setDarkMode(!darkMode);
  }
  return (
    <div className="App ">
      <header className="p-3 dark:bg-gray-800 fixed top-0 left-0">
        <HiOutlineMenuAlt1 size={30} color={darkMode ? "white" : "black"} />
      </header>
      <SideBar />
      <Routes>
        <Route
          path="/"
          element={
            <MainScreen
              darkMode={darkMode}
              handleModeChange={handleModeChange}
            />
          }
        />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
