import type { FooterProps } from "../../types";
import Arrow from "../common/Arrow";
import BrandMark from "../common/BrandMark";

function InstagramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle className="fill" cx="17.4" cy="6.8" r="1" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M14 21v-8h3l.5-3H14V8.5c0-1.2.4-2 2-2h2V3.2C17.5 3.1 16.2 3 14.8 3 12 3 10 4.7 10 8v2H7v3h3v8" />
    </svg>
  );
}

export default function Footer({ contactInfo, onNavigate }: FooterProps) {
  const handleCollectionClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate("#/collection");
    } else {
      window.location.hash = "#/collection";
    }
  };

  const handleScrollTo = (
    id: string,
    e: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer id="contact">
      <div className="footer__top">
        <div className="footer__hero">
          <p className="footer__prompt">Have something in mind?</p>
          <h2>
            Let’s make it <em>solid.</em>
          </h2>
        </div>

        <a className="footer__email" href={`mailto:${contactInfo.email}`}>
          {contactInfo.email} <Arrow diagonal />
        </a>
      </div>

      <div className="footer__bottom">
        <BrandMark footer onNavigate={onNavigate} />
        <p>Furniture design studio · Est. 2026</p>
        <div className="socials">
          <a
            href={contactInfo.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>
          <a
            href={contactInfo.facebook}
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            <FacebookIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
