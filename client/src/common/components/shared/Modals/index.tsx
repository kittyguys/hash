import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import Overlay from "./overlay"
import User from "./user"

type Props = {
  isOpen: any,
  setIsOpen: any
};

export const UserModal: FC<Props> = ({ isOpen, setIsOpen }: any) => {
  const isSignin = useSelector((state: any) => state.auth.isSignin);
  useEffect(() => {
    if (!isSignin) {
      setIsOpen(false)
    }
  }, [isSignin])
  return (
    <Overlay isOpen={isOpen} setIsOpen={setIsOpen}>
      <User />
    </Overlay>
  )
}
