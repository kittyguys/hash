import * as React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

type Props = {
  tags: any;
  tagMargin?: string;
  tagFontSize?: string;
  sp_tagMargin?: string;
  sp_tagFontSize?: string;
  matching?: boolean;
};

const Tag: React.FC<Props> = ({
  tags,
  tagMargin,
  tagFontSize,
  sp_tagMargin,
  sp_tagFontSize,
  matching
}) => {
  const myData = useSelector((state: any) => state.myData);
  const myTags = myData.tags.map((tag: any) => tag.name);
  const tagComponents = tags.map((tag: any, i: number) => {
    if (matching) {
      if(myTags.includes(tag.name)){
        return (
          <Text
            key={i}
            onClick={() => pickColor()}
            tagMargin={tagMargin}
            tagFontSize={tagFontSize}
            sp_tagMargin={sp_tagMargin}
            sp_tagFontSize={sp_tagFontSize}
            match
          >
            #{tag.name}
          </Text>
        );
      }
    }
    return (
      <Text
        key={i}
        onClick={() => pickColor()}
        tagMargin={tagMargin}
        tagFontSize={tagFontSize}
        sp_tagMargin={sp_tagMargin}
        sp_tagFontSize={sp_tagFontSize}
      >
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
  tagFontSize?: string;
  sp_tagMargin?: string;
  sp_tagFontSize?: string;
  match?: boolean;
};

const Text = styled.span<TextType>`
  margin: ${({ tagMargin }) => tagMargin};
  color: ${({ match }) => match ? "#fff" : "#777"};
  font-size: ${({ tagFontSize }) => tagFontSize};
  padding: 6px 12px;
  border-radius: 6px;
  background-color: ${({ match }) => match ? "blue" : "#ffe5e5"};
  cursor: pointer;
  display: inline-block;
  @media (max-width: 768px) {
    font-size: ${({ sp_tagFontSize }) => sp_tagFontSize};
    margin: ${({ sp_tagMargin }) => sp_tagMargin};
  }
`;

const pickColor = () => {
  const defaultColor = ["ff7722", "f92772"];
};

export default Tag;
