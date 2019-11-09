import * as React from "react";
import styled from "styled-components";
import Color from "../../constants/Color";

type Props = {
  className?: string;
};

// TODO(orita)文字列は後にprops渡しに変更
const Cassette: React.FC<Props> = ({ className }: Props) => (
  <Wrapper className={className}>
    <ContentHead>
      <DateText>Nov 8</DateText>
      <TimeText>12:00 AM</TimeText>
    </ContentHead>
    <Content>
      <Text>明日は汐留でもくもくしますかー？</Text>
    </Content>
  </Wrapper>
);
export default Cassette;

const Wrapper = styled.div`
  padding: 7px 12px 12px 12px;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
  &:hover {
    background-color: ${Color.HoverGray};
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.13);
    cursor: hand;
    cursor: pointer;
  }
`;

const ContentHead = styled.div`
  display: flex;
  flex-wrap: nowrap;
  color: #616061;
  font-size: 1.3rem;
  margin-top: 5px;
`;

const DateText = styled.span`
  flex-shrink: 0;
  font-size: 1.2rem;
  font-weight: Bold;
`;

const TimeText = styled.span`
  flex-shrink: 0;
  font-size: 1.2rem;
  margin-left: 4px;
`;

const Content = styled.div`
  margin-top: 10px;
`;

const Text = styled.div`
  margin: 4px 0 0 0;
  line-height: 1.46668;
  font-size: 1.6rem;
`;
