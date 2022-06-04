import * as React from "react";
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

const ContactFrom = () => {
  const [value, setValue] = React.useState({});
  const [serverResponse, setServerResponse] = React.useState(``);

  function handleChange(e) {
    value[e.target.id] = e.target.value;
    setServerResponse("");
    setValue({ ...value });
  }
  async function onSubmit(e) {
    e.preventDefault();
    const response = await window
      .fetch(`/api/form`, {
        method: `POST`,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(value),
      })
      .then((res) => res.json());
    setServerResponse(response);
  }
  return (
    <div>
      <div>{serverResponse}</div>
      <From name="contact" action="/api/form" method="POST" onSubmit={onSubmit}>
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
      </From>
    </div>
  );
};
export default ContactFrom;
