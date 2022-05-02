import React from "react";

export default function Box(props) {
  const { base = "div", className, children, ...otherProps } = props;

  return React.createElement(
    base,
    { className: `box ${className}`, ...otherProps },
    children
  );
}
