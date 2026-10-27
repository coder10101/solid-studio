import type {
  CollectionItem,
  ContactInfo,
  NavLink,
  ProcessStep,
  ServiceItem,
} from "../types";

export const collection: CollectionItem[] = [
  {
    slug: "dual-nesting-table",
    seriesNumber: "No. 001",
    name: "Dual Nesting Table",
    category: "Tables",
    type: "Tables / 2026",
    image: "/images/dual-coffee-table.jpg",
    secondaryImage: "/images/sliding-table.jpg",
    alt: "Handcrafted dual nesting walnut coffee table with integrated book and magazine slot",
    details:
      "Dual-tier nesting tables crafted in rich walnut with an integrated vertical book and magazine slot.",
    story:
      "Engineered around the choreography of morning coffee and evening gatherings. The Dual Nesting Table pairs a spacious primary low table with a tiered secondary volume that nests cleanly underneath or expands outward when company arrives. An integrated vertical slot accommodates books, design monographs, and journals with understated poise.",
    interactiveStates: [
      {
        id: "nested",
        label: "Nested Mode",
        dimensions: '44" L × 24" W × 16" H',
        image: "/images/dual-coffee-table.jpg",
        description: "Compact configuration for uncluttered daily living.",
      },
      {
        id: "separated",
        label: "Separated Mode",
        dimensions: 'Extended span up to 68" L',
        image: "/images/sliding-table.jpg",
        description:
          "Expanded dual surfaces for entertaining and book storage.",
      },
    ],
    specs: {
      dimensions:
        'Primary: 36" L × 24" W × 16" H | Secondary: 28" L × 20" W × 13.5" H',
      customizable:
        "Lengths, table widths, and wood finishes can be tailored to match your seating proportions.",
      materials:
        "Solid American walnut framing, select birch core, natural hand-rubbed oil finish",
      hardware: "Concealed glide pins, felt-buffered edge rests",
      finish: "Low-VOC ultra-matte protective clear coat",
      leadTime: "Made to order · 3 to 4 weeks delivery",
    },
    gallery: [
      {
        src: "/images/dual-coffee-table.jpg",
        alt: "Dual nesting table primary view with brass vase and sofa",
        caption: "Primary arrangement in living lounge with natural daylight",
      },
      {
        src: "/images/sliding-table.jpg",
        alt: "Dual nesting table extended angle showing book slot",
        caption:
          "Integrated vertical book and journal slot with sliding extension",
      },
    ],
  },
  {
    slug: "c-frame-side-table",
    seriesNumber: "No. 002",
    name: "C-Frame Side Table",
    category: "Tables",
    type: "Tables / 2026",
    image: "/images/side-table.jpg",
    secondaryImage: "/images/side-table-clean.jpg",
    alt: "Architectural dark wood and slate C-frame side table styled beside sofa with lamp and book",
    details:
      "Cantilevered C-frame accent table designed to slide effortlessly beside sofas and lounge seating.",
    story:
      "Conceived to solve the friction of reach. The C-Frame Table slides its grounded foot beneath modern sofas and lounge chairs, bringing a drink, notebook, or lamp directly to your fingertips without interrupting your posture. Hand-shaped with architectural poise and balanced cantilever weight.",
    interactiveStates: [
      {
        id: "styled",
        label: "Lounge Context",
        dimensions: '16" L × 14" W × 22" H',
        image: "/images/side-table.jpg",
        description:
          "In-situ beside lounge seating with reading lamp and journal.",
      },
      {
        id: "monograph",
        label: "Studio Monograph",
        dimensions: '16" L × 14" W × 22" H',
        image: "/images/side-table-clean.jpg",
        description:
          "Clean profile highlighting cantilevered architectural joinery.",
      },
    ],
    specs: {
      dimensions: '16" L × 14" W × 22" H (Sofa base clearance: 1.5")',
      customizable:
        "Height can be customized to align flush with your specific sofa arm height.",
      materials:
        "Ebonized walnut / rich dark hardwood, counterweighted steel anchor",
      hardware: "Non-marking felt sliders for hardwood and tile floors",
      finish: "Matte hand-buffed protective oil finish",
      leadTime: "Made to order · 2 to 3 weeks delivery",
    },
    gallery: [
      {
        src: "/images/side-table.jpg",
        alt: "C-frame side table beside lounge sofa with ceramic lamp",
        caption: "Lounge placement with evening lamp and reading material",
      },
      {
        src: "/images/side-table-clean.jpg",
        alt: "C-frame side table clean studio monograph",
        caption: "Architectural cantilever profile in natural daylight",
      },
    ],
  },
  {
    slug: "expandable-tv-console",
    seriesNumber: "No. 003",
    name: "Expandable TV Console",
    category: "Storage",
    type: "Storage / 2026",
    image: "/images/expandable-tv-console.jpg",
    secondaryImage: "/images/drawer.jpg",
    alt: "Expandable modular walnut media console with lower sliding bench and drawer storage",
    details:
      "Modular media unit expandable from 4 ft to 7 ft, featuring tiered shelving and smooth drawer storage.",
    story:
      "A transformative response to modern living spaces. The Expandable TV Console consists of an architectural cantilevered upper bridge that slides seamlessly over a grounded lower bench. Keep it compact at 48 inches for intimate apartments, or expand it out to 84 inches to anchor wide cinematic media walls. Built with an oversized push-to-open drawer and open-backed ventilation for clean cable management.",
    interactiveStates: [
      {
        id: "compact",
        label: "Compact Mode (4 ft)",
        dimensions: '48" W × 14" D × 18" H',
        image: "/images/expandable-tv-console.jpg",
        description:
          "Consolidated footprint ideal for compact living rooms and small media nooks.",
      },
      {
        id: "expanded",
        label: "Extended Mode (7 ft)",
        dimensions: 'Expands up to 84" W × 14" D × 18" H',
        image: "/images/expandable-tv-console.jpg",
        description:
          "Cantilever slides horizontally to accommodate large display screens and curated decor.",
      },
    ],
    specs: {
      dimensions: 'Standard 48" W (expandable to 84" W) × 14" D × 18" H',
      customizable:
        "Overall length range, drawer configuration, and cable-chase pass-throughs fully customizable.",
      materials:
        "Architectural birch plywood core, rich walnut veneers, matte Formica top shelf",
      hardware:
        "Heavy-duty soft-close undermount slides, concealed slide glides",
      finish: "Satin matte clear sealant, scratch-resistant Formica surface",
      leadTime: "Made to order · 3 to 5 weeks delivery",
    },
    gallery: [
      {
        src: "/images/expandable-tv-console.jpg",
        alt: "Expandable TV console wide architectural view with sliding lower unit",
        caption:
          "Wide perspective showing tiered cantilever bench and styled display",
      },
      {
        src: "/images/drawer.jpg",
        alt: "Close-up detail of smooth walnut drawer face and precision joinery",
        caption: "Soft-close storage drawer with seamless mitred edge details",
      },
    ],
  },
];

