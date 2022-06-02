import * as React from "react";
import Layout from "../components/layout";
import { PostTitle } from "../components/post-style";
import { GridLayout } from "../components/grid-layout";
import SEO from "../components/seo";
import From from "../components/contact/form";

const Contact = ({ location }) => {
  return (
    <Layout>
      <SEO
        pagetitle="contact"
        pagedesc="お問い合わせ"
        pagepath={location.pathname}
      />
      <GridLayout as={`main`}>
        <PostTitle content={`"📧"`}>contact us</PostTitle>
        <div>
          <From />
        </div>
      </GridLayout>
    </Layout>
  );
};
export default Contact;
