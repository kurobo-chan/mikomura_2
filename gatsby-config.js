module.exports = {
  siteMetadata: {
    title: `mikomura_site`,
    siteUrl: `https://mikomura.dev`,
    description: `独学でWebサイト制作のスキルを取得中。技術/スキルで楽しみながら役立ちたいと考え、ここで自分が学習したことをブログにしたり作品を置いたりしています。`,
    lang: `ja`,
    locale: `ja_JP`,
    fbappid: `377567267303069`,
  },
  plugins: [
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "markdown",
        path: `${__dirname}/src/data/blog`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "markdown",
        path: `${__dirname}/src/data/images`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "markdown",
        path: `${__dirname}/src/data`,
      },
    },
    "gatsby-plugin-dark-mode",
    {
      resolve: `gatsby-plugin-google-fonts-v2`,
      options: {
        fonts: [
          {
            family: "Poppins",
            weights: ["400", "500", "700", "900"],
          },
          {
            family: "Noto Sans JP",
            weights: ["400", "500", "700", "900"],
          },
        ],
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-prismjs-title",
            options: {
              className: "code-title",
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `100`,
              className: `anchor`,
              maintainCase: true,
              removeAccents: true,
              isIconAfterHeader: true,
              elements: [`h2`, `h3`, `h4`],
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              linkImagesToOriginal: true,
              showCaptions: ["title"],
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        allowList: [
          "GATSBY_ALGOLIA_APP_ID",
          "GATSBY_ALGOLIA_SEARCH_KEY",
          "ALGOLIA_ADMIN_KEY",
          "GMAIL_ADDRESS",
          "GMAIL_PASSWORD",
        ],
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries: require("./src/utils/algolia-queries"),
      },
    },
  ],
};
