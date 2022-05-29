import * as React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { convert } from "html-to-text";
import rehypeReact from "rehype-react";
import { GridLayout } from "../components/grid-layout";
import {
  PostTitle,
  PostStyle,
  TimeStyle,
  TagStyle,
  TitleSubBlock,
} from "../components/post-style";
import styled from "styled-components";
import "prismjs/themes/prism-solarizedlight.css";

const BlogPost = ({ data, location, pageContext }) => {
  const grid = data.markdownRemark;
  const image = getImage(grid.frontmatter.eyecatch);
  const seoImageGrid = grid.frontmatter.eyecatch.childImageSharp.original;
  const FigStyle = styled.figure({
    boxShadow: "var(--post-figure-shadow)",
  });
  const PostHead = styled.div({
    display: "grid",
    gap: "1em",
  });
  const renderAst = new rehypeReact({
    createElement: React.createElement,
    Fragment: React.Fragment,
    components: {
      a: (props) => {
        return <a href={props.children}>{props.children}</a>;
      },
    },
  }).Compiler;

  return (
    <Layout>
      <SEO
        pagetitle={grid.frontmatter.title}
        pagedesc={`${convert(grid.html, {
          selectors: [
            { selector: "a", options: { ignoreHref: true } },
            { selector: "img", format: "skip" },
          ],
        }).slice(0, 70)}…`}
        pagepath={location.pathname}
        blogimg={`https:/${seoImageGrid.src}`}
        pageimgw={seoImageGrid.width}
        pageimgh={seoImageGrid.height}
      />
      <GridLayout as={`main`}>
        <PostHead>
          <PostTitle
            fontFamily={`var(--noto-sans-j-p)`}
            content={`"🎉"`}
            lineHeight={`1.3`}
          >
            {grid.frontmatter.title}
          </PostTitle>
          <TitleSubBlock>
            <TimeStyle dateTime={grid.frontmatter.date}>
              {grid.frontmatter.dateJP}
            </TimeStyle>
            <TagStyle>
              {grid.frontmatter.tags.map(
                (tag) =>
                  tag && (
                    <li>
                      <Link to={`/tags/${tag}/`}>#{tag}</Link>
                    </li>
                  )
              )}
            </TagStyle>
          </TitleSubBlock>
          <FigStyle>
            <GatsbyImage image={image} alt="" />
          </FigStyle>
        </PostHead>
        <PostStyle fontFamily={`var(--noto-sans-j-p)`}>
          {renderAst(grid.htmlAst)}
        </PostStyle>
        <ul>
          {pageContext.next && (
            <li>
              <Link
                to={`/blog/post/${pageContext.next.frontmatter.slug}/`}
                rel="prev"
              >
                <span>{pageContext.next.frontmatter.title}</span>
              </Link>
            </li>
          )}
          {pageContext.previous && (
            <li>
              <Link
                to={`/blog/post/${pageContext.previous.frontmatter.slug}/`}
                rel="next"
              >
                <span>{pageContext.previous.frontmatter.title}</span>
              </Link>
            </li>
          )}
        </ul>
      </GridLayout>
    </Layout>
  );
};
export default BlogPost;

export const query = graphql`
  query ($id: String!) {
    markdownRemark(frontmatter: { id: { eq: $id } }) {
      htmlAst
      frontmatter {
        dateJP: date(formatString: "YYYY年MM月DD日")
        date
        slug
        tags
        title
        eyecatch {
          childImageSharp {
            original {
              src
              height
              width
            }
            gatsbyImageData(
              aspectRatio: 1.7
              formats: [AUTO, WEBP, AVIF]
              layout: FULL_WIDTH
              placeholder: BLURRED
              jpgOptions: { quality: 50 }
            )
          }
        }
      }
    }
  }
`;
