const PptxGenJS = require("pptxgenjs");

// ─── THEME ────────────────────────────────────────────────────────────────────
const GIT_ORANGE  = "F05033";   // Git brand orange
const GIT_DARK    = "2D1B00";   // Dark brown-black
const GIT_DARK2   = "1A1A2E";   // Deep dark for slides
const WHITE       = "FFFFFF";
const LIGHT_BG    = "FFF4F0";
const CODE_BG     = "1E1E2E";
const CODE_FG     = "CDD6F4";
const GREEN       = "007700";
const RED         = "CC0000";
const GREY        = "555555";
const AMBER       = "996600";

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function topBar(sld, prs, color) {
  sld.addShape(prs.ShapeType.rect, { x:0, y:0, w:"100%", h:0.06, fill:{color} });
}
function botBar(sld, prs, color) {
  sld.addShape(prs.ShapeType.rect, { x:0, y:4.94, w:"100%", h:0.06, fill:{color} });
}

function titleSlide(prs) {
  const s = prs.addSlide();
  s.background = { color: GIT_DARK2 };
  topBar(s, prs, GIT_ORANGE);
  botBar(s, prs, GIT_ORANGE);
  s.addShape(prs.ShapeType.ellipse, { x:7.4, y:-1.2, w:4.5, h:4.5, fill:{color:GIT_ORANGE}, line:{color:GIT_ORANGE} });
  s.addText("Git Fundamentals", { x:0.5, y:1.4, w:7.0, h:1.2, fontSize:44, bold:true, color:WHITE, fontFace:"Calibri" });
  s.addText("Version Control Made Simple", { x:0.5, y:2.7, w:7.0, h:0.7, fontSize:22, color:GIT_ORANGE, fontFace:"Calibri" });
  s.addText("🐙", { x:0.5, y:3.55, w:0.8, h:0.7, fontSize:34 });
  s.addText("Developer Workshop Series", { x:1.4, y:3.63, w:6, h:0.38, fontSize:13, color:"AAAAAA", fontFace:"Calibri" });
}

function hdr(prs, title) {
  const s = prs.addSlide();
  s.background = { color: WHITE };
  s.addShape(prs.ShapeType.rect, { x:0, y:0, w:"100%", h:0.56, fill:{color:GIT_ORANGE} });
  botBar(s, prs, GIT_ORANGE);
  s.addText(title, { x:0.3, y:0.07, w:9.4, h:0.42, fontSize:20, bold:true, color:WHITE, fontFace:"Calibri", valign:"middle" });
  return s;
}

function divider(prs, label) {
  const s = prs.addSlide();
  s.background = { color: GIT_DARK2 };
  topBar(s, prs, GIT_ORANGE);
  botBar(s, prs, GIT_ORANGE);
  s.addText(label, { x:0.5, y:1.7, w:9, h:1.1, fontSize:34, bold:true, color:WHITE, align:"center", fontFace:"Calibri" });
  s.addShape(prs.ShapeType.rect, { x:2.5, y:2.88, w:5, h:0.06, fill:{color:GIT_ORANGE} });
}

function buls(sld, items, x, y, w, h, defSize=15, defColor="333333") {
  const rows = items.map(it => ({
    text: it.text,
    options: {
      fontSize: it.size || defSize,
      bold: !!it.bold,
      color: it.color || defColor,
      bullet: it.bullet !== false,
      indentLevel: it.indent || 0,
      paraSpaceAfter: it.gap ? 8 : 2,
      fontFace: "Calibri",
    }
  }));
  sld.addText(rows, { x, y, w, h, valign:"top", fontFace:"Calibri" });
}

function cd(sld, text, x, y, w, h) {
  sld.addShape("rect", { x, y, w, h, fill:{color:CODE_BG}, line:{color:"444466", width:1} });
  sld.addText(text, { x:x+0.12, y:y+0.1, w:w-0.24, h:h-0.2, fontSize:10, color:CODE_FG, fontFace:"Courier New", valign:"top" });
}

function box(sld, x, y, w, h, bg, border) {
  sld.addShape("roundRect", { x, y, w, h, fill:{color:bg}, line:{color:border, width:2}, rectRadius:0.1 });
}

function tbl(sld, headers, rows, x, y, w) {
  const data = [];
  data.push(headers.map(h => ({
    text: h,
    options: { bold:true, color:WHITE, fill:{color:GIT_ORANGE}, fontSize:12, align:"center", fontFace:"Calibri" }
  })));
  rows.forEach((row, ri) => {
    data.push(row.map(cell => ({
      text: cell,
      options: { color:"333333", fill:{color: ri%2===0 ? LIGHT_BG : WHITE}, fontSize:11, align:"center", fontFace:"Calibri" }
    })));
  });
  sld.addTable(data, { x, y, w, colW: Array(headers.length).fill(w/headers.length), border:{pt:1, color:"CCCCCC"} });
}

