const indexName = `Pages`;

const pageQuery = `{
  pages: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/blog/"}}) {
    edges {
      node {
		id
        excerpt(pruneLength: 5000)
        frontmatter {
          title
          slug
          date(formatString: "YYYY年DD月MM日")
          id
        }
      }
    }
  }
}`;

function pageToAlgoliaRecord({ node: { id, frontmatter, ...rest } }) {
  return {
    objectID: id,
    ...frontmatter,
    ...rest,
  };
}

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => data.pages.edges.map(pageToAlgoliaRecord),
    indexName,
    settings: {
      attributesToSnippet: [`excerpt:20`],
      queryLanguages: ["ja"],
    },
  },
];

module.exports = queries;
