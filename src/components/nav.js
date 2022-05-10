import * as React from "react";
import styled from "styled-components";

// styles
const NavStyle = styled.nav({
  ul: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "1em",
    flexWrap: "wrap",
  },
  a: {
    display: "block",
    textTransform: "capitalize",
    fontFamily: "var(--open-sans)",
    color: "var(--primary)",
  },
});
// markup
const Nav = () => {
  return (
    <NavStyle>
      <ul>
        <li>
          <a href="#">home</a>
        </li>
        <li>
          <a href="#">about</a>
        </li>
        <li>
          <a href="#">blog</a>
        </li>
        <li>
          <a href="#">portfolio</a>
        </li>
        <li>
          <a href="#">contact</a>
        </li>
      </ul>
    </NavStyle>
  );
};
export default Nav;
