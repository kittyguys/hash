import * as React from "react";
import styled from "styled-components";
import console = require("console");

const Logo = () => {
  return (
    <LogoWrapper>
      <Text>#hash</Text>
    </LogoWrapper>
  );
};

const LogoWrapper = styled.div`
  width: 640px;
  margin: 0 auto;
  padding: 160px 0 40px;
  text-align: center;
`;

const Text = styled.span`
  font-family: "Lobster", cursive;
  font-size: 48px;
`;

export default Logo;
