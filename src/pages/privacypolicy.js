import * as React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";

// styles

// data
export const query = graphql`
  query {
    allFile(filter: { name: { eq: "privacypolicy" } }) {
      edges {
        node {
          id
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`;
// markup
const PrivacyPolicy = ({ data }) => {
  return (
    <Layout>
      {data.allFile.edges.map((md) => (
        <div
          key={md.id}
          dangerouslySetInnerHTML={{
            __html: md.node.childMarkdownRemark.html,
          }}
        />
      ))}
    </Layout>
  );
};
export default PrivacyPolicy;
