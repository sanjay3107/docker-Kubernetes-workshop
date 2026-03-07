const PptxGenJS = require("pptxgenjs");

// ─── THEME ────────────────────────────────────────────────────────────────────
const DOCKER_BLUE  = "2496ED";
const DOCKER_DARK  = "1A3A5C";
const WHITE        = "FFFFFF";
const LIGHT_BG     = "EEF5FF";
const CODE_BG      = "1E1E2E";
const CODE_FG      = "CDD6F4";
const GREEN        = "007700";
const RED          = "CC0000";
const AMBER        = "996600";
const GREY         = "555555";

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function addTopBar(sld, prs, color) {
  sld.addShape(prs.ShapeType.rect, { x:0, y:0, w:"100%", h:0.06, fill:{color} });
}
function addBotBar(sld, prs, color) {
  sld.addShape(prs.ShapeType.rect, { x:0, y:4.94, w:"100%", h:0.06, fill:{color} });
}

function titleSlide(prs) {
  const sld = prs.addSlide();
  sld.background = { color: DOCKER_DARK };
  addTopBar(sld, prs, DOCKER_BLUE);
  addBotBar(sld, prs, DOCKER_BLUE);
  // accent circle
  sld.addShape(prs.ShapeType.ellipse, { x:7.6, y:-1.0, w:4.2, h:4.2, fill:{color:DOCKER_BLUE}, line:{color:DOCKER_BLUE} });
  sld.addText("Introduction to Docker", {
    x:0.5, y:1.5, w:7.2, h:1.3, fontSize:42, bold:true, color:WHITE, fontFace:"Calibri"
  });
  sld.addText("Containerization Made Simple", {
    x:0.5, y:2.9, w:7.2, h:0.7, fontSize:22, color:DOCKER_BLUE, fontFace:"Calibri"
  });
  sld.addText("🐳", { x:0.5, y:3.7, w:0.8, h:0.7, fontSize:32 });
  sld.addText("Docker & Kubernetes Workshop", {
    x:1.35, y:3.78, w:6, h:0.4, fontSize:13, color:"AAAAAA", fontFace:"Calibri"
  });
}

function hdr(prs, title) {
  const sld = prs.addSlide();
  sld.background = { color: WHITE };
  sld.addShape(prs.ShapeType.rect, { x:0, y:0, w:"100%", h:0.56, fill:{color:DOCKER_BLUE} });
  addBotBar(sld, prs, DOCKER_BLUE);
  sld.addText(title, {
    x:0.3, y:0.07, w:9.4, h:0.42,
    fontSize:20, bold:true, color:WHITE, fontFace:"Calibri", valign:"middle"
  });
  return sld;
}

function divider(prs, label) {
  const sld = prs.addSlide();
  sld.background = { color: DOCKER_DARK };
  addTopBar(sld, prs, DOCKER_BLUE);
  addBotBar(sld, prs, DOCKER_BLUE);
  sld.addText(label, {
    x:0.5, y:1.7, w:9, h:1.1, fontSize:34, bold:true, color:WHITE, align:"center", fontFace:"Calibri"
  });
  sld.addShape(prs.ShapeType.rect, { x:2.5, y:2.88, w:5, h:0.06, fill:{color:DOCKER_BLUE} });
}

function bullets(sld, items, x, y, w, h, defSize=15, defColor="333333") {
  const rows = items.map(it => ({
    text: it.text,
    options: {
      fontSize: it.size || defSize,
      bold: !!it.bold,
      color: it.color || defColor,
      bullet: it.bullet !== false,
      indentLevel: it.indent || 0,
      paraSpaceAfter: it.gap ? 8 : 2,
      fontFace:"Calibri",
    }
  }));
  sld.addText(rows, { x, y, w, h, valign:"top", fontFace:"Calibri" });
}

function code(sld, text, x, y, w, h) {
  sld.addShape("rect", { x, y, w, h, fill:{color:CODE_BG}, line:{color:"444466",width:1} });
  sld.addText(text, {
    x:x+0.12, y:y+0.1, w:w-0.24, h:h-0.2,
    fontSize:10, color:CODE_FG, fontFace:"Courier New", valign:"top"
  });
}

function box(sld, x, y, w, h, bg, border) {
  sld.addShape("roundRect", { x, y, w, h, fill:{color:bg}, line:{color:border,width:2}, rectRadius:0.1 });
}

function tbl(sld, prs, headers, rows, x, y, w) {
  const data = [];
  data.push(headers.map(h => ({
    text:h,
    options:{ bold:true, color:WHITE, fill:{color:DOCKER_BLUE}, fontSize:12, align:"center", fontFace:"Calibri" }
  })));
  rows.forEach((row,ri) => {
    data.push(row.map(cell => ({
      text:cell,
      options:{ color:"333333", fill:{color: ri%2===0?LIGHT_BG:WHITE}, fontSize:11, align:"center", fontFace:"Calibri" }
    })));
  });
  sld.addTable(data, { x, y, w, colW: Array(headers.length).fill(w/headers.length), border:{pt:1,color:"CCCCCC"} });
}

// ─── BUILD ────────────────────────────────────────────────────────────────────
const prs = new PptxGenJS();
prs.layout = "LAYOUT_WIDE";
prs.title  = "Introduction to Docker – Full";

// ══ SLIDE 1: Title ════════════════════════════════════════════════════════════
titleSlide(prs);

// ══ SLIDE 2: Agenda ═══════════════════════════════════════════════════════════
{
  const s = hdr(prs,"Agenda – What We'll Cover Today");
  bullets(s,[
    {text:"1.  🐳  What is Docker?"},
    {text:"2.  🔥  The Problem Docker Solves"},
    {text:"3.  🆚  Docker vs Virtual Machines"},
    {text:"4.  🧱  Core Concepts: Images & Containers"},
    {text:"5.  🌐  Docker Hub"},
    {text:"6.  🎓  Hands-On Demo"},
    {text:"7.  🚀  Next Steps"},
  ],1.0,0.65,8.0,4.1,17);
  s.addText("⏱  30 minutes",{x:7.5,y:4.55,w:2.1,h:0.35,fontSize:13,bold:true,color:DOCKER_BLUE,fontFace:"Calibri"});
}