// ─── BUILD ────────────────────────────────────────────────────────────────────
const prs = new PptxGenJS();
prs.layout = "LAYOUT_WIDE";
prs.title  = "Git Fundamentals";

// ══ SLIDE 1: Title ════════════════════════════════════════════════════════════
titleSlide(prs);

// ══ SLIDE 2: Agenda ═══════════════════════════════════════════════════════════
{
  const s = hdr(prs, "What We'll Cover Today");
  buls(s,[
    {text:"1.  🤔  What is Git & Why Do We Need It?", size:17},
    {text:"2.  ⚙️   Installation & First-Time Setup", size:17},
    {text:"3.  🧱  Core Concepts – Repos, Commits, Branches", size:17},
    {text:"4.  🔄  The Daily Git Workflow", size:17},
    {text:"5.  🌿  Branching & Merging", size:17},
    {text:"6.  🌐  Working with GitHub", size:17},
    {text:"7.  🔀  Pull Requests & Collaboration", size:17},
    {text:"8.  🎓  Hands-On Demo + Best Practices", size:17},
  ],1.0,0.68,8.0,4.0);
  s.addText("⏱  45 minutes", {x:7.5, y:4.6, w:2.1, h:0.3, fontSize:13, bold:true, color:GIT_ORANGE, fontFace:"Calibri"});
}

// ══ SLIDE 3: The Problem ══════════════════════════════════════════════════════
{
  const s = hdr(prs, 'The Problem – Without Version Control 😫');
  box(s,0.3,0.65,4.4,4.1,"FFF0EE",RED);
  s.addText("Sound familiar? ❌",{x:0.3,y:0.72,w:4.4,h:0.38,fontSize:14,bold:true,color:RED,align:"center",fontFace:"Calibri"});
  buls(s,[
    {text:"final.docx",          size:13, bullet:false},
    {text:"final_v2.docx",       size:13, bullet:false},
    {text:"final_FINAL.docx",    size:13, bullet:false},
    {text:"final_FINAL_v2.docx", size:13, bullet:false},
    {text:"final_FINAL_use_this_one.docx",       size:12, bullet:false, color:RED},
    {text:"final_FINAL_use_this_one_FIXED.docx", size:11, bullet:false, color:RED},
  ],0.5,1.18,4.1,3.3,13,"553300");

  box(s,5.0,0.65,4.6,4.1,"FFF4F0",GIT_ORANGE);
  s.addText("Problems this causes ⚠️",{x:5.0,y:0.72,w:4.6,h:0.38,fontSize:14,bold:true,color:AMBER,align:"center",fontFace:"Calibri"});
  buls(s,[
    {text:"❌  Which version is the latest?"},
    {text:"❌  What changed between versions?"},
    {text:"❌  Who made that change and when?"},
    {text:"❌  How to go back to a working version?"},
    {text:"❌  Two people editing the same file = chaos!"},
  ],5.15,1.18,4.3,3.3,14,"553300");
}

// ══ SLIDE 4: What is Git ══════════════════════════════════════════════════════
{
  const s = hdr(prs, "What is Git? 🐙");
  box(s,0.3,0.65,9.4,1.4,LIGHT_BG,GIT_ORANGE);
  s.addText(
    "Git is a distributed version control system that tracks changes in files over time, letting you recall specific versions later and collaborate with others.",
    {x:0.45,y:0.72,w:9.1,h:1.28,fontSize:14,color:GIT_DARK2,italic:true,fontFace:"Calibri",valign:"middle"}
  );
  buls(s,[
    {text:"📅  Created by Linus Torvalds in 2005 (same person who made Linux)"},
    {text:"🌍  Used by 96% of professional developers worldwide"},
    {text:"🆓  Free and open-source"},
    {text:"⚡  Works offline – your full history is stored locally"},
    {text:"🔒  Nothing is ever truly lost – full history preserved"},
  ],0.4,2.2,5.5,2.5,15);

  box(s,6.2,2.2,3.5,2.5,GIT_DARK2,GIT_ORANGE);
  s.addText("🐙",{x:6.4,y:2.35,w:3.1,h:1.2,fontSize:64,align:"center"});
  s.addText('"Time machine +\nsave points\nfor your code"',{x:6.3,y:3.6,w:3.3,h:1.0,fontSize:13,bold:true,color:GIT_ORANGE,align:"center",fontFace:"Calibri"});
}

