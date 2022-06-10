import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import {
  InputWrap,
  Input,
  From,
  SendBtnContainer,
  SendBtn,
  FocusInput,
} from "./style";
import IconAlert from "../icons/icon-alert";
import { ValidationError, useForm } from "@formspree/react";
import axios from "axios";

const ContactFrom = () => {
  const [state, handleSubmit] = useForm(`"${process.env.FORMSPREE_ENDPOINT}"`);
  if (state.succeeded) {
    return <div>Thank you for signing up!</div>;
  }
  return (
    <React.Fragment>
      <From name="contact" method="POST" onSubmit={handleSubmit}>
        <InputWrap>
          <Input type="text" name="name" placeholder="name" required />
          <ValidationError field="name" prefix="Name" errors={state.errors} />
          <FocusInput></FocusInput>
        </InputWrap>
        <InputWrap>
          <Input
            type="email"
            name="email"
            placeholder="email address"
            required
          />
          <ValidationError field="email" prefix="Email" errors={state.errors} />
          <FocusInput></FocusInput>
        </InputWrap>
        <InputWrap width={`100%`}>
          <Input
            as={`textarea`}
            name="message"
            height={`auto`}
            minHeight={`119px`}
            padding={`1.56em 1.25em 1em 1.56em`}
            fontSize={`1em`}
            lineHeight={`1.8`}
            overflow={`auto`}
            placeholder="message"
            required
          />
          <ValidationError
            field="message"
            prefix="Message"
            errors={state.errors}
          />
          <FocusInput></FocusInput>
        </InputWrap>
        <SendBtnContainer>
          <SendBtn type="submit" disabled={state.submitting}>
            send
          </SendBtn>
        </SendBtnContainer>
      </From>
    </React.Fragment>
  );
};
export default ContactFrom;
