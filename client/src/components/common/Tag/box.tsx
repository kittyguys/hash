import * as React from "react";
import { Fragment } from "react";

import styled from "styled-components";
import Tag from "./index";

type Props = {
  tags: string[];
  tagWrapperWidth?: string;
};

const Box: React.FC<Props> = ({ tags, tagWrapperWidth }) => {
  if (tags.length === 0) {
    return <Fragment />;
  }
  return (
    <TagWrapper tagWrapperWidth={tagWrapperWidth}>
      <Text>{tags[0]}</Text>
      <Tag tags={tags.filter((tag, i) => (i !== 0 ? tag : null))} />
    </TagWrapper>
  );
};

type TagWrapperStyle = {
  tagWrapperWidth?: string;
};

const TagWrapper = styled.div<TagWrapperStyle>`
  width: ${({ tagWrapperWidth }) => tagWrapperWidth};
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

export default Box;
