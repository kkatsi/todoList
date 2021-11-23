import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

const StyledCheckbox = styled(CheckboxPrimitive.Root)`
  border: 5px solid;
  width: 55px;
  height: 55px;
  &[data-state="checked"] {
    background-color: ${tw`bg-blue-500 border-blue-500`};
  }
  ${tw`mx-auto bg-white rounded-2xl border-black relative flex align-middle justify-center shadow-sm`};
`;
const StyledIndicator = styled(CheckboxPrimitive.Indicator)`
  ${tw`absolute -bottom-1.5 -left-1.5`};
`;

// Exports
const Checkbox = StyledCheckbox;
const CheckboxIndicator = StyledIndicator;

const CheckMark = () => (
  <svg width="64" height="64" viewBox="0 0 67 64" fill="none">
    <path
      d="M8 32.5C18 39 26 47 26 47C26 47 33 28 63.5 6"
      stroke={
        localStorage.getItem("dark-theme") === "true" ? "white" : "lightgray"
      }
      strokeWidth="5px"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="94"
      strokeDashoffset="94"
      style={{ animation: "draw 1s forwards" }}
    />
  </svg>
);

export default function CheckBox() {
  return (
    <Checkbox defaultChecked>
      <CheckboxIndicator>
        <CheckMark />
      </CheckboxIndicator>
    </Checkbox>
  );
}
