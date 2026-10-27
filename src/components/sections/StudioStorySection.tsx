import type { ProcessStep } from "../../types";
import Arrow from "../common/Arrow";

interface StudioStorySectionProps {
  processSteps: ProcessStep[];
  onOpenInquiry: (piece: string) => void;
}

export default function StudioStorySection({
  processSteps,
  onOpenInquiry,
}: StudioStorySectionProps) {
  return (
    <section className="studio-story section-frame" id="practice">
      <div id="studio" className="scroll-anchor" />
      <div id="consultation" className="scroll-anchor" />
      <div id="process" className="scroll-anchor" />
      <div className="section-heading">
        <div>
          <p className="eyebrow">Studio Practice · Bespoke Commissions</p>
          <h2>Custom furniture tailored to your space.</h2>
        </div>
        <p className="section-intro">
          From initial spatial dialogue to final installation, our process ensures every
          commission is executed with precision, proportion, and quiet longevity.
        </p>
      </div>

      <ol className="process-list">
        {processSteps.map((step) => (
          <li key={step.number}>
            <span>{step.number}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="studio-story__action">
        <button
          className="primary-button"
          onClick={() => onOpenInquiry("a custom furniture consultation")}
        >
          Book a consultation <Arrow />
        </button>
      </div>
    </section>
  );
}
