import * as React from "react";
import CopyRight from "./copyright";
import styled from "styled-components";

// styles
const Foot = styled.footer({
  "&.container": {
    marginBlockEnd: "1em",
  },
});
const InnerContainer = styled.div({
  borderBlockStart: "solid 1px var(--primary-light)",
  paddingBlockStart: "1em",
});
// markup
const Footer = () => {
  return (
    <Foot className="container">
      <InnerContainer>
        <CopyRight />
      </InnerContainer>
    </Foot>
  );
};
export default Footer;
