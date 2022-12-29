import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const NavBarLayout = styled.nav`
  background-color: #f6edd9;
  height: 50px;
`;

export const NavBarList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NavBarItem = styled.li`
  display: inline-block;
  text-align: center;
  flex-basis: 100px;
  cursor: pointer;
  a {
    color: #286d25;
  }
`;

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
`;
