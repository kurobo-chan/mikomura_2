import React, { useState, useEffect } from "react";
import styled from "styled-components";

// styles
const CopyRightStyle = styled.div({
  fontFamily: "var(--poppins)",
  color: "var(--copy-light)",
  "@media(min-width:768px)": {
    textAlign: "center",
  },
});
// markup
const CopyRight = () => {
  const [date, setDate] = useState();
  const getYear = () => setDate(new Date().getFullYear());
  useEffect(() => {
    getYear();
  }, []);
  return (
    <CopyRightStyle>©{date} by MIKOMURA . All rights reserved.</CopyRightStyle>
  );
};
export default CopyRight;
