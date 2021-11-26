import React from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";

interface Props {
  darkMode: boolean;
  handleMenu: () => void;
}

export default function Header({ darkMode, handleMenu }: Props) {
  return (
    <header className="p-3 absolute top-0 left-0" style={{ zIndex: "9999" }}>
      <div
        className="flex align-middle"
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
