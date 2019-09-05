import * as React from "react";
import styled from "styled-components";

type Props = {
  tags: any;
  tagMargin?: string;
};

const Tag: React.FC<Props> = ({ tags, tagMargin }) => {
  const tagComponents = tags.map((tag: any, i: number) => {
    return (
      <Text key={i} onClick={() => pickColor()} tagMargin={tagMargin}>
        #{tag.name}
      </Text>
    );
  });
  return <TagWrapper>{tagComponents}</TagWrapper>;
};

const TagWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
`;

type TextType = {
  tagMargin?: string;
};

const Text = styled.span<TextType>`
  margin: ${({ tagMargin }) => tagMargin};
  color: #777;
  font-size: 1.6rem;
  padding: 6px 12px;
  border-radius: 6px;
  background-color: #ffe5e5;
  cursor: pointer;
  display: inline-block;
`;

const pickColor = () => {
  const defaultColor = ["ff7722", "f92772"];
};

export default Tag;
