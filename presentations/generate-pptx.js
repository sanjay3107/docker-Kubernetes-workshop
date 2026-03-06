const PptxGenJS = require("pptxgenjs");

// ─── THEME COLOURS ───────────────────────────────────────────────────────────
const DOCKER_BLUE   = "2496ED";
const DOCKER_DARK   = "1A3A5C";
const K8S_BLUE      = "326CE5";
const K8S_DARK      = "1A2F6B";
const WHITE         = "FFFFFF";
const LIGHT_BG      = "F0F4FF";
const CODE_BG       = "1E1E2E";
const CODE_FG       = "CDD6F4";
const ACCENT        = "F5A623";
const GREY_TEXT     = "555555";

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function titleSlide(prs, title, subtitle, accentColor, darkColor) {
  const sld = prs.addSlide();
  sld.background = { color: darkColor };

  // decorative top bar
  sld.addShape(prs.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 0.08, fill: { color: accentColor } });
  // big circle accent
  sld.addShape(prs.ShapeType.ellipse, { x: 7.8, y: -1.2, w: 4, h: 4, fill: { color: accentColor }, line: { color: accentColor } });

  sld.addText(title, {
    x: 0.5, y: 1.6, w: 7.5, h: 1.4,
    fontSize: 40, bold: true, color: WHITE, fontFace: "Calibri"
  });
  sld.addText(subtitle, {
    x: 0.5, y: 3.1, w: 7.5, h: 0.7,
    fontSize: 22, color: accentColor, fontFace: "Calibri"
  });
  sld.addText("Docker & Kubernetes Workshop", {
    x: 0.5, y: 4.5, w: 9, h: 0.4,
    fontSize: 13, color: "AAAAAA", fontFace: "Calibri"
  });
  sld.addShape(prs.ShapeType.rect, { x: 0, y: 4.95, w: "100%", h: 0.05, fill: { color: accentColor } });
}

function contentSlide(prs, title, accentColor) {
  const sld = prs.addSlide();
  sld.background = { color: WHITE };
  sld.addShape(prs.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 0.55, fill: { color: accentColor } });
  sld.addShape(prs.ShapeType.rect, { x: 0, y: 4.95, w: "100%", h: 0.05, fill: { color: accentColor } });
  sld.addText(title, {
    x: 0.3, y: 0.06, w: 9.4, h: 0.44,
    fontSize: 20, bold: true, color: WHITE, fontFace: "Calibri", valign: "middle"
  });
  return sld;
}

function addBullets(sld, items, x, y, w, h, opts = {}) {
  const rows = items.map(item => ({
    text: item.text,
    options: {
      fontSize: item.size || opts.size || 16,
      bold: item.bold || false,
      color: item.color || opts.color || "333333",
      bullet: item.bullet !== false ? (opts.bullet !== false ? true : false) : false,
      indentLevel: item.indent || 0,
      breakLine: true,
      fontFace: "Calibri",
      paraSpaceAfter: item.spacer ? 8 : 3,
    }
  }));
  sld.addText(rows, { x, y, w, h, valign: "top", fontFace: "Calibri" });
}

function addCode(sld, code, x, y, w, h) {
  sld.addShape(sld.pres ? sld.pres.ShapeType.rect : "rect", { x, y, w, h, fill: { color: CODE_BG }, line: { color: "444466", width: 1 } });
  sld.addText(code, {
    x: x + 0.12, y: y + 0.1, w: w - 0.24, h: h - 0.2,
    fontSize: 10, color: CODE_FG, fontFace: "Courier New", valign: "top"
  });
}

function addTable(sld, headers, rows, x, y, w, accentColor) {
  const tableData = [];
  tableData.push(headers.map(h => ({
    text: h, options: { bold: true, color: WHITE, fill: { color: accentColor }, fontSize: 12, align: "center", fontFace: "Calibri" }
  })));
  rows.forEach((row, ri) => {
    tableData.push(row.map(cell => ({
      text: cell, options: { color: "333333", fill: { color: ri % 2 === 0 ? LIGHT_BG : WHITE }, fontSize: 11, align: "center", fontFace: "Calibri" }
    })));
  });
  sld.addTable(tableData, { x, y, w, colW: Array(headers.length).fill(w / headers.length), border: { pt: 1, color: "CCCCCC" } });
}

