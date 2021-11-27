import React from "react";

interface Props {
  //   bgColorClass: string;
  children: React.ReactNode;
}

export default function PageContent({ children }: Props) {
  return (
    <div
      style={{ paddingTop: "320px" }}
      className={`pb-20 mx-auto container min-h-screen flex-col flex`}
    >
      {children}
    </div>
  );
}
