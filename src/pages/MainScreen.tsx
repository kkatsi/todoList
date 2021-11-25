import React, { useState } from "react";
import ListItem from "../components/ListItem";
import ThemeToggle from "../components/ThemeToggle";

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
  const [isEditing, setEditing] = useState(false);
  const [subject, setSubject] = useState<string>("Task Item");

  return (
    <div
      className={`${bgColorClass} min-h-screen flex-col flex justify-center`}
    >
      <ThemeToggle changeMode={handleModeChange} />
      <br />
      <br />
      {subject && (
        <ListItem
          dark={darkMode}
          bgColor={bgColorClass}
          isEditing={isEditing}
          subject={subject}
          onChangeSubject={setSubject}
          onPressLabel={() => setEditing(true)}
          onFinishEditing={() => setEditing(false)}
        />
      )}
    </div>
  );
}
