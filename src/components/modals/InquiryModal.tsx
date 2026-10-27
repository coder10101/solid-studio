import { useEffect } from "react";
import type { InquiryModalProps } from "../../types";
import Arrow from "../common/Arrow";

export default function InquiryModal({
  isOpen,
  onClose,
  selectedPiece,
  contactEmail = "hello@solidstudio.design",
  contactInfo,
}: InquiryModalProps) {
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

  const emailTo = contactInfo?.email || contactEmail;
  const subject = encodeURIComponent(`Enquiry: ${selectedPiece}`);

  return (
    <div
      className={`modal ${isOpen ? "is-open" : ""}`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        className="modal__scrim"
        aria-label="Close enquiry"
        onClick={onClose}
      />
      <div
        className="modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="inquiry-title"
      >
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          {"×"}
        </button>
        <p className="eyebrow">Design &amp; Consultation · Est. 2026</p>
        <h2 id="inquiry-title">{"Let’s start a conversation."}</h2>
        {selectedPiece && (
          <p className="modal__target-piece">
            Regarding: <span>{selectedPiece}</span>
          </p>
        )}
        <p>
          Whether you&apos;re ordering from our curated collection or looking for a custom
          furniture consultation tailored to your space and design references, our design
          team is ready to assist.
        </p>
        <a
          className="primary-button"
          href={`mailto:${emailTo}?subject=${subject}`}
        >
          Email the studio <Arrow />
        </a>

        {contactInfo && (
          <div className="modal__socials">
            <p>Or message our team directly:</p>
            <div className="modal__social-links">
              <a
                href={contactInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram ↗
              </a>
              <a
                href={contactInfo.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook ↗
              </a>
            </div>
          </div>
        )}

        <span className="modal__note">
          No obligation. Our in-house design team personally reviews each enquiry.
        </span>
      </div>
    </div>
  );
}