// ══ SLIDE 5: Git vs GitHub ════════════════════════════════════════════════════
{
  const s = hdr(prs, "Git vs GitHub – They Are Different! 🚨");
  tbl(s,
    ["", "Git 🐙", "GitHub 🌐"],
    [
      ["What",     "Version control tool",    "Website / cloud service"],
      ["Where",    "Your computer",           "Internet (cloud)"],
      ["Made by",  "Linus Torvalds",          "Microsoft"],
      ["Cost",     "Free",                    "Free (+ paid plans)"],
      ["Purpose",  "Track changes locally",   "Share & collaborate online"],
    ],
    0.4,0.68,9.2);

  box(s,0.4,3.75,4.3,1.0,LIGHT_BG,GIT_ORANGE);
  s.addText("🐙  Git = the engine in your car",{x:0.55,y:3.82,w:4.1,h:0.85,fontSize:15,bold:true,color:GIT_DARK2,fontFace:"Calibri",valign:"middle"});
  box(s,5.0,3.75,4.6,1.0,LIGHT_BG,GIT_ORANGE);
  s.addText("🌐  GitHub = the motorway (road network)",{x:5.15,y:3.82,w:4.3,h:0.85,fontSize:15,bold:true,color:GIT_DARK2,fontFace:"Calibri",valign:"middle"});
}

// ══ SLIDE 6: First-Time Setup ═════════════════════════════════════════════════
{
  const s = hdr(prs, "Installation & First-Time Setup ⚙️");
  s.addText("Run these once after installing Git:",{x:0.4,y:0.65,w:9.2,h:0.42,fontSize:14,color:GIT_DARK2,fontFace:"Calibri"});
  cd(s,
    "# Tell Git who you are (used in every commit)\ngit config --global user.name  \"Your Full Name\"\ngit config --global user.email \"you@example.com\"\n\n# Set VS Code as default editor\ngit config --global core.editor \"code --wait\"\n\n# Verify your settings\ngit config --list",
    0.3,1.15,9.4,2.5);
  box(s,0.3,3.75,4.5,1.0,"F0FFF0",GREEN);
  s.addText("Check Git is installed:\ngit --version",{x:0.45,y:3.8,w:4.2,h:0.88,fontSize:13,color:"004400",fontFace:"Courier New",valign:"middle"});
  box(s,5.1,3.75,4.5,1.0,LIGHT_BG,GIT_ORANGE);
  s.addText("Download from:\ngit-scm.com/download",{x:5.25,y:3.8,w:4.2,h:0.88,fontSize:13,color:GIT_DARK2,fontFace:"Calibri",valign:"middle"});
}

// ══ SLIDE 7: Section divider ══════════════════════════════════════════════════
divider(prs, "Core Concepts");

// ══ SLIDE 8: Repository ═══════════════════════════════════════════════════════
{
  const s = hdr(prs, "Core Concept #1 – Repository (Repo) 📁");
  buls(s,[
    {text:"What is a Repository?",bold:true,size:16,bullet:false,color:GIT_DARK2,gap:true},
    {text:"📁  A folder that Git is tracking"},
    {text:"📜  Contains all project files"},
    {text:"🕒  Contains the ENTIRE history of every change"},
    {text:"💻  Can be local (your machine) or remote (GitHub)"},
    {text:"",bullet:false,gap:true},
    {text:"Analogy",bold:true,size:16,bullet:false,color:GIT_DARK2},
    {text:"📂  Like Google Drive, but remembers EVERY change ever made"},
  ],0.4,0.65,5.5,4.1);

  box(s,6.1,0.65,3.6,4.1,GIT_DARK2,GIT_ORANGE);
  s.addText("Create or clone:",{x:6.2,y:0.78,w:3.4,h:0.42,fontSize:13,bold:true,color:GIT_ORANGE,align:"center",fontFace:"Calibri"});
  cd(s,
    "# New local repo\ngit init my-project\ncd my-project\n\n# OR clone from GitHub\ngit clone https://github.com/\n  user/repo.git\n\n# What's inside?\nls -la\n# .git/  ← Git's database\n# (all your files)",
    6.15,1.25,3.5,3.35);
}

// ══ SLIDE 9: Commit ═══════════════════════════════════════════════════════════
{
  const s = hdr(prs, "Core Concept #2 – Commit 💾");
  buls(s,[
    {text:"What is a Commit?",bold:true,size:16,bullet:false,color:GIT_DARK2,gap:true},
    {text:"📸  A snapshot of your files at a point in time"},
    {text:"🔑  Has a unique ID (hash), author, date & message"},
    {text:"🔒  Permanent – you can always go back"},
    {text:"",bullet:false,gap:true},
    {text:"Analogy",bold:true,size:16,bullet:false,color:GIT_DARK2},
    {text:"🎮  Like a Save Point in a video game"},
    {text:"📷  Like taking a photograph of your code"},
  ],0.4,0.65,5.3,3.2);

  cd(s,
    "# Commit history looks like:\nabc1234  Add user login feature\ndef5678  Fix homepage styling\nghi9012  Initial project setup",
    0.4,3.45,5.3,1.3);

  box(s,6.1,0.65,3.6,4.1,GIT_DARK2,GIT_ORANGE);
  s.addText("How to commit:",{x:6.2,y:0.78,w:3.4,h:0.42,fontSize:13,bold:true,color:GIT_ORANGE,align:"center",fontFace:"Calibri"});
  cd(s,
    "# 1. Stage your files\ngit add app.py\n# OR stage everything\ngit add .\n\n# 2. Commit with message\ngit commit -m \"Add login\"\n\n# 3. View history\ngit log --oneline",
    6.15,1.25,3.5,3.35);
}

