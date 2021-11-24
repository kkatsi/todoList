import React, { useState, useEffect } from "react";
import Check from "./CheckBox";
import { motion } from "framer-motion";
import styled from "styled-components";
import tw from "twin.macro";
import { IoTrashOutline } from "react-icons/io5";

interface Props {
  dark: boolean;
  bgColor: string;
}

const StrikeThrought = styled.div`
  ${tw`absolute left-0 h-[1px] w-0 top-1/2 transform -translate-y-1/2 transition-all duration-500`}
`;

const ListItemContainer = styled.div`
  width: 100%;
  height: 40px;
  ${tw`relative`}
`;
const Background = styled.div`
  z-index: 0;
  ${tw`absolute top-0 left-0 w-full h-full bg-red-600 text-white p-2 flex align-middle justify-end`}
`;
const Content = styled(motion.div)`
  z-index: 1;
  ${tw`bg-white absolute w-full h-full flex justify-center align-middle px-4 py-2 text-gray-800 dark:text-white`}
`;

export default function ListItem({ dark, bgColor }: Props) {
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
    <ListItemContainer>
      <Background>
        <IoTrashOutline size={20} />
      </Background>
      <Content
        drag
        dragElastic={{ top: 0, right: 0, bottom: 0 }}
        dragConstraints={{ top: 0, right: 0, bottom: 0 }}
      >
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
      </Content>
    </ListItemContainer>
  );
}
