import styled from "styled-components";

export const GridLayout = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(2, var(--size1)) auto repeat(2, var(--size1))",
  gap: "var(--size2)",
  marginBlock: (props) => props.marginBlock || "var(--size2)",
  "@media (min-width: 768px)": {
    gridTemplateColumns: "auto 71vw auto",
  },
  "& > *": {
    gridColumn: "2/-2",
    "@media (min-width: 768px)": {
      marginInline: "var(--size1)",
    },
  },
});
