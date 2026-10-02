export default function Button({ children, variant = "primary", block, ...rest }) {
  return (
    <button className={`btn btn--${variant} ${block ? "btn--block" : ""}`} {...rest}>
      {children}
    </button>
  );
}