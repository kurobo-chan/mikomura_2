import * as React from "react";
import SiteName from "./siteName";
import Nav from "./nav";
import DarkMode from "./dark-mode";
import styled from "styled-components";
import { GridLayout } from "./grid-layout";

// styles
const InnerContainer = styled.div({
  display: "grid",
  gap: "1em",
  borderBlockEnd: "solid 1px var(--border)",
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
    <GridLayout as={`header`} marginBlock={`0`}>
      <InnerContainer>
        <HeadContainer>
          <SiteName />
          <DarkMode />
        </HeadContainer>
        <Nav />
      </InnerContainer>
    </GridLayout>
  );
};
export default Header;
