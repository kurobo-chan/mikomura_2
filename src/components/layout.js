import * as React from "react";
import Header from "./header";
import Footer from "./footer";
import GlobalStyle from "./global-style";
import styled from "styled-components";

// styles
const Wrap = styled.div({
  paddingBlock: "var(--size1)",
});
// markup
const Layout = ({ children }) => {
  return (
    <Wrap>
      <GlobalStyle />
      <Header />
      {children}
      <Footer />
    </Wrap>
  );
};
export default Layout;
