import React, { useState } from "react";
import Check from "./CheckBox";
import { motion } from "framer-motion";

export default function ListItem() {
  const [done, setDone] = useState(false);
  return (
    <div className="flex justify-center align-middle px-4 py-2 bg-white text-gray-800 dark:bg-gray-800 dark:text-white">
      <div
        onClick={() => setDone(!done)}
        className="mr-3"
        style={{ width: "30px", height: "30px" }}
      >
        <Check isDone={done} />
      </div>
      <motion.label
        animate={{
          x: done ? [0, 6, 0] : 0,
          transitionEnd: {
            color: done ? "gray" : "white",
          },
        }}
        transition={{
          type: "spring",
          bounce: 0.25,
          duration: 0.5,
        }}
      >
        Task Item
      </motion.label>
    </div>
  );
}
