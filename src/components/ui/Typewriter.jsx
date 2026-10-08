import { useEffect, useState } from "react";

export default function Typewriter({ words = [], speed = 80, pause = 1400 }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!words.length) return;
    const current = words[index % words.length];

    if (!deleting && text === current) {
      const timer = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(timer);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }

    const timer = setTimeout(
      () => {
        const next = deleting
          ? current.slice(0, text.length - 1)
          : current.slice(0, text.length + 1);
        setText(next);
      },
      deleting ? speed / 2 : speed
    );
    return () => clearTimeout(timer);
  }, [text, deleting, index, words, speed, pause]);

  return <span>{text}<span className="typewriter-caret">|</span></span>;
}