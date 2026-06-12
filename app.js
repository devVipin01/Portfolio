/* ─── CONSTANTS ────────────────────────────────────────────── */
const IS_LIVE = /github\.io/i.test(window.location.hostname);

/* ─── STATE ───────────────────────────────────────────────── */
let state = {
  profile: { firstName: 'Vipin', lastName: 'Kumar', role: '', desc: '', aboutHeadline: '', aboutP1: '', aboutP2Prefix: '', aboutFocusCompany: '', aboutP2Suffix: '', skills: [], exp: 3 },
  contact: { email: '', github: '', linkedin: '', kaggle: '' },
  projects: [],
  activities: [],
};
let _editProjectId = null;
let _editActivityId = null;

/* ─── HELPERS ─────────────────────────────────────────────── */
function escapeHtml(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

function toast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  t.classList.add('show');
  clearTimeout(t._toastTimer);
  t._toastTimer = setTimeout(() => t.classList.remove('show'), 2500);
}

/* ─── DATA PERSISTENCE ────────────────────────────────────── */
const _defaultState = {
  profile: {
    firstName: 'Vipin', lastName: 'Kumar',
    role: 'Lead CV Engineer \u00b7 AI Systems',
    desc: 'Lead CV Engineer building production-grade AI inspection systems. From real-time CCTV monitoring to X-ray defect detection \u2014 turning industrial challenges into intelligent solutions.',
    aboutHeadline: 'Lead Computer Vision & AI Engineer',
    aboutP1: 'I build end-to-end AI vision systems for industrial quality control \u2014 from architecture design to edge deployment. My systems run 24/7 on production floors at companies like Denso, Lenskart, and Indian Oil.',
    aboutP2Prefix: 'Currently leading CV engineering at ',
    aboutFocusCompany: 'Add Innovations',
    aboutP2Suffix: ', specializing in anomaly detection, defect segmentation, real-time OCR, and TensorRT-optimized inference pipelines on Nvidia Jetson hardware.',
    skills: ['Python','PyTorch','YOLOv8','TensorRT','OpenCV','FastAPI','PaddleOCR','Nvidia Jetson','FLIR / Baumer','SQL','TensorFlow','Keras'],
    exp: 3,
  },
  contact: {
    email: '748vipinkumar@gmail.com',
    github: 'https://github.com/devVipin01',
    linkedin: 'https://linkedin.com/in/devVipin01/',
    kaggle: 'https://kaggle.com/vipin20',
  },
  projects: [
    {id:1,title:'Real-Time AI Safety Monitoring \u2014 Denso',desc:'Deployed a live monitoring system processing 5 CCTV feeds simultaneously, detecting human presence and rule violations with 99.13% accuracy at 10 FPS. Integrated alarm triggering and rule-based violation logic.',category:'cv',status:'completed',tags:['YOLOv8','OpenCV','FastAPI','CCTV','Real-Time'],github:'',demo:'',githubPaths:[]},
    {id:2,title:'Fabric Anomaly Detection \u2014 YKK Tape Inspection',desc:'High-performance anomaly detection for fabric quality inspection achieving 99% accuracy. Outperformed PaDiM and PatchCore baselines in both accuracy and inference speed using model quantization.',category:'cv',status:'completed',tags:['Anomaly Detection','TensorRT','Model Quantization','PatchCore'],github:'',demo:'',githubPaths:[]},
    {id:3,title:'Automated Eyewear Inspection \u2014 Lenskart',desc:'Combined YOLOv8 + PaddleOCR for curved/irregular text recognition on eyewear frames. Included OpenCV symmetry checks for temples & rims and deep learning\u2013based dent detection.',category:'cv',status:'completed',tags:['YOLOv8','PaddleOCR','OpenCV','Deep Learning'],github:'',demo:'',githubPaths:[]},
    {id:4,title:'X-Ray Defect Pipeline \u2014 Munitions India Limited',desc:'Multi-defect segmentation and measurement on noisy X-ray imagery. Includes defect size measurement and OCR-based serial number extraction for military-grade inspection.',category:'cv',status:'completed',tags:['Segmentation','OCR','X-Ray','Defect Detection'],github:'',demo:'',githubPaths:[]},
    {id:5,title:'Tare Weight Detection \u2014 Indian Oil',desc:'Two-stage multi-model OCR pipeline for reading tare weight from cylinders, robust to rotation, dirt, and damaged paint. Achieved 98.2% accuracy in field conditions.',category:'cv',status:'completed',tags:['OCR','TensorRT','Multi-Model','Industrial'],github:'',demo:'',githubPaths:[]},
    {id:6,title:'Gear Inspection System \u2014 Sona Comstar',desc:'98.3% accuracy across 8 gear categories. Reduced inspection cycle to 10 seconds for 60 images using TensorRT acceleration. Collaborated with hardware and QA teams for real-time constraints.',category:'cv',status:'completed',tags:['TensorRT','Classification','Edge Deployment','Jetson'],github:'',demo:'',githubPaths:[]},
    {id:7,title:'AgroSmart \u2014 AI Crop Optimization App',desc:'AI-powered mobile app for farmers optimizing crop yields via soil analysis, disease detection, and fertilizer recommendations. Built end-to-end from model training to mobile integration.',category:'ml',status:'completed',tags:['Mobile AI','Disease Detection','Soil Analysis','Deep Learning'],github:'',demo:'',githubPaths:[]},
  ],
  activities: [
    {id:1,title:'Smart India Hackathon 2022',type:'hackathon',date:'2022-12',org:'Ministry of Electronics & IT (MeitY)',result:'1st Place \u2014 AI Ready Dataset',link:''},
    {id:2,title:'UNESCO India-Africa Hackathon',type:'hackathon',date:'2022-11',org:'UNESCO / Indian Government',result:'Runner-Up (International)',link:''},
    {id:3,title:'Ubiquant Market Prediction',type:'kaggle',date:'2022-06',org:'Kaggle',result:'Silver Medal \u2014 65th Rank Globally',link:''},
    {id:4,title:'Bengali.AI Speech Recognition',type:'kaggle',date:'2022-08',org:'Kaggle',result:'Bronze Medal',link:''},
    {id:5,title:'LLM \u2014 Detect AI Generated Text',type:'kaggle',date:'2023-06',org:'Kaggle',result:'Bronze Medal',link:''},
    {id:6,title:'Linking Writing Processes to Quality',type:'kaggle',date:'2023-09',org:'Kaggle',result:'Bronze Medal',link:''},
    {id:7,title:'Kaggle Expert \u2014 4\u00d7 with Top 400 Global Rank',type:'award',date:'2023-01',org:'Kaggle',result:'Expert \u00b7 Under 400th Globally',link:''},
    {id:8,title:'Geoprocessing GIS using Python',type:'cert',date:'2022-05',org:'Indian Institute of Remote Sensing',result:'Certified',link:''},
    {id:9,title:'Google Data Analytics Certificate',type:'cert',date:'2022-03',org:'Coursera / Google',result:'Certified',link:''},
    {id:10,title:'Idea Evaluator \u2014 Smart India Hackathon 2024',type:'award',date:'2024-09',org:'AICTE / MeitY',result:'Evaluated 100 ideas',link:''},
    {id:11,title:'Judge \u2014 Galgotias International Hackathon',type:'award',date:'2024-01',org:'Galgotias University',result:'Invited Judge',link:''},
    {id:12,title:'Idea Evaluator \u2014 STATATHON 2025',type:'award',date:'2025-02',org:'STATATHON',result:'Evaluated 200 ideas',link:''},
  ],
};

