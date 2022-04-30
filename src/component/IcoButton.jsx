import { clearDefault } from "../extra/Utils";

export default function IcoButton(props) {
  const { src, alt, children, draggable, ...otherProps } = props;

  return (
    <button {...otherProps}>
      {children}
      <img
        src={src}
        alt={alt}
        onDragStart={draggable ? undefined : clearDefault}
      />
    </button>
  );
}

IcoButton.defaultProps = {
  onClick: clearDefault,
  type: "button",
};
