import * as React from "react";
import Box from "./box";

import styled from "styled-components";
import Tag from "./index";

const Display = ({ box }: { box: any }) => {
  const bb = box.map((b: any, i: number) => {
    <Box tags={b} key={i} />;
  });
  return <TagWrapper>{bb}</TagWrapper>;
};

const TagWrapper = styled.div`
  width: 640px;
  margin: 60px auto;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  position: relative;
  word-wrap: break-word;
`;

const Text = styled.span`
  color: #555;
  font-size: 20px;
  padding: 0 4px;
  cursor: pointer;
  position: absolute;
  top: -16px;
  left: 8px;
  background-color: #fff;
`;

const pickColor = () => {
  const defaultColor = ["ff7722", "f92772"];
};

export default Display;