async function loadData() {
  // 1. Try local server API
  if (!IS_LIVE) {
    try {
      const res = await fetch('/api/load');
      if (res.ok) {
        const saved = await res.json();
        Object.assign(state, saved);
        return;
      }
    } catch (_) { /* fall through */ }
  }

  // 2. Try data.json (GitHub Pages or direct file)
  try {
    const res = await fetch('./data.json');
    if (res.ok) {
      const saved = await res.json();
      Object.assign(state, saved);
      return;
    }
  } catch (_) { /* fall through */ }

  // 3. Fallback to embedded defaults + localStorage backup
  Object.assign(state, _defaultState);
  try {
    const raw = localStorage.getItem('vk_portfolio');
    if (raw) Object.assign(state, JSON.parse(raw));
  } catch (_) { /* ignore */ }
}

let _saveTimer;
async function saveToServer() {
  if (IS_LIVE) return;
  clearTimeout(_saveTimer);
  _saveTimer = setTimeout(async () => {
    try {
      const res = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state),
      });
      if (!res.ok) throw new Error('Save failed');
    } catch (e) {
      // Fallback to localStorage
      try { localStorage.setItem('vk_portfolio', JSON.stringify(state)); } catch (_) { /* quota */ }
    }
  }, 300);
}

function downloadDataJson() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'data.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast('data.json downloaded \u2014 replace the file in your repo and push');
}

