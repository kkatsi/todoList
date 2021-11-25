import React, { useState, useCallback } from "react";
// import ListItem from "../components/ListItem";
import PageContent from "../components/PageContent";
import TaskList from "../components/TaskList";
import ThemeToggle from "../components/ThemeToggle";
import { AiOutlinePlus } from "react-icons/ai";
import styled from "styled-components";
import tw from "twin.macro";

interface Props {
  darkMode: boolean;
  onModeChange: () => void;
  bgColorClass: string;
}

const initialData = [
  {
    id: 4,
    subject: "Buy movie tickets for Friday",
    done: false,
  },
  {
    id: 5,
    subject: "Make a React Native tutorial",
    done: false,
  },
];

const AddItemButton = styled.button`
  all: initial;
  ${tw`w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center absolute bottom-2 right-2`}
`;

export default function MainScreen({
  darkMode,
  onModeChange,
  bgColorClass,
}: Props) {
  const [data, setData] = useState(initialData);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);

  const handleAddTaskClick = useCallback(() => {
    const id = Math.floor(Math.random() * 1000000000);
    setData([
      {
        id: id,
        subject: "",
        done: false,
      },
      ...data,
    ]);
    setEditingItemId(id);
  }, [data]);

  const handleToggleTaskItem = useCallback((item) => {
    setData((prevData) => {
      const newData = [...prevData];
      const index = prevData.indexOf(item);
      newData[index] = {
        ...item,
        done: !item.done,
      };
      return newData;
    });
  }, []);
  const handleChangeTaskItemSubject = useCallback((item, newSubject) => {
    setData((prevData) => {
      const newData = [...prevData];
      const index = prevData.indexOf(item);
      newData[index] = {
        ...item,
        subject: newSubject,
      };
      return newData;
    });
  }, []);
  const handleFinishTaskItemEditing = useCallback(() => {
    setEditingItemId(null);
  }, []);
  const handlePressTaskItemLabel = useCallback((item) => {
    setEditingItemId(item.id);
  }, []);
  const handleRemoveTaskItem = useCallback((item) => {
    setData((prevData) => {
      const newData = prevData.filter((i) => i !== item);
      return newData;
    });
  }, []);

  return (
    <PageContent>
      <ThemeToggle onModeChange={onModeChange} />
      <br />
      <br />
      <TaskList
        darkMode={darkMode}
        bgColorClass={bgColorClass}
        data={data}
        onToggleItem={handleToggleTaskItem}
        onChangeSubject={handleChangeTaskItemSubject}
        onFinishEditing={handleFinishTaskItemEditing}
        onPressLabel={handlePressTaskItemLabel}
        onRemoveItem={handleRemoveTaskItem}
        editingItemId={editingItemId}
      />
      {/* {subject && (
        // <ListItem
        //   dark={darkMode}
        //   bgColor={bgColorClass}
        //   isEditing={isEditing}
        //   subject={subject}
        //   onChangeSubject={setSubject}
        //   onPressLabel={() => setEditing(true)}
        //   onFinishEditing={() => setEditing(false)}
        // />
      )} */}
      <AddItemButton onClick={handleAddTaskClick}>
        <AiOutlinePlus size={30} />
      </AddItemButton>
    </PageContent>
  );
}
