import React, { ReactNode } from "react";
import "./Modal.css";

type Props = {
  children: ReactNode;
  onBackgroundClick: () => void;
  isClosing: boolean;
};

export default function Modal({
  children,
  onBackgroundClick,
  isClosing,
}: Props) {
  return (
    <div className={"modal" + (isClosing ? " closing" : "")}>
      <div className="modal--background" onClick={() => onBackgroundClick()} />
      {children}
    </div>
  );
}
