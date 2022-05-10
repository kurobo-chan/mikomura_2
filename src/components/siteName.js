import * as React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

// styles
const SiteNameStyle = styled.div((props) => ({
  "&.siteName": {
    "--min-size": "24",
    "--max-size": "32",
    fontSize: "var(--clamp-size)",
    fontFamily: "var(--open-sans)",
    textTransform: "uppercase",
    fontWeight: "600",
    color: props.color || "var(--primary)",
  },
  a: {
    display: "block",
  },
}));
// markup
const SiteName = (props) => {
  return (
    <SiteNameStyle className="siteName" color={props.color}>
      <Link to={`/`}>mikomura</Link>
    </SiteNameStyle>
  );
};
export default SiteName;