export const navLinks: NavLink[] = [
  { label: "Collection", href: "#/collection" },
  { label: "Studio", href: "#studio" },
  { label: "Services", href: "#services" },
];

export const statementData = {
  indexLabel: "01 / Studio",
  lead: "We believe good furniture begins with a clear idea and ends with a piece that feels right at home.",
  paragraphs: [
    "Solid Studio is an independent furniture design practice established in 2026. Our team brings together proportion, material, and everyday function to create pieces with a calm, lasting presence.",
    "Choose from our growing collection or work with us on a design tailored to your space and needs.",
  ],
};

export const servicesData: ServiceItem[] = [
  {
    number: "01",
    title: "Studio Collection",
    description:
      "Discover original pieces selected by our team and available to order. Ask us about dimensions, finishes, lead times, and delivery.",
  },
  {
    number: "02",
    title: "Furniture Consultation",
    description:
      "Have a room, a reference, or simply a need? We develop the direction, dimensions, materials, and details with you for a furniture piece that fits.",
  },
];

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Listen",
    description: "We begin with your space, needs, references, and budget.",
  },
  {
    number: "02",
    title: "Define",
    description: "Our team shapes the direction, scale, material, and finish.",
  },
  {
    number: "03",
    title: "Develop",
    description: "The selected design is detailed and prepared for production.",
  },
  {
    number: "04",
    title: "Deliver",
    description:
      "We coordinate the final piece and keep you updated along the way.",
  },
];

export const contactInfo: ContactInfo = {
  email: "solidstudionp@gmail.com",
  instagram: "https://www.instagram.com/solid.np/",
  facebook:
    "https://www.facebook.com/profile.php?id=61594560154602&ref=PROFILE_EDIT_xav_ig_profile_page_web#",
};
