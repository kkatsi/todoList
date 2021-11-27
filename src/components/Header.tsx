import React from "react";
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
  object-fit: cover;
  object-position: center;
  ${tw`w-full`}
`;

const ImageFilter = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  height: 300px;
  ${tw`absolute top-0 left-0 w-full`}
`;

export default function Header({
  darkMode,
  handleMenu,
  onFinishLoadingImage,
}: Props) {
  const { image, error } = useRandomImage();
  const fallbackImage = require("../assets/fallback.jpg");

  return (
    <header className="absolute top-0 left-0 w-full" style={{ zIndex: "9999" }}>
      <Image
        src={!error ? String(image) : fallbackImage}
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
    </header>
  );
}
