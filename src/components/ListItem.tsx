import React, { useState, useEffect, useRef, useCallback } from "react";
import Check from "./CheckBox";
import { motion } from "framer-motion";
import styled from "styled-components";
import tw from "twin.macro";
import { IoTrashOutline } from "react-icons/io5";

interface Props {
  dark: boolean;
  bgColor: string;
  subject: string;
  isDone: boolean;
  isEditing: boolean;
  onToggleItem: () => void;
  onChangeSubject: (subject: string) => void;
  onFinishEditing: () => void;
  onPressLabel: () => void;
  onRemove: () => void;
}

const StrikeThrought = styled.div`
  ${tw`absolute left-0 h-[1px] w-0 top-1/2 transform -translate-y-1/2 transition-all duration-500`}
`;

const ListItemContainer = styled(motion.div)`
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
  height: 103%;
  ${tw`absolute w-full flex items-center px-4 py-2 text-gray-800 dark:text-white`};
`;

const Input = styled.input`
  all: initial;
  position: relative;
  font-size: 1.1rem;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
  line-height: 20px;
  font-family: inherit;
  ${tw`h-full w-full`}
`;

export default function ListItem({
  dark,
  bgColor,
  subject,
  isDone,
  isEditing,
  onToggleItem,
  onChangeSubject,
  onFinishEditing,
  onPressLabel,
  onRemove,
}: Props) {
  // const [isDone, setisDone] = useState(false);
  const [textColorProgress, setTextColorProgress] = useState("white");
  const [animationEnded, setAnimationEnded] = useState(false);
  const [x, setX] = useState("0");
  const [opacity, setOpacity] = useState(1);

  const item = useRef<HTMLDivElement | null>(null);

  function handleDragEnd(offset: number) {
    const limit = 230;
    if (offset >= limit) {
      setX("-100%");
      // setHeight("0px");
      setOpacity(0);
    }
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isDone && animationEnded) {
      timeout = setTimeout(() => {
        setTextColorProgress(dark ? "gray" : "lightgray");
      }, 600);
    } else {
      setTextColorProgress(dark ? "white" : "black");
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isDone, animationEnded, dark]);

  useEffect(() => {
    if (isDone) setTextColorProgress(dark ? "gray" : "lightgray");
  }, [dark, isDone]);

  useEffect(() => {
    if (x === "-100%") {
      setTimeout(() => {
        onRemove();
      }, 300);
    }
  }, [x, onRemove]);

  const handleSubjectChange = useCallback(
    (e) => {
      onChangeSubject && onChangeSubject(e.target.value);
    },
    [onChangeSubject]
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onFinishEditing();
  }

  return (
    <ListItemContainer
      ref={item}
      animate={{ x: x, opacity: opacity, transition: { duration: 1 } }}
      initial={{ x: 0, opacity: 1 }}
      style={{
        width: "100%",
        height: "40px",
      }}
    >
      <Background>
        <IoTrashOutline size={20} />
      </Background>
      <Content
        className={`${bgColor}`}
        drag="x"
        dragElastic={{ top: 0, right: 0, bottom: 0, left: 0.2 }}
        dragMomentum={true}
        dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
        onDragEnd={(event, info) => handleDragEnd(Math.abs(info.offset.x))}
      >
        <div
          onClick={onToggleItem}
          className="mr-2"
          style={{ width: "23px", minWidth: "23px", height: "23px" }}
        >
          <Check isDone={isDone} />
        </div>
        {!isEditing && (
          <motion.label
            animate={{
              x: isDone ? [0, 6, 0] : 0,
              transition: {
                duration: 0.3,
              },
            }}
            onClick={onPressLabel}
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
            {subject}
            <StrikeThrought
              style={{
                width: isDone ? "100%" : 0,
                backgroundColor: textColorProgress,
              }}
            />
          </motion.label>
        )}
        {isEditing && (
          <form className="w-full p-0 m-0" onSubmit={handleSubmit}>
            <Input
              onChange={handleSubjectChange}
              onBlur={onFinishEditing}
              value={subject}
              placeholder="Task"
              autoFocus
              style={{ color: textColorProgress }}
            />
          </form>
        )}
      </Content>
    </ListItemContainer>
  );
}