// ══ SLIDE 10: Branch ══════════════════════════════════════════════════════════
{
  const s = hdr(prs, "Core Concept #3 – Branch 🌿");
  buls(s,[
    {text:"What is a Branch?",bold:true,size:16,bullet:false,color:GIT_DARK2,gap:true},
    {text:"🔀  An independent line of development"},
    {text:"🏠  Default branch is called  main  (or master)"},
    {text:"🛡️  Work on features without affecting  main"},
    {text:"⚡  Cheap and fast to create in Git"},
    {text:"",bullet:false,gap:true},
    {text:"Analogy",bold:true,size:16,bullet:false,color:GIT_DARK2},
    {text:"🌌  Parallel universes – work on features safely"},
  ],0.4,0.65,5.3,3.1);

  cd(s,
    "main    ──●──●──●──────────────●──→\n              \\                /\nfeature        ●──●──●──●──●",
    0.4,3.45,5.3,1.3);

  box(s,6.1,0.65,3.6,4.1,GIT_DARK2,GIT_ORANGE);
  s.addText("Branch commands:",{x:6.2,y:0.78,w:3.4,h:0.42,fontSize:13,bold:true,color:GIT_ORANGE,align:"center",fontFace:"Calibri"});
  cd(s,
    "# Create + switch\ngit checkout -b feature/login\n\n# List branches\ngit branch\n\n# Switch branch\ngit checkout main\n\n# Delete branch\ngit branch -d feature/login",
    6.15,1.25,3.5,3.35);
}

// ══ SLIDE 11: The 3 Areas ═════════════════════════════════════════════════════
{
  const s = hdr(prs, "The 3 Areas of Git");
  cd(s,
    "┌──────────────────┐   git add   ┌─────────────────┐  git commit  ┌───────────────┐\n│  Working         │  ─────────→  │  Staging Area   │  ──────────→  │  Repository   │\n│  Directory       │              │  (Index)        │               │  (History)    │\n│                  │              │                 │               │               │\n│  Your files      │              │  Files ready    │               │  All your     │\n│  (being edited)  │              │  to commit      │               │  commits      │\n└──────────────────┘              └─────────────────┘               └───────────────┘\n         ↑                                                                   │\n         └───────────────────── git checkout ──────────────────────────────┘",
    0.3,0.65,9.4,3.2);

  const areas = [
    {title:"Working Directory",desc:"Where you edit files normally",color:"CC6600"},
    {title:"Staging Area",     desc:"Prepare exactly what goes in next commit",color:GIT_ORANGE},
    {title:"Repository",       desc:"Permanent history of all commits",color:GREEN},
  ];
  areas.forEach((a,i)=>{
    const x=0.3+i*3.2;
    box(s,x,3.95,3.05,0.85,LIGHT_BG,a.color);
    s.addText(a.title,{x:x+0.1,y:4.0,w:2.85,h:0.38,fontSize:13,bold:true,color:a.color,fontFace:"Calibri"});
    s.addText(a.desc,{x:x+0.1,y:4.35,w:2.85,h:0.4,fontSize:11,color:GREY,fontFace:"Calibri"});
  });
}

// ══ SLIDE 12: Daily Workflow ══════════════════════════════════════════════════
{
  const s = hdr(prs, "The Daily Git Workflow 🔄");
  cd(s,
    "# 1. Morning – get latest changes from the team\ngit pull origin main\n\n# 2. Create a branch for your work\ngit checkout -b feature/my-feature\n\n# 3. Make your changes in the editor...\n\n# 4. See what changed\ngit status\ngit diff\n\n# 5. Stage your changes\ngit add .                          # all files\ngit add app.py                     # specific file\n\n# 6. Commit with a clear message\ngit commit -m \"feat: add blue submit button\"\n\n# 7. Push to GitHub\ngit push origin feature/my-feature\n\n# 8. Open a Pull Request on GitHub",
    0.3,0.65,9.4,4.1);
}

// ══ SLIDE 13: git status & diff ═══════════════════════════════════════════════
{
  const s = hdr(prs, "Know What's Changed – status & diff");
  s.addText("Run git status frequently – it tells you exactly what to do next!",{x:0.4,y:0.65,w:9.2,h:0.42,fontSize:14,bold:true,color:GIT_DARK2,fontFace:"Calibri"});
  cd(s,
    "$ git status\nOn branch feature/login\nChanges not staged for commit:\n  modified:   app.py\n  modified:   templates/login.html\n\nUntracked files:\n  new-feature.py\n\n$ git diff\n- old line that was removed\n+ new line that was added\n\n$ git diff --staged     # see what's already staged",
    0.3,1.15,9.4,3.6);
}

