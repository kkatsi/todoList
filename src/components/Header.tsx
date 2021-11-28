import React from "react";
import { FiMenu } from "react-icons/fi";
import styled from "styled-components";
import tw from "twin.macro";

interface Props {
  title: string;
  handleMenu: () => void;
  tasksComponent?: React.ReactNode;
}

const ImageFilter = styled.div`
  background-color: rgba(0, 0, 0, 0.55);
  height: 300px;
  ${tw`absolute top-0 left-0 w-full`}
`;

const Heading = styled.h1`
  z-index: 1;
  font-weight: bold;
  ${tw`text-white text-3xl`}
`;

const HeadingContainer = styled.div`
  ${tw`p-6 flex justify-center flex-col`}
`;

export default function Header({ handleMenu, tasksComponent, title }: Props) {
  return (
    <header
      className="absolute top-0 left-0 w-full flex flex-col justify-end "
      style={{ height: "300px" }}
    >
      <ImageFilter />
      <div
        className="absolute top-3 left-3 flex items-center"
        onClick={handleMenu}
        style={{ cursor: "pointer" }}
      >
        <FiMenu size={30} color={"white"} className="mr-2" />
        <span className="font-bold text-white">Menu</span>
      </div>
      <HeadingContainer>
        <Heading>{title}</Heading>
        {tasksComponent}
      </HeadingContainer>
    </header>
  );
}
