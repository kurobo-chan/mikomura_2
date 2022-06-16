import styled, { css } from "styled-components";

export const FromBlock = styled.form({
  width: "100%",
  display: "grid",
  rowGap: "2em",
  "@media(min-width: 768px)": {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
});

export const InputWrap = styled.div((props) => ({
  position: "relative",
  background: "var(--contact-input-bg)",
  border: "1px solid var(--contact-border)",
  borderRadius: "2px",
  "@media(min-width: 768px)": {
    width: props.width || "calc((100% - 20px) / 2)",
  },
}));

export const FocusInput = styled.span({
  position: "absolute",
  display: "block",
  width: "calc(100% + 2px)",
  height: "calc(100% + 2px)",
  top: "-1px",
  left: "-1px",
  pointerEvents: "none",
  border: "1px solid var(--contact-border-focus)",
  borderRadius: "2px",
  visibility: "hidden",
  opacity: "0",
  transition: "all 0.4s",
  transform: "scaleX(1.1) scaleY(1.3)",
});

const focus = css({
  [`:focus + ${FocusInput}`]: {
    visibility: "visible",
    opacity: "1",
    transform: "scale(1)",
  },
});
export const Input = styled.input(
  (props) => ({
    height: props.height || "3.75em",
    padding: props.padding || "0 1.25em 0 1.56em",
    minHeight: props.minHeight || "0",
    fontSize: props.fontSize || "1.25em",
    lineHeight: props.lineHeight || "1.2",
    overflow: props.overflow || "visible",
    display: "block",
    width: "100%",
    fontFamily: "var(--poppins)",
    color: "var(--contact-input-text)",
    outline: "none",
    border: "none",
    resize: "vertical",
    margin: "0",
    touchAction: "manipulation",
    "::placeholder": {
      textTransform: "uppercase",
    },
  }),
  focus
);

export const SendBtnContainer = styled.div({
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-end",
  marginBlockStart: "-10px",
});

const hover = css({
  ":hover": {
    background: "var(--contact-button-hover)",
  },
});
export const SendBtn = styled.button(
  {
    textTransform: "uppercase",
    display: "grid",
    placeContent: "center",
    paddingInline: "1.25em",
    minWidth: "100px",
    height: "50px",
    background: "var(--contact-button)",
    borderRadius: "2px",
    color: "var(--contact-button-text)",
    fontSize: "1.125em",
    lineHeight: "1.2",
    transition: "all 0.4s",
  },
  hover
);
