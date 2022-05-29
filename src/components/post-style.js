import styled from "styled-components";

// styles
export const TitleBlock = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const PostTitle = styled.h1({
  "--min-size": "24",
  "--max-size": "64",
  fontSize: "var(--clamp-size)",
  fontFamily: (props) => props.fontFamily || "var(--poppins)",
  textTransform: "capitalize",
  fontWeight: "900",
  lineHeight: (props) => props.lineHeight || "1",
  color: (props) => props.color || "var(--text)",
  "&::before": {
    content: (props) => props.content,
    display: "inline-block",
    marginInlineEnd: ".5em",
    transform: " translateY(-.1em)",
  },
});

export const TitleSubBlock = styled.div({
  display: "flex",
  gap: "1em",
  alignItems: "center",
});

export const TimeStyle = styled.time({
  color: "var(--post-date)",
  fontFamily: (props) => props.fontFamily || "var(--noto-sans-j-p)",
  display: "flex",
  flexWrap: "wrap",
});

export const TagStyle = styled.ul({
  display: "flex",
  gap: ".5em",
  flexWrap: "wrap",
  a: {
    color: "var(--tag-color)",
    textTransform: "capitalize",
    fontFamily: "var(--poppins)",
  },
});

export const PostStyle = styled.article({
  overflow: "auto",
  h2: {
    marginBlockStart: "4em",
    borderInlineStart: "solid 20px var(--post-body-h2)",
    paddingBlockEnd: ".25em",
    paddingInlineStart: ".5em",
    "--min-size": "24",
    "--max-size": "39",
    fontSize: "var(--clamp-size)",
    fontFamily: (props) => props.fontFamily,
    color: (props) => props.color || "var(--text)",
    marginBlockEnd: "2em",
  },
  "p,ul,ol,dl": {
    lineHeight: "1.8",
    marginBlock: "2rem",
  },
  "ul,ol,dl": {
    display: "grid",
    gap: ".5em",
    paddingInlineStart: "4em",
  },
  ol: {
    counterReset: "item",
    "li::before": {
      counterIncrement: "item",
      content: "counter(item)'.'",
      fontFamily: "var(--poppins)",
      fontWeight: "900",
      color: "var(--post-list-num-color)",
    },
    ol: {
      "li::before": {
        color: "var(--post-list-num-color2)",
      },
      ol: {
        "li::before": {
          color: "var(--post-list-num-color3)",
        },
      },
    },
  },
  li: {
    "&::before": {
      paddingInlineEnd: ".5em",
      content: "'✔'",
      color: "var(--post-list-mark-color)",
    },
  },
});
