export default function Box(props) {
  const { className, children, ...otherProps } = props;

  return (
    <div className={`box ${className}`} {...otherProps}>
      {children}
    </div>
  );
}
