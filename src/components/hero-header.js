import * as React from "react";
import SiteName from "./siteName";
import Nav from "./nav";
import DarkMode from "./dark-mode";
import GlobalStyle from "./global-style";
import styled from "styled-components";
import { GridLayout } from "./grid-layout";

// styles
const Title = styled.h1({
  "--min-size": "40",
  "--max-size": "64",
  fontSize: "var(--clamp-size)",
  fontFamily: "var(--poppins)",
  fontWeight: "800",
  background: "var(--hero-title-text)",
  WebkitTextFillColor: "transparent",
  WebkitBackgroundClip: "text",
});
const SubTitle = styled.p({
  "--min-size": "20",
  "--max-size": "32",
  fontSize: "var(--clamp-size)",
  fontFamily: "var(--poppins)",
  color: "var(--hero-title-sub-text)",
  mixBlendMode: "var(--mix-blend-mode)",
});
const HeroText = styled.div({
  display: "grid",
  justifyContent: "center",
  alignItems: "center",
  gap: ".5em",
  textAlign: "center",
});
const Head = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
// markup
const HeroHeader = () => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <GridLayout as={`header`} marginBlock={`0`}>
        <Head>
          <SiteName />
          <DarkMode />
        </Head>
        <HeroText>
          <Title>Hi, I'm MIKOMURA</Title>
          <SubTitle>
            This is a blog and portfolio site about programming
          </SubTitle>
        </HeroText>
        <Nav />
      </GridLayout>
    </React.Fragment>
  );
};
export default HeroHeader;
