import * as React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

// styles
const SiteNameStyle = styled.div((props) => ({
  "--min-size": "24",
  "--max-size": "32",
  fontSize: "var(--clamp-size)",
  fontFamily: "var(--poppins)",
  textTransform: "uppercase",
  fontWeight: "600",
  color: props.color || "var(--site-name)",

  a: {
    display: "block",
  },
}));
// markup
const SiteName = (props) => {
  return (
    <SiteNameStyle color={props.color}>
      <Link to={`/`}>mikomura</Link>
    </SiteNameStyle>
  );
};
export default SiteName;
