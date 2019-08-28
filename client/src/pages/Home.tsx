import * as React from "react";
import { Fragment, useState, useEffect } from "react";
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
      <Header page={"home"} isLogin={false} />
      <Logo
        logoWidth="640px"
        logoMargin="0 auto"
        logoPadding="160px 0 40px"
        logoFontSize="44px"
        centering
      />
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
    </Fragment>
  );
};

export default Home;
