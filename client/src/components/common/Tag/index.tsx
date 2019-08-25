import * as React from "react";
import styled from "styled-components";

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
  width: 100%;
  margin: 0 auto;
`;

const Text = styled.span`
  color: #777;
  font-size: 20px;
  padding: 8px;
  border-radius: 24px;
  cursor: pointer;
`;

const pickColor = () => {
  const defaultColor = ["ff7722", "f92772"];
};

export default Tag;
