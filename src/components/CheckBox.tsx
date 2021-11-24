import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

const StyledCheckbox = styled(CheckboxPrimitive.Root)`
  border: 2px solid;
  &[data-state="checked"] {
    background-color: ${tw`bg-indigo-500 border-indigo-500`};
  }
  ${tw`w-full h-full bg-white rounded-lg border-black relative flex align-middle justify-center shadow-sm`};
`;
const StyledIndicator = styled(CheckboxPrimitive.Indicator)`
  &:after {
    width: 100%;
    height: 100%;
    filter: brightness(0) invert(1);
  }
  ${tw`absolute -bottom-1 -left-1`};
`;

// Exports
const Checkbox = StyledCheckbox;
const CheckboxIndicator = StyledIndicator;

const CheckMark = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    x="0"
    y="0"
    width="130%"
    height="130%"
    viewBox="0 0 64 64"
    fill="none"
    preserveAspectRatio="none"
  >
    <path
      d="M8 32.5C18 39 26 47 26 47C26 47 29 28 58 4"
      stroke={
        localStorage.getItem("dark-theme") === "true" ? "white" : "#D1D5DB"
      }
      strokeWidth="4px"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="94"
      strokeDashoffset="94"
      style={{
        animation: "draw 1s forwards",
      }}
    />
  </svg>
);

interface Props {
  isDone: boolean;
}

export default function Check({ isDone }: Props) {
  return (
    <Checkbox checked={isDone}>
      <CheckboxIndicator>
        <CheckMark />
      </CheckboxIndicator>
    </Checkbox>
  );
}
