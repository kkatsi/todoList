import React, { useState, useEffect } from "react";
import Check from "./CheckBox";
import { motion } from "framer-motion";
import styled from "styled-components";
import tw from "twin.macro";

interface Props {
  dark: boolean;
}

const StrikeThrought = styled.div`
  ${tw`absolute left-0 h-[1px] w-0 top-1/2 transform -translate-y-1/2 transition-all duration-500`}
`;

export default function ListItem({ dark }: Props) {
  const [done, setDone] = useState(false);
  const [textColorProgress, setTextColorProgress] = useState("white");
  const [animationEnded, setAnimationEnded] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (done && animationEnded) {
      timeout = setTimeout(() => {
        setTextColorProgress(dark ? "gray" : "lightgray");
      }, 600);
    } else {
      setTextColorProgress(dark ? "white" : "black");
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [done, animationEnded, dark]);

  useEffect(() => {
    if (done) setTextColorProgress(dark ? "gray" : "lightgray");
  }, [dark, done]);

  return (
    <div className="flex justify-center align-middle px-4 py-2 bg-white text-gray-800 dark:bg-gray-800 dark:text-white">
      <div
        onClick={() => setDone(!done)}
        className="mr-2"
        style={{ width: "23px", height: "23px" }}
      >
        <Check isDone={done} />
      </div>
      <motion.label
        animate={{
          x: done ? [0, 6, 0] : 0,
          transition: {
            duration: 0.3,
          },
        }}
        style={{
          color: textColorProgress,
          transition: "color .6s",
          position: "relative",
          paddingLeft: ".3rem",
          paddingRight: ".3rem",
          lineHeight: "20px",
          fontSize: "1.1rem",
        }}
        onAnimationComplete={() => {
          setAnimationEnded(true);
        }}
        onAnimationStart={() => {
          setAnimationEnded(false);
        }}
      >
        Task Item
        <StrikeThrought
          style={{
            width: done ? "100%" : 0,
            backgroundColor: textColorProgress,
          }}
        />
      </motion.label>
    </div>
  );
}
