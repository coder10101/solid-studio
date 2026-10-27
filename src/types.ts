export interface NavLink {
  label: string;
  href: string;
}

export interface ProductState {
  id: string;
  label: string;
  dimensions: string;
  image: string;
  description?: string;
}

export interface ProductSpecs {
  dimensions: string;
  customizable: string;
  materials: string;
  hardware?: string;
  finish: string;
  leadTime: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface CollectionItem {
  slug: string;
  seriesNumber: string;
  name: string;
  type: string;
  category: "Tables" | "Storage" | "Seating" | "Objects";
  image: string;
  secondaryImage?: string;
  alt: string;
  details?: string;
  story?: string;
  interactiveStates?: ProductState[];
  specs?: ProductSpecs;
  gallery?: GalleryImage[];
}

export type Piece = CollectionItem;

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface ContactInfo {
  email: string;
  instagram: string;
  facebook: string;
}

export interface ArrowProps {
  diagonal?: boolean;
  className?: string;
}

export interface BrandMarkProps {
  footer?: boolean;
  inverse?: boolean;
  className?: string;
  onNavigate?: (path: string) => void;
}

export interface HeaderProps {
  navLinks: NavLink[];
  menuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  onOpenInquiry?: (piece: string) => void;
  currentRoute?: string;
  onNavigate?: (path: string) => void;
}

export interface HeroProps {
  onOpenInquiry?: (piece: string) => void;
  onNavigate?: (path: string) => void;
}

export interface StatementProps {
  indexLabel?: string;
  lead: string;
  paragraphs: string[];
}

export interface CollectionProps {
  items: CollectionItem[];
  onOpenInquiry?: (piece: string) => void;
  onNavigate?: (path: string) => void;
}

export interface ServicesProps {
  services: ServiceItem[];
  onOpenInquiry?: (piece: string) => void;
}

export interface ProcessProps {
  steps: ProcessStep[];
}

export interface FooterProps {
  contactInfo: ContactInfo;
}

export interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPiece: string;
  contactEmail?: string;
  contactInfo?: ContactInfo;
}
