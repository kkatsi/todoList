import styled from "styled-components";
import tw from "twin.macro";
export default function SideBar() {
  const SideBarContainer = styled.div`
    width: 250px;
    ${tw`h-screen bg-gray-300 dark:bg-gray-700 fixed -left-full`}
  `;
  return (
    <SideBarContainer>
      <span>tewfs</span>
    </SideBarContainer>
  );
}
