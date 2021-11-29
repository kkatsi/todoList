import React, { useCallback } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import ListItem from "./ListItem";
import { motion, AnimatePresence } from "framer-motion";

interface TaskItemData {
  id: number;
  subject: string;
  done: boolean;
}

interface TaskListProps {
  darkMode: boolean;
  bgColorClass: string;
  data: Array<TaskItemData>;
  editingItemId: number | null;
  onToggleItem: (item: TaskItemData) => void;
  onChangeSubject: (item: TaskItemData, subject: string) => void;
  onFinishEditing: (item: TaskItemData) => void;
  onPressLabel: (item: TaskItemData) => void;
  onRemoveItem: (item: TaskItemData) => void;
}

interface TaskItemProps {
  darkMode: boolean;
  bgColorClass: string;
  data: TaskItemData;
  isEditing: boolean;
  onToggleItem: (item: TaskItemData) => void;
  onChangeSubject: (item: TaskItemData, subject: string) => void;
  onFinishEditing: (item: TaskItemData) => void;
  onPressLabel: (item: TaskItemData) => void;
  onRemoveItem: (item: TaskItemData) => void;
}

const List = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  ${tw`flex w-full flex-col items-center justify-start`}
`;

const AnimatedView = styled(motion.div)`
  ${tw`w-full`}
`;

export function AnimatedTaskItem({
  darkMode,
  bgColorClass,
  data,
  isEditing,
  onToggleItem,
  onChangeSubject,
  onFinishEditing,
  onPressLabel,
  onRemoveItem,
}: TaskItemProps) {
  const handleToggleCheckbox = useCallback(() => {
    onToggleItem(data);
  }, [data, onToggleItem]);
  const handleChangeSubject = useCallback(
    (subject) => {
      onChangeSubject(data, subject);
    },
    [data, onChangeSubject]
  );
  const handleFinishEditing = useCallback(() => {
    onFinishEditing(data);
  }, [data, onFinishEditing]);
  const handlePressLabel = useCallback(() => {
    onPressLabel(data);
  }, [data, onPressLabel]);
  const handleRemoveItem = useCallback(() => {
    onRemoveItem(data);
  }, [data, onRemoveItem]);
  return (
    <AnimatePresence>
      <AnimatedView
        initial={{
          opacity: 0,
          scale: 0.5,
          marginBottom: "-46px",
        }}
        animate={{
          opacity: 1,
          scale: 1,
          marginBottom: 0,
        }}
        // transition={{
        //   type: "spring",
        //   stiffness: 100,
        // }}
      >
        <ListItem
          dark={darkMode}
          bgColor={bgColorClass}
          subject={data.subject}
          isDone={data.done}
          isEditing={isEditing}
          onToggleItem={handleToggleCheckbox}
          onChangeSubject={handleChangeSubject}
          onFinishEditing={handleFinishEditing}
          onPressLabel={handlePressLabel}
          onRemove={handleRemoveItem}
        />
      </AnimatedView>
    </AnimatePresence>
  );
}

export default function TaskList({
  darkMode,
  bgColorClass,
  data,
  editingItemId,
  onToggleItem,
  onChangeSubject,
  onFinishEditing,
  onPressLabel,
  onRemoveItem,
}: TaskListProps) {
  return (
    <List>
      {data.map((item) => {
        return (
          <AnimatedTaskItem
            darkMode={darkMode}
            bgColorClass={bgColorClass}
            key={item.id}
            data={item}
            isEditing={item.id === editingItemId}
            onToggleItem={onToggleItem}
            onChangeSubject={onChangeSubject}
            onFinishEditing={onFinishEditing}
            onPressLabel={onPressLabel}
            onRemoveItem={onRemoveItem}
          />
        );
      })}
    </List>
  );
}
