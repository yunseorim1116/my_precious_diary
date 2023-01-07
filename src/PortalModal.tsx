import reactDom from "react-dom";
import { ReactNode } from "react";

export interface IProps {
  children: ReactNode;
}

const ModalPortal = ({ children }: IProps) => {
  const el = document.getElementById("modal") as HTMLElement;
  return reactDom.createPortal(children, el);
};

export default ModalPortal;
