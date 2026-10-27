import solidStudioLogo from "../../assets/solid-studio-logo.svg";

export default function IntroScreen() {
  return (
    <div className="intro" aria-label="Loading Solid Studio">
      <div className="intro__logo-wrap">
        <img src={solidStudioLogo} alt="Solid Studio" />
        <span className="intro__line" />
      </div>
      <span className="intro__label">Design &amp; Consultation · Est. 2026</span>
    </div>
  );
}
