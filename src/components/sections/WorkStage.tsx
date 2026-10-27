import { useState } from "react";
import type { Piece } from "../../types";
import Arrow from "../common/Arrow";

interface WorkStageProps {
  pieces: Piece[];
  onOpenInquiry: (pieceName: string) => void;
}

export default function WorkStage({ pieces, onOpenInquiry }: WorkStageProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const currentPiece = pieces[activeIdx] ?? pieces[0];

  return (
    <section className="work-stage section-frame" id="works">
      {/* Header / Selector */}
      <div className="work-stage__header">
        <div className="work-stage__title-group">
          <p className="eyebrow">Curated Works · 2026</p>
          <h2 className="work-stage__heading">Selected Pieces</h2>
        </div>

        <div className="work-stage__tabs" role="tablist" aria-label="Curated furniture pieces">
          {pieces.map((piece, idx) => (
            <button
              key={piece.name}
              role="tab"
              aria-selected={activeIdx === idx}
              className={`work-stage__tab ${activeIdx === idx ? "is-active" : ""}`}
              onClick={() => setActiveIdx(idx)}
            >
              <span className="tab-num">0{idx + 1}</span>
              <span className="tab-name">{piece.name.split("&")[0].trim()}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Stage Display */}
      <div className="work-stage__body">
        {/* Large Uncropped Visual */}
        <div className="work-stage__visual-wrap">
          <img
            key={currentPiece.name}
            src={currentPiece.image}
            alt={`${currentPiece.name} by Solid Studio`}
            loading="lazy"
            decoding="async"
            className="work-stage__img"
          />
        </div>

        {/* Piece Specification Panel */}
        <div className="work-stage__spec-panel">
          <div className="work-stage__spec-top">
            <span className="work-stage__index">0{activeIdx + 1} / 0{pieces.length}</span>
            <h3 className="work-stage__piece-name">{currentPiece.name}</h3>
            <p className="work-stage__piece-type">{currentPiece.type}</p>
            {currentPiece.details && (
              <p className="work-stage__piece-desc">{currentPiece.details}</p>
            )}
          </div>

          <div className="work-stage__spec-bottom">
            <button
              className="work-stage__inquire-btn"
              onClick={() => onOpenInquiry(currentPiece.name)}
            >
              <span>Commission this piece</span>
              <Arrow diagonal />
            </button>

            <div className="work-stage__spec-nav">
              <button
                className="work-stage__nav-btn"
                aria-label="Previous piece"
                disabled={activeIdx === 0}
                onClick={() => setActiveIdx((prev) => Math.max(0, prev - 1))}
              >
                ← Prev
              </button>
              <button
                className="work-stage__nav-btn"
                aria-label="Next piece"
                disabled={activeIdx === pieces.length - 1}
                onClick={() => setActiveIdx((prev) => Math.min(pieces.length - 1, prev + 1))}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
