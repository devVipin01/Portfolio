# Vipin Kumar — Portfolio Website

A fully editable, single-file portfolio with project management, activity tracking, and media support.

---

## 🚀 Hosting on GitHub Pages (Free)

### Step 1 — Create a GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Name it `portfolio` (or anything you like)
3. Set it to **Public**
4. Click **Create repository**

### Step 2 — Upload your files
```
portfolio/
├── index.html          ← your portfolio
├── README.md
└── assets/
    └── projects/
        ├── denso/
        │   ├── demo.mp4
        │   └── result.jpg
        ├── lenskart/
        │   └── screenshot.png
        └── ...
```

Upload `index.html` and your `assets/` folder to the repo.

### Step 3 — Enable GitHub Pages
1. Go to your repo → **Settings** → **Pages**
2. Under **Source**, select `main` branch, `/ (root)` folder
3. Click **Save**

Your site will be live at:
```
https://YOUR_USERNAME.github.io/portfolio/
```

---

## 🖼️ Showing Project Images/Videos from GitHub

When adding or editing a project, use the **GitHub Media Paths** field.

If your image is at `assets/projects/denso/result.jpg` in your repo, just enter:
```
assets/projects/denso/result.jpg
```

For multiple files (one per line):
```
assets/projects/denso/demo.mp4
assets/projects/denso/result.jpg
assets/projects/denso/ui.png
```

These paths work automatically when hosted on GitHub Pages. They also work for local development if you keep the folder structure the same.

---

## 💻 Running Locally

Just open `index.html` in any modern browser — no server needed.

For the best local experience (especially for video files):
```bash
# Option 1: Python
python -m http.server 8080
# Then open: http://localhost:8080

# Option 2: Node.js
npx serve .
```

---

## ✏️ Editing Your Portfolio

Everything is editable directly on the website:

| Section | How to Edit |
|---------|-------------|
| **Profile / Bio** | Click "Edit Profile" in the About section |
| **Contact links** | Click "Edit Contact Info" in the Contact section |
| **Profile photo** | Click the photo placeholder in About |
| **Projects** | Click "Add Project" or the ✎ icon on any card |
| **Activities** | Click "Add Activity" or ✎ on any activity |

All edits are saved to your browser's localStorage automatically.

---

## 📁 Recommended Asset Structure

```
assets/
└── projects/
    ├── denso-monitoring/
    │   ├── cover.jpg        ← shown as project thumbnail
    │   ├── demo.mp4
    │   └── results.png
    ├── ykk-fabric/
    │   └── anomaly-map.jpg
    └── lenskart/
        ├── ui.png
        └── test-results.jpg
```

---

## 🛠️ Tech Stack

- Pure HTML + CSS + Vanilla JS — zero dependencies, zero build step
- Fonts: Space Grotesk, Inter, JetBrains Mono (Google Fonts)
- Data persisted in `localStorage`
- Background: animated canvas orbs (no grid)
- Fully responsive

---

Built for Vipin Kumar · Lead Computer Vision Engineer
