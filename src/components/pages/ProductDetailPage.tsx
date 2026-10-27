import { useEffect, useState } from "react";
import type { CollectionItem } from "../../types";
import Arrow from "../common/Arrow";

interface ProductDetailPageProps {
  slug: string;
  items: CollectionItem[];
  onOpenInquiry: (piece: string) => void;
  onNavigate: (path: string) => void;
}

export default function ProductDetailPage({
  slug,
  items,
  onOpenInquiry,
  onNavigate,
}: ProductDetailPageProps) {
  const currentIndex = items.findIndex((item) => item.slug === slug);
  const product = items[currentIndex] || items[0];

  const prevProduct =
    items[(currentIndex - 1 + items.length) % items.length];
  const nextProduct = items[(currentIndex + 1) % items.length];

  // Active state selection (compact vs extended, etc.)
  const [selectedStateId, setSelectedStateId] = useState<string | null>(
    product.interactiveStates && product.interactiveStates.length > 0
      ? product.interactiveStates[0].id
      : null,
  );

  // Active displayed image in high-res viewport
  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [activeCaption, setActiveCaption] = useState<string>(product.alt);

  // Sync state when slug changes
  useEffect(() => {
    if (product.interactiveStates && product.interactiveStates.length > 0) {
      setSelectedStateId(product.interactiveStates[0].id);
      setActiveImage(product.interactiveStates[0].image);
      setActiveCaption(product.interactiveStates[0].label);
    } else {
      setSelectedStateId(null);
      setActiveImage(product.image);
      setActiveCaption(product.alt);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug, product]);

  const activeState = product.interactiveStates?.find(
    (s) => s.id === selectedStateId,
  );

  const handleStateChange = (stateId: string) => {
    setSelectedStateId(stateId);
    const target = product.interactiveStates?.find((s) => s.id === stateId);
    if (target) {
      setActiveImage(target.image);
      setActiveCaption(`${target.label}: ${target.dimensions}`);
    }
  };

  const handleThumbnailClick = (src: string, caption: string) => {
    setActiveImage(src);
    setActiveCaption(caption);
  };

  const inquiryTitle = activeState
    ? `${product.name} (${activeState.label})`
    : product.name;

  return (
    <div className="product-monograph">
      {/* Top Breadcrumb Bar */}
      <div className="product-monograph__topbar">
        <div className="product-monograph__breadcrumbs">
          <a
            href="#/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("#/");
            }}
          >
            Studio Overview
          </a>
          <span>/</span>
          <a
            href="#/collection"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("#/collection");
            }}
          >
            Collection
          </a>
          <span>/</span>
          <span className="current">{product.name}</span>
        </div>

        <a
          href="#/collection"
          className="product-monograph__back-btn"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("#/collection");
          }}
        >
          {"←"} Back to Collection
        </a>
      </div>

      <div className="product-monograph__grid">
        {/* Left Column: Multi-Angle Interactive Viewport */}
        <div className="product-monograph__visual">
          <div className="product-monograph__viewport">
            <img
              src={activeImage}
              alt={activeCaption}
              key={activeImage}
              className="product-monograph__main-img"
            />
            <div className="product-monograph__badge-row">
              <span className="series-tag">{product.seriesNumber}</span>
              <span className="series-year">Est. 2026</span>
            </div>
            {activeCaption && (
              <p className="product-monograph__caption">{activeCaption}</p>
            )}
          </div>

          {/* Interactive State Switcher */}
          {product.interactiveStates && product.interactiveStates.length > 0 && (
            <div className="product-monograph__states-panel">
              <div className="states-header">
                <span className="states-label">Functional State:</span>
                <span className="states-dim">
                  {activeState ? activeState.dimensions : ""}
                </span>
              </div>
              <div className="states-toggle-group" role="tablist">
                {product.interactiveStates.map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    role="tab"
                    aria-selected={selectedStateId === st.id}
                    className={`state-toggle-btn ${selectedStateId === st.id ? "is-active" : ""}`}
                    onClick={() => handleStateChange(st.id)}
                  >
                    <span className="dot" />
                    {st.label}
                  </button>
                ))}
              </div>
              {activeState?.description && (
                <p className="state-description">{activeState.description}</p>
              )}
            </div>
          )}

          {/* Gallery Thumbnails */}
          {product.gallery && product.gallery.length > 0 && (
            <div className="product-monograph__thumbnails">
              <span className="thumbnails-label">Angles &amp; Details:</span>
              <div className="thumbnails-row">
                {product.gallery.map((img, i) => (
                  <button
                    key={img.src}
                    type="button"
                    className={`thumb-btn ${activeImage === img.src ? "is-active" : ""}`}
                    onClick={() => handleThumbnailClick(img.src, img.caption || img.alt)}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img src={img.src} alt={img.alt} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Architectural Specifications & Story */}
        <div className="product-monograph__info">
          <div className="product-monograph__header">
            <p className="eyebrow">
              {product.category} · Series 01 · {product.seriesNumber}
            </p>
            <h1 className="product-monograph__title">{product.name}</h1>
            <p className="product-monograph__lead">{product.details}</p>
          </div>

          <div className="product-monograph__story">
            <h3>Design &amp; Form</h3>
            <p>{product.story}</p>
          </div>

          {/* Architectural Spec Sheet */}
          {product.specs && (
            <div className="product-monograph__specs-sheet">
              <h3>Architectural Specifications</h3>
              <dl className="specs-list">
                <div className="spec-row">
                  <dt>Dimensions</dt>
                  <dd>{product.specs.dimensions}</dd>
                </div>
                <div className="spec-row">
                  <dt>Custom Sizing</dt>
                  <dd className="spec-highlight">{product.specs.customizable}</dd>
                </div>
                <div className="spec-row">
                  <dt>Materials &amp; Core</dt>
                  <dd>{product.specs.materials}</dd>
                </div>
                {product.specs.hardware && (
                  <div className="spec-row">
                    <dt>Hardware &amp; Slides</dt>
                    <dd>{product.specs.hardware}</dd>
                  </div>
                )}
                <div className="spec-row">
                  <dt>Finish</dt>
                  <dd>{product.specs.finish}</dd>
                </div>
                <div className="spec-row">
                  <dt>Lead Time</dt>
                  <dd>{product.specs.leadTime}</dd>
                </div>
              </dl>
            </div>
          )}

          {/* Action Box */}
          <div className="product-monograph__inquire-card">
            <div className="inquire-card__content">
              <h4>Commission this design</h4>
              <p>
                Each piece is built to order in our studio. We discuss dimensions, room fit,
                and delivery details before building begins.
              </p>
            </div>
            <button
              type="button"
              className="primary-button primary-button--large"
              onClick={() => onOpenInquiry(inquiryTitle)}
            >
              Inquire About This Piece <Arrow />
            </button>
            <span className="inquire-card__note">
              No deposit required for initial consultation and dimension modeling.
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Series Navigation */}
      <nav className="product-monograph__series-nav" aria-label="Series navigation">
        <a
          href={`#/collection/${prevProduct.slug}`}
          className="series-nav-btn prev"
          onClick={(e) => {
            e.preventDefault();
            onNavigate(`#/collection/${prevProduct.slug}`);
          }}
        >
          <span className="direction">{"←"} Previous Piece</span>
          <span className="title">{prevProduct.name}</span>
          <small>{prevProduct.seriesNumber}</small>
        </a>

        <a
          href="#/collection"
          className="series-nav-btn all"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("#/collection");
          }}
        >
          <span className="direction">Studio Catalog</span>
          <span className="title">View All Objects</span>
          <small>Series 01</small>
        </a>

        <a
          href={`#/collection/${nextProduct.slug}`}
          className="series-nav-btn next"
          onClick={(e) => {
            e.preventDefault();
            onNavigate(`#/collection/${nextProduct.slug}`);
          }}
        >
          <span className="direction">Next Piece {"→"}</span>
          <span className="title">{nextProduct.name}</span>
          <small>{nextProduct.seriesNumber}</small>
        </a>
      </nav>
    </div>
  );
}
