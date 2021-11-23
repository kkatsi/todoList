import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import * as SwitchPrimitive from "@radix-ui/react-switch";

interface Props {
  changeMode: (checked: boolean) => void;
}

const StyledSwitch = styled(SwitchPrimitive.Root)`
  width: 42px;
  height: 25px;
  &:focus {
    box-shadow: 0 0 0 1px black;
  }
  &[data-state="checked"] {
    background-color: ${tw`bg-blue-500`};
  }
  ${tw`mx-2 bg-gray-400 rounded-full relative shadow-sm`}
`;

const StyledThumb = styled(SwitchPrimitive.Thumb)`
  width: 21px;
  height: 21px;
  will-change: transform;
  &[data-state="checked"] {
    transform: translateX(19px);
  }
  ${tw`block bg-white rounded-full shadow-sm transition-transform duration-100 transform translate-x-2`}
`;

// Exports
const Switch = StyledSwitch;
const SwitchThumb = StyledThumb;

export default function ThemeToggle(props: Props) {
  return (
    <div className="flex justify-center dark:text-gray-100">
      <span>Light</span>
      <Switch
        defaultChecked={localStorage.getItem("dark-theme") !== "false" || false}
        onCheckedChange={props.changeMode}
      >
        <SwitchThumb />
      </Switch>
      <span>Dark</span>
    </div>
  );
}
