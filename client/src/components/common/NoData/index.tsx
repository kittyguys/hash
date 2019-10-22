import * as React from "react";
import styled from "styled-components";

type Props = {
  searchWord: string;
  targetField: string;
  noDataMargin?: string;
  noDataFontSize?: string;
  sp_noDataFontSize?: string;
};

const NoData: React.FC<Props> = ({
  searchWord,
  targetField,
  noDataMargin,
  noDataFontSize,
  sp_noDataFontSize
}) => {
  return (
    <Wrapper noDataMargin={noDataMargin}>
      <Text
        noDataFontSize={noDataFontSize}
        sp_noDataFontSize={sp_noDataFontSize}
      >
        {searchWord} に一致する {targetField} は今はまだないようです。
      </Text>
    </Wrapper>
  );
};

type Wrappertype = {
  noDataMargin?: string;
};

type TextType = {
  noDataFontSize?: string;
  sp_noDataFontSize?: string;
};

const Wrapper = styled.div<Wrappertype>`
  margin: ${({ noDataMargin }) => noDataMargin};
`;

const Text = styled.p<TextType>`
  max-width: 900px;
  padding: 10px 20px;
  margin: 0 auto;
  font-size: ${({ noDataFontSize }) => noDataFontSize};
  @media (max-width: 768px) {
    font-size: ${({ sp_noDataFontSize }) => sp_noDataFontSize};
  }
`;

export default NoData;
