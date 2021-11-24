import React from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";

interface Props {
  darkMode: boolean;
  handleMenu: () => void;
}

export default function Header({ darkMode, handleMenu }: Props) {
  return (
    <header className="p-3 absolute top-0 left-0">
      <HiOutlineMenuAlt1
        size={30}
        color={darkMode ? "white" : "black"}
        onClick={handleMenu}
        style={{ cursor: "pointer" }}
      />
    </header>
  );
}
