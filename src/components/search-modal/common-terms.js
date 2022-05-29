import * as React from "react";
import styled from "styled-components";
import IconSearch from "../icons/icon-search";
import { graphql, Link, useStaticQuery } from "gatsby";

const CommonTerms = ({ show }) => {
  //data
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/blog/" } }
        sort: { order: DESC, fields: frontmatter___date }
        limit: 4
      ) {
        edges {
          node {
            frontmatter {
              id
              title
              slug
            }
          }
        }
      }
    }
  `);
  //style
  const Title = styled.h3({
    fontFamily: "var(--poppins)",
    fontSize: ".8em",
    color: "var(--search-modal-title)",
    textTransform: "capitalize",
    fontWeight: "400",
  });
  const SearchTitle = styled.h4({
    fontSize: "1em",
    fontWeight: "700",
    margin: "0",
  });
  const SearchLink = styled(Link)({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: ".6em",
  });
  const Search = styled.ul({
    display: "grid",
    gap: "1em",
  });
  const Searches = styled.div({
    display: (props) => props.show,
    gap: "1em",
  });

  //mark up
  const gridElements = data.allMarkdownRemark.edges;
  return (
    <Searches show={show ? `none` : `grid`}>
      <Title>common searches</Title>
      <Search>
        {gridElements.map(({ node }) => (
          <li key={node.frontmatter.id}>
            <SearchLink to={`/blog/post/${node.frontmatter.slug}`}>
              <IconSearch color={"var(--black)"} />
              <SearchTitle>{node.frontmatter.title}</SearchTitle>
            </SearchLink>
          </li>
        ))}
      </Search>
    </Searches>
  );
};
export default CommonTerms;