// ══ SLIDE 3: What is Docker ═══════════════════════════════════════════════════
{
  const s = hdr(prs,"What is Docker? 🐳");
  box(s, 0.3,0.65, 5.6,1.55, LIGHT_BG, DOCKER_BLUE);
  s.addText(
    "Docker is a platform that packages applications with everything they need to run, then runs them anywhere.",
    {x:0.45,y:0.72,w:5.35,h:1.4,fontSize:14,color:DOCKER_DARK,italic:true,fontFace:"Calibri",valign:"middle"}
  );
  bullets(s,[
    {text:"🐳  Open-source containerisation platform"},
    {text:"📦  Package app + all dependencies together"},
    {text:"🚀  Run consistently across every environment"},
    {text:"⚡  Lightweight and blazing fast"},
  ],0.4,2.3,5.5,2.4,15);
  box(s, 6.1,0.65, 3.5,4.1, DOCKER_DARK, DOCKER_BLUE);
  s.addText('"Build once,\nrun anywhere"',{x:6.2,y:1.3,w:3.3,h:1.3,fontSize:18,bold:true,color:DOCKER_BLUE,align:"center",fontFace:"Calibri"});
  s.addText("🐳",{x:7.0,y:2.75,w:1.7,h:1.5,fontSize:64,align:"center"});
}

// ══ SLIDE 4: Shipping Container Analogy ═══════════════════════════════════════
{
  const s = hdr(prs,"The Shipping Container Analogy 🚢");
  box(s,0.3,0.65,4.3,4.1,"FFF8F0","CC6600");
  s.addText("Before Containers (1950s) ❌",{x:0.3,y:0.72,w:4.3,h:0.38,fontSize:14,bold:true,color:"CC6600",align:"center",fontFace:"Calibri"});
  bullets(s,[
    {text:"Every ship was different"},
    {text:"Loading cargo took weeks"},
    {text:"Items got damaged frequently"},
    {text:"Complete chaos at ports"},
    {text:"Incompatible loading equipment"},
  ],0.5,1.18,4.0,3.3,14,"553300");

  box(s,5.1,0.65,4.3,4.1,"F0FFF0","007700");
  s.addText("After Containers ✅",{x:5.1,y:0.72,w:4.3,h:0.38,fontSize:14,bold:true,color:"007700",align:"center",fontFace:"Calibri"});
  bullets(s,[
    {text:"Standardised boxes – one size fits all"},
    {text:"Load/unload in hours, not weeks"},
    {text:"Items fully protected"},
    {text:"Works on ANY ship in the world"},
    {text:"Revolutionised global trade"},
  ],5.3,1.18,4.0,3.3,14,"004400");

  s.addShape("roundRect",{x:0.3,y:4.6,w:9.4,h:0.35,fill:{color:DOCKER_BLUE},line:{color:DOCKER_BLUE},rectRadius:0.08});
  s.addText("Docker does the same thing for software! 🐳",{x:0.3,y:4.62,w:9.4,h:0.3,fontSize:14,bold:true,color:WHITE,align:"center",fontFace:"Calibri"});
}

// ══ SLIDE 5: "It Works on My Machine" ════════════════════════════════════════
{
  const s = hdr(prs,'The "It Works on My Machine" Problem 😫');
  box(s,0.3,0.65,9.4,1.0,"FFF3CD","CC8800");
  s.addText("WITHOUT Docker – Everyone has a different environment",{x:0.4,y:0.75,w:9.2,h:0.8,fontSize:15,bold:true,color:"885500",align:"center",fontFace:"Calibri"});
  code(s,
    "Developer's Laptop  ✅\n├── Python 3.9\n├── Node.js 18\n└── App works!\n\nTeammate's Laptop  ❌\n├── Python 3.7  (wrong version!)\n├── Node.js 16  (wrong version!)\n└── App broken!\n\nProduction Server  ❌\n├── Different OS (Ubuntu vs Alpine)\n├── Missing libraries\n└── App crashes!",
    0.3,1.72,9.4,3.05);
}

// ══ SLIDE 6: With Docker ══════════════════════════════════════════════════════
{
  const s = hdr(prs,"With Docker – Consistency Everywhere ✅");
  box(s,0.3,0.65,9.4,1.0,"F0FFF0","007700");
  s.addText("WITH Docker – Same container = same behaviour, always",{x:0.4,y:0.75,w:9.2,h:0.8,fontSize:15,bold:true,color:"004400",align:"center",fontFace:"Calibri"});
  code(s,
    "Developer's Laptop  ✅\n└── Docker Container\n    ├── Python 3.9\n    ├── Node.js 18\n    └── App works!\n\nTeammate's Laptop  ✅\n└── Same Container\n    └── App works!\n\nProduction Server  ✅\n└── Same Container\n    └── App works!",
    0.3,1.72,9.4,3.05);
}

// ══ SLIDE 7: Real-World Benefits ══════════════════════════════════════════════
{
  const s = hdr(prs,"Real-World Benefits");
  const cols=[
    {title:"For Developers 👨‍💻",items:["Consistent development environment","Easy onboarding (minutes vs days)",'No "works on my machine" issues',"Test locally like production"],bg:"EEF5FF",border:"1A3A8C",hc:"1A3A8C"},
    {title:"For Operations 🛠️",items:["Predictable deployments","Easy scaling up or down","Efficient resource usage","Quick rollbacks when needed"],bg:"F0FFF0",border:GREEN,hc:GREEN},
    {title:"For Business 📈",items:["Faster time to market","Lower infrastructure costs","Improved reliability","Happy customers 😊"],bg:"FFF8EE",border:"8B4500",hc:"8B4500"},
  ];
  cols.forEach((c,i)=>{
    const x=0.2+i*3.3;
    box(s,x,0.65,3.1,4.1,c.bg,c.border);
    s.addShape("roundRect",{x,y:0.65,w:3.1,h:0.5,fill:{color:c.hc},line:{color:c.hc},rectRadius:0.1});
    s.addText(c.title,{x,y:0.72,w:3.1,h:0.36,fontSize:13,bold:true,color:WHITE,align:"center",fontFace:"Calibri"});
    bullets(s,c.items.map(t=>({text:"✅  "+t,size:13,bullet:false})),x+0.15,1.28,2.8,3.3);
  });
}

