# Vipin Kumar — Portfolio Website

Live: https://devvipin01.github.io/Portfolio/

## Local Development

### Prerequisites
- Python 3

### Start the dev server

```bash
python server.py
```

Open http://localhost:3000 in your browser.

### Editing your portfolio

1. Run `python server.py`
2. Open http://localhost:3000 — you'll see an "Edit Mode" badge in the nav
3. Use the UI to add/edit/delete projects, activities, and profile info
4. Changes auto-save to `data.json` on your machine
5. Click **Export data.json** in the nav to download the file
6. Replace `data.json` in your repo, commit, and push

### File structure

```
├── index.html      # HTML skeleton
├── style.css       # All styles
├── app.js          # All JavaScript
├── data.json       # Portfolio data (auto-saved locally)
├── server.py       # Local dev server (Python)
├── assets/
│   ├── profile/
│   └── projects/
└── README.md
```

### Notes

- **Live site** (GitHub Pages): read-only. No edit UI is shown to visitors.
- **Local**: full edit mode is enabled automatically. No password needed.
- Media files (images/videos) should be placed in `assets/projects/` and referenced by path in the project form.
