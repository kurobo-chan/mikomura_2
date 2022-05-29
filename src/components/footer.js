import * as React from "react";
import CopyRight from "./copyright";
import styled from "styled-components";
import { GridLayout } from "./grid-layout";

// styles
const Foot = styled(GridLayout)({
  marginBlockEnd: "1em",
});
const InnerContainer = styled.div({
  borderBlockStart: "solid 1px var(--border)",
  paddingBlockStart: "1em",
});
// markup
const Footer = () => {
  return (
    <Foot as={`footer`}>
      <InnerContainer>
        <CopyRight />
      </InnerContainer>
    </Foot>
  );
};
export default Footer;
