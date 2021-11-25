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
  isEditing: boolean;
  onChangeSubject: (subject: string) => void;
  onFinishEditing: () => void;
  onPressLabel: () => void;
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
  ${tw`absolute w-full h-full flex items-center px-4 py-2 text-gray-800 dark:text-white`}
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
  isEditing,
  onChangeSubject,
  onFinishEditing,
  onPressLabel,
}: Props) {
  const [done, setDone] = useState(false);
  const [textColorProgress, setTextColorProgress] = useState("white");
  const [animationEnded, setAnimationEnded] = useState(false);
  const [width, setWidth] = useState("100%");
  const [height, setHeight] = useState("40px");
  const [opacity, setOpacity] = useState(1);

  const item = useRef<HTMLDivElement | null>(null);

  function handleDragEnd(offset: number) {
    const limit = 230;
    if (offset >= limit) {
      setWidth("0px");
      setHeight("0px");
      setOpacity(0);
    }
  }

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

  useEffect(() => {
    if (width === "0px") {
      setTimeout(() => {
        item.current?.remove();
      }, 300);
    }
  }, [width]);

  const handleSubjectChange = useCallback(
    (e) => {
      console.log(e.target.value);
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
      style={{
        width: width,
        height: height,
        opacity: opacity,
        transition: "all 1s",
      }}
    >
      <Background>
        <IoTrashOutline size={20} />
      </Background>
      <Content
        className={bgColor}
        drag
        dragElastic={{ top: 0, right: 0, bottom: 0, left: 0.2 }}
        dragMomentum={false}
        dragConstraints={{ top: 0, right: 30, bottom: 0, left: 0 }}
        onDragEnd={(event, info) => handleDragEnd(Math.abs(info.offset.x))}
      >
        <div
          onClick={() => setDone(!done)}
          className="mr-2"
          style={{ width: "23px", height: "23px" }}
        >
          <Check isDone={done} />
        </div>
        {!isEditing && (
          <motion.label
            animate={{
              x: done ? [0, 6, 0] : 0,
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
                width: done ? "100%" : 0,
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
