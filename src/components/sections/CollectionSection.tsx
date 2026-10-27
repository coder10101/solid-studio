import type { CollectionProps } from "../../types";
import Arrow from "../common/Arrow";

export default function CollectionSection({
  items,
  onNavigate,
}: CollectionProps) {
  const handleItemClick = (
    slug: string,
    e: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(`#/collection/${slug}`);
    } else {
      window.location.hash = `#/collection/${slug}`;
    }
  };

  const handleCatalogClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate("#/collection");
    } else {
      window.location.hash = "#/collection";
    }
  };

  return (
    <section className="collection" id="collection">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Selected objects</p>
          <h2>Designed to belong.</h2>
        </div>
        <div className="section-heading__copy">
          <p>
            Our first series explores soft geometry, grounded forms, and
            everyday comfort.
          </p>
          <a
            href="#/collection"
            className="text-link"
            onClick={handleCatalogClick}
          >
            Explore full series specifications &amp; monographs <Arrow />
          </a>
        </div>
      </div>

      <div className="product-grid">
        {items.map((item, index) => (
          <article className="product" key={item.name}>
            <div className="product__image">
              <a
                href={`#/collection/${item.slug}`}
                aria-label={`View details and specifications for ${item.name}`}
                onClick={(e) => handleItemClick(item.slug, e)}
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                }}
              >
                <img
                  alt={item.alt}
                  src={item.image}
                  className={`product__img-primary ${item.secondaryImage ? "has-secondary" : ""}`}
                />
                {item.secondaryImage && (
                  <img
                    alt={`${item.name} detail view`}
                    src={item.secondaryImage}
                    className="product__img-secondary"
                    aria-hidden="true"
                  />
                )}
              </a>
              <a
                className="product__action"
                href={`#/collection/${item.slug}`}
                aria-label={`View details for ${item.name}`}
                onClick={(e) => handleItemClick(item.slug, e)}
              >
                <Arrow diagonal />
              </a>
            </div>
            <div className="product__meta">
              <h3>
                <a
                  href={`#/collection/${item.slug}`}
                  onClick={(e) => handleItemClick(item.slug, e)}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    cursor: "pointer",
                  }}
                >
                  {item.name}
                </a>
              </h3>
              <span>{item.type}</span>
              <span>0{index + 1}</span>
            </div>
          </article>
        ))}
      </div>
      <div className="product-footer">
        <a
          href="#/collection"
          className="collection__footer-btn"
          onClick={handleCatalogClick}
        >
          <span>View Full Collection</span>
          <Arrow diagonal />
        </a>
      </div>
    </section>
  );
}
