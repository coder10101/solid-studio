import type { ProcessProps } from "../../types";

export default function ProcessSection({ steps }: ProcessProps) {
  return (
    <section className="process">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Our approach</p>
          <h2>Simple by design.</h2>
        </div>
      </div>
      <div className="process__grid">
        {steps.map((step) => (
          <article key={step.number}>
            <span>{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