// ══ SLIDE 8: Docker vs VMs – Architecture ════════════════════════════════════
{
  const s = hdr(prs,"Docker vs Virtual Machines – Architecture");
  box(s,0.3,0.65,4.3,4.1,"FFF8F0","CC6600");
  s.addText("Virtual Machine 🖥️",{x:0.3,y:0.72,w:4.3,h:0.38,fontSize:14,bold:true,color:"CC6600",align:"center",fontFace:"Calibri"});
  code(s,
    "Your Computer\n└── Hypervisor\n    ├── VM1\n    │   ├── Guest OS  ← Full OS!\n    │   └── App\n    └── VM2\n        ├── Guest OS  ← Full OS!\n        └── App\n\nEach VM = 2–20 GB\nBoot time = 1–2 minutes",
    0.35,1.1,4.2,3.5);

  box(s,5.1,0.65,4.3,4.1,"F0F8FF",DOCKER_BLUE);
  s.addText("Docker 🐳",{x:5.1,y:0.72,w:4.3,h:0.38,fontSize:14,bold:true,color:DOCKER_BLUE,align:"center",fontFace:"Calibri"});
  code(s,
    "Your Computer (shared OS)\n└── Docker Engine\n    ├── App1 container  ← No OS!\n    ├── App2 container  ← No OS!\n    └── App3 container  ← No OS!\n\n\nEach Container = 10–500 MB\nBoot time = 1–2 seconds ⚡",
    5.15,1.1,4.2,3.5);
}

// ══ SLIDE 9: Docker vs VMs – Comparison Table ════════════════════════════════
{
  const s = hdr(prs,"Docker vs VMs – Comparison");
  tbl(s,prs,
    ["Feature","Virtual Machine","Docker Container"],
    [
      ["Size",           "2–20 GB",       "10–500 MB ✅"],
      ["Boot Time",      "1–2 minutes",   "1–2 seconds ✅"],
      ["Performance",    "Slower",        "Near-native ✅"],
      ["Resource Usage", "Heavy",         "Lightweight ✅"],
      ["Isolation",      "Complete (OS)", "Process-level"],
      ["Portability",    "Medium",        "High ✅"],
    ],
    0.4,0.72,9.2);
  s.addShape("roundRect",{x:0.4,y:4.42,w:9.2,h:0.45,fill:{color:DOCKER_BLUE},line:{color:DOCKER_BLUE},rectRadius:0.09});
  s.addText("Containers are much lighter and faster! ⚡",{x:0.4,y:0.44+4,w:9.2,h:0.4,fontSize:15,bold:true,color:WHITE,align:"center",fontFace:"Calibri"});
}

// ══ SLIDE 10: When to Use What ════════════════════════════════════════════════
{
  const s = hdr(prs,"When to Use What?");
  box(s,0.3,0.65,4.3,4.1,"FFF8F0","CC6600");
  s.addText("Use Virtual Machines 🖥️",{x:0.3,y:0.72,w:4.3,h:0.38,fontSize:14,bold:true,color:"CC6600",align:"center",fontFace:"Calibri"});
  bullets(s,[
    {text:"✅  Run a different OS (Windows on Mac)"},
    {text:"✅  Complete hardware-level isolation"},
    {text:"✅  Legacy applications"},
    {text:"✅  Security-critical environments"},
  ],0.5,1.2,4.0,3.3,14,"553300");

  box(s,5.1,0.65,4.3,4.1,"F0F8FF",DOCKER_BLUE);
  s.addText("Use Docker Containers 🐳",{x:5.1,y:0.72,w:4.3,h:0.38,fontSize:14,bold:true,color:DOCKER_BLUE,align:"center",fontFace:"Calibri"});
  bullets(s,[
    {text:"✅  Modern applications"},
    {text:"✅  Microservices"},
    {text:"✅  Fast deployment & scaling"},
    {text:"✅  Resource-efficient workloads"},
    {text:"✅  Development environments"},
  ],5.3,1.2,4.0,3.3,14,"003366");

  s.addText("💡  You can use both together – Docker runs inside VMs too!",{x:0.3,y:4.62,w:9.4,h:0.3,fontSize:13,bold:true,color:GREY,align:"center",fontFace:"Calibri"});
}

// ══ SLIDE 11: Core Concept #1 – Docker Image ══════════════════════════════════
{
  const s = hdr(prs,"Core Concept #1 – Docker Image 🖼️");
  bullets(s,[
    {text:"What is an Image?",bold:true,size:16,bullet:false,color:DOCKER_DARK,gap:true},
    {text:"📋  Blueprint / template for containers"},
    {text:"📦  Contains app + ALL dependencies"},
    {text:"🔒  Read-only (immutable)"},
    {text:"💾  Stored locally or on Docker Hub"},
    {text:"",bullet:false,gap:true},
    {text:"Analogy",bold:true,size:16,bullet:false,color:DOCKER_DARK},
    {text:"📖  Like a RECIPE  (blueprint)"},
    {text:"🏛️  Like a CLASS in programming"},
    {text:"🍪  Like a COOKIE CUTTER"},
  ],0.4,0.65,5.5,4.2);

  box(s,6.1,0.65,3.6,4.1,DOCKER_DARK,DOCKER_BLUE);
  s.addText("python:3.9 image\ncontains:",{x:6.2,y:0.78,w:3.4,h:0.9,fontSize:13,bold:true,color:DOCKER_BLUE,align:"center",fontFace:"Calibri"});
  code(s,"Linux OS (minimal)\nPython 3.9 runtime\npip package manager\n\nYour app code\nYour libraries",6.15,1.72,3.5,2.85);
  s.addText('Example:\ndocker pull python:3.9',{x:6.2,y:4.32,w:3.4,h:0.35,fontSize:10,color:"AAAAAA",fontFace:"Courier New",align:"center"});
}

// ══ SLIDE 12: Core Concept #2 – Docker Container ═════════════════════════════
{
  const s = hdr(prs,"Core Concept #2 – Docker Container 📦");
  bullets(s,[
    {text:"What is a Container?",bold:true,size:16,bullet:false,color:DOCKER_DARK,gap:true},
    {text:"▶️  Running instance of an image"},
    {text:"🏃  Isolated environment"},
    {text:"✍️  Can read / write while running"},
    {text:"⏱️  Temporary (unless data is saved)"},
    {text:"",bullet:false,gap:true},
    {text:"Analogy",bold:true,size:16,bullet:false,color:DOCKER_DARK},
    {text:"🍝  Like a DISH made from a recipe"},
    {text:"📦  Like an OBJECT from a class"},
    {text:"🍪  Like a COOKIE from a cutter"},
  ],0.4,0.65,5.5,4.2);

  box(s,6.1,0.65,3.6,4.1,"F0FFF0","007700");
  s.addText("One Image →\nMany Containers!",{x:6.2,y:0.78,w:3.4,h:0.9,fontSize:13,bold:true,color:"007700",align:"center",fontFace:"Calibri"});
  code(s,'python:3.9 image\n├── Container 1\n│   (web server)\n├── Container 2\n│   (API server)\n├── Container 3\n│   (test runner)\n└── Container 4\n    (background worker)',6.15,1.72,3.5,2.85);
}

