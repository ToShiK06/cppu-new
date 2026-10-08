export default function SplitText({ text, className = "" }) {
  return (
    <span className={className}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            animation: `splitRise .6s cubic-bezier(.2,.8,.2,1) both`,
            animationDelay: `${i * 0.03}s`,
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}