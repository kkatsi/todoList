import React from "react";
import PageContent from "../components/PageContent";
import Header from "../components/Header";
import styled from "styled-components";
import { AiFillYoutube, AiFillGithub } from "react-icons/ai";
import tw from "twin.macro";

interface Props {
  onMenuOpening: () => void;
}

const Image = styled.img`
  object-fit: cover;
  object-position: center;
  ${tw`rounded-full w-20 h-20 mx-auto`}
`;

const Description = styled.p`
  ${tw`dark:text-white py-2 italic text-sm`}
`;

const Button = styled.a`
  text-decoration: none;
  ${tw`rounded-full w-full p-2 text-white justify-center my-2 flex items-center`}
`;

export default function About({ onMenuOpening }: Props) {
  return (
    <>
      <Header handleMenu={onMenuOpening} title="About tis app" />
      <PageContent>
        <Image
          src={"https://avatars.githubusercontent.com/u/43878951?v=4"}
          alt="profile kostas katsinaris"
        />
        <Description>
          This is a simple ToDo app build with React, and Framer Motion for all
          the mobile like behavior/swipes. Built by Kostas Katsinaris.
        </Description>
        <Button
          href={"https://www.youtube.com/channel/UCBpcGwTfa_kKzln4pKfqT_A"}
          className="bg-red-600"
        >
          <AiFillYoutube size={30} className="mr-2" />
          Go to YouTube channel
        </Button>
        <Button href={"https://github.com/kkatsi"} className="bg-black">
          <AiFillGithub size={30} className="mr-2" />
          Go to GitHub
        </Button>
      </PageContent>
    </>
  );
}
