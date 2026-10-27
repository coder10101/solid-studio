import type { BrandMarkProps } from "../../types";

export default function BrandMark({
  footer = false,
  inverse = false,
  className = "",
  onNavigate,
}: BrandMarkProps) {
  const brandClasses = `brand ${footer ? "brand--footer" : ""} ${inverse ? "brand--inverse" : ""} ${className}`.trim();

  if (footer) {
    return (
      <div className={brandClasses}>
        <span className="brand__mark brand__mark--white">
          <img src="/solid-studio-mark-white.svg" alt="Solid Studio" />
        </span>
        <span>Solid Studio</span>
      </div>
    );
  }

  return (
    <a
      className={brandClasses}
      href="#/"
      aria-label="Solid Studio home"
      onClick={(e) => {
        if (onNavigate) {
          e.preventDefault();
          onNavigate("#/");
        }
      }}
    >
      <span className="brand__mark">
        <img src="/solid-studio-mark.svg" alt="Solid Studio Mark" />
      </span>
      <span>Solid Studio</span>
    </a>
  );
}
