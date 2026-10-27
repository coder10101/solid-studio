import { useEffect } from "react";
import type { NavLink } from "../../types";
import Arrow from "../common/Arrow";
import BrandMark from "../common/BrandMark";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiry: (piece: string) => void;
  navLinks: NavLink[];
}

export default function MobileMenu({
  isOpen,
  onClose,
  onOpenInquiry,
  navLinks,
}: MobileMenuProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleInquire = () => {
    onClose();
    onOpenInquiry("a furniture consultation");
  };

  return (
    <div
      className={`mobile-menu ${isOpen ? "is-open" : ""}`}
      aria-hidden={!isOpen}
    >
      <div className="mobile-menu__top">
        <BrandMark inverse />
        <button onClick={onClose} aria-label="Close menu">
          Close
        </button>
      </div>
      <nav>
        {navLinks.map((link, index) => (
          <a href={link.href} key={link.href} onClick={onClose}>
            <span>0{index + 1}</span>
            {link.label}
          </a>
        ))}
      </nav>
      <button className="mobile-inquire" onClick={handleInquire}>
        Book Consultation <Arrow />
      </button>
    </div>
  );
}
