import React from "react";
import PageContent from "../components/PageContent";
import Header from "../components/Header";

interface Props {
  onMenuOpening: () => void;
}

export default function About({ onMenuOpening }: Props) {
  return (
    <>
      <Header handleMenu={onMenuOpening} title="About tis app" />
      <PageContent>About</PageContent>
    </>
  );
}
