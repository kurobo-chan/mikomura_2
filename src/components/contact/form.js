import { default as React, useState } from "react";
import { navigate } from "gatsby-link";
import {
  InputWrap,
  Input,
  FromUnit,
  SendBtnContainer,
  SendBtn,
  FocusInput,
} from "./form-style";
import IconAlert from "../icons/icon-alert";

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};
const From = () => {
  const [state, setState] = useState({});
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...state,
      }),
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch((error) => alert(error));
  };
  return (
    <FromUnit
      name="contact"
      method="post"
      action="/thanks/"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
    >
      <InputWrap>
        <Input
          type="text"
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
        <FocusInput></FocusInput>
      </InputWrap>
      <InputWrap>
        <Input
          type="text"
          name="email"
          placeholder="email"
          onChange={handleChange}
        />
        <FocusInput></FocusInput>
      </InputWrap>
      <InputWrap width={`100%`}>
        <Input
          as={`textarea`}
          name="message"
          placeholder="message"
          height={`auto`}
          minHeight={`119px`}
          padding={`1.56em 1.25em 1em 1.56em`}
          fontSize={`1em`}
          lineHeight={`1.8`}
          overflow={`auto`}
          onChange={handleChange}
        />
        <FocusInput></FocusInput>
      </InputWrap>
      <SendBtnContainer>
        <SendBtn type="submit">send</SendBtn>
      </SendBtnContainer>
    </FromUnit>
  );
};
export default From;
