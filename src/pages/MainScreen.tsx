import React from "react";
import ListItem from "../components/ListItem";
import ThemeToggle from "../components/ThemeToggle";
import { Link } from "react-router-dom";

interface Props {
  darkMode: boolean;
  handleModeChange: () => void;
  bgColorClass: string;
}

export default function MainScreen({
  darkMode,
  handleModeChange,
  bgColorClass,
}: Props) {
  return (
    <div
      className={`${bgColorClass} min-h-screen flex-col flex align-middle justify-center`}
    >
      <ThemeToggle changeMode={handleModeChange} />
      <br />
      <br />
      <ListItem dark={darkMode} bgColor={bgColorClass} />
      <br />
      <br />
      <Link to="/about">About</Link>
    </div>
  );
}