/* ─── RENDER PROFILE ──────────────────────────────────────── */
function renderProfile() {
  const p = state.profile;
  document.getElementById('heroFirstName').textContent = p.firstName;
  document.getElementById('heroLastName').textContent  = p.lastName;
  document.getElementById('heroDesc').textContent       = p.desc;
  document.getElementById('aboutHeadline').textContent  = p.aboutHeadline;
  document.getElementById('aboutPara1').textContent     = p.aboutP1;

  // Safe rendering for aboutPara2 with highlighted company name
  const p2 = document.getElementById('aboutPara2');
  p2.innerHTML = escapeHtml(p.aboutP2Prefix) + '<strong>' + escapeHtml(p.aboutFocusCompany) + '</strong>' + escapeHtml(p.aboutP2Suffix);

  document.getElementById('footerName').textContent = p.firstName + ' ' + p.lastName;
  document.getElementById('navName').innerHTML = p.firstName[0] + '<span>.</span>' + p.lastName;
  document.getElementById('statExp').textContent = p.exp;

  document.getElementById('skillsChips').innerHTML = p.skills.map(s => '<span class="chip">' + escapeHtml(s) + '</span>').join('');

  document.getElementById('statProjects').innerHTML = state.projects.length + '<span>+</span>';
  startTypewriter(p.role);
}

/* ─── RENDER CONTACT ──────────────────────────────────────── */
function renderContact() {
  const c = state.contact;
  document.getElementById('emailLink').href = 'mailto:' + c.email;
  document.getElementById('githubLink').href   = c.github   || '#';
  document.getElementById('linkedinLink').href = c.linkedin || '#';
  document.getElementById('kaggleLink').href   = c.kaggle   || '#';
}

/* ─── TYPEWRITER ──────────────────────────────────────────── */
let _twTimeout;
function startTypewriter(roleStr) {
  clearTimeout(_twTimeout);
  const roles = (roleStr || state.profile.role).split('\u00b7').map(s => s.trim()).filter(Boolean);
  let ri = 0, ci = 0, deleting = false;
  const el = document.getElementById('typeText');

  function tick() {
    const cur = roles[ri];
    if (!deleting) {
      ci++;
      el.textContent = cur.substring(0, ci);
      if (ci === cur.length) { deleting = true; _twTimeout = setTimeout(tick, 1800); return; }
    } else {
      ci--;
      el.textContent = cur.substring(0, ci);
      if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
    }
    _twTimeout = setTimeout(tick, deleting ? 45 : 75);
  }
  tick();
}

