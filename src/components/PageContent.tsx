import React from "react";

interface Props {
  //   bgColorClass: string;
  children: React.ReactNode;
}

export default function PageContent({ children }: Props) {
  return (
    <div
      className={`py-20 px-3 relative mx-auto container min-h-screen flex-col flex justify-center`}
    >
      {children}
    </div>
  );
}