// ══ SLIDE 13: Image → Container Relationship ══════════════════════════════════
{
  const s = hdr(prs,"Image → Container Relationship");
  code(s,
    '┌─────────────────────┐\n│   Docker Image      │  ← Blueprint (stored on disk)\n│   "python:3.9"      │\n└──────────┬──────────┘\n           │\n           ├──→  Container 1  (running web app)\n           ├──→  Container 2  (running API)\n           ├──→  Container 3  (running tests)\n           └──→  Container 4  (stopped)',
    0.3,0.65,9.4,3.0);
  s.addShape("roundRect",{x:0.3,y:3.75,w:4.5,h:0.9,fill:{color:LIGHT_BG},line:{color:DOCKER_BLUE,width:2},rectRadius:0.1});
  s.addText("Key Points:",{x:0.45,y:3.8,w:4.2,h:0.38,fontSize:14,bold:true,color:DOCKER_DARK,fontFace:"Calibri"});
  bullets(s,[
    {text:"One image → Many containers"},
    {text:"Like one cookie cutter → Many cookies 🍪"},
  ],0.45,4.15,4.2,0.7,13);
  box(s,5.1,3.75,4.5,0.9,"F0FFF0",GREEN);
  s.addText("Image = template  |  Container = running instance",{x:5.15,y:3.82,w:4.4,h:0.75,fontSize:13,bold:true,color:"004400",align:"center",fontFace:"Calibri",valign:"middle"});
}

// ══ SLIDE 14: Docker Hub ══════════════════════════════════════════════════════
{
  const s = hdr(prs,"Docker Hub – The Image Registry 🌐");
  box(s,0.3,0.65,5.2,1.7,LIGHT_BG,DOCKER_BLUE);
  s.addText("What is Docker Hub?",{x:0.4,y:0.72,w:5.0,h:0.38,fontSize:15,bold:true,color:DOCKER_DARK,fontFace:"Calibri"});
  bullets(s,[
    {text:"🌐  Public registry for Docker images"},
    {text:"📚  Like GitHub – but for images"},
    {text:"🆓  Free to use"},
    {text:"✅  Official verified images"},
  ],0.4,1.12,5.0,1.2,13);
  tbl(s,prs,
    ["Image","Purpose","Downloads"],
    [
      ["nginx",    "Web server",    "1B+"],
      ["python",   "Python runtime","1B+"],
      ["node",     "Node.js",       "1B+"],
      ["redis",    "Cache/DB",      "1B+"],
      ["postgres", "Database",      "500M+"],
    ],
    0.3,2.42,5.2);
  box(s,5.8,0.65,3.9,4.1,DOCKER_DARK,DOCKER_BLUE);
  s.addText("hub.docker.com",{x:5.9,y:0.78,w:3.7,h:0.45,fontSize:15,bold:true,color:DOCKER_BLUE,align:"center",fontFace:"Calibri"});
  s.addText("🌐",{x:6.45,y:1.4,w:2.6,h:1.4,fontSize:68,align:"center"});
  s.addText("Search, pull & push\nDocker images for free",{x:5.9,y:3.1,w:3.7,h:1.0,fontSize:13,color:"CCCCCC",align:"center",fontFace:"Calibri"});
}

// ══ SLIDE 15: Image Tags ══════════════════════════════════════════════════════
{
  const s = hdr(prs,"Image Tags – Versions & Variants");
  s.addText("Images have tags for different versions and sizes:",{x:0.4,y:0.65,w:9.2,h:0.45,fontSize:15,color:DOCKER_DARK,fontFace:"Calibri"});
  code(s,
    "python:3.9           ← Python 3.9 full version\npython:3.9-slim      ← Python 3.9 smaller (~50%)\npython:3.9-alpine    ← Python 3.9 smallest (~90% smaller)\npython:latest        ← Latest version (avoid in production!)\n\nnginx:1.25           ← Specific nginx version\nnginx:alpine         ← Alpine-based (smallest)\nnginx:latest         ← Latest (unpredictable!)",
    0.3,1.18,9.4,2.6);
  box(s,0.3,3.85,4.5,0.9,"F0FFF0",GREEN);
  s.addText("✅  DO: Use specific versions in production",{x:0.45,y:3.92,w:4.3,h:0.75,fontSize:14,bold:true,color:GREEN,fontFace:"Calibri",valign:"middle"});
  box(s,5.1,3.85,4.5,0.9,"FFF0F0",RED);
  s.addText('❌  DON\'T: Use "latest" tag in production',{x:5.25,y:3.92,w:4.3,h:0.75,fontSize:14,bold:true,color:RED,fontFace:"Calibri",valign:"middle"});
}

// ══ SLIDE 16: Docker Architecture ════════════════════════════════════════════
{
  const s = hdr(prs,"Docker Architecture");
  code(s,
    "┌────────────────────────────────────────┐\n│            Your Computer                │\n│                                         │\n│  ┌────────────────────────────────────┐ │\n│  │   Docker Desktop  (GUI)            │ │\n│  └────────────────────────────────────┘ │\n│                    ↕                    │\n│  ┌────────────────────────────────────┐ │\n│  │   Docker CLI  (Commands)           │ │\n│  │   $ docker run ...                 │ │\n│  └────────────────────────────────────┘ │\n│                    ↕                    │\n│  ┌────────────────────────────────────┐ │\n│  │   Docker Engine  (Daemon)          │ │\n│  │   • Manages containers             │ │\n│  │   • Manages images                 │ │\n│  └────────────────────────────────────┘ │\n│                    ↕                    │\n│  ┌────────────────────────────────────┐ │\n│  │   Containers  [App1] [App2] [App3] │ │\n│  └────────────────────────────────────┘ │\n└────────────────────────────────────────┘",
    0.3,0.65,9.4,4.1);
}

