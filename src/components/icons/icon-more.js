import * as React from "react";
import styled from "styled-components";

// style
const IconSvg = styled.svg({
  fill: "var(--more-button)",
  width: "1em",
  height: "auto",
});
// mark up
const IconMore = () => {
  return (
    <IconSvg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z"
        fill="currentColor"
      />
    </IconSvg>
  );
};
export default IconMore;
