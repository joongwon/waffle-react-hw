import React from "react";
import "./Rating.css";
export default function Rating({
  children,
  className,
}: {
  children: number | null;
  className?: string;
}) {
  return (
    <span
      className={"rating" + (className ? " " + className : "")}
      data-testid="rating"
    >
      <span className="rating--star" />
      {children?.toFixed(1) ?? "N/A"}
    </span>
  );
}
