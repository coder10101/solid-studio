import type { StatementProps } from "../../types";

export default function StatementSection({
  indexLabel = "01 / Studio",
  lead,
  paragraphs,
}: StatementProps) {
  return (
    <section className="statement" id="studio">
      <div className="section-index">{indexLabel}</div>
      <div className="statement__body">
        <p className="statement__lead">{lead}</p>
        <div className="statement__note">
          {paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
