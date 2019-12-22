import { FC } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { toggleNote } from "@src/features/stock/actions";
import Color from "@src/common/constants/color";

type Props = {
};

const Drawer: FC<Props> = ({ }) => {
  const dispatch = useDispatch();
  const handleToggleNote = () => {
    dispatch(toggleNote())
  }
  return (
    <Root />
  )
};

const Root = styled.div`
  width:400px;
  background-color:${Color.Red[400]};
  z-index:1;
`;

export default Drawer;
