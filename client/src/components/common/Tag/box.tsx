import * as React from "react";
import { Fragment } from "react";

import styled from "styled-components";
import Tag from "./index";

type Props = {
  tags: string[];
  tagWrapperWidth?: string;
  matching?: boolean;
};

const Box: React.FC<Props> = ({ tags, tagWrapperWidth, matching }) => {
  if (tags.length === 0) {
    return <Fragment />;
  }
  return (
    <TagWrapper tagWrapperWidth={tagWrapperWidth}>
      <Tag tags={tags} tagMargin="4px 8px" matching={matching} />
    </TagWrapper>
  );
};

type TagWrapperStyle = {
  tagWrapperWidth?: string;
};

const TagWrapper = styled.div<TagWrapperStyle>`
  width: ${({ tagWrapperWidth }) => tagWrapperWidth};
`;

export default Box;