// ══ SLIDE 14: Good Commit Messages ═══════════════════════════════════════════
{
  const s = hdr(prs, "Writing Good Commit Messages ✍️");
  box(s,0.3,0.65,4.3,3.4,"FFF0F0",RED);
  s.addText("Bad messages ❌",{x:0.3,y:0.72,w:4.3,h:0.38,fontSize:14,bold:true,color:RED,align:"center",fontFace:"Calibri"});
  cd(s,
    "git commit -m \"fix\"\ngit commit -m \"stuff\"\ngit commit -m \"asdfgh\"\ngit commit -m \"WIP\"\ngit commit -m \"changes\"\ngit commit -m \"ok now\"",
    0.35,1.12,4.2,2.75);

  box(s,5.1,0.65,4.5,3.4,"F0FFF0",GREEN);
  s.addText("Good messages ✅",{x:5.1,y:0.72,w:4.5,h:0.38,fontSize:14,bold:true,color:GREEN,align:"center",fontFace:"Calibri"});
  cd(s,
    "git commit -m \"fix: login redirect after reset\"\ngit commit -m \"feat: add search to products\"\ngit commit -m \"docs: update README setup steps\"\ngit commit -m \"refactor: extract auth middleware\"\ngit commit -m \"test: add unit tests for cart\"",
    5.15,1.12,4.35,2.75);

  s.addText("Format:  feat: | fix: | docs: | refactor: | test:  +  what changed",{
    x:0.3,y:4.12,w:9.4,h:0.38,fontSize:13,bold:true,color:GIT_DARK2,align:"center",fontFace:"Calibri"
  });
  s.addShape("roundRect",{x:0.3,y:4.12,w:9.4,h:0.7,fill:{color:LIGHT_BG},line:{color:GIT_ORANGE,width:2},rectRadius:0.09});
  s.addText("Format:  feat: | fix: | docs: | refactor: | test:  followed by  what changed",{
    x:0.3,y:4.16,w:9.4,h:0.62,fontSize:13,bold:true,color:GIT_DARK2,align:"center",fontFace:"Calibri",valign:"middle"
  });
}

// ══ SLIDE 15: Section divider ══════════════════════════════════════════════════
divider(prs, "Branching & Merging");

// ══ SLIDE 16: Branching Strategy ═════════════════════════════════════════════
{
  const s = hdr(prs, "Branching Strategy – How Teams Work");
  cd(s,
    "main      ──●─────────────────────────────────●──→  (always deployable)\n            │                                   │\ndevelop   ──●──●──●──●──●──●──●──●──●──●──●──●──→\n                │               │\nfeature/login ──●──●──●──●──●──┘\n                                │\nfeature/cart  ──────────●──●──●──●──┘",
    0.3,0.65,9.4,2.55);

  s.addText("Common branch naming:",{x:0.4,y:3.3,w:9.2,h:0.38,fontSize:14,bold:true,color:GIT_DARK2,fontFace:"Calibri"});
  const names=[
    {name:"feature/user-authentication",col:"1A3A8C"},
    {name:"bugfix/login-redirect-error", col:RED},
    {name:"hotfix/payment-crash",        col:"CC4400"},
    {name:"release/v2.0",               col:GREEN},
  ];
  names.forEach((n,i)=>{
    const x=0.3+(i%2)*4.8, y=3.72+Math.floor(i/2)*0.58;
    box(s,x,y,4.5,0.48,CODE_BG,"444466");
    s.addText(n.name,{x:x+0.1,y:y+0.04,w:4.3,h:0.4,fontSize:12,color:CODE_FG,fontFace:"Courier New",valign:"middle"});
  });
}

// ══ SLIDE 17: Merging ════════════════════════════════════════════════════════
{
  const s = hdr(prs, "Merging Branches 🔀");
  box(s,0.3,0.65,4.5,2.1,"F0FFF0",GREEN);
  s.addText("Fast-forward merge ✅",{x:0.3,y:0.72,w:4.5,h:0.38,fontSize:13,bold:true,color:GREEN,align:"center",fontFace:"Calibri"});
  cd(s,
    "main    ──●──●\n              \\\nfeature        ●──●──●\n                       ↓ merge\nmain    ──●──●──●──●──●",
    0.35,1.13,4.4,1.48);

  box(s,5.1,0.65,4.5,2.1,"FFF4F0",GIT_ORANGE);
  s.addText("Merge conflict ⚠️",{x:5.1,y:0.72,w:4.5,h:0.38,fontSize:13,bold:true,color:AMBER,align:"center",fontFace:"Calibri"});
  cd(s,
    "<<<<<<< HEAD (main)\nbutton color: blue;\n=======\nbutton color: red;\n>>>>>>> feature/login\n↓ Edit, pick the right version",
    5.15,1.13,4.4,1.48);

  s.addText("How to merge:",{x:0.4,y:2.85,w:9.2,h:0.38,fontSize:14,bold:true,color:GIT_DARK2,fontFace:"Calibri"});
  cd(s,
    "# 1. Switch to main\ngit checkout main\n\n# 2. Merge the feature branch\ngit merge feature/login\n\n# 3. Resolve conflicts if any, then:\ngit add app.py\ngit commit -m \"Resolve merge conflict\"\n\n# 4. Delete branch (cleanup)\ngit branch -d feature/login",
    0.3,3.3,9.4,1.45);
}

