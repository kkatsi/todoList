import React, { useEffect } from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import styled from "styled-components";
import tw from "twin.macro";
import useRandomImage from "../hooks/useRandomImage";

interface Props {
  darkMode: boolean;
  handleMenu: () => void;
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
  background-color: rgba(0, 0, 0, 0.5);
  height: 300px;
  ${tw`absolute top-0 left-0 w-full`}
`;

const Heading = styled.h1`
  font-weight: bold;
  ${tw`text-white p-6 text-3xl`}
`;

export default function Header({
  darkMode,
  handleMenu,
  onFinishLoadingImage,
}: Props) {
  const { image, error } = useRandomImage();

  useEffect(() => {
    if (error) onFinishLoadingImage();
  }, [error, onFinishLoadingImage]);

  return (
    <header
      className="absolute top-0 left-0 w-full flex items-end "
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
        className="absolute top-3 left-3 flex align-middle"
        onClick={handleMenu}
        style={{ cursor: "pointer" }}
      >
        <HiOutlineMenuAlt1
          size={30}
          color={darkMode ? "white" : "black"}
          className="mr-2"
        />
        <span className="font-bold dark:text-white text-black">Menu</span>
      </div>
      <Heading>What's up, Kostas!</Heading>
    </header>
  );
}
