import styled from "styled-components";
import tw from "twin.macro";
import { Link } from "react-router-dom";

interface Props {
  handleMenu: () => void;
}

const SideBarContainer = styled.nav`
  width: 250px;
  transform: translateX(-250px);
  ${tw`h-screen dark:bg-blue-900 absolute flex flex-col p-2`};
`;

const Menu = styled.ul`
  ${tw`flex flex-col p-1`}
`;
const MenuItem = styled.li`
  ${tw`flex-1 bg-indigo-200 text-indigo-800 mb-2 rounded-md`}
`;

const MenuLink = styled(Link)`
  ${tw`w-full block p-2`}
`;

export default function SideBar({ handleMenu }: Props) {
  return (
    <SideBarContainer>
      <Menu>
        <MenuItem>
          <MenuLink to="/" onClick={handleMenu}>
            Home
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/about" onClick={handleMenu}>
            About
          </MenuLink>
        </MenuItem>
      </Menu>
    </SideBarContainer>
  );
}
