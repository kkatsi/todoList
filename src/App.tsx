import "./App.css";
import { useState, useMemo, useCallback } from "react";
import MainScreen from "./pages/MainScreen";
import About from "./pages/About";
import { Routes, Route } from "react-router-dom";
import SideBar from "./pages/SideBar";
import useDarkMode from "./hooks/useDarkMode";
import Header from "./components/Header";
import { motion } from "framer-motion";

function App() {
  const [darkMode, setDarkMode] = useDarkMode();
  const [openMenu, setOpenMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(0);
  const [uncompleted, setUncompleted] = useState(0);
  const [startingPoint, setStartingPoint] = useState(0);

  const bgColorClass = useMemo(() => {
    if (darkMode && openMenu) return "bg-gray-800";
    else if (darkMode && !openMenu) return "bg-gray-900";
    else if (!darkMode && openMenu) return "bg-gray-100";
    else return "bg-white";
  }, [darkMode, openMenu]);

  const handleFinishLoadingImage = useCallback(() => {
    setLoading(false);
  }, []);

  interface TaskItemData {
    id: number;
    subject: string;
    done: boolean;
  }

  const handleCompletedItems = useCallback((items: TaskItemData[]) => {
    const completed = items.filter((item: TaskItemData) => item.done).length;
    setCompleted(completed);
  }, []);

  const handleUncompletedItems = useCallback((items: TaskItemData[]) => {
    const uncompleted = items.filter((item: TaskItemData) => !item.done).length;
    setUncompleted(uncompleted);
  }, []);

  const handleDragEnd = useCallback(
    (info, startingPoint: number) => {
      const endingPoint = info.point.x;
      const limit = 150;
      const distanceAbs = Math.abs(endingPoint - startingPoint);
      if (endingPoint > startingPoint && distanceAbs > limit) {
        setOpenMenu(true);
        return;
      }
      if (startingPoint > endingPoint && distanceAbs > limit) {
        setOpenMenu(false);
        return;
      }
    },
    [setOpenMenu]
  );

  return (
    <div style={{ overflowY: "hidden" }}>
      <motion.div
        className={bgColorClass}
        style={{
          display: loading ? "none" : "block",
          // maxHeight: "100vh",
        }}
        animate={{
          x: openMenu ? "250px" : "0px",
          transition: {
            duration: 0.5,
          },
        }}
        drag="x"
        dragElastic={
          !openMenu
            ? { top: 0, right: 0.4, bottom: 0, left: 0 }
            : { top: 0, right: 0, bottom: 0, left: 0.4 }
        }
        dragMomentum={false}
        dragConstraints={
          !openMenu
            ? { top: 0, right: 0, bottom: 0, left: 0 }
            : { top: 0, right: 250, bottom: 0, left: 250 }
        }
        onDragStart={(e, info) => setStartingPoint(info.point.x)}
        onDragEnd={(e, info) => handleDragEnd(info, startingPoint)}
      >
        <Header
          handleMenu={() => setOpenMenu(!openMenu)}
          completedItems={completed}
          uncompletedItems={uncompleted}
          onFinishLoadingImage={handleFinishLoadingImage}
        />
        <SideBar
          darkMode={darkMode}
          handleMenu={() => setOpenMenu(!openMenu)}
          onModeChange={() => setDarkMode(!darkMode)}
        />
        {!loading && (
          <Routes>
            <Route
              path="/"
              element={
                <MainScreen
                  darkMode={darkMode}
                  bgColorClass={bgColorClass}
                  completedItems={handleCompletedItems}
                  uncompletedItems={handleUncompletedItems}
                />
              }
            />
            <Route path="about" element={<About />} />
          </Routes>
        )}
      </motion.div>

      {loading && <span>Loading </span>}
    </div>
  );
}

export default App;
