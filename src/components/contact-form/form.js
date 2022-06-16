import React, { useState } from "react";
import {
  InputWrap,
  Input,
  FromBlock,
  SendBtnContainer,
  SendBtn,
  FocusInput,
} from "./style";
import IconAlert from "../icons/icon-alert";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

const ContactFrom = () => {
  const [serverState, setServerState] = useState({});

  const formSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("このフィールドは必須です"),
    email: Yup.string()
      .email("入力したデータが正しい形式ではありません")
      .required("このフィールドは必須です"),
    message: Yup.string().required("このフィールドは必須です"),
  });

  const handleServerResponse = (ok, msg) => {
    setServerState({ ok, msg });
  };

  const handleOnSubmit = async (values, actions) => {
    try {
      await axios({
        method: "POST",
        url: process.env.GATSBY_CONTACT_FORM,
        data: values,
      });

      actions.setSubmitting(false);
      actions.resetForm();
      handleServerResponse(true, "Thanks!");
    } catch (err) {
      actions.setSubmitting(false);
      handleServerResponse(false, err);
    }
  };
  const Errors = styled.div({
    display: "grid",
    gridAutoFlow: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: ".5em",
  });
  const ErrorText = styled.span({
    color: "var(--primary-light)",
  });
  const ErrorIcon = styled.span({
    svg: {
      fill: "var(--primary-light)",
      width: "1em",
    },
  });
  return (
    <Formik
      initialValues={{ username: "", email: "", message: "" }}
      onSubmit={handleOnSubmit}
      validationSchema={formSchema}
    >
      {({ isSubmitting, errors, touched }) => {
        return (
          <FromBlock as={Form} noValidate>
            <InputWrap
              css={{
                border:
                  errors.username &&
                  touched.username &&
                  `2px solid var(--primary-light)`,
              }}
            >
              <Input
                type="text"
                name="name"
                placeholder="name"
                as={Field}
              />
              <ErrorMessage
                name="username"
                render={(msg) => (
                  <Errors>
                    {" "}
                    <ErrorText>{msg}</ErrorText>{" "}
                    <ErrorIcon>
                      <IconAlert />
                    </ErrorIcon>
                  </Errors>
                )}
              />
              <FocusInput></FocusInput>
            </InputWrap>
            <InputWrap
              css={{
                border:
                  errors.email &&
                  touched.email &&
                  `2px solid var(--primary-light)`,
              }}
            >
              <Input
                type="email"
                name="email"
                placeholder="email address"
                as={Field}
              />
              <ErrorMessage
                name="email"
                render={(msg) => (
                  <Errors>
                    {" "}
                    <ErrorText>{msg}</ErrorText>{" "}
                    <ErrorIcon>
                      <IconAlert />
                    </ErrorIcon>
                  </Errors>
                )}
              />
              <FocusInput></FocusInput>
            </InputWrap>
            <InputWrap
              width={`100%`}
              css={{
                border:
                  errors.message &&
                  touched.message &&
                  `2px solid var(--primary-light)`,
              }}
            >
              <Input
                name="message"
                height={`auto`}
                minHeight={`119px`}
                padding={`1.56em 1.25em 1em 1.56em`}
                fontSize={`1em`}
                lineHeight={`1.8`}
                overflow={`auto`}
                placeholder="message"
                as={Field}
                component="textarea"
              />
              <ErrorMessage
                name="message"
                render={(msg) => (
                  <Errors>
                    {" "}
                    <ErrorText>{msg}</ErrorText>{" "}
                    <ErrorIcon>
                      <IconAlert />
                    </ErrorIcon>
                  </Errors>
                )}
              />
              <FocusInput></FocusInput>
            </InputWrap>
            <SendBtnContainer>
              <SendBtn type="submit" disabled={isSubmitting}>
                send
              </SendBtn>
              {serverState && serverState.ok && <p>送信完了しました</p>}
            </SendBtnContainer>
          </FromBlock>
        );
      }}
    </Formik>
  );
};
export default ContactFrom;
