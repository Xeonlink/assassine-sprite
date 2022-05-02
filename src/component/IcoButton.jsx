import { clearDefault } from "../extra/Utils";

export default function IcoButton(props) {
  const { src, alt, children, draggable, ...otherProps } = props;

  return (
    <button {...otherProps}>
      {children}
      {src && (
        <img
          src={src}
          alt={alt}
          onDragStart={draggable ? undefined : clearDefault}
        />
      )}
    </button>
  );
}

IcoButton.defaultProps = {
  onClick: clearDefault,
  type: "button",
};
