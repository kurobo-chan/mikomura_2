import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle({
  ":root": {
    /* Color styles */
    "--black": "#263238",
    "--white": "#ffffff",
    "--primary": "#607d8b",
    "--secondary": "#626a99",
    "--accent": "#62998e",
    "--primary-light": "#8eacbb",
    "--primary-light-white": "#f1f2f3",
    "--gradColor": "linear-gradient(261.06deg, #62998e 15.65%, #35406b 87.75%)",
    "--gradLightColor":
      "linear-gradient(256.4deg, rgba(98, 153, 142, 0.8) 0%, rgba(53, 64, 107, 0.8) 99.78%)",

    /* Font styles */
    "--noto-sans-j-p": "'Noto Sans JP', sans-serif",
    "--open-sans": "'Open Sans', sans-serif",
    /* Basic Size */
    "--size1-half": "calc(var(--size1) / 2)",
    "--size1": "4vw",
    "--size2": "calc(var(--size1) * 2)",
    "--size3": "calc(var(--size1) * 3)",
    "--size4": "calc(var(--size1) * 4)",
  },
  "body.light": {
    /* light-mode */
    "--bg": "var(--white)",
    "--text": "var(--black)",
    "--text-secondary": "var(--primary-light)",
    "--hero-text": "var(--gradColor)",
    "--title-text": "var(--primary)",
    "--search-form-input-bg": "var(--primary-light-white)",
    "--search-form-input-reset": "var(--primary)",
    "--search-form-input": "var(--primary-light)",
    "--search-form-bg": "rgba(38, 50, 56, 0.5)",
    "--search-form-line": "var(--primary-light-white)",
    "--search-form-icon-bg": "var(--primary-light-white)",
    "--contact-form-button": "var(--gradColor)",
    "--contact-form-thank-text": "var(--gradColor)",
    "--post-figure-shadow":
      "0px 16px 16px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.15), 0px 8px 8px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.15)",
    "--post-text-link": "var(--accent)",
    "--copy-light": "var(--primary-light)",
    "--view-more-button": "var(--primary)",
    "--dark-mode-icon": "var(--black)",
    "--dark-mode-icon-transparent": "transparent",
  },
  "body.dark": {
    /* dark-mode */
    "-webkit-font-smoothing": "antialiased",
    "--bg": "var(--black)",
    "--text": "var(--white)",
    "--text-secondary": "var(--accent)",
    "--hero-text": "linear-gradient(261.06deg, #BFD8D3 15.65%, #C8CCDC 87.75%)",
    "--title-text": "var(--primary)",
    "--search-form-input-bg": "var(--primary-light-white)",
    "--search-form-input-reset": "var(--primary)",
    "--search-form-input": "var(--primary-light)",
    "--search-form-bg": "rgba(38, 50, 56, 0.5)",
    "--search-form-line": "var(--primary-light-white)",
    "--search-form-icon-bg": "var(--primary-light-white)",
    "--contact-form-button": "var(--gradColor)",
    "--contact-form-thank-text": "var(--gradColor)",
    "--post-figure-shadow":
      "0px 16px 16px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.15), 0px 8px 8px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.15)",
    "--post-text-link": "var(--accent)",
    "--copy-light": "var(--primary-light)",
    "--view-more-button": "var(--primary)",
    "--dark-mode-icon": "var(--primary-light-white)",
    "--dark-mode-icon-transparent": "transparent",
  },
  body: {
    fontFamily: "var(--noto-sans-j-p)",
    color: "var(--text)",
    background: "var(--bg)",
    transition: "all 0.25s linear",
  },
  "*,*::before,*::after": {
    boxSizing: "border-box",
  },
  "body,h1,h2,h3,p,ul,figure": {
    margin: "0",
    padding: "0",
    listStyle: "none",
  },
  a: {
    color: "inherit",
    textDecoration: "none",
  },
  "a:hover": {
    opacity: "0.9",
  },
  img: {
    maxWidth: "100%",
    height: "auto",
    objectFit: "cover",
  },
  button: {
    border: "none",
    outline: "none",
    background: "none",
    cursor: "pointer",
    padding: "0",
    appearance: "none",
  },
  /* Clamp y=ax + b*/
  "*, *::before, *::after": {
    "--min-size": "24",
    "--max-size": "64",
    "--min-viewport": "375",
    "--max-viewport": "1440",
    "--slope":
      "calc(var(--max-size) - var(--min-size)) /(var(--max-viewport) - var(--min-viewport))",
    "--intercept": "calc(var(--min-size) - var(--slope) * var(--min-viewport))",
    "--fluid-size": "calc(var(--slope) * 100vw + var(--intercept) / 16 * 1rem)",
    "--clamp-size":
      "clamp(var(--min-size) / 16 * 1rem,var(--fluid-size),var(--max-size) / 16 * 1rem)",
  },
  /* Screen reader */
  ".sr-only": {
    clipPath: "inset(0,0,0,0)",
    position: "absolute",
    width: "1px",
    height: "1px",
    margin: "-1px",
    padding: "0",
    overflow: "hidden",
    border: "0",
  },
  /* GridContainer styles */
  ".container": {
    display: "grid",
    gridTemplateColumns: "repeat(2, var(--size1)) auto repeat(2, var(--size1))",
    marginBlockEnd: "var(--size4)",
    "@media (min-width: 768px)": {
      gridTemplateColumns: "auto 71vw auto",
    },
    "& > *": {
      gridColumn: "2/-2",
      "@media (min-width: 768px)": {
        marginInline: "var(--size1)",
      },
    },
  },
});
export default GlobalStyle;