// ══ SLIDE 18: Section divider ═════════════════════════════════════════════════
divider(prs, "GitHub & Collaboration");

// ══ SLIDE 19: Working with GitHub ════════════════════════════════════════════
{
  const s = hdr(prs, "Working with GitHub 🌐");
  cd(s,
    "# ── Connect local repo to GitHub ────────────────────\ngit remote add origin https://github.com/username/repo.git\n\n# First push (sets upstream tracking)\ngit push -u origin main\n\n# All future pushes\ngit push\n\n# Pull latest changes\ngit pull",
    0.3,0.65,9.4,2.85);

  tbl(s,
    ["Command","What It Does"],
    [
      ["git remote -v",    "Show connected remotes"],
      ["git push",         "Upload commits to GitHub"],
      ["git pull",         "Download + merge from GitHub"],
      ["git fetch origin", "Download without merging (safe)"],
      ["git clone <url>",  "Copy entire repo from GitHub"],
    ],
    0.3,3.58,9.4);
}

// ══ SLIDE 20: Pull Requests ═══════════════════════════════════════════════════
{
  const s = hdr(prs, "Pull Requests – Team Collaboration 🤝");
  box(s,0.3,0.65,5.0,1.55,LIGHT_BG,GIT_ORANGE);
  s.addText("What is a Pull Request (PR)?",{x:0.45,y:0.72,w:4.8,h:0.38,fontSize:15,bold:true,color:GIT_DARK2,fontFace:"Calibri"});
  buls(s,[
    {text:"A request to merge your branch into main"},
    {text:"Triggers code review by teammates"},
    {text:"Shows exactly what changed"},
    {text:"Industry standard for team collaboration"},
  ],0.45,1.12,4.7,1.0,13);

  s.addText("PR Workflow:",{x:0.3,y:2.3,w:9.4,h:0.38,fontSize:14,bold:true,color:GIT_DARK2,fontFace:"Calibri"});
  const steps=[
    {n:"1",lbl:"Push branch\nto GitHub",x:0.3},
    {n:"2",lbl:"Open PR\non GitHub",x:1.9},
    {n:"3",lbl:"Team\nreviews code",x:3.5},
    {n:"4",lbl:"Make\nchanges",x:5.1},
    {n:"5",lbl:"Get\napproval ✅",x:6.7},
    {n:"6",lbl:"Merge\nto main",x:8.3},
  ];
  steps.forEach(st=>{
    s.addShape("ellipse",{x:st.x+0.1,y:2.76,w:0.7,h:0.7,fill:{color:GIT_ORANGE},line:{color:GIT_DARK2}});
    s.addText(st.n,{x:st.x+0.1,y:2.76,w:0.7,h:0.7,fontSize:18,bold:true,color:WHITE,align:"center",valign:"middle",fontFace:"Calibri"});
    s.addText(st.lbl,{x:st.x,y:3.52,w:1.5,h:0.7,fontSize:11,color:GIT_DARK2,align:"center",fontFace:"Calibri"});
    if(st.x<8.3) s.addText("→",{x:st.x+0.8,y:2.88,w:0.35,h:0.46,fontSize:20,bold:true,color:GIT_ORANGE,align:"center"});
  });
  s.addShape("roundRect",{x:0.3,y:4.3,w:9.4,h:0.55,fill:{color:GIT_DARK2},line:{color:GIT_ORANGE},rectRadius:0.08});
  s.addText("Never commit directly to main in a team – always use Pull Requests!",{x:0.3,y:4.34,w:9.4,h:0.46,fontSize:13,bold:true,color:GIT_ORANGE,align:"center",fontFace:"Calibri",valign:"middle"});
}

// ══ SLIDE 21: Undoing Things ══════════════════════════════════════════════════
{
  const s = hdr(prs, "Undoing Things – Git's Safety Net 🛡️");
  cd(s,
    "# Discard changes to a file (not yet staged)\ngit restore app.py\n\n# Unstage a file (keep changes in working dir)\ngit restore --staged app.py\n\n# Undo last commit – keep changes staged\ngit reset --soft HEAD~1\n\n# Undo last commit – keep changes unstaged\ngit reset --mixed HEAD~1\n\n# Safe undo: create a reverting commit (safe for shared branches)\ngit revert abc1234\n\n# Save work-in-progress temporarily\ngit stash\ngit stash pop          # bring it back",
    0.3,0.65,9.4,3.85);

  box(s,0.3,4.55,9.4,0.35,"FFF0F0",RED);
  s.addText("⚠️  Never use  git reset --hard  on shared branches – it rewrites history for everyone!",{x:0.4,y:4.58,w:9.2,h:0.28,fontSize:12,bold:true,color:RED,align:"center",fontFace:"Calibri"});
}

