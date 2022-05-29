import * as React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

const SEO = (props) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          siteUrl
          lang
          description
          fbappid
          locale
        }
      }
    }
  `);
  const title = props.pagetitle
    ? `${props.pagetitle} | ${data.site.siteMetadata.title}`
    : data.site.siteMetadata.title;
  const description = props.pagedesc || data.site.siteMetadata.description;
  const url = props.pagepath
    ? `${data.site.siteMetadata.siteUrl}${props.pagepath}`
    : data.site.siteMetadata.siteUrl;
  const imgurl = props.pageimg
    ? `${data.site.siteMetadata.siteUrl}${props.siteimg}`
    : props.blogimg || `${data.site.siteMetadata.siteUrl}/thumb.svg`;
  const imgw = props.pageimgw || 1280;
  const imgh = props.pageimgh || 640;
  return (
    <Helmet>
      <html lang={data.site.siteMetadata.lang}></html>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:site_name" content={data.site.siteMetadata.title} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={data.site.siteMetadata.locale} />
      <meta property="fb:app_id" content={data.site.siteMetadata.fbappid} />
      <meta property="og:image" content={imgurl} />
      <meta property="og:image:width" content={imgw} />
      <meta property="og:image:height" content={imgh} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="norton-safeweb-site-verification"
        content="6sd37xu7o3nrd1kovhs8d40myln7eh2t957ijunhgobjcwm2elspk90h8rju0k3wxgvxzzof8er6hfpwyq-zxhjiepkss1vgpviezii9j6wccviuduz8wri4yqwo1jl1"
      />
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8603825343658833"
        crossorigin="anonymous"
      ></script>
    </Helmet>
  );
};
export default SEO;
