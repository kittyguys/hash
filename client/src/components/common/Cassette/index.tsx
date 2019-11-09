import * as React from "react";
import styled from "styled-components";
import Color from "../../constants/Color";

type Props = {
  className?: string;
};

const Root = styled.div`
  box-sizing: inherit;
`;

const Content = styled.div`
  padding: 7px 12px 12px 12px;
  --saf-0: rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
  border-radius: 8px;
  margin-bottom: 10px;
  background-color: rgba(var(--sk_primary_background, 255, 255, 255), 1);
  box-shadow: 0 0 0 0px rgba(0, 0, 0, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.15);
  &:hover {
    background-color: ${Color.HoverGray};
    box-shadow: 0 0 0 1px var(--saf-0);
    cursor: hand;
    cursor: pointer;
  }
`;

const Label = styled.div`
  display: flex;
  flex-wrap: nowrap;
  color: rgba(var(--sk_foreground_max_solid, 97, 96, 97), 1);
  font-size: 13px;
  text-decoration: none;
  max-width: 100%;
  line-height: 20px;
`;

const Date = styled.span`
  flex-shrink: 0;
  font-size: 12px;
  font-weight: Bold;
`;

const TimeLabel = styled.span`
  flex-shrink: 0;
  font-size: 12px;
  margin-left: 4px;
`;

const Wrapper = styled.div``;

const Text = styled.div`
  margin: 4px 0 0 0;
  line-height: 1.46668;
  font-size: 16px;
`;

// TODO(orita)文字列は後にprops渡しに変更
const Cassette: React.FC<Props> = ({ className }: Props) => (
  <Root className={className}>
    <Content>
      <Label>
        <Date>Nov 8</Date>
        <TimeLabel>12:00 AM</TimeLabel>
      </Label>
      <Wrapper>
        <Text>
          <span>明日は汐留でもくもくしますかー？</span>
        </Text>
      </Wrapper>
    </Content>
  </Root>
);
export default Cassette;
