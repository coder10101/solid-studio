import type { ArrowProps } from "../../types";

export default function Arrow({ diagonal = false, className = "" }: ArrowProps) {
  const baseClass = diagonal ? "arrow arrow--diagonal" : "arrow";
  return (
    <svg
      aria-hidden="true"
      className={className ? `${baseClass} ${className}` : baseClass}
      viewBox="0 0 24 24"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
