import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

type Props = {
  content: string;
};

const Loading: React.FC = ({}) => {
  return (
    <>
      <StyledText>Loading...</StyledText>
      <Wrapper>
        <img src="/static/assets/images/loaderIcon.gif" />
      </Wrapper>
    </>
  );
};

const StyledText = styled.div`
  text-align: center;
`;

const Wrapper = styled.div`
  text-align: center;
`;

export default Loading;
