const { resolve } = require("path");
const path = require("path");

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const blogresult = await graphql(`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/blog/" } }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              id
              slug
              tags
            }
          }
          next {
            frontmatter {
              slug
              title
            }
          }
          previous {
            frontmatter {
              slug
              title
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(
        sort: { order: DESC, fields: frontmatter___date }
        filter: { fileAbsolutePath: { regex: "/blog/" } }
      ) {
        group(field: frontmatter___tags) {
          tag: fieldValue
        }
      }
    }
  `);

  if (blogresult.errors) {
    reporter.panicOnBuild(`GraphQL のクエリでエラーが発生しました`);
    return;
  }

  blogresult.data.allMarkdownRemark.edges.forEach(
    ({ node, next, previous }) => {
      createPage({
        path: `/blog/post/${node.frontmatter.slug}/`,
        component: path.resolve(`./src/templates/blogpost-template.js`),
        context: {
          id: node.frontmatter.id,
          next,
          previous,
        },
      });
    }
  );
  const tags = blogresult.data.tagsGroup.group;
  const tagTemplate = path.resolve(`./src/templates/tags-template.js`);
  tags.forEach((tag) => {
    createPage({
      path: `/tags/${tag.tag}/`,
      component: tagTemplate,
      context: {
        tag: tag.tag,
      },
    });
  });
};
