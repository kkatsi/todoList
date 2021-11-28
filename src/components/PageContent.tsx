import React from "react";
import Div100vh from "react-div-100vh";

interface Props {
  //   bgColorClass: string;
  children: React.ReactNode;
}

export default function PageContent({ children }: Props) {
  return (
    <Div100vh
      style={{
        paddingTop: "320px",
      }}
      className={`pb-20 mx-auto container flex-col flex`}
    >
      {children}
    </Div100vh>
  );
}
