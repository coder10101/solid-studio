import type { ServicesProps } from "../../types";
import Arrow from "../common/Arrow";

export default function ServicesSection({
  services,
  onOpenInquiry,
}: ServicesProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleRowClick = (index: number) => {
    if (index === 0) {
      scrollTo("collection");
    } else {
      if (onOpenInquiry) {
        onOpenInquiry("Furniture Consultation");
      } else {
        scrollTo("contact");
      }
    }
  };

  const handleDiscussClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onOpenInquiry) {
      onOpenInquiry("Custom Furniture Project");
    } else {
      scrollTo("contact");
    }
  };

  return (
    <section className="services" id="services">
      <div className="services__visual">
        <img
          alt="Solid Studio architectural C-frame accent table in natural light"
          src="/images/side-table-clean.jpg"
        />
        <span>From an idea to your room</span>
      </div>
      <div className="services__content">
        <div className="section-index">02 / What we do</div>
        <h2>Two ways to work with us.</h2>

        {services.map((item, index) => (
          <a
            key={item.number}
            className="service-row service-row--clickable"
            href={index === 0 ? "#collection" : "#contact"}
            onClick={(e) => {
              e.preventDefault();
              handleRowClick(index);
            }}
          >
            <span>{item.number}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            <span
              className="service-row__action"
              aria-label={index === 0 ? "Scroll to Collection" : "Inquire about furniture consultation"}
            >
              <Arrow diagonal />
            </span>
          </a>
        ))}

        <a
          className="button-link"
          href="#contact"
          onClick={handleDiscussClick}
        >
          Discuss your project <Arrow />
        </a>
      </div>
    </section>
  );
}
