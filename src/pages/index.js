import * as React from "react";
import HeroHeader from "../components/hero-header";
import Footer from "../components/footer";
import styled from "styled-components";
import SEO from "../components/seo";

// styles
const Wrap = styled.div({
  paddingBlock: "var(--size1)",
});
// data

// markup
const IndexPage = () => {
  return (
    <React.Fragment>
      <SEO />
      <Wrap>
        <HeroHeader />
        <Footer />
      </Wrap>
    </React.Fragment>
  );
};

export default IndexPage;
