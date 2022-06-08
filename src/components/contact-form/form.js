import { default as React, useState } from "react";
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
import { useForm } from "react-hook-form";
import axios from "axios";

const ContactFrom = () => {
  const [serverState, setServerState] = useState({
    submitting: false,
    status: null,
  });
  const handleServerResponse = (ok, msg, form) => {
    setServerState({
      submitting: false,
      status: { ok, msg },
    });
    if (ok) {
      form.reset();
    }
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    setServerState({ submitting: true });
    axios({
      method: "post",
      url: process.env.GETFORM_ENDPOINT,
      data: new FormData(form),
    })
      .then((r) => {
        handleServerResponse(true, "Thanks!", form);
      })
      .catch((r) => {
        handleServerResponse(false, r.response.data.error, form);
      });
  };
  return (
    <React.Fragment>
      <From
        name="contact"
        action="/api/form"
        method="POST"
        onSubmit={handleOnSubmit}
      >
        <InputWrap>
          <Input
            type="text"
            name="name"
            required="required"
            placeholder="name"
            aria-describedby="emailHelp"
          />
          <FocusInput></FocusInput>
        </InputWrap>
        <InputWrap>
          <Input
            type="email"
            name="email"
            required="required"
            placeholder="email address"
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
            required="required"
            placeholder="message"
          />
          <FocusInput></FocusInput>
        </InputWrap>
        <SendBtnContainer>
          <SendBtn type="submit" disabled={serverState.submitting}>
            send
          </SendBtn>
          {serverState.status && (
            <p className={!serverState.status.ok ? "errorMsg" : ""}>
              {serverState.status.msg}
            </p>
          )}
        </SendBtnContainer>
      </From>
    </React.Fragment>
  );
};
export default ContactFrom;
