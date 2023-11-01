import React from "react";
import "./Rating.css";
export default function Rating({
  children,
  className,
}: {
  children: number;
  className?: string;
}) {
  return (
    <span className={"rating" + (className ? " " + className : "")}>
      <span className="rating--star" />
      {children.toFixed(1)}
    </span>
  );
}
