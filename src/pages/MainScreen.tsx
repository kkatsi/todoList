import React, { useState, useCallback, useEffect } from "react";
// import ListItem from "../components/ListItem";
import Header from "../components/Header";
import PageContent from "../components/PageContent";
import TaskList from "../components/TaskList";
import { AiOutlinePlus } from "react-icons/ai";
import styled from "styled-components";
import tw from "twin.macro";
import useLocalStorage from "../hooks/useLocalStorage";
import TaskState from "../components/TaskState";

interface TaskItemData {
  id: number;
  subject: string;
  done: boolean;
}

interface Props {
  darkMode: boolean;
  bgColorClass: string;
  completedItems: (items: TaskItemData[]) => number;
  uncompletedItems: (items: TaskItemData[]) => number;
  onMenuOpening: () => void;
}

const AddItemButton = styled.button`
  all: initial;
  ${tw`w-14 h-14 cursor-pointer bg-blue-600 text-white rounded-full flex items-center justify-center absolute bottom-3 right-3`}
`;

const EmptyListComponent = styled.div`
  ${tw`w-full text-center p-2`}
`;

const EmptyListLabel = styled.span`
  font-size: 1.1rem;
  ${tw`text-gray-400`}
`;

export default function MainScreen({
  darkMode,
  bgColorClass,
  completedItems,
  uncompletedItems,
  onMenuOpening,
}: Props) {
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [localStorageData, setLocalStorageData] = useLocalStorage<
    TaskItemData[]
  >("TaskItems", []);
  const [data, setData] = useState(localStorageData);

  useEffect(() => {
    if (localStorageData !== data) setLocalStorageData(data);
  }, [data, localStorageData, setLocalStorageData]);

  const handleAddTaskClick = useCallback(() => {
    const id = Math.floor(Math.random() * 1000000000);
    setData((prevData) => [
      {
        id: id,
        subject: "",
        done: false,
      },
      ...prevData,
    ]);
    setEditingItemId(id);
  }, []);

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

  const handlePressTaskItemLabel = useCallback((item) => {
    setEditingItemId(item.id);
  }, []);
  const handleRemoveTaskItem = useCallback((item) => {
    setData((prevData) => {
      const newData = prevData.filter((i) => i !== item);
      return newData;
    });
  }, []);

  const handleFinishTaskItemEditing = useCallback(
    (item) => {
      if (item.subject === "" || !item.subject.trim()) handleRemoveTaskItem(item);
      setEditingItemId(null);
    },
    [handleRemoveTaskItem]
  );

  const onItemComplete = useCallback(() => {
    return completedItems(data);
  }, [completedItems, data]);

  const onItemUncomplete = useCallback(() => {
    return uncompletedItems(data);
  }, [uncompletedItems, data]);

  useEffect(() => {
    completedItems(data);
    uncompletedItems(data);
  }, [data, completedItems, uncompletedItems]);

  return (
    <>
      <Header
        handleMenu={onMenuOpening}
        title="What's up, Kostas"
        tasksComponent={
          <TaskState
            completedItems={onItemComplete}
            uncompletedItems={onItemUncomplete}
          />
        }
      />
      <PageContent>
        {data.length > 0 && (
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
        )}
        {data.length === 0 && (
          <EmptyListComponent>
            <EmptyListLabel>
              There are currently no tasks in your list. You can add a new task
              by clicking the button at bottom right corner.
            </EmptyListLabel>
          </EmptyListComponent>
        )}

        <AddItemButton onClick={handleAddTaskClick}>
          <AiOutlinePlus size={25} />
        </AddItemButton>
      </PageContent>
    </>
  );
}
