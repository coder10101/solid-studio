import { useState } from "react";
import type { CollectionItem } from "../../types";
import Arrow from "../common/Arrow";

interface CollectionPageProps {
  items: CollectionItem[];
  onOpenInquiry: (piece: string) => void;
  onNavigate: (path: string) => void;
}

export default function CollectionPage({
  items,
  onOpenInquiry,
  onNavigate,
}: CollectionPageProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Tables", "Storage"];

  const filteredItems =
    activeCategory === "All"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <div className="catalog-page">
      <div className="catalog-page__topbar">
        <a
          href="#/"
          className="catalog-page__back-link"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("#/");
          }}
        >
          {"←"} Back to Studio Overview
        </a>
        <span className="catalog-page__status">Series 2026 · Made to Order</span>
      </div>

      <header className="catalog-page__header">
        <p className="eyebrow">Studio Collection · Series 01</p>
        <h1 className="catalog-page__title">
          Considered objects for living, working, and gathering.
        </h1>
        <p className="catalog-page__intro">
          Each piece in our collection is shaped by proportion, enduring materials,
          and quiet functional moments. Available in our studio series dimensions or
          custom commissioned to complement your architectural space.
        </p>

        <div className="catalog-page__filters" role="tablist" aria-label="Filter collection">
          {categories.map((cat) => {
            const count =
              cat === "All"
                ? items.length
                : items.filter((i) => i.category === cat).length;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`catalog-filter-btn ${isActive ? "is-active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat} <span>({count})</span>
              </button>
            );
          })}
        </div>
      </header>

      <div className="catalog-grid">
        {filteredItems.map((item, index) => (
          <article className="catalog-card" key={item.slug}>
            <div className="catalog-card__media">
              <a
                href={`#/collection/${item.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`#/collection/${item.slug}`);
                }}
                className="catalog-card__image-link"
                aria-label={`View details and specifications for ${item.name}`}
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  className={`catalog-card__img-primary ${item.secondaryImage ? "has-secondary" : ""}`}
                />
                {item.secondaryImage && (
                  <img
                    src={item.secondaryImage}
                    alt={`${item.name} alternative view`}
                    className="catalog-card__img-secondary"
                    aria-hidden="true"
                  />
                )}
              </a>

              <span className="catalog-card__index">{item.seriesNumber || `No. 00${index + 1}`}</span>

              <a
                href={`#/collection/${item.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`#/collection/${item.slug}`);
                }}
                className="catalog-card__arrow-btn"
                aria-label={`Open ${item.name} detail`}
              >
                <Arrow diagonal />
              </a>
            </div>

            <div className="catalog-card__content">
              <div className="catalog-card__header-row">
                <span className="catalog-card__type">{item.type}</span>
                {item.interactiveStates && item.interactiveStates.length > 0 && (
                  <span className="catalog-card__badge">Multi-State Design</span>
                )}
              </div>

              <h2 className="catalog-card__heading">
                <a
                  href={`#/collection/${item.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`#/collection/${item.slug}`);
                  }}
                >
                  {item.name}
                </a>
              </h2>

              <p className="catalog-card__desc">{item.details}</p>

              {item.specs && (
                <div className="catalog-card__specs-preview">
                  <div className="spec-pill">
                    <small>Dimensions</small>
                    <span>{item.specs.dimensions.split("|")[0].trim()}</span>
                  </div>
                  <div className="spec-pill">
                    <small>Craft</small>
                    <span>{item.specs.leadTime}</span>
                  </div>
                </div>
              )}

              <div className="catalog-card__actions">
                <a
                  href={`#/collection/${item.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`#/collection/${item.slug}`);
                  }}
                  className="catalog-card__detail-btn"
                >
                  View Monograph &amp; Specs <Arrow />
                </a>
                <button
                  type="button"
                  onClick={() => onOpenInquiry(`${item.name} (Custom Sizing Inquiry)`)}
                  className="catalog-card__inquire-btn"
                >
                  Inquire
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="catalog-consultation">
        <div className="catalog-consultation__inner">
          <p className="eyebrow">Custom Commissions · Bespoke Sizes</p>
          <h3>Looking for dimensions tailored to your room?</h3>
          <p>
            Every piece in our collection is hand-assembled in our studio. If you need
            adjusted widths, alternate hardwood finishes, or specific storage configurations,
            we will gladly tailor the piece to your architectural floor plan.
          </p>
          <button
            type="button"
            className="primary-button"
            onClick={() => onOpenInquiry("Custom Collection Commission")}
          >
            Start a custom consultation <Arrow />
          </button>
        </div>
      </section>
    </div>
  );
}
