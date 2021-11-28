import React, { useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import styled from "styled-components";
import tw from "twin.macro";
import useRandomImage from "../hooks/useRandomImage";

interface Props {
  handleMenu: () => void;
  completedItems: number;
  uncompletedItems: number;
  onFinishLoadingImage: () => void;
}

const Image = styled.img`
  height: 300px;
  z-index: -1;
  object-fit: cover;
  object-position: center;
  ${tw`w-full absolute top-0 left-0`}
`;

const ImageFilter = styled.div`
  z-index: -1;
  background-color: rgba(0, 0, 0, 0.55);
  height: 300px;
  ${tw`absolute top-0 left-0 w-full`}
`;

const Heading = styled.h1`
  font-weight: bold;
  ${tw`text-white p-6 pb-0 text-3xl`}
`;

const TasksState = styled.p`
  ${tw`text-white p-6 pt-0`}
`;

const ShadowedText = styled.span`
  text-shadow: 0 0 4px white;
  ${tw`text-lg`}
`;

export default function Header({
  handleMenu,
  completedItems,
  uncompletedItems,
  onFinishLoadingImage,
}: Props) {
  const { image, error } = useRandomImage();

  useEffect(() => {
    if (error) onFinishLoadingImage();
  }, [error, onFinishLoadingImage]);

  return (
    <header
      className="absolute top-0 left-0 w-full flex flex-col justify-end "
      style={{ height: "300px" }}
    >
      <Image
        src={
          !error
            ? String(image)
            : String(require("../assets/fallback.jpg").default)
        }
        alt="nature"
        onLoad={onFinishLoadingImage}
      />
      <ImageFilter />
      <div
        className="absolute top-3 left-3 flex items-center"
        onClick={handleMenu}
        style={{ cursor: "pointer" }}
      >
        <FiMenu size={30} color={"white"} className="mr-2" />
        <span className="font-bold text-white">Menu</span>
      </div>
      <Heading>What's up, Kostas!</Heading>
      <TasksState>
        You have <ShadowedText>{uncompletedItems}</ShadowedText> uncompleted and{" "}
        <ShadowedText>{completedItems}</ShadowedText> completed Tasks
      </TasksState>
    </header>
  );
}