// ══ SLIDE 17: Docker Workflow ═════════════════════════════════════════════════
{
  const s = hdr(prs,"Docker Workflow – Typical Development Flow");
  const steps=[
    {n:"1",lbl:"Pull Image",   cmd:"docker pull\npython:3.9", x:0.3},
    {n:"2",lbl:"Run Container",cmd:"docker run\n-it python:3.9",x:1.95},
    {n:"3",lbl:"Develop & Test",cmd:"(make your\nchanges)",x:3.6},
    {n:"4",lbl:"Build Image",  cmd:"docker build\n-t myapp .",x:5.25},
    {n:"5",lbl:"Push to Hub",  cmd:"docker push\nmyapp",x:6.9},
  ];
  steps.forEach(st=>{
    s.addShape("ellipse",{x:st.x+0.38,y:0.68,w:0.8,h:0.8,fill:{color:DOCKER_BLUE},line:{color:DOCKER_DARK}});
    s.addText(st.n,{x:st.x+0.38,y:0.68,w:0.8,h:0.8,fontSize:20,bold:true,color:WHITE,align:"center",valign:"middle",fontFace:"Calibri"});
    s.addText(st.lbl,{x:st.x,y:1.57,w:1.6,h:0.5,fontSize:12,bold:true,color:DOCKER_DARK,align:"center",fontFace:"Calibri"});
    s.addShape("roundRect",{x:st.x+0.05,y:2.15,w:1.5,h:0.75,fill:{color:CODE_BG},line:{color:DOCKER_BLUE},rectRadius:0.07});
    s.addText(st.cmd,{x:st.x+0.05,y:2.18,w:1.5,h:0.7,fontSize:8.5,color:CODE_FG,fontFace:"Courier New",align:"center",valign:"middle"});
    if(st.x<6.9) s.addText("→",{x:st.x+1.55,y:0.83,w:0.4,h:0.5,fontSize:22,bold:true,color:DOCKER_BLUE,align:"center"});
  });
  s.addText("6.  Deploy Anywhere  →  docker run myapp  →  Works Everywhere! 🌍",{
    x:0.3,y:3.08,w:9.4,h:0.5,fontSize:14,bold:true,color:DOCKER_DARK,align:"center",fontFace:"Calibri"
  });
  code(s,"docker run -d -p 8080:80 --name webapp myapp:v1",0.3,3.7,9.4,1.0);
}

// ══ SLIDE 18: DEMO – First Container ══════════════════════════════════════════
{
  const s = hdr(prs,"DEMO – Your First Container 🎉");
  code(s,
    "# 1. Check Docker is installed\ndocker --version\n\n# 2. Run Hello World (downloads + runs automatically!)\ndocker run hello-world\n\n# 3. Pull the Python image\ndocker pull python:3.9-slim\n\n# 4. Run an interactive Python session\ndocker run -it python:3.9-slim\n\n# 5. Run Nginx web server in the background\ndocker run -d -p 8080:80 nginx:alpine\n\n# 6. Open in your browser → http://localhost:8080",
    0.3,0.65,9.4,4.1);
}

// ══ SLIDE 19: Essential Docker Commands ═══════════════════════════════════════
{
  const s = hdr(prs,"Essential Docker Commands");
  code(s,
    "# ── Images ────────────────────────────────────────\ndocker pull <image>         # Download from Docker Hub\ndocker images               # List all local images\ndocker rmi <image>          # Remove an image\ndocker build -t name .      # Build image from Dockerfile\n\n# ── Containers ─────────────────────────────────────\ndocker run <image>          # Create and start a container\ndocker run -d -p 8080:80 <image>    # Background + port mapping\ndocker ps                   # List running containers\ndocker ps -a                # List ALL containers\ndocker stop <id>            # Stop a container\ndocker rm <id>              # Remove a container\ndocker logs <id>            # View container logs\ndocker exec -it <id> sh     # Open shell inside container\n\n# ── Cleanup ─────────────────────────────────────────\ndocker system prune -a      # Remove ALL unused resources",
    0.3,0.65,9.4,4.1);
}

// ══ SLIDE 20: Common Docker Flags ════════════════════════════════════════════
{
  const s = hdr(prs,"Common docker run Flags");
  tbl(s,prs,
    ["Flag","Purpose","Example"],
    [
      ["-d",             "Detached / background",          "docker run -d nginx"],
      ["-it",            "Interactive terminal",            "docker run -it ubuntu bash"],
      ["-p 8080:80",     "Port mapping (host:container)",   "docker run -p 8080:80 nginx"],
      ["--name myapp",   "Give container a name",           "docker run --name web nginx"],
      ["-v data:/data",  "Volume mount",                    "docker run -v mydata:/data"],
      ["-e KEY=val",     "Environment variable",            "docker run -e DB=postgres"],
      ["--rm",           "Auto-remove when stopped",        "docker run --rm python:3.9"],
    ],
    0.3,0.68,9.4);
  s.addText('Example: docker run -d -p 3000:3000 --name webapp myapp',{
    x:0.3,y:4.55,w:9.4,h:0.38,fontSize:13,color:DOCKER_DARK,fontFace:"Courier New",align:"center"
  });
}

// ══ SLIDE 21: Port Mapping ════════════════════════════════════════════════════
{
  const s = hdr(prs,"Port Mapping Explained 🔌");
  box(s,0.3,0.65,4.3,2.05,"FFF0F0",RED);
  s.addText("Without Port Mapping ❌",{x:0.3,y:0.72,w:4.3,h:0.38,fontSize:13,bold:true,color:RED,align:"center",fontFace:"Calibri"});
  code(s,"Your Computer       Container\n─────────────       ─────────\n                    Port 80  (isolated)\n                    ❌ Cannot access!",0.35,1.12,4.2,1.42);

  box(s,5.1,0.65,4.3,2.05,"F0FFF0",GREEN);
  s.addText("With Port Mapping ✅",{x:5.1,y:0.72,w:4.3,h:0.38,fontSize:13,bold:true,color:GREEN,align:"center",fontFace:"Calibri"});
  code(s,"Your Computer        Container\n─────────────        ─────────\nPort 8080   ←──→    Port 80\n✅ Accessible!       App runs here",5.15,1.12,4.2,1.42);

  code(s,
    "docker run -p 8080:80 nginx\n#              ↑      ↑\n#        host port   container port\n\nAccess: http://localhost:8080",
    0.3,2.8,9.4,1.9);
}

// ══ SLIDE 22: Docker Use Cases ════════════════════════════════════════════════
{
  const s = hdr(prs,"Docker Use Cases");
  const cols=[
    {title:"Development 👨‍💻",items:["Consistent team environments","Fast onboarding for new devs","Isolated testing environments","Match production locally"],bg:"EEF5FF",border:"1A3A8C",hc:"1A3A8C"},
    {title:"Production 🏭",items:["Easy horizontal scaling","Rolling zero-downtime updates","Isolation & security sandboxing","Cloud-ready deployment"],bg:"F0FFF0",border:GREEN,hc:GREEN},
    {title:"CI/CD ⚙️",items:["Automated test pipelines","Continuous delivery","Reproducible builds every time","Environment parity"],bg:"FFF8EE",border:"8B4500",hc:"8B4500"},
  ];
  cols.forEach((c,i)=>{
    const x=0.2+i*3.3;
    box(s,x,0.65,3.1,4.1,c.bg,c.border);
    s.addShape("roundRect",{x,y:0.65,w:3.1,h:0.5,fill:{color:c.hc},line:{color:c.hc},rectRadius:0.1});
    s.addText(c.title,{x,y:0.72,w:3.1,h:0.36,fontSize:13,bold:true,color:WHITE,align:"center",fontFace:"Calibri"});
    bullets(s,c.items.map(t=>({text:"✅  "+t,size:13,bullet:false})),x+0.15,1.28,2.8,3.3);
  });
}

