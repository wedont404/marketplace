// ─── SEED FUNCTION ────────────────────────────────────────────────────────────
// Paste this into your Code.gs (below everything else)
// Then run seedData() ONCE from the function dropdown
// Your spreadsheet: 1M67XJtour1UwVTOnJow1tiy3Te_e6SHYfjrd9w_G0cw

function seedData() {
  const ss = SpreadsheetApp.openById("1M67XJtour1UwVTOnJow1tiy3Te_e6SHYfjrd9w_G0cw");

  // ── Templates ──────────────────────────────────────────────────────────────
  const tSheet = ss.getSheetByName("Templates");
  const templates = [
    [
      "001", "Nebula SaaS Launch Kit", "Landing Page", 79, 5, 0,
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      JSON.stringify(["https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"]),
      "Ariana West",
      "A cinematic SaaS launch system with editorial sections, product storytelling, and sharp conversion flows.",
      JSON.stringify(["SaaS","Launch","Premium","Animated"]),
      "Next.js", "Dark", "High",
      "https://demo.example.com/nebula",
      "https://drive.google.com/file/d/demo-nebula/view",
      true,
      JSON.stringify(["Responsive sections","CMS-ready blocks","Framer Motion reveals","Clean conversion layouts"]),
      "2026-04-20"
    ],
    [
      "002", "Aurelius Admin Matrix", "Dashboard", 119, 5, 0,
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      JSON.stringify(["https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"]),
      "Leo Hart",
      "Luxury analytics dashboard UI with KPI zones, workspace patterns, and polished data-heavy layouts.",
      JSON.stringify(["Dashboard","Admin","Analytics"]),
      "React", "Dark", "Medium",
      "https://demo.example.com/aurelius",
      "https://drive.google.com/file/d/demo-aurelius/view",
      true,
      JSON.stringify(["Chart-ready sections","Modular cards","Sidebar flows","Multi-panel workspace"]),
      "2026-04-21"
    ],
    [
      "003", "Velour Commerce Screens", "Full Website", 99, 4.8, 0,
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80",
      JSON.stringify(["https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80"]),
      "Mina Noor",
      "Frontend commerce storefront with bold typography, premium merchandising blocks, and smooth motion.",
      JSON.stringify(["Ecommerce","Storefront","UI Kit"]),
      "Next.js", "Dark", "High",
      "https://demo.example.com/velour",
      "https://drive.google.com/file/d/demo-velour/view",
      false,
      JSON.stringify(["Editorial product cards","Performance-minded sections","Component library included"]),
      "2026-04-22"
    ],
    [
      "004", "Quartz Portfolio Motion", "UI Pack", 49, 4.7, 0,
      "https://images.unsplash.com/photo-1522543558187-768b6df7c25c?auto=format&fit=crop&w=1200&q=80",
      JSON.stringify(["https://images.unsplash.com/photo-1522543558187-768b6df7c25c?auto=format&fit=crop&w=1200&q=80"]),
      "Leo Hart",
      "Interactive portfolio components and section library for premium personal or studio sites.",
      JSON.stringify(["Portfolio","Components","Motion"]),
      "Tailwind CSS", "Dark", "Low",
      "https://demo.example.com/quartz",
      "https://drive.google.com/file/d/demo-quartz/view",
      false,
      JSON.stringify(["Case study blocks","Gallery layouts","Hero variants","Smooth scroll scenes"]),
      "2026-04-23"
    ]
  ];
  templates.forEach((row) => tSheet.appendRow(row));
  Logger.log("✅ Templates seeded: " + templates.length + " rows");

  // ── Contributors ───────────────────────────────────────────────────────────
  const cSheet = ss.getSheetByName("Contributors");
  const contributors = [
    ["c001", "Ariana West",  "ariana@luxe.dev",      "Admin",       12, "2025-01-01"],
    ["c002", "Leo Hart",     "leo@luxe.dev",          "Contributor",  8, "2025-02-01"],
    ["c003", "Mina Noor",    "mina@luxe.dev",         "Contributor",  5, "2025-03-01"],
  ];
  contributors.forEach((row) => cSheet.appendRow(row));
  Logger.log("✅ Contributors seeded: " + contributors.length + " rows");

  // ── Uploads ────────────────────────────────────────────────────────────────
  const uSheet = ss.getSheetByName("Uploads");
  const uploads = [
    ["u001", "c002", "001", "https://drive.google.com/file/d/demo-nebula/view",   "2026-04-20", "active"],
    ["u002", "c003", "002", "https://drive.google.com/file/d/demo-aurelius/view", "2026-04-25", "active"],
  ];
  uploads.forEach((row) => uSheet.appendRow(row));
  Logger.log("✅ Uploads seeded: " + uploads.length + " rows");

  // ── Users ──────────────────────────────────────────────────────────────────
  const usersSheet = ss.getSheetByName("Users");
  const users = [
    ["admin-1",   "Ariana West", "admin@luxe.dev",       "Admin",       "admin123", JSON.stringify(["001","003"]), JSON.stringify(["002","004"]), "2025-01-01"],
    ["contrib-1", "Leo Hart",    "contributor@luxe.dev",  "Contributor", "demo123",  JSON.stringify([]),           JSON.stringify(["001"]),       "2025-02-01"],
  ];
  users.forEach((row) => usersSheet.appendRow(row));
  Logger.log("✅ Users seeded: " + users.length + " rows");

  Logger.log("🎉 All sheets seeded successfully.");
}
