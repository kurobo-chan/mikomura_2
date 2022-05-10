import * as React from "react";
import SiteName from "./siteName";
import Nav from "./nav";
import DarkMode from "./dark-mode";
import styled from "styled-components";

// styles
const InnerContainer = styled.div({
  display: "grid",
  gap: "1em",
  borderBlockEnd: "solid 1px var(--primary-light)",
  paddingBlockEnd: "1em",
});
const HeadContainer = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
// markup
const Header = () => {
  return (
    <header className="container">
      <InnerContainer>
        <HeadContainer>
          <SiteName />
          <DarkMode />
        </HeadContainer>
        <Nav />
      </InnerContainer>
    </header>
  );
};
export default Header;