/* ─── RENDER PROJECTS ──────────────────────────────────────── */
function renderProjects(filter) {
  if (!filter) filter = 'all';
  const grid = document.getElementById('projectsGrid');
  const projects = filter === 'all' ? state.projects : state.projects.filter(p => p.category === filter);

  if (!projects.length) {
    grid.innerHTML = '<div class="empty-state">'
      + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6m-6 4h6"/></svg>'
      + '<p>No projects yet.</p></div>';
    return;
  }

  grid.innerHTML = projects.map(p => {
    const firstGhPath = (p.githubPaths && p.githubPaths.length) ? p.githubPaths[0] : null;
    const ext = firstGhPath ? firstGhPath.split('.').pop().toLowerCase() : '';
    const isVid = ['mp4','webm','ogg'].includes(ext);

    let mediaHTML;
    if (firstGhPath) {
      mediaHTML = isVid
        ? '<video src="' + firstGhPath + '" muted loop playsinline></video>'
        : '<img src="' + firstGhPath + '" alt="' + escapeHtml(p.title) + '" loading="lazy">';
    } else {
      mediaHTML = '<div class="project-media-placeholder">'
        + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>'
        + '<span>No media</span></div>';
    }

    const allMedia = (p.githubPaths || []).map((gh, i) => {
      const e = gh.split('.').pop().toLowerCase();
      return { src: gh, type: ['mp4','webm','ogg'].includes(e) ? 'video' : 'image', idx: i };
    });

    const stripHTML = allMedia.length > 1
      ? '<div class="media-strip">' + allMedia.map((m, si) =>
          '<div class="media-thumb" onclick="openLightbox(' + p.id + ',' + si + ')">'
          + (m.type === 'video'
              ? '<video src="' + m.src + '" muted playsinline></video>'
              : '<img src="' + m.src + '" alt="" loading="lazy">')
          + '</div>').join('')
        + '</div>'
      : '';

    const tagClass = { cv: 'cv', ml: 'ml', web: 'web', other: 'other' }[p.category] || '';
    const tagsHTML = (p.tags || []).map(t => '<span class="tag ' + tagClass + '">' + escapeHtml(t) + '</span>').join('');
    const statusColor = p.status === 'active' ? 'var(--success)' : p.status === 'archived' ? 'var(--muted)' : 'var(--cyan)';
    const statusLabel = { completed: 'Completed', active: 'In Progress', archived: 'Archived' }[p.status] || '';

    return '<div class="project-card" data-id="' + p.id + '">'
      + '<div class="project-media">' + mediaHTML + '</div>'
      + '<div style="display:flex;flex-direction:column;">'
        + '<div class="project-body">'
          + '<div class="project-tags">' + tagsHTML + '</div>'
          + '<div class="project-title">' + escapeHtml(p.title) + '</div>'
          + '<div class="project-desc">' + escapeHtml(p.desc) + '</div>'
          + '<div class="project-footer">'
            + '<div class="project-links">'
              + (p.github ? '<a class="project-link" href="' + p.github + '" target="_blank"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg> GitHub</a>' : '')
              + (p.demo ? '<a class="project-link" href="' + p.demo + '" target="_blank"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg> Live</a>' : '')
              + '<span style="font-size:.72rem;color:' + statusColor + ';font-family:var(--font-mono);">\u25cf ' + statusLabel + '</span>'
            + '</div>'
            + '<div class="project-actions edit-only">'
              + '<button class="icon-btn" onclick="openProjectModal(' + p.id + ')" title="Edit">'
                + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>'
              + '</button>'
              + '<button class="icon-btn del" onclick="deleteProject(' + p.id + ')" title="Delete">'
                + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18m-2 0l-1.5 14.5a1 1 0 01-1 .5H7.5a1 1 0 01-1-.5L5 6m5 0V4a1 1 0 011-1h2a1 1 0 011 1v2"/></svg>'
              + '</button>'
            + '</div>'
          + '</div>'
        + '</div>'
        + stripHTML
      + '</div>'
    + '</div>';
  }).join('');

  document.getElementById('statProjects').innerHTML = state.projects.length + '<span>+</span>';

  // Update filter tabs
  const cats = ['all', ...new Set(state.projects.map(p => p.category))];
  const catLabels = { all: 'All', cv: 'Computer Vision', ml: 'ML / AI', web: 'Web / App', other: 'Other' };
  document.getElementById('filterTabs').innerHTML = cats.map(c =>
    '<button class="filter-tab' + (c === filter ? ' active' : '') + '" data-filter="' + c + '" onclick="renderProjects(\'' + c + '\')">' + (catLabels[c] || c) + '</button>'
  ).join('');
}

