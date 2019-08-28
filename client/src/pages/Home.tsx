import * as React from "react";
import { Fragment, useState, useEffect } from "react";
import Input from "../components/common/Form/Input";
import Logo from "../components/common/Logo";
import Box from "../components/common/Tag/box";

const Home = () => {
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
    </Fragment>
  );
};

export default Home;

