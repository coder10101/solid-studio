import type { CollectionItem } from "../../types";
import Arrow from "../common/Arrow";

interface CollectionPageProps {
  items: CollectionItem[];
  onOpenInquiry?: (piece: string) => void;
  onNavigate: (path: string) => void;
}

export default function CollectionPage({
  items,
  onNavigate,
}: CollectionPageProps) {
  const handleItemClick = (slug: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavigate(`#/collection/${slug}`);
  };

  return (
    <section className="collection collection--page" id="collection-page">
      <div className="collection-page__topbar">
        <nav className="monograph-breadcrumb" aria-label="Breadcrumb">
          <a
            href="#/"
            className="monograph-breadcrumb__link"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("#/");
            }}
          >
            {"←"} <span>Studio Overview</span>
          </a>
          <span className="monograph-breadcrumb__separator">/</span>
          <span className="monograph-breadcrumb__current">Collection</span>
        </nav>
      </div>

      <div className="collection-page__heading">
        <h1 className="collection-page__title">Curated Pieces</h1>
        <p className="collection-page__lead">
          Original handcrafted furniture shaped by proportion, enduring materials, and everyday ritual.
        </p>
      </div>

      <div className="collection-collage">
        {items.map((item, index) => (
          <article
            className={`collage-card collage-card--0${index + 1}`}
            key={item.slug}
          >
            <a
              href={`#/collection/${item.slug}`}
              className="collage-card__media"
              onClick={(e) => handleItemClick(item.slug, e)}
              aria-label={`View ${item.name} specifications and details`}
            >
              <img
                src={item.image}
                alt={item.alt}
                className={`collage-card__img-primary ${item.secondaryImage ? "has-secondary" : ""}`}
              />
              {item.secondaryImage && (
                <img
                  src={item.secondaryImage}
                  alt={`${item.name} detail view`}
                  className="collage-card__img-secondary"
                  aria-hidden="true"
                />
              )}

              <div className="collage-card__overlay">
                <div className="collage-card__top">
                  <span className="collage-card__series">{item.seriesNumber}</span>
                  <span className="collage-card__category">{item.category}</span>
                </div>

                <div className="collage-card__bottom">
                  <div className="collage-card__info">
                    <h2 className="collage-card__title">{item.name}</h2>
                    <p className="collage-card__sub">{item.type}</p>
                  </div>

                  <span className="collage-card__action" aria-hidden="true">
                    <Arrow diagonal />
                  </span>
                </div>
              </div>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
