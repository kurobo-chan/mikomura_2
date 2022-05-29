import * as React from "react";
import styled from "styled-components";
import { useStaticQuery, graphql, Link } from "gatsby";

// styles
const NavStyle = styled.nav({
  ul: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "1em",
    flexWrap: "wrap",
  },
  a: {
    display: "block",
    textTransform: "capitalize",
    fontFamily: "var(--poppins)",
    color: "var(--nav-color)",
    mixBlendMode: "var(--primary-mix-blend-mode)",
  },
});
// data
const link = [
  {
    id: "homeID",
    className: "home",
    slug: "/",
    title: "home",
  },
  {
    id: "aboutID",
    className: "about",
    slug: "/about/",
    title: "about",
  },
  {
    id: "blogID",
    className: "blog",
    slug: "/blog/",
    title: "blog",
  },
  {
    id: "portfolioID",
    className: "portfolio",
    slug: "/portfolio/",
    title: "portfolio",
  },
  {
    id: "contactID",
    className: "contact",
    slug: "/contact/",
    title: "contact",
  },
];
// markup
const Nav = () => {
  return (
    <NavStyle>
      <ul>
        {link.map((li) => {
          return (
            <li key={li.id}>
              <Link to={li.slug} className={li.className}>
                {li.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </NavStyle>
  );
};
export default Nav;
