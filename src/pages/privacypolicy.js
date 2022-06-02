import * as React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import { PostTitle, PostStyle } from "../components/post-style";
import { GridLayout } from "../components/grid-layout";
import SEO from "../components/seo";

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
const PrivacyPolicy = ({ data, location }) => {
  const grid = data.allMarkdownRemark.edges;
  return (
    <Layout>
      <SEO
        pagetitle="PrivacyPolicy"
        pagedesc="PrivacyPolicy || プライバシーポリシー"
        pagepath={location.pathname}
      />
      {grid.map(({ node }) => (
        <GridLayout as={`main`}>
          <PostTitle content={`"🐹"`}>{node.frontmatter.title}</PostTitle>
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
