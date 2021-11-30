import "./App.css";
import { useState, useMemo, useCallback } from "react";
import MainScreen from "./pages/MainScreen";
import About from "./pages/About";
import { Routes, Route } from "react-router-dom";
import SideBar from "./pages/SideBar";
import useDarkMode from "./hooks/useDarkMode";
import { motion } from "framer-motion";
import useRandomImage from "./hooks/useRandomImage";
import Image from "./components/Image";

function App() {
  const [darkMode, setDarkMode] = useDarkMode();
  const [openMenu, setOpenMenu] = useState(false);
  const [startingPoint, setStartingPoint] = useState(0);
  const [loading, setLoading] = useState(true);
  const { image, error } = useRandomImage();

  const bgColorClass = useMemo(() => {
    if (darkMode && openMenu) return "bg-gray-800";
    if (darkMode && !openMenu) return "bg-gray-900";
    if (!darkMode && openMenu) return "bg-gray-100";
    return "bg-white";
  }, [darkMode, openMenu]);

  interface TaskItemData {
    id: number;
    subject: string;
    done: boolean;
  }

  const handleCompletedItems = useCallback((items: TaskItemData[]) => {
    const completed = items.filter((item: TaskItemData) => item.done).length;
    return completed;
  }, []);

  const handleUncompletedItems = useCallback((items: TaskItemData[]) => {
    const uncompleted = items.filter((item: TaskItemData) => !item.done).length;
    return uncompleted;
  }, []);

  const handleDragEnd = useCallback(
    (info, startingPoint: number) => {
      const endingPoint = info.point.x;
      const limit = 80;
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

  const handleMenuOpening = useCallback(() => {
    setOpenMenu((prevState) => !prevState);
  }, []);

  return (
    <div style={{ overflow: "hidden" }}>
      <motion.div
        className={bgColorClass}
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
        <Image
          image={
            !error
              ? String(image)
              : String(require("./assets/fallback.jpg").default)
          }
          error={error}
          loading={loading}
          onLoad={() => setLoading(false)}
        />
        <SideBar
          darkMode={darkMode}
          handleMenu={() => setOpenMenu(!openMenu)}
          onModeChange={() => setDarkMode(!darkMode)}
        />
        <Routes>
          <Route
            path="/"
            element={
              <MainScreen
                onMenuOpening={handleMenuOpening}
                darkMode={darkMode}
                bgColorClass={bgColorClass}
                completedItems={handleCompletedItems}
                uncompletedItems={handleUncompletedItems}
              />
            }
          />
          <Route
            path="about"
            element={<About onMenuOpening={handleMenuOpening} />}
          />
        </Routes>
      </motion.div>
    </div>
  );
}

export default App;
