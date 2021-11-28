import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const Img = styled.img`
  height: 300px;
  object-fit: cover;
  object-position: center;
  ${tw`w-full absolute top-0 left-0`}
`;

interface Props {
  error: boolean;
  image: string;
  loading: boolean;
  onLoad: () => void;
}

export default function Image({ error, image, loading, onLoad }: Props) {
  return (
    <Img
      src={
        !error
          ? String(image)
          : String(require("../assets/fallback.jpg").default)
      }
      alt="nature"
      style={{ display: loading ? "none" : "block" }}
      onLoad={onLoad}
    />
  );
}