/* ─── RENDER ACTIVITIES ───────────────────────────────────── */
function renderActivities() {
  const grid = document.getElementById('activitiesGrid');
  const icons = { hackathon: '\u26a1', kaggle: '\ud83d\udcca', cert: '\ud83c\udf93', award: '\ud83c\udfc6', other: '\u2726' };

  if (!state.activities.length) {
    grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1;">'
      + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
      + '<p>No activities yet.</p></div>';
    return;
  }

  grid.innerHTML = state.activities.map(a =>
    '<div class="activity-card">'
      + '<div class="activity-icon ' + a.type + '">' + (icons[a.type] || '\u2726') + '</div>'
      + '<div class="activity-meta">'
        + '<div class="activity-type">' + escapeHtml(a.type) + '</div>'
        + '<div class="activity-title">' + escapeHtml(a.title) + '</div>'
        + (a.org ? '<div class="activity-org">' + escapeHtml(a.org) + '</div>' : '')
        + (a.result ? '<div class="activity-result">' + escapeHtml(a.result) + '</div>' : '')
        + (a.date ? '<div class="activity-date">' + new Date(a.date + '-01').toLocaleDateString('en-IN',{year:'numeric',month:'short'}) + '</div>' : '')
        + (a.link ? '<a href="' + a.link + '" target="_blank" style="font-size:.75rem;color:var(--indigo-lt);margin-top:5px;display:inline-block;">\u2197 View</a>' : '')
      + '</div>'
      + '<div class="activity-actions edit-only">'
        + '<button class="icon-btn" onclick="openActivityModal(' + a.id + ')" title="Edit">'
          + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>'
        + '</button>'
        + '<button class="icon-btn del" onclick="deleteActivity(' + a.id + ')" title="Delete">'
          + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18m-2 0l-1.5 14.5a1 1 0 01-1 .5H7.5a1 1 0 01-1-.5L5 6m5 0V4a1 1 0 011-1h2a1 1 0 011 1v2"/></svg>'
        + '</button>'
      + '</div>'
    + '</div>'
  ).join('');
}

/* ─── LIGHTBOX ─────────────────────────────────────────────── */
function openLightbox(projectId, allIdx) {
  const p = state.projects.find(x => x.id === projectId);
  if (!p) return;

  const allMedia = (p.githubPaths || []).map(gh => {
    const ext = gh.split('.').pop().toLowerCase();
    return { src: gh, type: ['mp4','webm','ogg'].includes(ext) ? 'video' : 'image' };
  });

  const m = allMedia[allIdx];
  if (!m) return;

  const lb = document.getElementById('lightbox');
  document.getElementById('lightboxContent').innerHTML = m.type === 'video'
    ? '<video src="' + m.src + '" controls autoplay style="max-width:90vw;max-height:88vh;border-radius:12px;"></video>'
    : '<img src="' + m.src + '" alt="" style="max-width:90vw;max-height:88vh;border-radius:12px;">';
  lb.classList.add('open');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.getElementById('lightboxContent').innerHTML = '';
}

/* ─── MODAL HELPERS ────────────────────────────────────────── */
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

document.querySelectorAll('.modal-overlay').forEach(el => {
  el.addEventListener('click', function(e) { if (e.target === this) closeModal(this.id); });
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(el => closeModal(el.id));
    closeLightbox();
  }
});

