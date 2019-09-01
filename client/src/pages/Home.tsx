import * as React from "react";
import { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import Input from "../components/common/Form/Input";
import Logo from "../components/common/Logo";
import Box from "../components/common/Tag/box";
import Header from "../components/common/Header";

const Home: React.FC = () => {
  const [tags, setTags] = useState([]);
  const [box, setBox] = useState([]);
  const displayBox = box.map((box, i) => {
    return <Box tags={box} key={i} />;
  });
  return (
    <Fragment>
      {localStorage.getItem("token") ? (
        <Header page={"home"} isLogin={true} />
      ) : (
        <Header page={"home"} isLogin={false} />
      )}
      <Logo
        logoWidth="640px"
        logoMargin="0 auto"
        logoPadding="160px 0 40px"
        logoFontSize="44px"
        centering
      />
      <Input
        inputWidth={640}
        inputHeight={42}
        handleSetTags={setTags}
        handleSetBox={setBox}
        tags={tags}
        box={box}
      />
      <BoxWrap>
        <Box tags={tags} />
      </BoxWrap>
      {box.map((box, i) => (
        <BoxWrap>
          <Box tags={box} key={i} />
        </BoxWrap>
      ))}
    </Fragment>
  );
};

const BoxWrap = styled.div`
  margin: 60px auto;
`;

export default Home;
