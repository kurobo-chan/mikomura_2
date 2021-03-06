import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle({
  ":root": {
    /* Color styles */
    "--black": " #222222",
    "--gray": "#666666",
    "--light-gray": "#CCCCCC",
    "--x-light-gray": "#EEEEEE",
    "--xx-light-gray": " #F0F0F0",
    "--white": "#ffffff",

    "--primary": "#C51162",
    "--primary-light": "#BE5E89",
    "--primary-light-grad":
      "linear-gradient(261.25deg, #BBA1AD -18.96%, #BE5E89 115.67%)",
    "--x-primary-light-gradient":
      "linear-gradient(180deg, #FFE4F0 0%, #FFF8FB 0.01%, #FFE4F0 100%)",
    "--primary-light-transparent": "rgba(190, 94, 137, 0.5)",
    "--primary-gray-transparent": "rgba(9, 1, 4, 0.5)",
    "--primary-light-gray": "#F1E7EC",
    "--primary-secondary-gradients":
      "linear-gradient(267.77deg, #26D1FF -20.32%, #C51162 119.25%)",

    "--secondary": "#26D1FF",
    "--x-secondary-grad":
      "linear-gradient(123.87deg, #D1F5FF 19.52%, #F7FDFF 81.45%)",

    "--accent": "#FFF259",
    "--accent-dark": "#9C9336",
    "--accent-light": "#FFFCD2",

    "--x-primary-dark-grad":
      "linear-gradient(90.44deg, #120209 0.41%, #C51162 167.93%)",
    "--primary-mix-blend-mode-color": "#FFDAEB",
    "--primary-mix-blend-mode": "difference",

    /* Font styles */
    "--noto-sans-j-p": "'Noto Sans JP', sans-serif",
    "--poppins": "'Poppins', sans-serif",
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
    "--site-name": "var(--primary)",
    "--border": "var(--xx-light-gray)",
    "--link": "var(--primary-light)",
    "--text": "var(--black)",
    "--mix-blend-mode": "normal",
    "--text-secondary": "var(--primary-light)",
    "--hero-title-text": "var(--primary-secondary-gradients)",
    "--hero-title-sub-text": "var(--gray)",
    "--nav-color": "var(--gray)",
    "--copy-light": "var(--gray)",
    "--search-icon": "var(--gray)",
    "--search-bg": "var(--primary-gray-transparent)",
    "--search-form-input-bg": "var(--x-light-gray)",
    "--search-form-input-border": "var(--primary-light-transparent)",
    "--search-form-input-text": "var(--black)",
    "--search-form-input-reset": "var(--primary)",
    "--search-form-input-reset-bg": "var(--white)",
    "--search-form-input-shadow": "0px 0px 0px 1px rgba(0, 0, 0, 0.3)",
    "--search-form-result-item": "var(--x-secondary-grad)",
    "--search-form-result-item-shadow": "0 1px 2px 0 rgba(0,0,0,.05)",
    "--search-form-result-mark": "var(--primary)",
    "--search-form-result-count": "var(--xx-light-gray)",
    "--search-form-result-white": "var(--white)",
    "--search-form-result-faded": "rgba(204,204,204,.5)",
    "--search-form-result-foreground": "var(--black)",
    "--search-modal-bg": "var(--white)",
    "--search-modal-box-shadow":
      "0px 0px 1px rgba(0, 0, 0, 0.03), 0px 10px 32px -5px rgba(0, 0, 0, 0.1)",
    "--search-modal-border": "var(--xx-light-gray)",
    "--search-modal-nav-bg": "var(--x-light-gray)",
    "--search-modal-nav-bg-border": "var(--light-gray)",
    "--search-modal-nav-text": "var(--light-gray)",
    "--search-modal-nav-icon": "var(--primary-light)",
    "--search-modal-title": "var(--gray)",
    "--search-modal-searches": "var(--black)",
    "--contact-form-button": "var(--primary-secondary-gradients)",
    "--contact-form-thank-text": "var(--primary-secondary-gradients)",
    "--post-figure-shadow":
      "0px 16px 16px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.15), 0px 8px 8px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.15)",
    "--post-view-more-button": "var(--primary-light)",
    "--dark-mode-icon": "var(--accent)",
    "--dark-mode-icon-transparent": "transparent",
    "--post-body-h2": "var(--primary)",
    "--post-list-mark-color": "var(--primary)",
    "--post-list-num-color": "var(--primary-light)",
    "--post-list-num-color2": "var(--secondary)",
    "--post-list-num-color3": "var(--accent)",
    "--post-body-link": "var(--primary-light)",
    "--post-date": "var(--gray)",
    "--tag-color": "var(--primary-light)",
    "--about-title-h2": "var(--gray)",
    "--blog-actions": "var(--gray)",
    "--more-button": "var(--primary)",
    "--no-more-color": "var(--secondary)",
    "--contact-input-bg": "var(--white)",
    "--contact-input-text": "var(--black)",
    "--contact-border": "var(--light-gray)",
    "--contact-border-focus": "var(--primary)",
    "--contact-placeholder": "var(--gray)",
    "--contact-alert-bg": "var(--white)",
    "--contact-alert-color": "var(--accent)",
    "--contact-button": "var(--primary-secondary-gradients)",
    "--contact-button-hover": "var(--gray)",
    "--contact-button-text": "var(--white)",
  },
  "body.dark": {
    /* dark-mode */
    "-webkit-font-smoothing": "antialiased",
    "--bg": "var(--x-primary-dark-grad)",
    "--site-name": "var(--white)",
    "--border": "var(--xx-light-gray)",
    "--link": "var(--primary-light)",
    "--text": "var(--primary-mix-blend-mode-color)",
    "--mix-blend-mode": "--primary-mix-blend-mode",
    "--text-secondary": "var(--primary-light)",
    "--hero-title-text": "var(--primary-secondary-gradients)",
    "--hero-title-sub-text": "var(--primary-mix-blend-mode-color)",
    "--nav-color": "var(--primary-mix-blend-mode-color)",
    "--copy-light": "var(--gray)",
    "--search-icon": "var(--gray)",
    "--search-bg": "var(--primary-gray-transparent)",
    "--search-form-input-bg": "var(--x-light-gray)",
    "--search-form-input-border": "var(--primary-light-transparent)",
    "--search-form-input-reset": "var(--primary)",
    "--search-form-input-reset-bg": "var(--white)",
    "--search-modal-bg": "var(--white)",
    "--search-modal-box-shadow":
      "0px 0px 1px rgba(0, 0, 0, 0.03), 0px 10px 32px -5px rgba(0, 0, 0, 0.1)",
    "--search-modal-border": "var(--xx-light-gray)",
    "--search-modal-nav-bg": "var(--x-light-gray)",
    "--search-modal-nav-text": "var(--light-gray)",
    "--search-modal-nav-icon": "var(--primary-light)",
    "--search-modal-title": "var(--gray)",
    "--search-modal-searches": "var(--black)",
    "--search-modal-input-shadow": "0px 0px 0px 1px rgba(0, 0, 0, 0.6)",
    "--search-modal-input-bg": "var(--x-light-gray)",
    "--search-modal-input-inner": "rgba(204,204,204,.5)",
    "--contact-form-button": "var(--primary-secondary-gradients)",
    "--contact-form-thank-text": "var(--primary-secondary-gradients)",
    "--post-figure-shadow":
      "0px 16px 16px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.15), 0px 8px 8px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.15)",
    "--post-view-more-button": "var(--primary-light)",
    "--dark-mode-icon": "var(--primary)",
    "--dark-mode-icon-transparent": "transparent",
    "--post-body-h2": "var(--white)",
    "--post-list-mark-color": "var(--accent-light)",
    "--post-list-num-color": "var(--primary-light)",
    "--post-list-num-color2": "var(--secondary)",
    "--post-list-num-color3": "var(--accent)",
    "--post-body-link": "var(--primary-light)",
    "--post-date": "var(--gray)",
    "--tag-color": "var(--primary-light)",
    "--about-title-h2": "var(--xx-light-gray)",
    "--blog-actions": "var(--gray)",
    "--more-button": "var(--primary)",
    "--no-more-color": "var(--secondary)",
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
  "body,h1,h2,h3,p,ul,ol,dl,dt,dd,figure": {
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
});
export default GlobalStyle;
