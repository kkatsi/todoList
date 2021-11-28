import styled from "styled-components";
import tw from "twin.macro";
import { Link, useMatch, useResolvedPath, LinkProps } from "react-router-dom";
import { FiInbox, FiInfo } from "react-icons/fi";
import ThemeToggle from "../components/ThemeToggle";
import Div100vh from "react-div-100vh";

interface Props {
  handleMenu: () => void;
  darkMode: boolean;
  onModeChange: () => void;
}

const SideBarContainer = styled(Div100vh)`
  width: 250px;
  z-index: 100;
  transform: translateX(-250px);
  overflow-y: hidden;
  ${tw`dark:bg-dark-blue absolute flex flex-col items-center px-5 py-16`};
`;

const Menu = styled.ul`
  ${tw`flex w-full flex-col p-1`}
`;
const MenuItem = styled.li`
  ${tw`flex-1 text-indigo-100 text-sm mb-2`}
`;

const MenuLink = styled(Link)`
  border-radius: 5px;
  ${tw`w-full flex items-center px-3 py-2`}
`;

interface CustomMenuLinkProps extends LinkProps {
  darkMode: boolean;
}

const CustomMenuLink = ({
  darkMode,
  children,
  to,
  ...props
}: CustomMenuLinkProps) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
  return (
    <MenuLink
      className={
        match
          ? "bg-blue-700"
          : !darkMode
          ? "bg-transparent text-blue-700"
          : "bg-transparent text-gray-100"
      }
      to={to}
      {...props}
    >
      {children}
    </MenuLink>
  );
};

const ProfileImage = styled.img`
  object-fit: cover;
  object-position: center;
  ${tw`rounded-full w-20 h-20 border-4 border-pink-500 self-start`}
`;

const Name = styled.h2`
  ${tw`text-3xl font-bold self-start py-5`}
`;

export default function SideBar({ handleMenu, darkMode, onModeChange }: Props) {
  const profilePic = require("../assets/profileIcon.jpg").default;

  return (
    <SideBarContainer>
      <ProfileImage src={profilePic} />
      <Name className="dark:text-white">Kostas Katsinaris</Name>
      <Menu>
        <MenuItem>
          <CustomMenuLink darkMode={darkMode} to="/" onClick={handleMenu}>
            <FiInbox size={18} className="mr-2" />
            Tasks
          </CustomMenuLink>
        </MenuItem>
        <MenuItem>
          <CustomMenuLink darkMode={darkMode} to="/about" onClick={handleMenu}>
            <FiInfo size={18} className="mr-2" />
            About
          </CustomMenuLink>
        </MenuItem>
      </Menu>
      <ThemeToggle onModeChange={onModeChange} />
    </SideBarContainer>
  );
}