// ══ SLIDE 22: .gitignore ══════════════════════════════════════════════════════
{
  const s = hdr(prs, ".gitignore – What NOT to Track 🙈");
  s.addText("Create a .gitignore file in your repo root:",{x:0.4,y:0.65,w:9.2,h:0.42,fontSize:14,color:GIT_DARK2,fontFace:"Calibri"});
  cd(s,
    "# Python\n__pycache__/\n*.pyc\nvenv/\n\n# Node.js\nnode_modules/\ndist/\n\n# Secrets – NEVER commit these!\n.env\n.env.local\n*.pem\n*.key\nsecrets.json\n\n# OS files\n.DS_Store\nThumbs.db\n\n# IDE\n.vscode/\n.idea/",
    0.3,1.15,5.0,3.6);

  box(s,5.6,1.15,4.1,1.7,LIGHT_BG,GIT_ORANGE);
  s.addText("Rule of thumb:",{x:5.75,y:1.22,w:3.8,h:0.38,fontSize:14,bold:true,color:GIT_DARK2,fontFace:"Calibri"});
  buls(s,[
    {text:"Auto-generated files → ignore"},
    {text:"Secrets & passwords → ignore"},
    {text:"Build artifacts → ignore"},
    {text:"Everything else → commit ✅"},
  ],5.75,1.62,3.8,1.1,13);

  box(s,5.6,3.0,4.1,1.75,"F0FFF0",GREEN);
  s.addText("Check if ignored:",{x:5.75,y:3.08,w:3.8,h:0.38,fontSize:14,bold:true,color:GREEN,fontFace:"Calibri"});
  cd(s,"git check-ignore -v filename\ngit status --ignored",5.65,3.5,4.0,1.15);
}

// ══ SLIDE 23: DEMO ════════════════════════════════════════════════════════════
{
  const s = hdr(prs, "DEMO – Your First Git Repository 🎉");
  cd(s,
    "# 1. Configure Git (first time only)\ngit config --global user.name \"Your Name\"\ngit config --global user.email \"you@email.com\"\n\n# 2. Create a project\nmkdir my-git-demo\ncd my-git-demo\ngit init\n\n# 3. Create a file and commit\necho \"# My Project\" > README.md\ngit add README.md\ngit commit -m \"Initial commit: add README\"\n\n# 4. Create a branch and make changes\ngit checkout -b feature/about\necho \"Author: Your Name\" >> README.md\ngit add .\ngit commit -m \"docs: add author to README\"\n\n# 5. Merge back and view history\ngit checkout main\ngit merge feature/about\ngit log --oneline",
    0.3,0.65,9.4,4.1);
}

// ══ SLIDE 24: Cheat Sheet ════════════════════════════════════════════════════
{
  const s = hdr(prs, "Essential Commands – Save This! 💾");
  cd(s,
    "# ── Setup ────────────────────────────────────────────\ngit config --global user.name \"Name\"\ngit config --global user.email \"email\"\n\n# ── Start ─────────────────────────────────────────────\ngit init                  # new repo\ngit clone <url>           # clone from GitHub\n\n# ── Daily ─────────────────────────────────────────────\ngit status                # what changed?\ngit add .                 # stage all\ngit commit -m \"message\"   # commit\ngit push                  # push to GitHub\ngit pull                  # pull from GitHub\n\n# ── Branches ──────────────────────────────────────────\ngit checkout -b <name>    # create + switch\ngit checkout <name>       # switch\ngit merge <branch>        # merge\ngit branch -d <name>      # delete\n\n# ── History & Undo ────────────────────────────────────\ngit log --oneline         # compact history\ngit diff                  # see changes\ngit restore <file>        # discard changes\ngit stash                 # save for later",
    0.3,0.65,9.4,4.1);
}

// ══ SLIDE 25: Best Practices ══════════════════════════════════════════════════
{
  const s = hdr(prs, "Git Best Practices 🏆");
  box(s,0.3,0.65,4.3,4.1,"F0FFF0",GREEN);
  s.addText("✅  DO",{x:0.3,y:0.72,w:4.3,h:0.38,fontSize:15,bold:true,color:GREEN,align:"center",fontFace:"Calibri"});
  buls(s,[
    {text:"Commit small, focused changes"},
    {text:"Write clear commit messages"},
    {text:"Pull before you push"},
    {text:"Use a branch for every feature/fix"},
    {text:"Review code via Pull Requests"},
    {text:"Keep main always deployable"},
    {text:"Add .gitignore from day one"},
  ],0.5,1.2,4.0,3.3,14,GREEN);

  box(s,5.1,0.65,4.3,4.1,"FFF0F0",RED);
  s.addText("❌  DON'T",{x:5.1,y:0.72,w:4.3,h:0.38,fontSize:15,bold:true,color:RED,align:"center",fontFace:"Calibri"});
  buls(s,[
    {text:"Commit secrets or passwords"},
    {text:"Commit directly to main"},
    {text:"Use vague messages: \"fix\", \"WIP\""},
    {text:"Force push to shared branches"},
    {text:"Commit node_modules or build files"},
    {text:"Let branches live for weeks"},
    {text:"Skip code review"},
  ],5.3,1.2,4.0,3.3,14,RED);
}

