export const templates = [
  {
    id: "001",
    name: "Nebula SaaS Launch Kit",
    category: "Landing Page",
    price: 89000,
    description: "A cinematic SaaS launch system with editorial sections, product storytelling, and sharp conversion flows.",
    images: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"
    ],
    demoLink: "https://demo.example.com/nebula",
    downloadLink: "https://drive.google.com/file/d/demo-nebula/view",
    featured: true,
    framework: "Next.js",
    darkMode: "Dark",
    animationLevel: "High",
    tags: ["SaaS", "Launch", "Premium", "Animated"],
    details: ["Responsive sections", "CMS-ready blocks", "Framer Motion reveals", "Clean conversion layouts"],
    reviews: [
      { id: "r1", userName: "Mina", rating: 5, review: "One of the cleanest premium landing kits I have used." }
    ]
  },
  {
    id: "002",
    name: "Aurelius Admin Matrix",
    category: "Dashboard",
    price: 135000,
    description: "Luxury analytics dashboard UI with KPI zones, workspace patterns, and polished data-heavy layouts.",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
    ],
    demoLink: "https://demo.example.com/aurelius",
    downloadLink: "https://drive.google.com/file/d/demo-aurelius/view",
    featured: true,
    framework: "React",
    darkMode: "Dark",
    animationLevel: "Medium",
    tags: ["Dashboard", "Admin", "Analytics"],
    details: ["Chart-ready sections", "Modular cards", "Sidebar flows", "Multi-panel workspace"],
    reviews: [
      { id: "r2", userName: "Daniel", rating: 5, review: "The visual language feels expensive and very usable." }
    ]
  },
  {
    id: "003",
    name: "Velour Commerce Screens",
    category: "Full Website",
    price: 112000,
    description: "Frontend commerce storefront with bold typography, premium merchandising blocks, and smooth motion.",
    images: [
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80"
    ],
    demoLink: "https://demo.example.com/velour",
    downloadLink: "https://drive.google.com/file/d/demo-velour/view",
    featured: false,
    framework: "Next.js",
    darkMode: "Dark",
    animationLevel: "High",
    tags: ["Ecommerce", "Storefront", "UI Kit"],
    details: ["Editorial product cards", "Performance-minded sections", "Component library included"],
    reviews: []
  },
  {
    id: "004",
    name: "Quartz Portfolio Motion",
    category: "UI Pack",
    price: 56000,
    description: "Interactive portfolio components and section library for premium personal or studio sites.",
    images: [
      "https://images.unsplash.com/photo-1522543558187-768b6df7c25c?auto=format&fit=crop&w=1200&q=80"
    ],
    demoLink: "https://demo.example.com/quartz",
    downloadLink: "https://drive.google.com/file/d/demo-quartz/view",
    featured: false,
    framework: "Tailwind CSS",
    darkMode: "Dark",
    animationLevel: "Low",
    tags: ["Portfolio", "Components", "Motion"],
    details: ["Case study blocks", "Gallery layouts", "Hero variants", "Smooth scroll scenes"],
    reviews: []
  }
];

export const testimonials = [
  {
    name: "Sofia Benson",
    role: "Creative Director",
    quote: "The presentation quality feels closer to an agency showcase than a typical template marketplace."
  },
  {
    name: "Hadi Karim",
    role: "Startup Founder",
    quote: "We shipped faster because the templates looked launch-ready without endless cleanup."
  },
  {
    name: "Erin Collins",
    role: "Product Designer",
    quote: "The combination of motion, structure, and polish is exactly what premium buyers expect."
  }
];

export const contributors = [
  { contributorId: "c001", name: "Tresor", email: "tresor@luxe.rw", role: "Admin", uploadsCount: 12 },
  { contributorId: "c002", name: "Cyusa", email: "cyusa@luxe.rw", role: "Admin", uploadsCount: 8 },
  { contributorId: "c003", name: "Asly", email: "asly@luxe.rw", role: "Admin", uploadsCount: 5 },
  { contributorId: "c004", name: "Studio Contributor", email: "contributor@luxe.rw", role: "Contributor", uploadsCount: 3 }
];

