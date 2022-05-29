import React, { useEffect, useState } from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import { GridLayout } from "../components/grid-layout";
import SEO from "../components/seo";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import {
  PostTitle,
  TimeStyle,
  TagStyle,
  TitleBlock,
  TitleSubBlock,
} from "../components/post-style";
import styled from "styled-components";
import IconMore from "../components/icons/icon-more";
import SearchModal from "../components/search-modal/search-index";

// style
const Actions = styled.nav({
  display: "flex",
  gap: "1em",
  justifyContent: "flex-end",
  alignItems: "center",
});
const ViewAllButton = styled(Link)({
  "--min-size": "16",
  "--max-size": "20",
  fontSize: "var(--clamp-size)",
  color: "var(--blog-actions)",
  fontFamily: "var(--poppins)",
});
const Title = styled.h2({
  "--min-size": "16",
  "--max-size": "24",
  fontSize: "var(--clamp-size)",
  fontWeight: "normal",
  marginBlockEnd: "calc(var(--clamp-size) / 2)",
  display: "flex",
  flexWrap: "wrap",
});
const Figure = styled.figure({
  "--min-size": "50",
  "--max-size": "100",
  width: "var(--clamp-size)",
  height: "var(--clamp-size)",
});
const Article = styled.article({
  display: "grid",
  gridAutoFlow: "column",
  gap: "1em",
  justifyContent: "flex-start",
  alignItems: "center",
  overflow: "auto",
});
const SectionFoot = styled.div({
  display: "grid",
  placeContent: "center",
});
const Button = styled.button({
  "--min-size": "16",
  "--max-size": "24",
  fontSize: " var(--clamp-size)",
  fontWeight: "700",
  color: "var(--more-button)",
  fontFamily: "var(--poppins)",
  textTransform: "capitalize",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: ".5em",
});
const NoMore = styled(Button)({
  color: "var(--no-more-color)",
});
// mark up
const Blog = ({ data, location }) => {
  const gridElements = data.allMarkdownRemark.edges;
  const allGridElements = gridElements;
  const [list, setList] = useState([...allGridElements.slice(0, 6)]);
  const [loadMore, setLoadMore] = useState(false);
  const [hasMore, setHasMore] = useState(allGridElements.length > 6);
  const handleLoadMore = () => {
    setLoadMore(true);
  };
  useEffect(() => {
    if (loadMore && hasMore) {
      const currentLength = list.length;
      const isMore = currentLength < allGridElements.length;
      const nextResults = isMore
        ? allGridElements.slice(currentLength, currentLength + 10)
        : [];
      setList([...list, ...nextResults]);
      setLoadMore(false);
    }
  }, [loadMore, hasMore]);
  useEffect(() => {
    const isMore = list.length < allGridElements.length;
    setHasMore(isMore);
  }, [list]);

  return (
    <Layout>
      <SEO
        pagetitle="ブログ"
        pagedesc="ブログ一覧"
        pagepath={location.pathname}
      />
      <GridLayout as={`main`}>
        <TitleBlock>
          <PostTitle content={`"🖼️"`}>blog</PostTitle>
          <Actions>
            <SearchModal />
            <ViewAllButton to={`/tag-list/`}>View all tags</ViewAllButton>
          </Actions>
        </TitleBlock>
        {list.map(({ node }) => (
          <Article key={node.frontmatter.id}>
            <Figure>
              <GatsbyImage
                image={getImage(node.frontmatter.eyecatch)}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Figure>
            <div>
              <Link to={`/blog/post/${node.frontmatter.slug}/`}>
                <Title>{node.frontmatter.title}</Title>
              </Link>
              <TitleSubBlock>
                <TimeStyle
                  dateTime={node.frontmatter.date}
                  fontFamily={`var(--poppins)`}
                >
                  {node.frontmatter.date}
                </TimeStyle>
                <TagStyle>
                  {node.frontmatter.tags.map(
                    (tag) =>
                      tag && (
                        <li>
                          <Link to={`/tags/${tag}/`}>#{tag}</Link>
                        </li>
                      )
                  )}
                </TagStyle>
              </TitleSubBlock>
            </div>
          </Article>
        ))}
        <SectionFoot>
          {hasMore ? (
            <Button onClick={handleLoadMore}>
              <span>view more</span>
              <IconMore />
            </Button>
          ) : (
            <NoMore as={`p`}>🙇‍♀️ No more results</NoMore>
          )}
        </SectionFoot>
      </GridLayout>
    </Layout>
  );
};
export default Blog;

export const query = graphql`
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
            title
            tags
            date
            eyecatch {
              childImageSharp {
                gatsbyImageData(
                  sizes: "100%"
                  formats: [AUTO, WEBP, AVIF]
                  placeholder: BLURRED
                  jpgOptions: { quality: 50 }
                )
              }
            }
          }
        }
      }
    }
  }
`;
