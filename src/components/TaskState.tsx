import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const TasksState = styled.p`
  z-index: 1;
  ${tw`text-white`}
`;

const ShadowedText = styled.span`
  text-shadow: 0 0 4px white;
  ${tw`text-lg`}
`;

interface Props {
  uncompletedItems: () => number;
  completedItems: () => number;
}

export default function TaskState({ uncompletedItems, completedItems }: Props) {
  return (
    <TasksState>
      You have <ShadowedText>{uncompletedItems()}</ShadowedText> uncompleted and{" "}
      <ShadowedText>{completedItems()}</ShadowedText> completed Tasks
    </TasksState>
  );
}
