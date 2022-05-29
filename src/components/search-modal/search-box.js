import * as React from "react";
import { navigate } from "gatsby";
import IconSearch from "../icons/icon-search";
import { connectSearchBox } from "react-instantsearch-dom";
import styled, { css } from "styled-components";

//style
const Form = styled.form({
  position: "relative",
});
const Icon = styled.span({
  position: "absolute",
  top: "50%",
  left: "1.5em",
  transform: "translateY(calc(-50% + 4px))",
});
const Input = styled.input(
  {
    boxShadow: "var(--search-form-input-shadow)",
    borderRadius: ".3em",
    padding: "1.5em 1.5em 1.5em 4em",
    fontWeight: "600",
    fontFamily: "var(--poppins)",
    display: "block",
    userSelect: "text",
    width: "100%",
    fontSize: "1em",
    appearance: "none",
    outline: "none",
    color: ({ theme }) => theme.foreground,
    "&:focus": {
      outline: "none",
    },
    "&::placeholder": {
      color: ({ theme }) => theme.faded,
    },
  },
  (props) => props.hasFocus
);
const open = css({
  background: ({ theme }) => theme.background,
  cursor: "text",
  border: "1px solid var(--search-form-input-border)",
});
const closed = css({
  background: "var(--search-form-input-bg)",
  cursor: "pointer",
  border: "none",
});
//mark up
const SearchBox = ({ refine, currentRefinement, onFocus, hasFocus }) => (
  <Form>
    <Icon>
      <IconSearch />
    </Icon>
    <label className="sr-only">Search</label>
    <Input
      type="text"
      spellCheck="true"
      placeholder="Quick-search for blog"
      aria-label="Search"
      value={currentRefinement}
      onChange={(e) => refine(e.target.value)}
      onFocus={onFocus}
      hasFocus={hasFocus ? open : closed}
    />
  </Form>
);
export default connectSearchBox(SearchBox);
