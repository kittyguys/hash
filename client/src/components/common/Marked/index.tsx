import * as React from "react";
import styled from "styled-components";
import marked from "marked";

type Props = {
  className?: string;
  data: string;
};

const Marked: React.FC<Props> = ({ className, data }) => {
  return (
    <Contents
      dangerouslySetInnerHTML={{ __html: marked(data) }}
      className={className}
    ></Contents>
  );
};

export default Marked;

const Contents = styled.div`
  /* codeタグ */
  code {
    background-color: rgba(27, 31, 35, 0.05);
    border-radius: 3px;
    font-size: 85%;
    margin: 0;
    padding: 0.2em 0.4em;
  }
`;
