import algoliasearch from "algoliasearch/lite";
import { createRef, default as React, useState, useMemo } from "react";
import { InstantSearch } from "react-instantsearch-dom";
import SearchBox from "./search-box";
import SearchResult from "./search-result";
import useClickOutside from "../use-click-outside";
import styled, { ThemeProvider } from "styled-components";
import CommonTerms from "./common-terms";
import ModalFoot from "./modal-foot";

//style
const theme = {
  background: "var(--search-form-result-white)",
  faded: "var(--search-form-result-faded)",
  foreground: "var(--search-form-result-foreground)",
};
const SearchRoot = styled.div({
  position: "relative",
  display: "grid",
  gap: "2em",
});
const ModalBody = styled.div({
  display: "grid",
  gap: "2em",
});

//mark up
const SearchUnit = ({ indices }) => {
  const rootRef = createRef();
  const [query, setQuery] = useState();
  const [hasFocus, setFocus] = useState(false);

  const searchClient = useMemo(
    () =>
      algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
      ),
    []
  );
  useClickOutside(rootRef, () => setFocus(false));

  return (
    <ThemeProvider theme={theme}>
      <SearchRoot ref={rootRef}>
        <InstantSearch
          searchClient={searchClient}
          indexName={indices[0].name}
          onSearchStateChange={({ query }) => setQuery(query)}
        >
          <header>
            <SearchBox
              onFocus={() => setFocus(true)}
              hasFocus={hasFocus}
            />
          </header>
          <ModalBody>
            <CommonTerms show={query && query.length > 0 && hasFocus} />
            <SearchResult
              show={query && query.length > 0 && hasFocus}
              indices={indices}
            />
            <ModalFoot />
          </ModalBody>
        </InstantSearch>
      </SearchRoot>
    </ThemeProvider>
  );
};
export default SearchUnit;