// ══ SLIDE 23: Microservices ════════════════════════════════════════════════════
{
  const s = hdr(prs,"Real-World Example – Microservices");
  box(s,0.3,0.65,4.3,4.1,"FFF8F0","CC6600");
  s.addText("Traditional Monolith ❌",{x:0.3,y:0.72,w:4.3,h:0.38,fontSize:13,bold:true,color:"CC6600",align:"center",fontFace:"Calibri"});
  code(s,
    "┌─────────────────────────┐\n│   One Big Application    │\n│  ┌───────────────────┐  │\n│  │  Auth + API +     │  │\n│  │  Database +       │  │\n│  │  Frontend         │  │\n│  │  + everything     │  │\n│  └───────────────────┘  │\n└─────────────────────────┘\n\nCannot scale parts independently",
    0.35,1.12,4.2,3.4);

  box(s,5.1,0.65,4.3,4.1,"EEF5FF",DOCKER_BLUE);
  s.addText("Microservices with Docker ✅",{x:5.1,y:0.72,w:4.3,h:0.38,fontSize:13,bold:true,color:DOCKER_BLUE,align:"center",fontFace:"Calibri"});
  code(s,
    "┌──────┐ ┌──────┐ ┌──────┐\n│ Auth │ │  API │ │  DB  │\n│ :3001│ │ :3000│ │ :5432│\n└──────┘ └──────┘ └──────┘\n┌──────┐ ┌──────┐\n│Front │ │Cache │\n│ :80  │ │ :6379│\n└──────┘ └──────┘\n\nScale each part independently!",
    5.15,1.12,4.2,3.4);
}

// ══ SLIDE 24: Docker Ecosystem ════════════════════════════════════════════════
{
  const s = hdr(prs,"Docker Ecosystem");
  const items=[
    {title:"Docker Engine",sub:"Core runtime that runs containers",icon:"🐳",col:"1A3A8C"},
    {title:"Docker Desktop",sub:"GUI app for Mac, Windows & Linux",icon:"🖥️",col:"005599"},
    {title:"Docker Hub",sub:"Public registry – GitHub for images",icon:"🌐",col:"007755"},
    {title:"Docker Compose",sub:"Define multi-container apps in YAML",icon:"🎼",col:"774400"},
    {title:"Docker Scout",sub:"Security scanning for images",icon:"🔍",col:"660066"},
    {title:"Kubernetes",sub:"Container orchestration at scale",icon:"☸️",col:"993300"},
  ];
  items.forEach((it,i)=>{
    const x=0.3+(i%3)*3.2;
    const y=0.65+Math.floor(i/3)*1.95;
    box(s,x,y,3.05,1.8,LIGHT_BG,it.col);
    s.addText(it.icon,{x:x+0.1,y:y+0.2,w:0.8,h:0.9,fontSize:30,align:"center"});
    s.addText(it.title,{x:x+0.95,y:y+0.2,w:2.0,h:0.45,fontSize:14,bold:true,color:it.col,fontFace:"Calibri"});
    s.addText(it.sub,{x:x+0.95,y:y+0.65,w:2.0,h:0.85,fontSize:11,color:GREY,fontFace:"Calibri",valign:"top"});
  });
}

// ══ SLIDE 25: Docker Compose Preview ═════════════════════════════════════════
{
  const s = hdr(prs,"Docker Compose – Multi-Container Apps 🎼");
  box(s,0.3,0.65,9.4,0.85,"FFF3CD","CC8800");
  s.addText("Problem: Running multiple containers manually is tedious and error-prone",{x:0.4,y:0.72,w:9.2,h:0.72,fontSize:14,bold:true,color:"885500",align:"center",fontFace:"Calibri"});
  s.addText("Solution: Define everything in docker-compose.yml",{x:0.4,y:1.56,w:9.2,h:0.42,fontSize:14,bold:true,color:DOCKER_DARK,fontFace:"Calibri"});
  code(s,
    "services:\n  web:\n    image: nginx\n    ports:\n      - \"80:80\"\n\n  database:\n    image: postgres\n    environment:\n      POSTGRES_PASSWORD: secret\n    volumes:\n      - db-data:/var/lib/postgresql/data\n\nvolumes:\n  db-data:",
    0.3,2.04,6.0,2.75);
  box(s,6.5,2.04,3.2,1.2,"F0FFF0",GREEN);
  s.addText("Start everything:",{x:6.6,y:2.1,w:3.0,h:0.35,fontSize:13,bold:true,color:GREEN,fontFace:"Calibri"});
  code(s,"docker compose up",6.5,2.5,3.2,0.65);
  box(s,6.5,3.32,3.2,1.47,LIGHT_BG,DOCKER_BLUE);
  s.addText("We'll cover this\nin Part 7! 📝",{x:6.55,y:3.45,w:3.1,h:1.2,fontSize:14,bold:true,color:DOCKER_BLUE,align:"center",fontFace:"Calibri",valign:"middle"});
}

// ══ SLIDE 26: Kubernetes Preview ═════════════════════════════════════════════
{
  const s = hdr(prs,"Kubernetes Preview ☸️");
  box(s,0.3,0.65,9.4,1.55,LIGHT_BG,DOCKER_BLUE);
  s.addText("What is Kubernetes?",{x:0.45,y:0.72,w:9.1,h:0.42,fontSize:16,bold:true,color:DOCKER_DARK,fontFace:"Calibri"});
  bullets(s,[
    {text:"Container orchestration platform"},
    {text:"Manages hundreds or thousands of containers"},
    {text:"Auto-scaling, self-healing, load balancing"},
  ],0.5,1.12,9.0,1.0,14);

  box(s,0.3,2.3,4.5,2.4,"FFF8F0","CC6600");
  s.addText("Docker 🐳",{x:0.4,y:2.38,w:4.3,h:0.38,fontSize:14,bold:true,color:"CC6600",align:"center",fontFace:"Calibri"});
  bullets(s,[
    {text:"Runs containers"},
    {text:"On ONE machine"},
    {text:"Manual scaling"},
  ],0.5,2.85,4.1,1.7,13,"553300");

  box(s,5.1,2.3,4.5,2.4,"EEF5FF",DOCKER_BLUE);
  s.addText("Kubernetes ☸️",{x:5.2,y:2.38,w:4.3,h:0.38,fontSize:14,bold:true,color:DOCKER_BLUE,align:"center",fontFace:"Calibri"});
  bullets(s,[
    {text:"Manages containers"},
    {text:"Across MANY machines"},
    {text:"Automatic scaling"},
  ],5.3,2.85,4.1,1.7,13,"003366");

  s.addText("We'll cover Kubernetes after Docker basics! 🚀",{x:0.3,y:4.63,w:9.4,h:0.3,fontSize:13,bold:true,color:DOCKER_DARK,align:"center",fontFace:"Calibri"});
}

