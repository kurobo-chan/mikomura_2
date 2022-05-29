import { useRef, default as React, useState } from "react";
import styled, { css } from "styled-components";
import IconSearch from "../icons/icon-search";
import useClickOutside from "../use-click-outside";

//style
const Overlay = styled.div({
  zIndex: "50",
  background: "var(--primary-gray-transparent)",
  position: "fixed",
  inset: "0",
  display: "grid",
  placeContent: "center",
});
const Layout = css({
  display: "grid",
  gap: "2em",
});
const Container = styled.div(
  {
    background: "var(--search-modal-bg)",
    border: "none",
    height: "auto",
    position: "relative",
  },
  Layout
);

const Section = styled.section({
  backgroundColor: "var(--search-modal-bg)",
  borderRadius: "1.2em",
  boxShadow: "var(--search-modal-box-shadow)",
  position: "absolute",
  top: "2em",
  left: "var(--size1)",
  right: "var(--size1)",
  maxHeight: "80vh",
  padding: "2em",
  outline: "none",
  overflow: "hidden",
  "@media(min-width:768px)": {
    padding: "4em",
    margin: "var(--size1-half) auto",
    maxWidth: "71vw",
  },
});
//mark up
const ModalArea = ({ children }) => {
  const ref = useRef();
  const [isModalOpen, setModalOpen] = useState(false);
  useClickOutside(ref, () => setModalOpen(false));
  return (
    <React.Fragment>
      {isModalOpen ? (
        <Overlay>
          <Section ref={ref}>
            <Container>{children}</Container>
          </Section>
        </Overlay>
      ) : (
        <button onClick={() => setModalOpen(!isModalOpen)}>
          <IconSearch />
        </button>
      )}
    </React.Fragment>
  );
};
export default ModalArea;
