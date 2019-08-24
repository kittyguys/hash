import * as React from "react";
import styled from "styled-components";
import console = require("console");

const Tag = (props: { tags: string[] }) => {
  const tags = props.tags.map((tag, i) => {
    return (
      <Text key={i} onClick={() => pickColor()}>
        #{tag}
      </Text>
    );
  });
  return <TagWrapper>{tags}</TagWrapper>;
};

const TagWrapper = styled.div`
  width: 640px;
  margin: 0 auto;
  padding: 120px 0 40px;
`;

const Text = styled.span`
  color: #38a1f3;
  font-size: 20px;
  padding: 4px 12px;
  border-radius: 24px;
  border: 1px solid #38a1f3;
  cursor: pointer;
`;

const pickColor = () => {
  const defaultColor = ["ff7722", "f92772"];
};

export default Tag;
