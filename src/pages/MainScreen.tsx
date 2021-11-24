import React from "react";
import ListItem from "../components/ListItem";
import ThemeToggle from "../components/ThemeToggle";
import { Link } from "react-router-dom";

interface Props {
  darkMode: boolean;
  handleModeChange: () => void;
}

export default function MainScreen({ darkMode, handleModeChange }: Props) {
  return (
    <div className="dark:bg-gray-800 min-h-screen flex-col flex align-middle justify-center">
      <ThemeToggle changeMode={handleModeChange} />
      <br />
      <br />
      <ListItem dark={darkMode} />
      <br />
      <br />
      <Link to="/about">About</Link>
    </div>
  );
}
