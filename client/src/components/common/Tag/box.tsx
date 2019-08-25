import * as React from "react";
import { Fragment } from "react";

import styled from "styled-components";
import Tag from "./index";

const Box = ({ tags }: { tags: string[] }) => {
  if (tags.length === 0) {
    return <Fragment />;
  }
  return (
    <TagWrapper>
      <Text>{tags[0]}</Text>
      <Tag tags={tags.filter((tag, i) => (i !== 0 ? tag : null))} />
    </TagWrapper>
  );
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
  left: 8px
  background-color: #fff;
`;

const pickColor = () => {
  const defaultColor = ["ff7722", "f92772"];
};

export default Box;