// ══ SLIDE 27: Best Practices ══════════════════════════════════════════════════
{
  const s = hdr(prs,"Docker Best Practices");
  box(s,0.3,0.65,4.3,4.1,"F0FFF0",GREEN);
  s.addText("✅  DO",{x:0.3,y:0.72,w:4.3,h:0.38,fontSize:15,bold:true,color:GREEN,align:"center",fontFace:"Calibri"});
  bullets(s,[
    {text:'Use specific image tags (not "latest")'},
    {text:"Keep images small (use alpine base)"},
    {text:"One process per container"},
    {text:"Use .dockerignore file"},
    {text:"Run as non-root user"},
    {text:"Scan images for vulnerabilities"},
  ],0.5,1.2,4.0,3.3,13,GREEN);

  box(s,5.1,0.65,4.3,4.1,"FFF0F0",RED);
  s.addText("❌  DON'T",{x:5.1,y:0.72,w:4.3,h:0.38,fontSize:15,bold:true,color:RED,align:"center",fontFace:"Calibri"});
  bullets(s,[
    {text:"Store secrets or passwords in images"},
    {text:'Use "latest" tag in production'},
    {text:"Run multiple services in one container"},
    {text:"Ignore security updates"},
    {text:"Run as root user"},
    {text:"Skip documentation"},
  ],5.3,1.2,4.0,3.3,13,RED);
}

// ══ SLIDE 28: Common Pitfalls ═════════════════════════════════════════════════
{
  const s = hdr(prs,"Common Pitfalls & Solutions");
  const items=[
    {prob:"Port already in use",sol:'docker ps → find container → docker stop <id>'},
    {prob:"Cannot connect to Docker daemon",sol:"Start Docker Desktop – it must be running"},
    {prob:"Image not found",sol:"Check spelling and run docker pull first"},
    {prob:"Container exits immediately",sol:"docker logs <id> to see what went wrong"},
  ];
  items.forEach((it,i)=>{
    const y=0.68+i*1.02;
    box(s,0.3,y,4.3,0.88,"FFF0F0",RED);
    s.addText("Problem: "+it.prob,{x:0.42,y:y+0.08,w:4.1,h:0.72,fontSize:13,bold:true,color:RED,fontFace:"Calibri",valign:"middle"});
    box(s,4.9,y,4.8,0.88,"F0FFF0",GREEN);
    s.addText("Solution: "+it.sol,{x:5.02,y:y+0.08,w:4.6,h:0.72,fontSize:13,color:"004400",fontFace:"Calibri",valign:"middle"});
    s.addText("→",{x:4.56,y:y+0.18,w:0.35,h:0.52,fontSize:20,bold:true,color:DOCKER_BLUE,align:"center"});
  });
}

// ══ SLIDE 29: Learning Path ═══════════════════════════════════════════════════
{
  const s = hdr(prs,"Learning Path – Your Docker Journey");
  const steps=[
    {n:"1",lbl:"✅ Today: Docker Basics",         done:true},
    {n:"2",lbl:"Part 1-8: Hands-On Docker",       done:false},
    {n:"3",lbl:"Docker Compose",                  done:false},
    {n:"4",lbl:"Kubernetes Basics",               done:false},
    {n:"5",lbl:"Production Deployment",           done:false},
    {n:"6",lbl:"Advanced Topics",                 done:false},
  ];
  steps.forEach((st,i)=>{
    const y=0.7+i*0.66;
    const bg=st.done?"F0FFF0":"EEF5FF";
    const bc=st.done?GREEN:DOCKER_BLUE;
    box(s,0.5,y,8.8,0.58,bg,bc);
    s.addShape("ellipse",{x:0.6,y:y+0.08,w:0.42,h:0.42,fill:{color:bc},line:{color:bc}});
    s.addText(st.n,{x:0.6,y:y+0.08,w:0.42,h:0.42,fontSize:14,bold:true,color:WHITE,align:"center",valign:"middle",fontFace:"Calibri"});
    s.addText(st.lbl,{x:1.15,y:y+0.08,w:8.0,h:0.42,fontSize:15,bold:st.done,color:bc,fontFace:"Calibri",valign:"middle"});
  });
  s.addText("Next Step: Part 1 – Containerise Your First App 🚀",{x:0.5,y:4.65,w:9.0,h:0.28,fontSize:13,bold:true,color:DOCKER_DARK,align:"center",fontFace:"Calibri"});
}

// ══ SLIDE 30: Resources ═══════════════════════════════════════════════════════
{
  const s = hdr(prs,"Resources & Learning Materials 📚");
  const cols=[
    {title:"Official 📖",items:["docs.docker.com","hub.docker.com","docker.com/training","Docker blog"],col:"1A3A8C"},
    {title:"Practice 🧪",items:["labs.play-with-docker.com","Our Workshop /docker-basics/","Katacoda Docker labs","Docker official tutorials"],col:GREEN},
    {title:"Community 💬",items:["Docker Forums","YouTube tutorials","Docker subreddit (r/docker)","DockerCon talks"],col:"884400"},
  ];
  cols.forEach((c,i)=>{
    const x=0.2+i*3.3;
    box(s,x,0.65,3.1,4.1,LIGHT_BG,c.col);
    s.addShape("roundRect",{x,y:0.65,w:3.1,h:0.5,fill:{color:c.col},line:{color:c.col},rectRadius:0.1});
    s.addText(c.title,{x,y:0.72,w:3.1,h:0.36,fontSize:14,bold:true,color:WHITE,align:"center",fontFace:"Calibri"});
    bullets(s,c.items.map(t=>({text:t,size:13})),x+0.15,1.28,2.8,3.3,13,"333333");
  });
}

