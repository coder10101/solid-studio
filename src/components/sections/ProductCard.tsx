import type { Piece } from "../../types";
import Arrow from "../common/Arrow";

interface ProductCardProps {
  piece: Piece;
  index: number;
  onEnquire: (pieceName: string) => void;
}

export default function ProductCard({
  piece,
  index,
  onEnquire,
}: ProductCardProps) {
  return (
    <article className={`product-card product-card--${index + 1}`}>
      <button
        className="product-card__image"
        onClick={() => onEnquire(piece.name)}
        aria-label={`Enquire about ${piece.name}`}
      >
        <img
          src={piece.image}
          alt={`${piece.name} - ${piece.type} by Solid Studio`}
          loading="lazy"
          decoding="async"
        />
        <span className="product-card__action">
          Enquire <Arrow diagonal />
        </span>
      </button>
      <div className="product-card__meta">
        <div>
          <h3>{piece.name}</h3>
          <p>{piece.type}</p>
        </div>
        <span>0{index + 1}</span>
      </div>
    </article>
  );
}
