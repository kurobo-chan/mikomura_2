import * as React from "react";
import Layout from "../components/layout";
import { Link, graphql } from "gatsby";
import { GridLayout } from "../components/grid-layout";
import { PostTitle } from "../components/post-style";
import SEO from "../components/seo";
import styled, { css } from "styled-components";

//style
const Count = styled.span({
  color: "var(--tag-color)",
});
const TagLayout = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: ".25em",
});
const TagLink = styled(Link)(
  {
    textTransform: "capitalize",
    fontFamily: "var(--poppins)",
  },
  TagLayout
);
const TagBlock = styled.ul({
  display: "grid",
  gap: ".25em",
});
//mark up
const TagList = ({ data, location }) => {
  const gridElements = data.pages.group;
  return (
    <Layout>
      <SEO
        pagetitle="タグリスト"
        pagedesc="タグ一覧"
        pagepath={location.pathname}
      />
      <GridLayout as={`main`}>
        <PostTitle content={`"🛸"`}>tags</PostTitle>
        <TagBlock>
          {gridElements.map((group) => {
            const key = group.tag;
            const slug = group.tag;
            const title = group.tag;
            const count = group.totalCount;
            return (
              <li key={key}>
                <TagLink to={`/tags/${slug}/`}>
                  <span>{title}</span>
                  <Count>{`(${count})`}</Count>
                </TagLink>
              </li>
            );
          })}
        </TagBlock>
      </GridLayout>
    </Layout>
  );
};
export default TagList;

export const query = graphql`
  query {
    pages: allMarkdownRemark(
      sort: { order: DESC, fields: frontmatter___date }
      filter: { fileAbsolutePath: { regex: "/blog/" } }
    ) {
      group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
    }
  }
`;
