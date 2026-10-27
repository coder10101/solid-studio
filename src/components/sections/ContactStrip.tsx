import Arrow from "../common/Arrow";

interface ContactStripProps {
  onOpenInquiry: (piece: string) => void;
}

export default function ContactStrip({ onOpenInquiry }: ContactStripProps) {
  return (
    <section className="contact-strip">
      <p className="eyebrow">Have a space in mind?</p>
      <button onClick={() => onOpenInquiry("a new project")}>
        {"Let’s make something "}
        <em>solid.</em> <Arrow diagonal />
      </button>
    </section>
  );
}
