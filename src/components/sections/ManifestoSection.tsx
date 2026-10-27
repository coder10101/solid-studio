import Arrow from "../common/Arrow";

export default function ManifestoSection() {
  return (
    <section className="manifesto section-frame" id="studio">
      <p className="eyebrow">Our Studio &amp; Approach</p>
      <h2 className="manifesto__statement">
        We design for your space—turning inspiration into <em>essential</em> furniture.
      </h2>
      <div className="manifesto__footer">
        <p>
          Established in 2026, Solid Studio is an in-house design and furniture consultation team.
          We curate contemporary global inspirations, blend them with our original studio concepts,
          and design custom furniture tailored to our clients&apos; exact spaces and functional needs.
          Every piece is drafted with intentional proportions and brought to life through dedicated master fabricators.
        </p>
        <a className="text-link text-link--light" href="#consultation">
          Our consultation &amp; process <Arrow />
        </a>
      </div>
    </section>
  );
}