/* ─── PROJECT CRUD ─────────────────────────────────────────── */
function openProjectModal(id) {
  if (id != null) {
    const p = state.projects.find(x => x.id === id);
    if (!p) return;
    _editProjectId = id;
    document.getElementById('projectModalTitle').textContent = 'Edit Project';
    document.getElementById('pTitle').value    = p.title;
    document.getElementById('pDesc').value     = p.desc;
    document.getElementById('pCategory').value = p.category;
    document.getElementById('pStatus').value   = p.status;
    document.getElementById('pGithub').value   = p.github   || '';
    document.getElementById('pDemo').value     = p.demo     || '';
    document.getElementById('pTags').value     = (p.tags || []).join(', ');
    document.getElementById('pGithubPaths').value = (p.githubPaths || []).join('\n');
  } else {
    _editProjectId = null;
    document.getElementById('projectModalTitle').textContent = 'New Project';
    ['pTitle','pDesc','pGithub','pDemo','pTags','pGithubPaths'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('pCategory').value = 'cv';
    document.getElementById('pStatus').value = 'completed';
  }
  openModal('projectModal');
}

function saveProject() {
  const title = document.getElementById('pTitle').value.trim();
  if (!title) { toast('Title is required.'); return; }

  const ghPaths = document.getElementById('pGithubPaths').value.split('\n').map(s => s.trim()).filter(Boolean);
  const proj = {
    id: _editProjectId != null ? _editProjectId : Date.now(),
    title: title,
    desc: document.getElementById('pDesc').value.trim(),
    category: document.getElementById('pCategory').value,
    status: document.getElementById('pStatus').value,
    github: document.getElementById('pGithub').value.trim(),
    demo: document.getElementById('pDemo').value.trim(),
    tags: document.getElementById('pTags').value.split(',').map(s => s.trim()).filter(Boolean),
    githubPaths: ghPaths,
  };

  if (_editProjectId != null) {
    const idx = state.projects.findIndex(p => p.id === _editProjectId);
    if (idx !== -1) state.projects[idx] = proj;
  } else {
    state.projects.unshift(proj);
  }

  closeModal('projectModal');
  renderProjects();
  saveToServer();
  toast('Project saved!');
}

function deleteProject(id) {
  if (!confirm('Delete this project?')) return;
  state.projects = state.projects.filter(p => p.id !== id);
  renderProjects();
  saveToServer();
  toast('Project deleted');
}

/* ─── ACTIVITY CRUD ────────────────────────────────────────── */
function openActivityModal(id) {
  if (id != null) {
    const a = state.activities.find(x => x.id === id);
    if (!a) return;
    _editActivityId = id;
    document.getElementById('activityModalTitle').textContent = 'Edit Activity';
    document.getElementById('aTitle').value  = a.title;
    document.getElementById('aType').value   = a.type;
    document.getElementById('aDate').value   = a.date || '';
    document.getElementById('aOrg').value    = a.org  || '';
    document.getElementById('aResult').value = a.result || '';
    document.getElementById('aLink').value   = a.link  || '';
  } else {
    _editActivityId = null;
    document.getElementById('activityModalTitle').textContent = 'Add Activity';
    ['aTitle','aDate','aOrg','aResult','aLink'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('aType').value = 'hackathon';
  }
  openModal('activityModal');
}

function saveActivity() {
  const title = document.getElementById('aTitle').value.trim();
  if (!title) { toast('Title is required.'); return; }

  const act = {
    id: _editActivityId != null ? _editActivityId : Date.now(),
    title: title,
    type: document.getElementById('aType').value,
    date: document.getElementById('aDate').value,
    org: document.getElementById('aOrg').value.trim(),
    result: document.getElementById('aResult').value.trim(),
    link: document.getElementById('aLink').value.trim(),
  };

  if (_editActivityId != null) {
    const idx = state.activities.findIndex(a => a.id === _editActivityId);
    if (idx !== -1) state.activities[idx] = act;
  } else {
    state.activities.unshift(act);
  }

  closeModal('activityModal');
  renderActivities();
  saveToServer();
  toast('Activity saved!');
}

function deleteActivity(id) {
  if (!confirm('Delete this activity?')) return;
  state.activities = state.activities.filter(a => a.id !== id);
  renderActivities();
  saveToServer();
  toast('Activity deleted');
}

/* ─── ABOUT MODAL ──────────────────────────────────────────── */
function openAboutModal() {
  const p = state.profile;
  document.getElementById('editFirstName').value       = p.firstName;
  document.getElementById('editLastName').value        = p.lastName;
  document.getElementById('editRole').value            = p.role;
  document.getElementById('editDesc').value            = p.desc;
  document.getElementById('editAboutHeadline').value   = p.aboutHeadline;
  document.getElementById('editAboutP1').value         = p.aboutP1;
  document.getElementById('editAboutP2Prefix').value   = p.aboutP2Prefix;
  document.getElementById('editAboutFocusCompany').value = p.aboutFocusCompany;
  document.getElementById('editAboutP2Suffix').value   = p.aboutP2Suffix;
  document.getElementById('editSkills').value          = p.skills.join(', ');
  document.getElementById('editExp').value             = p.exp;
  openModal('aboutModal');
}

function saveAbout() {
  Object.assign(state.profile, {
    firstName: document.getElementById('editFirstName').value.trim() || 'Vipin',
    lastName: document.getElementById('editLastName').value.trim(),
    role: document.getElementById('editRole').value.trim(),
    desc: document.getElementById('editDesc').value.trim(),
    aboutHeadline: document.getElementById('editAboutHeadline').value.trim(),
    aboutP1: document.getElementById('editAboutP1').value.trim(),
    aboutP2Prefix: document.getElementById('editAboutP2Prefix').value.trim(),
    aboutFocusCompany: document.getElementById('editAboutFocusCompany').value.trim(),
    aboutP2Suffix: document.getElementById('editAboutP2Suffix').value.trim(),
    skills: document.getElementById('editSkills').value.split(',').map(s => s.trim()).filter(Boolean),
    exp: parseInt(document.getElementById('editExp').value) || 3,
  });
  closeModal('aboutModal');
  renderProfile();
  saveToServer();
  toast('Profile updated!');
}

/* ─── CONTACT MODAL ────────────────────────────────────────── */
function openContactModal() {
  const c = state.contact;
  document.getElementById('cEmail').value    = c.email;
  document.getElementById('cGithub').value   = c.github;
  document.getElementById('cLinkedin').value = c.linkedin;
  document.getElementById('cKaggle').value   = c.kaggle || '';
  openModal('contactModal');
}

function saveContact() {
  state.contact.email    = document.getElementById('cEmail').value.trim();
  state.contact.github   = document.getElementById('cGithub').value.trim() || '#';
  state.contact.linkedin = document.getElementById('cLinkedin').value.trim() || '#';
  state.contact.kaggle   = document.getElementById('cKaggle').value.trim() || '#';
  closeModal('contactModal');
  renderContact();
  saveToServer();
  toast('Contact updated!');
}

/* ─── SCROLL SPY ───────────────────────────────────────────── */
var _sections = ['hero','about','projects','activities','contact'];
window.addEventListener('scroll', function() {
  var cur = 'hero';
  _sections.forEach(function(id) {
    var el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 120) cur = id;
  });
  document.querySelectorAll('.nav-links a').forEach(function(a) {
    a.classList.toggle('active', a.dataset.section === cur);
  });
}, { passive: true });

/* ─── AMBIENT CANVAS BACKGROUND ────────────────────────────── */
(function() {
  var canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W, H, orbs = [], animId;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function initOrbs() {
    orbs = [];
    var N = Math.floor((W * H) / 180000) + 4;
    for (var i = 0; i < N; i++) {
      orbs.push({
        x: Math.random() * W, y: Math.random() * H,
        r: 120 + Math.random() * 220,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.15,
        hue: Math.random() < 0.5 ? 240 : 175,
        alpha: 0.03 + Math.random() * 0.045,
      });
    }
  }

  function drawOrbs() {
    ctx.clearRect(0, 0, W, H);
    orbs.forEach(function(o) {
      var g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
      g.addColorStop(0, 'hsla(' + o.hue + ',80%,60%,' + o.alpha + ')');
      g.addColorStop(1, 'hsla(' + o.hue + ',80%,60%,0)');
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
      o.x += o.vx; o.y += o.vy;
      if (o.x < -o.r) o.x = W + o.r;
      if (o.x > W + o.r) o.x = -o.r;
      if (o.y < -o.r) o.y = H + o.r;
      if (o.y > H + o.r) o.y = -o.r;
    });
    animId = requestAnimationFrame(drawOrbs);
  }

  // Pause when tab hidden
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      cancelAnimationFrame(animId);
    } else {
      drawOrbs();
    }
  });

  // Respect reduced motion
  var motionOk = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (motionOk) {
    window.addEventListener('resize', function() { resize(); initOrbs(); });
    resize(); initOrbs(); drawOrbs();
  } else {
    // Just fill a static gradient
    resize();
    var g = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, Math.max(W,H)*0.7);
    g.addColorStop(0, 'hsla(240,80%,60%,0.04)');
    g.addColorStop(1, 'hsla(175,80%,60%,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }
})();

/* ─── EDIT MODE GATE ───────────────────────────────────────── */
if (!IS_LIVE) {
  document.body.classList.add('edit-mode');
}

/* ─── INIT ─────────────────────────────────────────────────── */
loadData().then(function() {
  renderProfile();
  renderContact();
  renderProjects();
  renderActivities();
});