function sectionDivider(prs, label, accentColor, darkColor) {
  const sld = prs.addSlide();
  sld.background = { color: darkColor };
  sld.addShape(prs.ShapeType.rect, { x: 0, y: 2.1, w: "100%", h: 0.06, fill: { color: accentColor } });
  sld.addText(label, {
    x: 0.5, y: 1.2, w: 9, h: 0.9,
    fontSize: 32, bold: true, color: WHITE, align: "center", fontFace: "Calibri"
  });
  sld.addText("─────────────────────────────", {
    x: 0.5, y: 2.3, w: 9, h: 0.5,
    fontSize: 14, color: accentColor, align: "center", fontFace: "Calibri"
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
//  DOCKER PRESENTATION
// ═══════════════════════════════════════════════════════════════════════════════
function buildDocker() {
  const prs = new PptxGenJS();
  prs.layout = "LAYOUT_WIDE";
  prs.title = "Introduction to Docker";
  prs.author = "Docker & Kubernetes Workshop";

  // ── SLIDE 1: Title ──────────────────────────────────────────────────────────
  titleSlide(prs, "Introduction to Docker", "Containerization Made Simple", DOCKER_BLUE, DOCKER_DARK);

  // ── SLIDE 2: Agenda ─────────────────────────────────────────────────────────
  {
    const sld = contentSlide(prs, "What We'll Cover Today", DOCKER_BLUE);
    addBullets(sld, [
      { text: "🐳  What is Docker?", size: 17 },
      { text: "🔥  The Problem Docker Solves", size: 17 },
      { text: "🆚  Docker vs Virtual Machines", size: 17 },
      { text: "🧱  Core Concepts – Images & Containers", size: 17 },
      { text: "🌐  Docker Hub", size: 17 },
      { text: "🎓  Hands-On Demo", size: 17 },
      { text: "🚀  Next Steps", size: 17 },
    ], 1.2, 0.7, 7.5, 4.1, { color: "222222" });
    sld.addText("⏱  30 minutes", { x: 7.2, y: 4.55, w: 2.5, h: 0.35, fontSize: 13, color: DOCKER_BLUE, bold: true, fontFace: "Calibri" });
  }

  // ── SLIDE 3: What is Docker ─────────────────────────────────────────────────
  {
    const sld = contentSlide(prs, "What is Docker?", DOCKER_BLUE);
    sld.addShape(prs.ShapeType.roundRect, { x: 0.3, y: 0.65, w: 5.5, h: 1.5, fill: { color: LIGHT_BG }, line: { color: DOCKER_BLUE, width: 2 }, rectRadius: 0.1 });
    sld.addText(
      "Docker is a platform that packages applications with everything they need to run, then runs them anywhere.",
      { x: 0.45, y: 0.72, w: 5.2, h: 1.3, fontSize: 14, color: DOCKER_DARK, italic: true, fontFace: "Calibri", valign: "middle" }
    );
    addBullets(sld, [
      { text: "🐳  Open-source containerisation platform", size: 15 },
      { text: "📦  Package app + all dependencies together", size: 15 },
      { text: "🚀  Run consistently across all environments", size: 15 },
      { text: "⚡  Lightweight and blazing fast", size: 15 },
    ], 0.4, 2.35, 5.4, 2.4, { color: "333333" });
    sld.addShape(prs.ShapeType.roundRect, { x: 6.1, y: 0.65, w: 3.5, h: 4.1, fill: { color: DOCKER_DARK }, line: { color: DOCKER_BLUE, width: 2 }, rectRadius: 0.15 });
    sld.addText('"Build once,\nrun anywhere"', { x: 6.2, y: 1.5, w: 3.3, h: 1.5, fontSize: 18, bold: true, color: DOCKER_BLUE, align: "center", fontFace: "Calibri" });
    sld.addText("🐳", { x: 6.9, y: 2.8, w: 2, h: 1.5, fontSize: 60, align: "center" });
  }

  // ── SLIDE 4: The Problem ────────────────────────────────────────────────────
  {
    const sld = contentSlide(prs, 'The "It Works on My Machine" Problem', DOCKER_BLUE);
    // Without Docker column
    sld.addShape(prs.ShapeType.roundRect, { x: 0.3, y: 0.65, w: 4.5, h: 4.1, fill: { color: "FFF0F0" }, line: { color: "CC0000", width: 2 }, rectRadius: 0.1 });
    sld.addText("WITHOUT DOCKER ❌", { x: 0.4, y: 0.72, w: 4.3, h: 0.4, fontSize: 14, bold: true, color: "CC0000", align: "center", fontFace: "Calibri" });
    addBullets(sld, [
      { text: "Developer Laptop  ✅", bold: true, size: 13, bullet: false },
      { text: "Python 3.9, Node 18 → works", size: 12, indent: 1 },
      { text: "", spacer: true, size: 8, bullet: false },
      { text: "Teammate Laptop   ❌", bold: true, size: 13, bullet: false },
      { text: "Python 3.7 (wrong!) → breaks", size: 12, indent: 1 },
      { text: "", spacer: true, size: 8, bullet: false },
      { text: "Production Server  ❌", bold: true, size: 13, bullet: false },
      { text: "Different OS → crashes", size: 12, indent: 1 },
    ], 0.45, 1.2, 4.2, 3.4, { color: "333333", bullet: false });

    // With Docker column
    sld.addShape(prs.ShapeType.roundRect, { x: 5.1, y: 0.65, w: 4.5, h: 4.1, fill: { color: "F0FFF0" }, line: { color: "007700", width: 2 }, rectRadius: 0.1 });
    sld.addText("WITH DOCKER ✅", { x: 5.2, y: 0.72, w: 4.3, h: 0.4, fontSize: 14, bold: true, color: "007700", align: "center", fontFace: "Calibri" });
    addBullets(sld, [
      { text: "Developer Laptop  ✅", bold: true, size: 13, bullet: false },
      { text: "Docker Container → works", size: 12, indent: 1 },
      { text: "", spacer: true, size: 8, bullet: false },
      { text: "Teammate Laptop   ✅", bold: true, size: 13, bullet: false },
      { text: "Same container → works", size: 12, indent: 1 },
      { text: "", spacer: true, size: 8, bullet: false },
      { text: "Production Server  ✅", bold: true, size: 13, bullet: false },
      { text: "Same container → works!", size: 12, indent: 1 },
    ], 5.2, 1.2, 4.2, 3.4, { color: "333333", bullet: false });
  }

  // ── SLIDE 5: Real-World Benefits ────────────────────────────────────────────
  {
    const sld = contentSlide(prs, "Real-World Benefits", DOCKER_BLUE);
    const cols = [
      { title: "For Developers 👨‍💻", items: ["Consistent dev environment", "Easy onboarding (minutes!)", 'No "works on my machine"', "Test locally like production"], color: "1A3A8C" },
      { title: "For Operations 🛠️", items: ["Predictable deployments", "Easy scaling", "Efficient resource usage", "Quick rollbacks"], color: "006633" },
      { title: "For Business 📈", items: ["Faster time to market", "Lower infrastructure costs", "Improved reliability", "Happy customers"], color: "8B4500" },
    ];
    cols.forEach((col, i) => {
      const x = 0.2 + i * 3.3;
      sld.addShape(prs.ShapeType.roundRect, { x, y: 0.65, w: 3.1, h: 4.1, fill: { color: LIGHT_BG }, line: { color: col.color, width: 2 }, rectRadius: 0.12 });
      sld.addShape(prs.ShapeType.roundRect, { x, y: 0.65, w: 3.1, h: 0.5, fill: { color: col.color }, line: { color: col.color }, rectRadius: 0.12 });
      sld.addText(col.title, { x, y: 0.72, w: 3.1, h: 0.36, fontSize: 13, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
      addBullets(sld, col.items.map(t => ({ text: "✅  " + t, size: 13, bullet: false })), x + 0.15, 1.28, 2.8, 3.3, { color: "222222" });
    });
  }

  // ── SLIDE 6: Docker vs VMs ──────────────────────────────────────────────────
  {
    const sld = contentSlide(prs, "Docker vs Virtual Machines", DOCKER_BLUE);
    // VM box
    sld.addShape(prs.ShapeType.roundRect, { x: 0.3, y: 0.65, w: 4.3, h: 4.1, fill: { color: "FFF8F0" }, line: { color: "CC6600", width: 2 }, rectRadius: 0.1 });
    sld.addText("Virtual Machine 🖥️", { x: 0.3, y: 0.72, w: 4.3, h: 0.38, fontSize: 14, bold: true, color: "CC6600", align: "center", fontFace: "Calibri" });
    addBullets(sld, [
      { text: "Your Computer", bold: true, size: 12, bullet: false },
      { text: "└── Hypervisor", size: 12, bullet: false },
      { text: "    ├── VM1  (Full OS + App)", size: 11, bullet: false, color: "CC0000" },
      { text: "    └── VM2  (Full OS + App)", size: 11, bullet: false, color: "CC0000" },
      { text: "", spacer: true, size: 6, bullet: false },
      { text: "Each VM = 2-20 GB", size: 12, bullet: false, color: "AA4400" },
      { text: "Boot time: 1-2 minutes", size: 12, bullet: false, color: "AA4400" },
    ], 0.5, 1.2, 3.9, 3.3, { color: "333333", bullet: false });

    // Docker box
    sld.addShape(prs.ShapeType.roundRect, { x: 5.1, y: 0.65, w: 4.3, h: 4.1, fill: { color: "F0F8FF" }, line: { color: DOCKER_BLUE, width: 2 }, rectRadius: 0.1 });
    sld.addText("Docker 🐳", { x: 5.1, y: 0.72, w: 4.3, h: 0.38, fontSize: 14, bold: true, color: DOCKER_BLUE, align: "center", fontFace: "Calibri" });
    addBullets(sld, [
      { text: "Your Computer (shared OS)", bold: true, size: 12, bullet: false },
      { text: "└── Docker Engine", size: 12, bullet: false },
      { text: "    ├── App1 container", size: 11, bullet: false, color: "006600" },
      { text: "    ├── App2 container", size: 11, bullet: false, color: "006600" },
      { text: "    └── App3 container", size: 11, bullet: false, color: "006600" },
      { text: "", spacer: true, size: 6, bullet: false },
      { text: "Each Container = 10-500 MB", size: 12, bullet: false, color: "005599" },
      { text: "Boot time: 1-2 seconds ⚡", size: 12, bullet: false, color: "005599" },
    ], 5.3, 1.2, 3.9, 3.3, { color: "333333", bullet: false });
  }

  // ── SLIDE 7: Comparison Table ───────────────────────────────────────────────
  {
    const sld = contentSlide(prs, "Docker vs VMs – Comparison", DOCKER_BLUE);
    addTable(sld,
      ["Feature", "Virtual Machine", "Docker Container"],
      [
        ["Size",           "2–20 GB",       "10–500 MB ✅"],
        ["Boot Time",      "1–2 minutes",   "1–2 seconds ✅"],
        ["Performance",    "Slower",        "Near-native ✅"],
        ["Resource Usage", "Heavy",         "Lightweight ✅"],
        ["Isolation",      "Complete (OS)", "Process-level"],
        ["Portability",    "Medium",        "High ✅"],
      ],
      0.4, 0.7, 9.2, DOCKER_BLUE
    );
    sld.addText("Containers are much lighter and faster! ⚡", {
      x: 0.4, y: 4.5, w: 9.2, h: 0.4,
      fontSize: 15, bold: true, color: DOCKER_BLUE, align: "center", fontFace: "Calibri"
    });
  }

  // ── SLIDE 8: Section divider ────────────────────────────────────────────────
  sectionDivider(prs, "Core Docker Concepts", DOCKER_BLUE, DOCKER_DARK);

  // ── SLIDE 9: Docker Image ───────────────────────────────────────────────────
  {
    const sld = contentSlide(prs, "Core Concept #1 – Docker Image 🖼️", DOCKER_BLUE);
    addBullets(sld, [
      { text: "What is an Image?", bold: true, size: 16, bullet: false, color: DOCKER_DARK },
      { text: "📋  Blueprint / template for containers", size: 15 },
      { text: "📦  Contains app + ALL dependencies", size: 15 },
      { text: "🔒  Read-only (immutable)", size: 15 },
      { text: "💾  Stored locally or on Docker Hub", size: 15 },
      { text: "", spacer: true, size: 8, bullet: false },
      { text: "Analogy", bold: true, size: 16, bullet: false, color: DOCKER_DARK },
      { text: "📖  Like a RECIPE (blueprint)", size: 15 },
      { text: "🍪  Like a COOKIE CUTTER", size: 15 },
      { text: "🏛️  Like a CLASS in programming", size: 15 },
    ], 0.4, 0.65, 5.5, 4.2, { color: "333333" });

    sld.addShape(prs.ShapeType.roundRect, { x: 6.1, y: 0.65, w: 3.6, h: 4.1, fill: { color: DOCKER_DARK }, line: { color: DOCKER_BLUE, width: 2 }, rectRadius: 0.15 });
    sld.addText("python:3.9 image\ncontains:", { x: 6.2, y: 0.8, w: 3.4, h: 0.9, fontSize: 13, bold: true, color: DOCKER_BLUE, align: "center", fontFace: "Calibri" });
    addBullets(sld, [
      { text: "Linux OS (minimal)", size: 12, color: CODE_FG, bullet: false },
      { text: "Python 3.9 runtime", size: 12, color: CODE_FG, bullet: false },
      { text: "pip package manager", size: 12, color: CODE_FG, bullet: false },
      { text: "Your app code", size: 12, color: CODE_FG, bullet: false },
    ], 6.2, 1.75, 3.3, 2.8, { color: CODE_FG, bullet: false });
  }

  // ── SLIDE 10: Docker Container ──────────────────────────────────────────────
  {
    const sld = contentSlide(prs, "Core Concept #2 – Docker Container 📦", DOCKER_BLUE);
    addBullets(sld, [
      { text: "What is a Container?", bold: true, size: 16, bullet: false, color: DOCKER_DARK },
      { text: "▶️  Running instance of an image", size: 15 },
      { text: "🏃  Isolated environment", size: 15 },
      { text: "✍️  Can read / write while running", size: 15 },
      { text: "⏱️  Temporary (unless data is saved)", size: 15 },
      { text: "", spacer: true, size: 8, bullet: false },
      { text: "Analogy", bold: true, size: 16, bullet: false, color: DOCKER_DARK },
      { text: "🍝  Like a DISH from a recipe", size: 15 },
      { text: "📦  Like an OBJECT from a class", size: 15 },
      { text: "🍪  Like a COOKIE from a cutter", size: 15 },
    ], 0.4, 0.65, 5.5, 4.2, { color: "333333" });

    sld.addShape(prs.ShapeType.roundRect, { x: 6.1, y: 0.65, w: 3.6, h: 4.1, fill: { color: "F0FFF0" }, line: { color: "007700", width: 2 }, rectRadius: 0.15 });
    sld.addText("One Image →\nMany Containers!", { x: 6.2, y: 0.8, w: 3.4, h: 0.9, fontSize: 13, bold: true, color: "007700", align: "center", fontFace: "Calibri" });
    addBullets(sld, [
      { text: "python:3.9 image", bold: true, size: 12, bullet: false, color: DOCKER_DARK },
      { text: "├── Container 1 (web app)", size: 12, bullet: false },
      { text: "├── Container 2 (API)", size: 12, bullet: false },
      { text: "├── Container 3 (tests)", size: 12, bullet: false },
      { text: "└── Container 4 (worker)", size: 12, bullet: false },
    ], 6.2, 1.75, 3.3, 2.8, { color: "333333", bullet: false });
  }

  // ── SLIDE 11: Docker Hub ────────────────────────────────────────────────────
  {
    const sld = contentSlide(prs, "Docker Hub – The Image Registry 🌐", DOCKER_BLUE);
    sld.addShape(prs.ShapeType.roundRect, { x: 0.3, y: 0.65, w: 5.1, h: 2.0, fill: { color: LIGHT_BG }, line: { color: DOCKER_BLUE, width: 2 }, rectRadius: 0.1 });
    sld.addText("What is Docker Hub?", { x: 0.4, y: 0.72, w: 4.9, h: 0.38, fontSize: 15, bold: true, color: DOCKER_DARK, fontFace: "Calibri" });
    addBullets(sld, [
      { text: "🌐  Public registry for Docker images", size: 13 },
      { text: "📚  Like GitHub – but for images", size: 13 },
      { text: "🆓  Free to use", size: 13 },
      { text: "✅  Official verified images available", size: 13 },
    ], 0.4, 1.12, 5.0, 1.4, { color: "333333" });

    sld.addText("Popular Images", { x: 0.3, y: 2.75, w: 5.1, h: 0.38, fontSize: 15, bold: true, color: DOCKER_DARK, fontFace: "Calibri" });
    addTable(sld,
      ["Image", "Use", "Downloads"],
      [
        ["nginx",    "Web server",   "1B+"],
        ["python",   "Python",       "1B+"],
        ["node",     "Node.js",      "1B+"],
        ["redis",    "Database",     "1B+"],
        ["postgres", "Database",     "500M+"],
      ],
      0.3, 3.15, 5.1, DOCKER_BLUE
    );
    sld.addShape(prs.ShapeType.roundRect, { x: 5.7, y: 0.65, w: 4.0, h: 4.1, fill: { color: DOCKER_DARK }, line: { color: DOCKER_BLUE, width: 2 }, rectRadius: 0.15 });
    sld.addText("hub.docker.com", { x: 5.8, y: 0.8, w: 3.8, h: 0.5, fontSize: 15, bold: true, color: DOCKER_BLUE, align: "center", fontFace: "Calibri" });
    sld.addText("🌐", { x: 6.3, y: 1.5, w: 2.8, h: 1.5, fontSize: 64, align: "center" });
    sld.addText("Search, pull, push\nDocker images freely", { x: 5.8, y: 3.1, w: 3.8, h: 1.2, fontSize: 13, color: "CCCCCC", align: "center", fontFace: "Calibri" });
  }

  // ── SLIDE 12: Docker Workflow ───────────────────────────────────────────────
  {
    const sld = contentSlide(prs, "Docker Workflow", DOCKER_BLUE);
    const steps = [
      { n: "1", label: "Pull Image",        cmd: "docker pull python:3.9", x: 0.3 },
      { n: "2", label: "Run Container",     cmd: "docker run python:3.9",  x: 1.95 },
      { n: "3", label: "Develop & Test",    cmd: "(make changes)",         x: 3.6 },
      { n: "4", label: "Build Image",       cmd: "docker build -t myapp .",x: 5.25 },
      { n: "5", label: "Push to Hub",       cmd: "docker push myapp",      x: 6.9 },
    ];
    steps.forEach((s) => {
      sld.addShape(prs.ShapeType.ellipse,    { x: s.x + 0.4, y: 0.7,  w: 0.75, h: 0.75, fill: { color: DOCKER_BLUE }, line: { color: DOCKER_DARK } });
      sld.addText(s.n,  { x: s.x + 0.4, y: 0.7, w: 0.75, h: 0.75, fontSize: 18, bold: true, color: WHITE, align: "center", valign: "middle", fontFace: "Calibri" });
      sld.addText(s.label, { x: s.x, y: 1.55, w: 1.6, h: 0.5,  fontSize: 12, bold: true, color: DOCKER_DARK, align: "center", fontFace: "Calibri" });
      sld.addShape(prs.ShapeType.roundRect,  { x: s.x + 0.05, y: 2.15, w: 1.5, h: 0.65, fill: { color: CODE_BG }, line: { color: DOCKER_BLUE }, rectRadius: 0.06 });
      sld.addText(s.cmd, { x: s.x + 0.05, y: 2.18, w: 1.5, h: 0.6, fontSize: 8.5, color: CODE_FG, fontFace: "Courier New", align: "center", valign: "middle" });
      if (s.x < 6.9) sld.addText("→", { x: s.x + 1.55, y: 0.85, w: 0.4, h: 0.45, fontSize: 20, bold: true, color: DOCKER_BLUE, align: "center" });
    });
    sld.addText("6.  Deploy Anywhere  →  docker run myapp  →  Works Everywhere! 🌍", {
      x: 0.3, y: 3.0, w: 9.4, h: 0.5, fontSize: 14, bold: true, color: DOCKER_DARK, align: "center", fontFace: "Calibri"
    });
    sld.addShape(prs.ShapeType.roundRect, { x: 0.3, y: 3.6, w: 9.4, h: 1.1, fill: { color: LIGHT_BG }, line: { color: DOCKER_BLUE, width: 1 }, rectRadius: 0.1 });
    addCode(sld, "docker run -d -p 8080:80 --name webapp myapp:v1", 0.3, 3.6, 9.4, 1.1);
  }

  // ── SLIDE 13: Essential Commands ────────────────────────────────────────────
  {
    const sld = contentSlide(prs, "Essential Docker Commands", DOCKER_BLUE);
    addCode(sld,
      "# Images\ndocker pull <image>        # Download from Docker Hub\ndocker images              # List all local images\ndocker rmi <image>         # Remove an image\ndocker build -t name .     # Build from Dockerfile\n\n# Containers\ndocker run <image>         # Create and start\ndocker run -d -p 8080:80 <image>   # Background + port\ndocker ps                  # List running containers\ndocker ps -a               # List ALL containers\ndocker stop <id>           # Stop container\ndocker rm <id>             # Remove container\ndocker logs <id>           # View logs\n\n# Cleanup\ndocker system prune -a     # Remove everything unused",
      0.3, 0.65, 9.4, 4.1);
  }

  // ── SLIDE 14: Port Mapping ──────────────────────────────────────────────────
  {
    const sld = contentSlide(prs, "Port Mapping Explained 🔌", DOCKER_BLUE);
    // Without
    sld.addShape(prs.ShapeType.roundRect, { x: 0.3, y: 0.65, w: 4.2, h: 2.0, fill: { color: "FFF0F0" }, line: { color: "CC0000", width: 2 }, rectRadius: 0.1 });
    sld.addText("Without Port Mapping ❌", { x: 0.4, y: 0.72, w: 4.0, h: 0.38, fontSize: 13, bold: true, color: "CC0000", align: "center", fontFace: "Calibri" });
    addBullets(sld, [
      { text: "Your Computer  ────  Container", size: 12, bullet: false },
      { text: "                       Port 80 (isolated)", size: 12, bullet: false },
      { text: "                       ❌ Cannot access!", size: 12, bullet: false, color: "CC0000" },
    ], 0.4, 1.15, 4.0, 1.3, { color: "333333", bullet: false });

    // With
    sld.addShape(prs.ShapeType.roundRect, { x: 5.2, y: 0.65, w: 4.2, h: 2.0, fill: { color: "F0FFF0" }, line: { color: "007700", width: 2 }, rectRadius: 0.1 });
    sld.addText("With Port Mapping ✅", { x: 5.3, y: 0.72, w: 4.0, h: 0.38, fontSize: 13, bold: true, color: "007700", align: "center", fontFace: "Calibri" });
    addBullets(sld, [
      { text: "Your Computer  ←──→  Container", size: 12, bullet: false },
      { text: "Port 8080      ←──→  Port 80", size: 12, bullet: false },
      { text: "✅ Accessible!          App runs here", size: 12, bullet: false, color: "007700" },
    ], 5.3, 1.15, 4.0, 1.3, { color: "333333", bullet: false });

    addCode(sld,
      'docker run -p 8080:80 nginx\n#              ↑      ↑\n#         host port  container port\n\nAccess: http://localhost:8080',
      0.3, 2.75, 9.4, 1.85);
  }

  // ── SLIDE 15: Section divider ───────────────────────────────────────────────
  sectionDivider(prs, "Live Demo & Best Practices", DOCKER_BLUE, DOCKER_DARK);

  // ── SLIDE 16: Demo ──────────────────────────────────────────────────────────
  {
    const sld = contentSlide(prs, "DEMO – Your First Container 🎉", DOCKER_BLUE);
    addCode(sld,
      "# 1. Check Docker is installed\ndocker --version\n\n# 2. Run Hello World (downloads + runs automatically)\ndocker run hello-world\n\n# 3. Pull Python image\ndocker pull python:3.9-slim\n\n# 4. Run interactive Python session\ndocker run -it python:3.9-slim\n\n# 5. Run Nginx web server in background\ndocker run -d -p 8080:80 nginx:alpine\n\n# 6. Open in browser\n# http://localhost:8080",
      0.3, 0.65, 9.4, 4.1);
  }

  // ── SLIDE 17: Best Practices ────────────────────────────────────────────────
  {
    const sld = contentSlide(prs, "Docker Best Practices", DOCKER_BLUE);
    sld.addShape(prs.ShapeType.roundRect, { x: 0.3, y: 0.65, w: 4.3, h: 4.1, fill: { color: "F0FFF0" }, line: { color: "007700", width: 2 }, rectRadius: 0.1 });
    sld.addText("✅  DO", { x: 0.3, y: 0.72, w: 4.3, h: 0.38, fontSize: 15, bold: true, color: "007700", align: "center", fontFace: "Calibri" });
    addBullets(sld, [
      { text: "Use specific image tags (not latest)", size: 13 },
      { text: "Keep images small (alpine base)", size: 13 },
      { text: "One process per container", size: 13 },
      { text: "Use .dockerignore file", size: 13 },
      { text: "Run as non-root user", size: 13 },
      { text: "Scan images for vulnerabilities", size: 13 },
    ], 0.5, 1.2, 4.0, 3.3, { color: "007700" });

    sld.addShape(prs.ShapeType.roundRect, { x: 5.1, y: 0.65, w: 4.3, h: 4.1, fill: { color: "FFF0F0" }, line: { color: "CC0000", width: 2 }, rectRadius: 0.1 });
    sld.addText("❌  DON'T", { x: 5.1, y: 0.72, w: 4.3, h: 0.38, fontSize: 15, bold: true, color: "CC0000", align: "center", fontFace: "Calibri" });
    addBullets(sld, [
      { text: "Store secrets in images", size: 13 },
      { text: 'Use "latest" tag in production', size: 13 },
      { text: "Run multiple services in one container", size: 13 },
      { text: "Ignore security updates", size: 13 },
      { text: "Run as root user", size: 13 },
      { text: "Skip documentation", size: 13 },
    ], 5.3, 1.2, 4.0, 3.3, { color: "CC0000" });
  }

  // ── SLIDE 18: Key Takeaways ─────────────────────────────────────────────────
  {
    const sld = contentSlide(prs, "Key Takeaways", DOCKER_BLUE);
    addBullets(sld, [
      { text: "🐳  Docker packages apps WITH their dependencies", size: 17, bold: true },
      { text: "📦  Containers are lightweight, isolated environments", size: 17, bold: true },
      { text: "🖼️  Images are blueprints  →  Containers are instances", size: 17, bold: true },
      { text: "🌐  Docker Hub stores thousands of ready-to-use images", size: 17, bold: true },
      { text: "⚡  Much faster and lighter than Virtual Machines", size: 17, bold: true },
      { text: "✅  Same environment everywhere – dev, test, production", size: 17, bold: true },
    ], 0.5, 0.7, 9.0, 3.6, { color: DOCKER_DARK });
    sld.addShape(prs.ShapeType.roundRect, { x: 0.5, y: 4.35, w: 9.0, h: 0.45, fill: { color: DOCKER_BLUE }, line: { color: DOCKER_BLUE }, rectRadius: 0.1 });
    sld.addText('Docker solves "it works on my machine" by packaging EVERYTHING together.', {
      x: 0.5, y: 4.37, w: 9.0, h: 0.4, fontSize: 13, bold: true, color: WHITE, align: "center", fontFace: "Calibri"
    });
  }

  // ── SLIDE 19: What's Next ───────────────────────────────────────────────────
  {
    const sld = contentSlide(prs, "What's Next? 🚀", DOCKER_BLUE);
    addBullets(sld, [
      { text: "✅  Part 0: Introduction (Done!)", size: 16, bullet: false, bold: true, color: "007700" },
      { text: "📝  Part 1: Containerise your first app", size: 16, bullet: false },
      { text: "📝  Part 2: Update & rebuild", size: 16, bullet: false },
      { text: "📝  Part 3: Share on Docker Hub", size: 16, bullet: false },
      { text: "📝  Part 4: Volumes – data persistence", size: 16, bullet: false },
      { text: "📝  Part 5: Bind mounts – live editing", size: 16, bullet: false },
      { text: "📝  Part 6: Multi-container apps", size: 16, bullet: false },
      { text: "📝  Part 7: Docker Compose", size: 16, bullet: false },
      { text: "📝  Part 8: Best practices", size: 16, bullet: false },
    ], 0.6, 0.7, 8.8, 4.0, { color: "333333" });
    sld.addText("Let's get hands-on! 🎉", { x: 0.5, y: 4.6, w: 9.0, h: 0.3, fontSize: 14, bold: true, color: DOCKER_BLUE, align: "center", fontFace: "Calibri" });
  }

  // ── SLIDE 20: Thank You ─────────────────────────────────────────────────────
  {
    const sld = prs.addSlide();
    sld.background = { color: DOCKER_DARK };
    sld.addShape(prs.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 0.08, fill: { color: DOCKER_BLUE } });
    sld.addShape(prs.ShapeType.rect, { x: 0, y: 4.92, w: "100%", h: 0.08, fill: { color: DOCKER_BLUE } });
    sld.addText("Thank You! 🙏", { x: 0.5, y: 0.8, w: 9, h: 1.0, fontSize: 38, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
    sld.addText("🐳", { x: 4.1, y: 1.9, w: 1.8, h: 1.4, fontSize: 64, align: "center" });
    addBullets(sld, [
      { text: "📁  GitHub: github.com/sanjay3107/docker-Kubernetes-workshop", size: 14, bullet: false, color: WHITE },
      { text: "📖  Detailed guides in each folder", size: 14, bullet: false, color: WHITE },
      { text: "🎯  Hands-on exercises included", size: 14, bullet: false, color: WHITE },
    ], 1.0, 3.4, 8.0, 1.3, { color: WHITE, bullet: false });
  }

  prs.writeFile({ fileName: "Docker-Basics-Workshop.pptx" })
     .then(() => console.log("✅  Docker-Basics-Workshop.pptx created!"))
     .catch(e => console.error("❌ Docker error:", e));
}

// ═══════════════════════════════════════════════════════════════════════════════
//  KUBERNETES PRESENTATION
// ═══════════════════════════════════════════════════════════════════════════════
function buildKubernetes() {
  const prs = new PptxGenJS();
  prs.layout = "LAYOUT_WIDE";
  prs.title = "Introduction to Kubernetes";
  prs.author = "Docker & Kubernetes Workshop";

  // ── SLIDE 1: Title ──────────────────────────────────────────────────────────
  titleSlide(prs, "Introduction to Kubernetes", "Container Orchestration Made Simple", K8S_BLUE, K8S_DARK);

  // ── SLIDE 2: Agenda ─────────────────────────────────────────────────────────
  {
    const sld = contentSlide(prs, "What We'll Cover Today", K8S_BLUE);
    addBullets(sld, [
      { text: "☸️   What is Kubernetes?", size: 17 },
      { text: "🔥  The Problem Kubernetes Solves", size: 17 },
      { text: "🆚  Kubernetes vs Docker", size: 17 },
      { text: "🧱  Core Concepts – Pods, Deployments, Services", size: 17 },
      { text: "🏗️   Kubernetes Architecture", size: 17 },
      { text: "🎓  Hands-On Demo", size: 17 },
      { text: "🎯  Best Practices", size: 17 },
      { text: "🚀  Next Steps", size: 17 },
    ], 1.2, 0.7, 7.5, 4.1, { color: "222222" });
    sld.addText("⏱  40 minutes", { x: 7.2, y: 4.55, w: 2.5, h: 0.35, fontSize: 13, color: K8S_BLUE, bold: true, fontFace: "Calibri" });
  }

  // ── SLIDE 3: What is Kubernetes ─────────────────────────────────────────────
  {
    const sld = contentSlide(prs, "What is Kubernetes?", K8S_BLUE);
    sld.addShape(prs.ShapeType.roundRect, { x: 0.3, y: 0.65, w: 5.5, h: 1.55, fill: { color: LIGHT_BG }, line: { color: K8S_BLUE, width: 2 }, rectRadius: 0.1 });
    sld.addText(
      "Kubernetes (K8s) is a container orchestration platform that automates deploying, scaling, and managing containerised applications.",
      { x: 0.45, y: 0.72, w: 5.2, h: 1.4, fontSize: 13, color: K8S_DARK, italic: true, fontFace: "Calibri", valign: "middle" }
    );
    addBullets(sld, [
      { text: "☸️  Open-source (originally by Google)", size: 15 },
      { text: "🚀  Automates container management", size: 15 },
      { text: "📈  Scales from 1 to thousands of containers", size: 15 },
      { text: "🌐  Works across multiple servers (cluster)", size: 15 },
      { text: "🔄  Self-healing and auto-recovery", size: 15 },
    ], 0.4, 2.3, 5.4, 2.5, { color: "333333" });
    sld.addShape(prs.ShapeType.roundRect, { x: 6.1, y: 0.65, w: 3.5, h: 4.1, fill: { color: K8S_DARK }, line: { color: K8S_BLUE, width: 2 }, rectRadius: 0.15 });
    sld.addText("☸️", { x: 6.3, y: 0.9, w: 3.1, h: 1.4, fontSize: 72, align: "center" });
    sld.addText("Kubernetes", { x: 6.2, y: 2.4, w: 3.3, h: 0.55, fontSize: 18, bold: true, color: K8S_BLUE, align: "center", fontFace: "Calibri" });
    sld.addText('Pronunciation:\n"koo-ber-net-eez"\nShort form: K8s', { x: 6.2, y: 3.0, w: 3.3, h: 1.5, fontSize: 12, color: "CCCCCC", align: "center", fontFace: "Calibri" });
  }

  // ── SLIDE 4: The Problem ────────────────────────────────────────────────────
  {
    const sld = contentSlide(prs, "The Problem – Containers at Scale 😱", K8S_BLUE);
    sld.addShape(prs.ShapeType.roundRect, { x: 0.3, y: 0.65, w: 9.4, h: 0.95, fill: { color: "FFF3CD" }, line: { color: "CC8800", width: 2 }, rectRadius: 0.1 });
    sld.addText("Challenge: You have 100 containers to run in production", { x: 0.4, y: 0.75, w: 9.2, h: 0.75, fontSize: 16, bold: true, color: "885500", align: "center", fontFace: "Calibri" });
    addBullets(sld, [
      { text: "🤔  Which server runs which container?", size: 15 },
      { text: "💥  What if a container crashes?", size: 15 },
      { text: "🔄  How do you update all 100 containers?", size: 15 },
      { text: "📈  How do you scale from 100 to 200?", size: 15 },
      { text: "🔍  How do containers find each other?", size: 15 },
      { text: "📊  How do you handle sudden traffic spikes?", size: 15 },
    ], 0.5, 1.7, 9.0, 3.0, { color: "333333" });
    sld.addShape(prs.ShapeType.roundRect, { x: 0.3, y: 4.5, w: 9.4, h: 0.38, fill: { color: "CC0000" }, line: { color: "CC0000" }, rectRadius: 0.08 });
    sld.addText("Manual management of 100+ containers = IMPOSSIBLE! 😫", { x: 0.3, y: 4.52, w: 9.4, h: 0.34, fontSize: 14, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
  }

  // ── SLIDE 5: Without vs With K8s ────────────────────────────────────────────
  {
    const sld = contentSlide(prs, "Server Crash at 3 AM – Kubernetes vs Manual", K8S_BLUE);
    sld.addShape(prs.ShapeType.roundRect, { x: 0.3, y: 0.65, w: 4.3, h: 4.1, fill: { color: "FFF0F0" }, line: { color: "CC0000", width: 2 }, rectRadius: 0.1 });
    sld.addText("WITHOUT Kubernetes ❌", { x: 0.4, y: 0.72, w: 4.1, h: 0.38, fontSize: 13, bold: true, color: "CC0000", align: "center", fontFace: "Calibri" });
    addBullets(sld, [
      { text: "1. Server dies → All containers die 💀", size: 12, bullet: false },
      { text: "2. Pager wakes you up at 3 AM 📱", size: 12, bullet: false },
      { text: "3. SSH into backup server 💻", size: 12, bullet: false },
      { text: "4. Manually restart containers 🔧", size: 12, bullet: false },
      { text: "5. Update load balancer ⚙️", size: 12, bullet: false },
      { text: "6. Test everything 🧪", size: 12, bullet: false },
      { text: "", spacer: true, size: 8, bullet: false },
      { text: "Downtime: HOURS ❌", bold: true, size: 13, bullet: false, color: "CC0000" },
      { text: "Your sleep: RUINED 😴", bold: true, size: 13, bullet: false, color: "CC0000" },
    ], 0.45, 1.18, 4.1, 3.35, { color: "333333", bullet: false });

    sld.addShape(prs.ShapeType.roundRect, { x: 5.1, y: 0.65, w: 4.3, h: 4.1, fill: { color: "F0FFF0" }, line: { color: "007700", width: 2 }, rectRadius: 0.1 });
    sld.addText("WITH Kubernetes ✅", { x: 5.2, y: 0.72, w: 4.1, h: 0.38, fontSize: 13, bold: true, color: "007700", align: "center", fontFace: "Calibri" });
    addBullets(sld, [
      { text: "1. Server dies → K8s detects instantly ⚡", size: 12, bullet: false },
      { text: "2. Auto-reschedules containers 🔄", size: 12, bullet: false },
      { text: "3. Starts on healthy servers ✅", size: 12, bullet: false },
      { text: "4. Updates routing automatically 🌐", size: 12, bullet: false },
      { text: "5. Everything keeps running 🚀", size: 12, bullet: false },
      { text: "", spacer: true, size: 8, bullet: false },
      { text: "", spacer: true, size: 8, bullet: false },
      { text: "Downtime: SECONDS ✅", bold: true, size: 13, bullet: false, color: "007700" },
      { text: "Your sleep: UNDISTURBED 😴✨", bold: true, size: 13, bullet: false, color: "007700" },
    ], 5.25, 1.18, 4.1, 3.35, { color: "333333", bullet: false });
  }

  // ── SLIDE 6: K8s vs Docker ──────────────────────────────────────────────────
  {
    const sld = contentSlide(prs, "Kubernetes vs Docker – They Work Together!", K8S_BLUE);
    addTable(sld,
      ["Feature", "Docker 🐳", "Kubernetes ☸️"],
      [
        ["Purpose",        "Run containers",     "Orchestrate containers"],
        ["Scope",          "Single machine",     "Multiple machines"],
        ["Scaling",        "Manual",             "Automatic ✅"],
        ["Self-healing",   "❌ No",              "✅ Yes"],
        ["Load balancing", "Manual",             "Built-in ✅"],
        ["Updates",        "Manual stop/start",  "Rolling updates ✅"],
        ["Complexity",     "Simple",             "More complex"],
        ["Best for",       "Dev / Testing",      "Production"],
      ],
      0.3, 0.68, 9.4, K8S_BLUE
    );
    sld.addText("Not competitors – they are TEAMMATES! 🤝", {
      x: 0.3, y: 4.55, w: 9.4, h: 0.35, fontSize: 14, bold: true, color: K8S_BLUE, align: "center", fontFace: "Calibri"
    });
  }

  // ── SLIDE 7: Architecture ───────────────────────────────────────────────────
  {
    const sld = contentSlide(prs, "Kubernetes Architecture", K8S_BLUE);
    // Control Plane
    sld.addShape(prs.ShapeType.roundRect, { x: 0.3, y: 0.65, w: 9.4, h: 1.9, fill: { color: K8S_DARK }, line: { color: K8S_BLUE, width: 2 }, rectRadius: 0.1 });
    sld.addText("Control Plane (Master Node)", { x: 0.4, y: 0.72, w: 9.2, h: 0.38, fontSize: 14, bold: true, color: K8S_BLUE, align: "center", fontFace: "Calibri" });
    addBullets(sld, [
      { text: "🧠  API Server – brain of the cluster", size: 12, bullet: false, color: WHITE },
      { text: "📅  Scheduler – assigns pods to nodes", size: 12, bullet: false, color: WHITE },
      { text: "🔄  Controller Manager – maintains desired state", size: 12, bullet: false, color: WHITE },
      { text: "💾  etcd – distributed database (cluster state)", size: 12, bullet: false, color: WHITE },
    ], 0.5, 1.13, 9.0, 1.3, { color: WHITE, bullet: false });
    // Nodes
    const nodes = ["Node 1", "Node 2", "Node 3"];
    nodes.forEach((n, i) => {
      const x = 0.3 + i * 3.17;
      sld.addShape(prs.ShapeType.roundRect, { x, y: 2.7, w: 2.95, h: 2.0, fill: { color: LIGHT_BG }, line: { color: K8S_BLUE, width: 2 }, rectRadius: 0.1 });
      sld.addText(n, { x, y: 2.77, w: 2.95, h: 0.38, fontSize: 13, bold: true, color: K8S_DARK, align: "center", fontFace: "Calibri" });
      sld.addText("Pod  Pod  Pod", { x: x + 0.1, y: 3.3, w: 2.75, h: 0.5, fontSize: 12, color: K8S_BLUE, align: "center", fontFace: "Calibri" });
      sld.addText("kubelet + kube-proxy", { x: x + 0.1, y: 3.9, w: 2.75, h: 0.55, fontSize: 10, color: GREY_TEXT, align: "center", fontFace: "Calibri" });
    });
    sld.addText("↓  ↓  ↓  Distributes workloads to Worker Nodes", { x: 0.3, y: 2.58, w: 9.4, h: 0.35, fontSize: 12, color: K8S_BLUE, align: "center", fontFace: "Calibri" });
  }

  // ── SLIDE 8: Section divider ────────────────────────────────────────────────
  sectionDivider(prs, "Core Kubernetes Concepts", K8S_BLUE, K8S_DARK);

  // ── SLIDE 9: Pod ────────────────────────────────────────────────────────────
  {
    const sld = contentSlide(prs, "Core Concept #1 – Pod 🫘", K8S_BLUE);
    addBullets(sld, [
      { text: "What is a Pod?", bold: true, size: 16, bullet: false, color: K8S_DARK },
      { text: "🔹  Smallest deployable unit in Kubernetes", size: 15 },
      { text: "🔹  Wraps one or more containers", size: 15 },
      { text: "🔹  Shares network and storage", size: 15 },
      { text: "🔹  Temporary (ephemeral) by design", size: 15 },
      { text: "", spacer: true, size: 8, bullet: false },
      { text: "Analogy", bold: true, size: 16, bullet: false, color: K8S_DARK },
      { text: "🏠  A Pod is a HOUSE where containers live together", size: 15, bullet: false },
      { text: "", spacer: true, size: 6, bullet: false },
      { text: "Key Points", bold: true, size: 16, bullet: false, color: K8S_DARK },
      { text: "✅  Usually 1 container per pod", size: 14 },
      { text: "✅  Each pod gets a unique IP address", size: 14 },
      { text: "✅  Pods are replaceable (not permanent)", size: 14 },
    ], 0.4, 0.65, 5.5, 4.2, { color: "333333" });

    sld.addShape(prs.ShapeType.roundRect, { x: 6.1, y: 0.65, w: 3.6, h: 4.1, fill: { color: K8S_DARK }, line: { color: K8S_BLUE, width: 2 }, rectRadius: 0.15 });
    sld.addText("Pod (nginx-pod)", { x: 6.2, y: 0.78, w: 3.4, h: 0.4, fontSize: 13, bold: true, color: K8S_BLUE, align: "center", fontFace: "Calibri" });
    addCode(sld,
      "apiVersion: v1\nkind: Pod\nmetadata:\n  name: nginx-pod\nspec:\n  containers:\n  - name: nginx\n    image: nginx:alpine\n    ports:\n    - containerPort: 80",
      6.15, 1.25, 3.5, 3.4);
  }

  // ── SLIDE 10: Deployment ─────────────────────────────────────────────────────
  {
    const sld = contentSlide(prs, "Core Concept #2 – Deployment 🚀", K8S_BLUE);
    addBullets(sld, [
      { text: "What is a Deployment?", bold: true, size: 16, bullet: false, color: K8S_DARK },
      { text: "🔹  Manages a set of identical pods", size: 15 },
      { text: "🔹  Ensures desired number of replicas always run", size: 15 },
      { text: "🔹  Handles rolling updates automatically", size: 15 },
      { text: "🔹  Self-healing (recreates failed pods)", size: 15 },
      { text: "", spacer: true, size: 8, bullet: false },
      { text: "Scenario – Pod Crashes:", bold: true, size: 14, bullet: false, color: "CC0000" },
      { text: "Without: Pod dies → stays dead ❌", size: 13, bullet: false, color: "CC0000" },
      { text: "With:    Pod dies → K8s recreates → ✅", size: 13, bullet: false, color: "007700" },
      { text: "", spacer: true, size: 6, bullet: false },
      { text: "Scenario – Update App:", bold: true, size: 14, bullet: false, color: "885500" },
      { text: "Without: Stop all → update → restart → downtime ❌", size: 13, bullet: false, color: "CC0000" },
      { text: "With:    Rolling update → one by one → zero downtime ✅", size: 13, bullet: false, color: "007700" },
    ], 0.4, 0.65, 5.5, 4.2, { color: "333333", bullet: false });

    sld.addShape(prs.ShapeType.roundRect, { x: 6.1, y: 0.65, w: 3.6, h: 4.1, fill: { color: K8S_DARK }, line: { color: K8S_BLUE, width: 2 }, rectRadius: 0.15 });
    addCode(sld,
      "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: nginx-deploy\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: nginx\n  template:\n    spec:\n      containers:\n      - name: nginx\n        image: nginx:alpine",
      6.15, 0.7, 3.5, 4.0);
  }

  // ── SLIDE 11: Service ────────────────────────────────────────────────────────
  {
    const sld = contentSlide(prs, "Core Concept #3 – Service 🌐", K8S_BLUE);
    addBullets(sld, [
      { text: "What is a Service?", bold: true, size: 16, bullet: false, color: K8S_DARK },
      { text: "🔹  Stable network endpoint for pods", size: 15 },
      { text: "🔹  Load balances across all matching pods", size: 15 },
      { text: "🔹  IP stays the same even when pods restart", size: 15 },
      { text: "🔹  Enables service discovery inside cluster", size: 15 },
      { text: "", spacer: true, size: 8, bullet: false },
      { text: "Analogy", bold: true, size: 16, bullet: false, color: K8S_DARK },
      { text: "📞  Like a PHONE NUMBER – same even if you change phones", size: 14, bullet: false },
      { text: "", spacer: true, size: 6, bullet: false },
      { text: "Service Types", bold: true, size: 16, bullet: false, color: K8S_DARK },
      { text: "🔵  ClusterIP  – internal only (default)", size: 13 },
      { text: "🟢  NodePort   – external, via Node IP:Port", size: 13 },
      { text: "🟡  LoadBalancer – cloud LB, production", size: 13 },
    ], 0.4, 0.65, 5.5, 4.2, { color: "333333" });

    sld.addShape(prs.ShapeType.roundRect, { x: 6.1, y: 0.65, w: 3.6, h: 4.1, fill: { color: K8S_DARK }, line: { color: K8S_BLUE, width: 2 }, rectRadius: 0.15 });
    addCode(sld,
      "apiVersion: v1\nkind: Service\nmetadata:\n  name: nginx-svc\nspec:\n  type: NodePort\n  selector:\n    app: nginx\n  ports:\n  - port: 80\n    targetPort: 80\n    nodePort: 30080\n\n# Access:\n# http://localhost:30080",
      6.15, 0.7, 3.5, 4.0);
  }

  // ── SLIDE 12: ConfigMap & Secret ─────────────────────────────────────────────
  {
    const sld = contentSlide(prs, "Core Concept #4 & #5 – ConfigMap & Secret", K8S_BLUE);
    sld.addShape(prs.ShapeType.roundRect, { x: 0.3, y: 0.65, w: 4.3, h: 4.1, fill: { color: LIGHT_BG }, line: { color: K8S_BLUE, width: 2 }, rectRadius: 0.1 });
    sld.addText("ConfigMap 📄", { x: 0.3, y: 0.72, w: 4.3, h: 0.38, fontSize: 14, bold: true, color: K8S_DARK, align: "center", fontFace: "Calibri" });
    addBullets(sld, [
      { text: "Non-sensitive configuration", size: 13 },
      { text: "Environment variables", size: 13 },
      { text: "Config files", size: 13 },
      { text: "Visible in plain text", size: 13 },
    ], 0.5, 1.2, 4.0, 1.5, { color: "333333" });
    addCode(sld,
      "kind: ConfigMap\ndata:\n  DB_URL: postgres://db:5432\n  LOG_LEVEL: info",
      0.35, 2.75, 4.2, 1.75);

    sld.addShape(prs.ShapeType.roundRect, { x: 5.1, y: 0.65, w: 4.3, h: 4.1, fill: { color: LIGHT_BG }, line: { color: "CC0000", width: 2 }, rectRadius: 0.1 });
    sld.addText("Secret 🔐", { x: 5.1, y: 0.72, w: 4.3, h: 0.38, fontSize: 14, bold: true, color: "CC0000", align: "center", fontFace: "Calibri" });
    addBullets(sld, [
      { text: "Sensitive data (passwords, tokens, keys)", size: 13 },
      { text: "Base64 encoded", size: 13 },
      { text: "Access controlled", size: 13 },
      { text: "Never in plain text!", size: 13, color: "CC0000" },
    ], 5.3, 1.2, 4.0, 1.5, { color: "333333" });
    addCode(sld,
      "kind: Secret\ntype: Opaque\ndata:\n  password: cGFzc3dvcmQ=\n  # base64 encoded",
      5.15, 2.75, 4.2, 1.75);
  }

  // ── SLIDE 13: kubectl ────────────────────────────────────────────────────────
  {
    const sld = contentSlide(prs, "kubectl – The Kubernetes CLI ⌨️", K8S_BLUE);
    addCode(sld,
      "# ── Cluster Info ──────────────────────────────────\nkubectl cluster-info\nkubectl get nodes\n\n# ── Pods ───────────────────────────────────────────\nkubectl get pods\nkubectl get pods -n workshop          # specific namespace\nkubectl logs <pod-name>\nkubectl exec -it <pod-name> -- sh\n\n# ── Deployments ────────────────────────────────────\nkubectl get deployments\nkubectl scale deployment <name> --replicas=5\nkubectl rollout status deployment/<name>\nkubectl rollout undo deployment/<name>\n\n# ── Services ───────────────────────────────────────\nkubectl get services\nkubectl expose deployment <name> --port=80 --type=NodePort\n\n# ── Apply / Delete YAML ────────────────────────────\nkubectl apply -f manifest.yaml\nkubectl delete -f manifest.yaml\nkubectl get all -n workshop",
      0.3, 0.65, 9.4, 4.1);
  }

  // ── SLIDE 14: Demo – Deploy ──────────────────────────────────────────────────
  {
    const sld = contentSlide(prs, "DEMO – Deploy Your First App 🎉", K8S_BLUE);
    addCode(sld,
      "# 1. Check cluster is running\nkubectl cluster-info\n\n# 2. Create a deployment\nkubectl create deployment nginx --image=nginx\n\n# 3. Watch pods come up\nkubectl get pods -w\n\n# 4. Expose via NodePort service\nkubectl expose deployment nginx --port=80 --type=NodePort\n\n# 5. Find the assigned port\nkubectl get services\n\n# 6. Open in browser\n# http://localhost:<nodePort>\n\n# 7. Scale to 5 replicas\nkubectl scale deployment nginx --replicas=5",
      0.3, 0.65, 9.4, 4.1);
  }

  // ── SLIDE 15: Demo – Rolling Update ─────────────────────────────────────────
  {
    const sld = contentSlide(prs, "DEMO – Rolling Update & Rollback 🔄", K8S_BLUE);
    addCode(sld,
      "# ── Update image version (zero downtime!) ──────────\nkubectl set image deployment/nginx nginx=nginx:1.25\n\n# ── Watch rolling update in real time ───────────────\nkubectl rollout status deployment/nginx\n\n# ── View history ────────────────────────────────────\nkubectl rollout history deployment/nginx\n\n# ── Rollback to previous version if needed ──────────\nkubectl rollout undo deployment/nginx\n\n# ── Delete pod to see self-healing ──────────────────\nkubectl get pods\nkubectl delete pod <pod-name>\nkubectl get pods   # Watch it recreate automatically!\n\n# ── Clean up ────────────────────────────────────────\nkubectl delete namespace workshop",
      0.3, 0.65, 9.4, 4.1);
  }

  // ── SLIDE 16: Section divider ────────────────────────────────────────────────
  sectionDivider(prs, "Best Practices & Summary", K8S_BLUE, K8S_DARK);

  // ── SLIDE 17: Best Practices ─────────────────────────────────────────────────
  {
    const sld = contentSlide(prs, "Kubernetes Best Practices", K8S_BLUE);
    const cols = [
      { title: "Resources 📊", items: ["Set requests & limits on all pods", "Use namespaces for isolation", "Implement liveness & readiness probes", "Enable Horizontal Pod Autoscaler"], color: "1A3A8C" },
      { title: "Security 🔐", items: ["Use RBAC for access control", "Scan images for vulnerabilities", "Store secrets in Secrets (not ConfigMaps)", "Define network policies"], color: "660066" },
      { title: "Reliability 🛡️", items: ["Run multiple replicas for HA", "Use rolling update strategy", "Implement monitoring (Prometheus)", "Keep YAML manifests in Git"], color: "005500" },
    ];
    cols.forEach((col, i) => {
      const x = 0.2 + i * 3.3;
      sld.addShape(prs.ShapeType.roundRect, { x, y: 0.65, w: 3.1, h: 4.1, fill: { color: LIGHT_BG }, line: { color: col.color, width: 2 }, rectRadius: 0.12 });
      sld.addShape(prs.ShapeType.roundRect, { x, y: 0.65, w: 3.1, h: 0.5, fill: { color: col.color }, line: { color: col.color }, rectRadius: 0.12 });
      sld.addText(col.title, { x, y: 0.72, w: 3.1, h: 0.36, fontSize: 13, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
      addBullets(sld, col.items.map(t => ({ text: "✅  " + t, size: 12, bullet: false })), x + 0.15, 1.28, 2.8, 3.3, { color: "222222" });
    });
  }

  // ── SLIDE 18: Key Takeaways ──────────────────────────────────────────────────
  {
    const sld = contentSlide(prs, "Key Takeaways", K8S_BLUE);
    addBullets(sld, [
      { text: "☸️   Kubernetes orchestrates containers at SCALE", size: 17, bold: true },
      { text: "🫘  Pods are the smallest deployable unit", size: 17, bold: true },
      { text: "🚀  Deployments manage desired state automatically", size: 17, bold: true },
      { text: "🌐  Services provide stable networking & load balancing", size: 17, bold: true },
      { text: "🔄  Self-healing is built-in – K8s recreates failed pods", size: 17, bold: true },
      { text: "📈  Scaling is as simple as one command", size: 17, bold: true },
      { text: "🎯  Declarative YAML – describe WHAT, not HOW", size: 17, bold: true },
    ], 0.5, 0.7, 9.0, 3.8, { color: K8S_DARK });
    sld.addShape(prs.ShapeType.roundRect, { x: 0.5, y: 4.42, w: 9.0, h: 0.45, fill: { color: K8S_BLUE }, line: { color: K8S_BLUE }, rectRadius: 0.1 });
    sld.addText("Kubernetes automates everything you'd do manually to run containers in production.", {
      x: 0.5, y: 4.44, w: 9.0, h: 0.4, fontSize: 13, bold: true, color: WHITE, align: "center", fontFace: "Calibri"
    });
  }

  // ── SLIDE 19: What's Next ────────────────────────────────────────────────────
  {
    const sld = contentSlide(prs, "What's Next? 🚀", K8S_BLUE);
    addBullets(sld, [
      { text: "✅  Part 0: Introduction (Done!)", size: 16, bullet: false, bold: true, color: "007700" },
      { text: "📝  Deploy real app – Node.js + Redis", size: 16, bullet: false },
      { text: "📝  Use ConfigMaps & Secrets for configuration", size: 16, bullet: false },
      { text: "📝  Implement health checks (readiness / liveness probes)", size: 16, bullet: false },
      { text: "📝  Set up Horizontal Pod Autoscaler (HPA)", size: 16, bullet: false },
      { text: "📝  Perform rolling updates & rollbacks", size: 16, bullet: false },
      { text: "📝  Practice troubleshooting", size: 16, bullet: false },
    ], 0.6, 0.7, 8.8, 3.6, { color: "333333" });
    sld.addShape(prs.ShapeType.roundRect, { x: 0.5, y: 4.3, w: 9.0, h: 0.55, fill: { color: LIGHT_BG }, line: { color: K8S_BLUE, width: 2 }, rectRadius: 0.1 });
    sld.addText("cd step-04-kubernetes  →  kubectl apply -f .", { x: 0.5, y: 4.32, w: 9.0, h: 0.5, fontSize: 14, bold: true, color: K8S_DARK, align: "center", fontFace: "Courier New" });
  }

  // ── SLIDE 20: Thank You ──────────────────────────────────────────────────────
  {
    const sld = prs.addSlide();
    sld.background = { color: K8S_DARK };
    sld.addShape(prs.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 0.08, fill: { color: K8S_BLUE } });
    sld.addShape(prs.ShapeType.rect, { x: 0, y: 4.92, w: "100%", h: 0.08, fill: { color: K8S_BLUE } });
    sld.addText("Thank You! 🙏", { x: 0.5, y: 0.8, w: 9, h: 1.0, fontSize: 38, bold: true, color: WHITE, align: "center", fontFace: "Calibri" });
    sld.addText("☸️", { x: 4.1, y: 1.9, w: 1.8, h: 1.4, fontSize: 64, align: "center" });
    addBullets(sld, [
      { text: "📁  GitHub: github.com/sanjay3107/docker-Kubernetes-workshop", size: 14, bullet: false, color: WHITE },
      { text: "📖  Detailed guides in each folder", size: 14, bullet: false, color: WHITE },
      { text: "🎯  Hands-on exercises included", size: 14, bullet: false, color: WHITE },
      { text: "Let's orchestrate some containers! ☸️🚀", size: 14, bold: true, bullet: false, color: K8S_BLUE },
    ], 1.0, 3.4, 8.0, 1.4, { color: WHITE, bullet: false });
  }

  prs.writeFile({ fileName: "Kubernetes-Basics-Workshop.pptx" })
     .then(() => console.log("✅  Kubernetes-Basics-Workshop.pptx created!"))
     .catch(e => console.error("❌ Kubernetes error:", e));
}

buildDocker();
buildKubernetes();
