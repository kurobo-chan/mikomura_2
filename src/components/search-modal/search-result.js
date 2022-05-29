import { default as React } from "react";
import { Link } from "gatsby";
import {
  connectStateResults,
  Highlight,
  Hits,
  Index,
  Snippet,
  PoweredBy,
} from "react-instantsearch-dom";
import styled, { css } from "styled-components";

//style
const Count = styled.div({
  span: {
    fontFamily: "var(--poppins)",
    background: "var(--search-form-result-count)",
    display: "inline-block",
    borderRadius: "10px",
    padding: ".3em 1em",
  },
});
//mark up
const HitCount = connectStateResults(({ searchResults }) => {
  const hitCount = searchResults && searchResults.nbHits;
  return hitCount > 0 ? (
    <Count className="HitCount">
      <span>
        {hitCount} result{hitCount !== 1 ? `s` : ``}
      </span>
    </Count>
  ) : null;
});

//style
const Title = styled.h4({
  margin: "0",
});
const ItemStyle = css({
  background: "var(--search-form-result-item)",
  padding: "1.5em 2em",
  borderRadius: "10px",
  boxShadow: "var(--search-form-result-item-shadow)",
  mark: {
    background: "none",
    color: "var(--search-form-result-mark)",
    fontSize: "1.5em",
  },
  "&:focus,&:hover,&.active": {
    background: "var(--secondary)",
    color: "var(--white)",
    cursor: "pointer",
    "*": {
      outline: "0",
      border: "none",
    },
  },
});
const Item = styled.div(
  {
    display: "grid",
    gap: ".5em",
    marginBlockEnd: ".8em",
  },
  ItemStyle
);

//mark up
const PageHit = ({ hit }) => (
  <Item>
    <Link to={`/blog/post/${hit.slug}`}>
      <Title>
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </Title>
    </Link>
    <Snippet attribute="excerpt" hit={hit} tagName="mark" />
  </Item>
);

//mark up
const HitsInIndex = ({ index }) => (
  <Index indexName={index.name}>
    <HitCount />
    <Hits className="Hits" hitComponent={PageHit} />
  </Index>
);

//style
const SearchPopover = styled.div({
  overflowY: "scroll",
  overflowX: "hidden",
  maxHeight: "50vh",
  direction: "ltr",
  WebkitOverflowScrolling: "touch",
  position: "relative",
  zIndex: "100",
  marginBlockStart: ".5em",
  paddingInline: "1em",
  borderRadius: "2px",
  background: ({ theme }) => theme.background,
  display: (props) => props.show,
});
const Result = styled.div({});
const SearchBy = styled(PoweredBy)({
  fontFamily: "var(--poppins)",
  display: "flex",
  gap: ".5em",
  justifyContent: "flex-end",
  alignItems: "center",
});
//mark up
const SearchResult = ({ indices, show }) => {
	return (
    <SearchPopover show={show ? `block` : `none`}>
        <Result>
          {indices.map((index) => (
            <HitsInIndex index={index} key={index.name} />
          ))}
          <SearchBy />
        </Result>
    </SearchPopover>
  );
};
export default SearchResult;