// ══ SLIDE 26: Key Takeaways ═══════════════════════════════════════════════════
{
  const s = hdr(prs, "Key Takeaways");
  buls(s,[
    {text:"🐙  Git tracks every change to your code with full history",size:17,bold:true},
    {text:"💾  Commits are save points – always write clear messages",size:17,bold:true},
    {text:"🌿  Branches let you work safely without breaking main",size:17,bold:true},
    {text:"🌐  GitHub is where you share and collaborate on code",size:17,bold:true},
    {text:"🤝  Pull Requests are how teams review and merge code",size:17,bold:true},
    {text:"🛡️  Nothing is lost – Git can always undo and restore",size:17,bold:true},
  ],0.5,0.72,9.0,3.5,17,GIT_DARK2);

  s.addShape("roundRect",{x:0.5,y:4.35,w:9.0,h:0.52,fill:{color:GIT_DARK2},line:{color:GIT_ORANGE},rectRadius:0.1});
  s.addText("Git is the single most important tool in a developer's toolkit.",{
    x:0.5,y:4.38,w:9.0,h:0.44,fontSize:14,bold:true,color:GIT_ORANGE,align:"center",fontFace:"Calibri",valign:"middle"
  });
}

// ══ SLIDE 27: What's Next ═════════════════════════════════════════════════════
{
  const s = hdr(prs, "What's Next? 🚀");
  buls(s,[
    {text:"✅  Git Fundamentals (Done!)",size:16,bullet:false,bold:true,color:GREEN},
    {text:"📝  Advanced Git – rebase, cherry-pick, stash",size:16,bullet:false},
    {text:"📝  GitHub Actions – CI/CD automation",size:16,bullet:false},
    {text:"📝  Git Workflows – Gitflow, trunk-based development",size:16,bullet:false},
    {text:"📝  Code Review best practices",size:16,bullet:false},
    {text:"📝  Docker Basics – containerise your apps",size:16,bullet:false},
    {text:"📝  Kubernetes – orchestrate at scale",size:16,bullet:false},
  ],0.6,0.72,8.8,3.6,16,"333333");

  s.addShape("roundRect",{x:0.5,y:4.35,w:9.0,h:0.52,fill:{color:LIGHT_BG},line:{color:GIT_ORANGE,width:2},rectRadius:0.1});
  s.addText("Start today:  git init  →  git add .  →  git commit -m \"My first commit!\"",{
    x:0.5,y:4.38,w:9.0,h:0.44,fontSize:13,bold:true,color:GIT_DARK2,align:"center",fontFace:"Courier New",valign:"middle"
  });
}

// ══ SLIDE 28: Thank You ════════════════════════════════════════════════════════
{
  const s = prs.addSlide();
  s.background = { color: GIT_DARK2 };
  topBar(s,prs,GIT_ORANGE);
  botBar(s,prs,GIT_ORANGE);
  s.addText("Thank You! 🙏",{x:0.5,y:0.75,w:9,h:1.0,fontSize:40,bold:true,color:WHITE,align:"center",fontFace:"Calibri"});
  s.addText("🐙",{x:4.1,y:1.85,w:1.8,h:1.4,fontSize:66,align:"center"});
  buls(s,[
    {text:"📁  Workshop material & exercises in /git-fundamentals/",size:14,bullet:false,color:WHITE},
    {text:"📖  Pro Git Book (free): git-scm.com/book",size:14,bullet:false,color:WHITE},
    {text:"🎮  Practice visually: learngitbranching.js.org",size:14,bullet:false,color:WHITE},
    {text:"💬  Ask questions anytime!",size:14,bullet:false,color:WHITE},
  ],1.0,3.35,8.0,1.3,14,WHITE);
  s.addText("Commit every day – practice makes perfect! 🎯",{x:0.5,y:4.6,w:9.0,h:0.3,fontSize:13,bold:true,color:GIT_ORANGE,align:"center",fontFace:"Calibri"});
}

// ─── WRITE ────────────────────────────────────────────────────────────────────
prs.writeFile({ fileName: "Git-Fundamentals-Workshop.pptx" })
  .then(() => console.log("✅  Git-Fundamentals-Workshop.pptx created! (28 slides)"))
  .catch(e  => console.error("❌ Error:", e));
