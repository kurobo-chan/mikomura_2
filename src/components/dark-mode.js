import * as React from "react";
import { ThemeToggler } from "gatsby-plugin-dark-mode";
import styled from "styled-components";

const DarkModeButton = styled.button({
  "&.dark-mode-button": {
    opacity: "0.65",
    position: "relative",
    borderRadius: "5px",
    width: "40px",
    height: "25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "opacity .3s ease",
    "&:hover,:focus": {
      opacity: "1",
    },
  },
  ".month-icon": {
    position: "relative",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "var(--dark-mode-icon-transparent)",
    transform: "scale(1)",
    transition: "all 0.45s ease",
    overflow: "hidden",
    boxShadow: "inset 8px -8px 0px 0px var(--dark-mode-icon)",
    "&::before": {
      content: "''",
      position: "absolute",
      right: "-9px",
      top: "-9px",
      height: "24px",
      width: "24px",
      border: "none",
      borderRadius: "50%",
      transform: "translate(0,0)",
      opacity: "1",
      transition: "transform 0.45s ease",
    },
    "&::after": {
      content: "''",
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      margin: "-4px 0 0 -4px",
      position: "absolute",
      top: "50%",
      left: "50%",
      boxShadow:
        "0 -23px 0 var(--dark-mode-icon),0 23px 0 var(--dark-mode-icon),23px 0 0 var(--dark-mode-icon),-23px 0 0 var(--dark-mode-icon),15px 15px 0 var(--dark-mode-icon),-15px 15px 0 var(--dark-mode-icon),15px -15px 0 var(--dark-mode-icon),-15px -15px 0 var(--dark-mode-icon)",
    },
  },
  ".sun-icon": {
    position: "relative",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    border: "4px solid var(--dark-mode-icon)",
    backgroundColor: "var(--dark-mode-icon)",
    transform: "scale(0.55)",
    transition: "all 0.45s ease 0s",
    overflow: "visible",
    boxShadow: "none",
    "&::before": {
      content: "''",
      position: "absolute",
      right: "-9px",
      top: "-9px",
      height: "24px",
      width: "24px",
      border: "2px solid var(--dark-mode-icon)",
      borderRadius: "50%",
      transform: "translate(14px,-14px)",
      opacity: "0",
      transition: "transform 0.45s ease 0s",
    },
    "&::after": {
      content: "''",
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      margin: "-4px 0px 0px -4px",
      position: "absolute",
      top: "50%",
      left: "50%",
      boxShadow:
        "0 -23px 0 var(--dark-mode-icon),0 23px 0 var(--dark-mode-icon),23px 0 0 var(--dark-mode-icon),-23px 0 0 var(--dark-mode-icon),15px 15px 0 var(--dark-mode-icon),-15px 15px 0 var(--dark-mode-icon),15px -15px 0 var(--dark-mode-icon),-15px -15px 0 var(--dark-mode-icon)",
      transform: "scale(1)",
      transition: "all 0.35s ease 0s",
    },
  },
});
const DarkMode = () => {
  return (
    <ThemeToggler>
      {({ theme, toggleTheme }) => (
        <DarkModeButton
          type="button"
          onClick={() => {
            theme === "dark" ? toggleTheme("light") : toggleTheme("dark");
          }}
          className="dark-mode-button"
        >
          <div className={theme === "dark" ? "sun-icon" : "month-icon"}></div>
        </DarkModeButton>
      )}
    </ThemeToggler>
  );
};
export default DarkMode;
