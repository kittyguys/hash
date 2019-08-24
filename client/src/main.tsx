import * as React from "react";
import { Fragment, useState } from "react";
import { render } from "react-dom";
import Input from "./components/common/Form/Input";
import Logo from "./components/common/Logo";
import Tag from "./components/common/Tag";
import { createGlobalStyle } from "styled-components";

const App = () => {
  const [tags, setTags] = useState(["string", "Harry"]);

  return (
    <Fragment>
      <Logo />
      <Input width="640px" height="42px" />
      <Tag tags={tags} />
      <GlobalStyle />
    </Fragment>
  );
};

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

render(<App />, document.getElementById("app"));
