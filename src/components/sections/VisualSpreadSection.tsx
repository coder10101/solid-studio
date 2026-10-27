import { useState } from "react";

interface VisualSpreadSectionProps {
  image?: string;
}

const interiorMoments = [
  {
    id: "nook",
    shortLabel: "Desk Nook",
    image: "/images/sliding-table.jpg",
    title: "Studio Desk Nook · 2026",
  },
  {
    id: "living",
    shortLabel: "Living Console",
    image: "/images/expandable-tv-console.jpg",
    title: "Expandable Media Console · 2026",
  },
  {
    id: "craft",
    shortLabel: "Joinery Detail",
    image: "/images/drawer.jpg",
    title: "Master Joinery Oversight · 2026",
  },
];

export default function VisualSpreadSection({ image }: VisualSpreadSectionProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeMoment = interiorMoments[activeIdx] ?? interiorMoments[0];
  const displayImage = image && activeIdx === 0 ? image : activeMoment.image;

  return (
    <section className="visual-spread section-frame" aria-label="Studio interior feature" id="spaces">
      <div className="visual-spread__inner">
        <div className="visual-spread__frame">
          <img
            key={displayImage}
            src={displayImage}
            alt={activeMoment.title}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="visual-spread__controls" role="tablist" aria-label="Interior views">
          {interiorMoments.map((moment, idx) => (
            <button
              key={moment.id}
              role="tab"
              aria-selected={activeIdx === idx}
              className={`visual-spread__pill-item ${activeIdx === idx ? "is-active" : ""}`}
              onClick={() => setActiveIdx(idx)}
            >
              <span className="pill-num">0{idx + 1}</span>
              <span className="pill-label">{moment.shortLabel}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
