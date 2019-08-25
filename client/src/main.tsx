import * as React from "react";
import { Fragment, useState, useEffect } from "react";
import { render } from "react-dom";
import Input from "./components/common/Form/Input";
import Logo from "./components/common/Logo";
import Box from "./components/common/Tag/box";
import Display from "./components/common/Tag/display";
import { createGlobalStyle } from "styled-components";

const App = () => {
  const [tags, setTags] = useState([]);
  const [box, setBox] = useState([]);
  const displayBox = box.map((box, i) => {
    return <Box tags={box} key={i} />;
  });
  return (
    <Fragment>
      <Logo />
      <Input
        width="640px"
        height="42px"
        handleSetTags={setTags}
        handleSetBox={setBox}
        tags={tags}
        box={box}
      />
      <Box tags={tags} />
      {box.map((box, i) => {
        return <Box tags={box} key={i} />;
      })}
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
