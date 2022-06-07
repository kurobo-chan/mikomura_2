import { default as React, useState } from "react";
import { navigate } from "gatsby-link";
import {
  InputWrap,
  Input,
  From,
  SendBtnContainer,
  SendBtn,
  FocusInput,
} from "./style";
import IconAlert from "../icons/icon-alert";
import { useForm } from "react-hook-form";

const ContactFrom = () => {
  return (
    <React.Fragment>
      <From name="contact" action="/api/form" method="POST">
        <InputWrap>
          <Input type="text" name="name" required  />
          <FocusInput></FocusInput>
        </InputWrap>
        <InputWrap>
          <Input
            type="text"
            name="email"
            required
            
          />
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
            required
            
          />
          <FocusInput></FocusInput>
        </InputWrap>
        <SendBtnContainer>
          <SendBtn type="submit">send</SendBtn>
        </SendBtnContainer>
      </From>
    </React.Fragment>
  );
};
export default ContactFrom;
