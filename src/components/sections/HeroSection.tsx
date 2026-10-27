import type { HeroProps } from "../../types";
import Arrow from "../common/Arrow";

export default function HeroSection({ onNavigate }: HeroProps) {
  const handleCollectionClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate("#/collection");
    } else {
      window.location.hash = "#/collection";
    }
  };

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__copy">
        <p className="eyebrow">Independent furniture studio · Est. 2026</p>
        <div className="hero__bottom">
          <h1 id="hero-title">
            Furniture,
            <br />
            made
            <br />
            <em>personal.</em>
          </h1>
          <div className="hero__intro">
            <p>
              We create considered furniture and shape custom pieces around the
              way you live, work, and gather.
            </p>
            <a
              className="hero__collection-cta"
              href="#/collection"
              onClick={handleCollectionClick}
              aria-label="Explore Full Collection"
            >
              <span>Explore Full Collection</span> <Arrow />
            </a>
          </div>
        </div>
      </div>

      <figure
        className="hero__image hero__image--interactive"
        onClick={handleCollectionClick}
        role="link"
        tabIndex={0}
        aria-label="Explore Full Collection"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleCollectionClick(e as any);
          }
        }}
      >
        <img
          alt="Solid Studio dual nesting coffee table in rich walnut with brass vase beside lounge sofa"
          src="/images/dual-coffee-table.jpg"
        />
        <figcaption>
          <span>01 / Dual Nesting Table</span>
          <span>Designed for everyday ritual</span>
        </figcaption>
      </figure>

      <div className="hero__note" aria-hidden="true">
        <small>Solid Studio</small>
        <span>Ideas</span>
        <span>into</span>
        <span>form.</span>
        <i />
      </div>
    </section>
  );
}
