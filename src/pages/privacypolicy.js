import * as React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import { PostTitle, PostStyle } from "../components/post-style";
import { GridLayout } from "../components/grid-layout";

// data
export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { title: { eq: "privacy policy" } } }
    ) {
      edges {
        node {
          html
          id
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
// markup
const PrivacyPolicy = ({ data }) => {
  const grid = data.allMarkdownRemark.edges;
  return (
    <Layout>
      {grid.map(({ node }) => (
        <GridLayout as={`main`}>
          <PostTitle content={`"🐹"`}>
            {node.frontmatter.title}
          </PostTitle>
          <PostStyle
            key={node.id}
            fontFamily={`var(--noto-sans-j-p)`}
            dangerouslySetInnerHTML={{
              __html: node.html,
            }}
          />
        </GridLayout>
      ))}
    </Layout>
  );
};
export default PrivacyPolicy;