// ══ SLIDE 31: Quick Reference ═════════════════════════════════════════════════
{
  const s = hdr(prs,"Quick Reference Card – Save This Slide! 💾");
  code(s,
    "# ── Images ───────────────────────────────────────\ndocker pull python:3.9          # download image\ndocker images                   # list images\ndocker rmi python:3.9           # remove image\n\n# ── Containers ────────────────────────────────────\ndocker run nginx                # run container\ndocker run -d -p 8080:80 nginx  # detached + port\ndocker ps                       # running containers\ndocker ps -a                    # all containers\ndocker stop <id>                # stop container\ndocker rm <id>                  # remove container\ndocker logs <id>                # view logs\ndocker exec -it <id> sh         # open shell\n\n# ── Cleanup ─────────────────────────────────────────\ndocker system prune -a          # remove all unused",
    0.3,0.65,9.4,4.1);
}

// ══ SLIDE 32: Hands-On Exercise ═══════════════════════════════════════════════
{
  const s = hdr(prs,"Hands-On Exercise – Try This Now! ⏱ 5 min");
  s.addText("Follow these steps:",{x:0.4,y:0.65,w:9.2,h:0.42,fontSize:15,bold:true,color:DOCKER_DARK,fontFace:"Calibri"});
  code(s,
    "# 1. Pull the official Ubuntu image\ndocker pull ubuntu:22.04\n\n# 2. Run it interactively\ndocker run -it ubuntu:22.04 bash\n\n# 3. Inside the container, try:\nls\ncat /etc/os-release\necho \"I am inside a container!\"\nexit\n\n# 4. Verify the container stopped\ndocker ps -a\n\n# 5. Clean up\ndocker rm <container-id>",
    0.3,1.15,9.4,3.55);
}

// ══ SLIDE 33: Key Takeaways ═══════════════════════════════════════════════════
{
  const s = hdr(prs,"Key Takeaways");
  bullets(s,[
    {text:"🐳  Docker packages apps WITH their dependencies",size:17,bold:true},
    {text:"📦  Containers are lightweight, isolated environments",size:17,bold:true},
    {text:"🖼️  Images are blueprints  →  Containers are instances",size:17,bold:true},
    {text:"🌐  Docker Hub stores thousands of ready-to-use images",size:17,bold:true},
    {text:"⚡  Much faster and lighter than Virtual Machines",size:17,bold:true},
    {text:"✅  Same environment everywhere – dev, test, production",size:17,bold:true},
  ],0.5,0.7,9.0,3.6,17,DOCKER_DARK);
  s.addShape("roundRect",{x:0.5,y:4.38,w:9.0,h:0.48,fill:{color:DOCKER_BLUE},line:{color:DOCKER_BLUE},rectRadius:0.1});
  s.addText('Docker solves "it works on my machine" by packaging EVERYTHING together.',{
    x:0.5,y:4.4,w:9.0,h:0.44,fontSize:13,bold:true,color:WHITE,align:"center",fontFace:"Calibri"
  });
}

// ══ SLIDE 34: What's Next ═════════════════════════════════════════════════════
{
  const s = hdr(prs,"What's Next? 🚀");
  bullets(s,[
    {text:"✅  Part 0: Introduction (Done!)",size:16,bullet:false,bold:true,color:GREEN},
    {text:"📝  Part 1: Containerise your first app",size:16,bullet:false},
    {text:"📝  Part 2: Update & rebuild",size:16,bullet:false},
    {text:"📝  Part 3: Share on Docker Hub",size:16,bullet:false},
    {text:"📝  Part 4: Volumes – data persistence",size:16,bullet:false},
    {text:"📝  Part 5: Bind mounts – live code editing",size:16,bullet:false},
    {text:"📝  Part 6: Multi-container apps",size:16,bullet:false},
    {text:"📝  Part 7: Docker Compose",size:16,bullet:false},
    {text:"📝  Part 8: Best practices",size:16,bullet:false},
  ],0.6,0.7,8.8,4.0,16,"333333");
  s.addText("Let's get hands-on! 🎉",{x:0.5,y:4.62,w:9.0,h:0.3,fontSize:14,bold:true,color:DOCKER_BLUE,align:"center",fontFace:"Calibri"});
}

// ══ SLIDE 35: Q&A ════════════════════════════════════════════════════════════
{
  const s = hdr(prs,"Questions? 💬");
  bullets(s,[
    {text:"🤔  How is Docker different from a Virtual Machine?",size:15},
    {text:"💻  Can I run Windows containers on Mac?",size:15},
    {text:"💰  Is Docker free?",size:15},
    {text:"🚀  How do I deploy Docker containers to the cloud?",size:15},
    {text:"🔐  How do I handle secrets and passwords securely?",size:15},
    {text:"⚡  How do I make Docker builds faster?",size:15},
  ],0.5,0.7,9.0,3.4,15,"333333");
  s.addShape("roundRect",{x:0.5,y:4.25,w:9.0,h:0.6,fill:{color:LIGHT_BG},line:{color:DOCKER_BLUE,width:2},rectRadius:0.1});
  s.addText("Ask any question – no question is too basic! 😊",{x:0.5,y:4.3,w:9.0,h:0.5,fontSize:15,bold:true,color:DOCKER_BLUE,align:"center",fontFace:"Calibri",valign:"middle"});
}

// ══ SLIDE 36: Thank You ═══════════════════════════════════════════════════════
{
  const s = prs.addSlide();
  s.background = { color: DOCKER_DARK };
  addTopBar(s,prs,DOCKER_BLUE);
  addBotBar(s,prs,DOCKER_BLUE);
  s.addText("Thank You! 🙏",{x:0.5,y:0.75,w:9,h:1.0,fontSize:40,bold:true,color:WHITE,align:"center",fontFace:"Calibri"});
  s.addText("🐳",{x:4.1,y:1.85,w:1.8,h:1.4,fontSize:66,align:"center"});
  bullets(s,[
    {text:"📁  GitHub: github.com/sanjay3107/docker-Kubernetes-workshop",size:14,bullet:false,color:WHITE},
    {text:"📖  Detailed guides in every folder",size:14,bullet:false,color:WHITE},
    {text:"🎯  Hands-on exercises included",size:14,bullet:false,color:WHITE},
    {text:"💬  Ask questions anytime!",size:14,bullet:false,color:WHITE},
  ],1.0,3.35,8.0,1.3,14,WHITE);
  s.addText("Next: Open /docker-basics/part-01-containerize/",{x:0.5,y:4.58,w:9.0,h:0.3,fontSize:13,bold:true,color:DOCKER_BLUE,align:"center",fontFace:"Calibri"});
}

// ─── WRITE FILE ───────────────────────────────────────────────────────────────
prs.writeFile({ fileName: "Docker-Basics-Workshop-Full.pptx" })
  .then(() => console.log("✅  Docker-Basics-Workshop-Full.pptx created! (36 slides)"))
  .catch(e  => console.error("❌ Error:", e));