export const uploads = [
  {
    uploadId: "u001",
    contributorId: "c002",
    templateId: "001",
    zipFileLink: "https://drive.google.com/file/d/demo-nebula/view",
    uploadDate: "2026-04-20"
  },
  {
    uploadId: "u002",
    contributorId: "c003",
    templateId: "002",
    zipFileLink: "https://drive.google.com/file/d/demo-aurelius/view",
    uploadDate: "2026-04-25"
  }
];

export const reusableAssets = [
  { id: "a001", title: "Dashboard Chart Cards", type: "Component", category: "Dashboard", framework: "React" },
  { id: "a002", title: "Hero Illustration Pack", type: "Asset", category: "Landing Page", framework: "Universal" },
  { id: "a003", title: "Luxury Pricing Section", type: "Template Block", category: "UI Pack", framework: "Next.js" }
];

export const users = [
  {
    userId: "admin-1",
    name: "Tresor",
    email: "tresor@luxe.rw",
    role: "Admin",
    password: "tresor123",
    purchasedItems: ["001", "003"],
    favorites: ["002", "004"]
  },
  {
    userId: "admin-2",
    name: "Cyusa",
    email: "cyusa@luxe.rw",
    role: "Admin",
    password: "cyusa123",
    purchasedItems: ["001"],
    favorites: ["003"]
  },
  {
    userId: "admin-3",
    name: "Asly",
    email: "asly@luxe.rw",
    role: "Admin",
    password: "asly123",
    purchasedItems: ["002"],
    favorites: ["001", "004"]
  },
  {
    userId: "contrib-1",
    name: "Studio Contributor",
    email: "contributor@luxe.rw",
    role: "Contributor",
    password: "demo123",
    purchasedItems: [],
    favorites: ["001"]
  }
];

export const adminProfiles = [
  {
    adminId: "admin-1",
    name: "Tresor",
    email: "tresor@luxe.rw",
    title: "Founder Workspace",
    themeName: "Obsidian Gold",
    accent: "#f3c34a",
    surface: "#110d06",
    styleNote: "Editorial luxury panels with strong gold highlights."
  },
  {
    adminId: "admin-2",
    name: "Cyusa",
    email: "cyusa@luxe.rw",
    title: "Cyusa Control Room",
    themeName: "Cobalt Glass",
    accent: "#72a7ff",
    surface: "#081221",
    styleNote: "Cool blue glass panels for analytics-heavy decisions."
  },
  {
    adminId: "admin-3",
    name: "Asly",
    email: "asly@luxe.rw",
    title: "Asly Creative Desk",
    themeName: "Rose Carbon",
    accent: "#ff8fb7",
    surface: "#1a0d18",
    styleNote: "Soft rose highlights for curation, branding, and previews."
  }
];

export const htmlShowcases = [
  {
    indexId: "idx-001",
    name: "Luxury Product Grid",
    slug: "luxury-product-grid",
    priceRwf: 45000,
    category: "Index HTML",
    previewTitle: "Product cards with premium hover reveal",
    previewDescription: "Ready-to-wire index.html storefront with spotlight hero, card matrix, and backend notes.",
    backendSpec: "Needs Templates, Reviews, and SiteSettings actions.",
    previewImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
  },
  {
    indexId: "idx-002",
    name: "Agency Landing Index",
    slug: "agency-landing-index",
    priceRwf: 60000,
    category: "Index HTML",
    previewTitle: "High-conversion agency launch page",
    previewDescription: "Optimized for bundles, testimonial blocks, and premium CTA flows.",
    backendSpec: "Needs Templates, Messages, and Orders actions.",
    previewImage: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80"
  },
  {
    indexId: "idx-003",
    name: "Dashboard Catalog Index",
    slug: "dashboard-catalog-index",
    priceRwf: 75000,
    category: "Index HTML",
    previewTitle: "Internal asset browser with sidebar menu",
    previewDescription: "Ready for team previews, reusable blocks, and editable product data.",
    backendSpec: "Needs Uploads, Contributors, HtmlShowcases, and DbConnections actions.",
    previewImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
  }
];

export const dbConnections = [
  {
    connectionId: "db-001",
    name: "Primary Google Sheets",
    type: "Google Sheets",
    target: "1M67XJtour1UwVTOnJow1tiy3Te_e6SHYfjrd9w_G0cw",
    status: "Connected"
  },
  {
    connectionId: "db-002",
    name: "Backup Catalog",
    type: "Placeholder",
    target: "Attach later",
    status: "Ready"
  }
];
