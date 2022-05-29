import * as React from "react";
import styled from "styled-components";

//style
const Foot = styled.footer({
  display: "grid",
  gap: "2em",
});
const Border = styled.div({
  background: "var(--search-modal-border)",
  width: "calc(100% + 4em)",
  height: "1px",
  marginInline: "-2em",
  "@media(min-width:768px)": {
    marginInline: "-4em",
    width: "calc(100% + 8em)",
  },
});
const Navigate = styled.div({
  color: "var(--search-modal-nav-text)",
  display: "grid",
  gridAutoFlow: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  position: "relative",
  gap: "1.6em",
});
const Block = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: ".8em",
});
const Common = styled.div({
  background: "var(--search-modal-nav-bg)",
  width: "22px",
  height: "22px",
  border: "1px solid var(--search-modal-nav-bg-border)",
  borderRadius: ".25em",
  display: "grid",
  placeContent: "center",
  fontSize: ".6em",
});
const Icon = styled.span({
  color: "var(--search-modal-nav-icon)",
});
const Text = styled.p({
  fontFamily: "var(--poppins)",
  fontSize: ".8em",
  fontWeight: "700",
});
const Return = styled(Common)({
  fontSize: "1.4em",
  width: "34px",
  position: "relative",
  display: "block",
});
const ReturnIcon = styled(Icon)({
  position: "absolute",
  top: "-8px",
  left: "16px",
});
//mark up
const ModalFoot = () => {
  return (
    <Foot>
      <Border />
      <Navigate>
        <Block>
          <Common>
            <Icon>&darr;</Icon>
          </Common>
          <Common>
            <Icon>&uarr;</Icon>
          </Common>
          <Text>to navigate</Text>
        </Block>
        <Block>
          <Return>
            <ReturnIcon>&crarr;</ReturnIcon>
          </Return>
          <Text>to select</Text>
        </Block>
      </Navigate>
    </Foot>
  );
};
export default ModalFoot;
