import type { HeaderProps } from "../../types";
import Arrow from "../common/Arrow";
import BrandMark from "../common/BrandMark";

export default function Header({
  navLinks,
  menuOpen,
  onToggleMenu,
  onCloseMenu,
  onOpenInquiry,
  currentRoute = "#/",
  onNavigate,
}: HeaderProps) {
  const isSubpage = currentRoute.startsWith("#/collection");

  const handleNavClick = (link: { label: string; href: string }) => {
    onCloseMenu();

    if (link.label === "Collection") {
      if (onNavigate) {
        onNavigate("#/collection");
      } else {
        window.location.hash = "#/collection";
      }
      return;
    }

    const sectionId = link.href.replace("#", "");
    if (isSubpage) {
      if (onNavigate) {
        onNavigate("#/");
      } else {
        window.location.hash = "#/";
      }
      // Give DOM time to mount homepage before scrolling
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onCloseMenu();
    if (onOpenInquiry) {
      onOpenInquiry("New Custom Furniture Project");
    } else {
      const el = document.getElementById("contact");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <header className="header">
      <BrandMark onNavigate={onNavigate} />

      <nav
        className={menuOpen ? "nav nav--open" : "nav"}
        aria-label="Main navigation"
      >
        {navLinks.map((link) => {
          const isLinkActive =
            link.label === "Collection" && isSubpage;
          return (
            <a
              key={link.href}
              href={link.href}
              className={isLinkActive ? "is-active" : ""}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link);
              }}
            >
              {link.label}
            </a>
          );
        })}
      </nav>

      <a
        className="header__contact"
        href="#contact"
        onClick={handleContactClick}
      >
        Start a project <Arrow />
      </a>

      <button
        aria-expanded={menuOpen}
        aria-label="Toggle navigation"
        className="menu-button"
        onClick={onToggleMenu}
        type="button"
      >
        <span />
        <span />
      </button>
    </header>
  );
}
