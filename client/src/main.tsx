import * as React from "react";
import { Fragment } from "react";
import { render } from "react-dom";
import Input from "./components/common/Form/Input";
import { createGlobalStyle } from "styled-components";

const App = () => {
  return (
    <Fragment>
      <Input width="200px" height="40px" />
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
