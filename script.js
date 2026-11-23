const progress = document.querySelector('.scroll-progress');
const mobileNav = document.querySelector('.mobile-nav');
const menuButton = document.querySelector('.menu-button');
const cursor = document.querySelector('.cursor');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const homeView = document.querySelector('main');
const detailView = document.querySelector('#project-view');
const heroSection = document.querySelector('.collage-hero');
const heroLines = document.querySelectorAll('.hero-line-name, .collage-title em');

heroLines.forEach((line) => {
  const text = line.textContent;
  line.setAttribute('aria-label', text);
  line.textContent = '';

  [...text].forEach((character, index) => {
    const letter = document.createElement('span');
    letter.className = 'type-char';
    letter.textContent = character === ' ' ? '\u00a0' : character;
    letter.style.setProperty('--char-index', index);
    line.appendChild(letter);
  });
});

const updateHeroHeader = () => {
  const isHome = !homeView.hidden;
  const inHero = isHome && heroSection.getBoundingClientRect().bottom > 100;
  document.body.classList.toggle('hero-in-view', inHero);
};

const projects = [
  {
    id: 'mossio',
    index: '01',
    name: 'MOSSIO',
    year: '2025',
    image: './assets/project-01.webp',
    alt: '林美言作品 MOSSIO，苔藓、岩石与神社',
    category: 'AI Art Direction / World Building',
    code: 'LMY—001',
    services: 'Art Direction<br />AI Image<br />Visual World',
    heading: '藏在苔藓里的世界。',
    description:
      'MOSSIO 以湿润苔藓、古石与隐约可见的鸟居为线索，构建一个安静而具有生命感的自然场域。作品将真实材质与生成式影像结合，在宏观与微观之间寻找观看的张力。',
  },
  {
    id: 'stillwater',
    index: '02',
    name: 'STILLWATER',
    year: '2025',
    image: './assets/project-02.webp',
    alt: '林美言作品 STILLWATER，雾山与湖泊',
    category: 'Visual Campaign / AI Image',
    code: 'LMY—002',
    services: 'Creative Direction<br />AI Image<br />Campaign',
    heading: '当静默成为风景。',
    description:
      'STILLWATER 从雾、山与水的静默关系中提取视觉语言。冷暖交错的自然光线让空间显得遥远而真实，作品探索生成式影像如何承载平静、记忆与距离感。',
  },
  {
    id: 'wild-signal',
    index: '03',
    name: 'WILD SIGNAL',
    year: '2024',
    image: './assets/project-03.webp',
    alt: '林美言作品 WILD SIGNAL，日落与森林',
    category: 'Concept Film / Motion Direction',
    code: 'LMY—003',
    services: 'Art Direction<br />Motion Study<br />Concept Film',
    heading: '来自荒野的信号。',
    description:
      'WILD SIGNAL 将落日、冷杉与雾气组织成一段具有节奏感的视觉叙事。画面以自然为信号源，在秩序与未知之间制造轻微的失控感。',
  },
  {
    id: 'afterglow',
    index: '04',
    name: 'AFTERGLOW',
    year: '2024',
    image: './assets/project-04.webp',
    alt: '林美言作品 AFTERGLOW，群山落日',
    category: 'AI Photography / Art Direction',
    code: 'LMY—004',
    services: 'AI Photography<br />Color Design<br />Art Direction',
    heading: '夜幕前的最后一束光。',
    description:
      'AFTERGLOW 以落日后最短暂的光线为核心，让层叠山峦逐渐退入黑暗。作品关注色温、层次与情绪之间的细微变化，把环境光转化为一种可视的时间。',
  },
  {
    id: 'terra',
    index: '05',
    name: 'TERRA',
    year: '2023',
    image: './assets/project-05.webp',
    alt: '林美言作品 TERRA，海岸、瀑布与岩石',
    category: 'Brand World / Generative Image',
    code: 'LMY—005',
    services: 'Brand World<br />Generative Image<br />Visual System',
    heading: '地平线之外的土地。',
    description:
      'TERRA 将海岸、瀑布、森林与岩石组合成一个超越现实尺度的品牌世界。作品通过连续的材质、色彩与地貌语言，建立具有延展性的生成式视觉系统。',
  },
];

const setText = (selector, value) => {
  const element = document.querySelector(selector);
  if (element) element.innerHTML = value;
};

const setDetailImage = (selector, source, alt, position = '') => {
  const image = document.querySelector(selector);
  if (!image) return;
  image.src = source;
  image.alt = alt;
  image.style.objectPosition = position;
};

const showProject = (project) => {
  const projectIndex = projects.findIndex((item) => item.id === project.id);
  const next = projects[(projectIndex + 1) % projects.length];

  homeView.hidden = true;
  detailView.hidden = false;
  document.body.classList.remove('hero-in-view');
  setDetailImage('#detail-image', project.image, project.alt);
  setDetailImage('#detail-image-a', project.image, project.alt, '18% center');
  setDetailImage('#detail-image-b', project.image, project.alt, '82% center');
  setText('#detail-index', project.index);
  setText('#detail-year', `(${project.year})`);
  setText('#detail-name', project.name);
  setText('#detail-category', project.category);
  setText('#detail-project-code', project.code);
  setText('#detail-meta-year', project.year);
  setText('#detail-services', project.services);
  setText('#detail-heading', project.heading);
  setText('#detail-description', project.description);
  setText('#next-project-name', next.name);
  document.querySelector('#next-project').href = `#project/${next.id}`;
  document.title = `${project.name} — 林美言®`;
  window.scrollTo({ top: 0, behavior: 'instant' });
};

const showHome = () => {
  detailView.hidden = true;
  homeView.hidden = false;
  document.title = '林美言® — AIGC Visual Designer';
  window.requestAnimationFrame(updateHeroHeader);
};

const renderRoute = () => {
  const match = window.location.hash.match(/^#project\/([^/]+)$/);
  const project = match ? projects.find((item) => item.id === match[1]) : null;

  if (project) {
    showProject(project);
    return;
  }

  showHome();
  window.requestAnimationFrame(() => {
    if (window.location.hash === '#work') {
      document.querySelector('#work')?.scrollIntoView({ behavior: 'instant' });
    } else if (window.location.hash === '#top' || window.location.hash === '#hero' || !window.location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  });
};

window.addEventListener('hashchange', renderRoute);
renderRoute();

const updateProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
};

window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

menuButton.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.textContent = isOpen ? 'Close' : 'Menu';
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

mobileNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = 'Menu';
    document.body.style.overflow = '';
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const spreads = [...document.querySelectorAll('.project-spread')];
let parallaxFrame = 0;

const updateParallax = () => {
  updateHeroHeader();
  spreads.forEach((spread) => {
    const rect = spread.getBoundingClientRect();
    const progress = (rect.top / window.innerHeight) * 22;
    spread.style.setProperty('--parallax', `${progress}px`);
  });
  parallaxFrame = 0;
};

window.addEventListener(
  'scroll',
  () => {
    if (!parallaxFrame) parallaxFrame = requestAnimationFrame(updateParallax);
  },
  { passive: true },
);
updateParallax();

if (finePointer && !reduceMotion) {
  let cursorX = window.innerWidth / 2;
  let cursorY = window.innerHeight / 2;
  let targetX = cursorX;
  let targetY = cursorY;

  const animateCursor = () => {
    cursorX += (targetX - cursorX) * 0.18;
    cursorY += (targetY - cursorY) * 0.18;
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    requestAnimationFrame(animateCursor);
  };

  window.addEventListener('mousemove', (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
  });

  document.querySelectorAll('[data-cursor]').forEach((element) => {
    element.addEventListener('mouseenter', () => cursor.classList.add('is-visible'));
    element.addEventListener('mouseleave', () => cursor.classList.remove('is-visible'));
  });

  animateCursor();
}

const CLICK_EMOJIS = ['✨', '💫', '🌟', '🎨', '🫧', '💥', '🌈', '🍀', '💖', '🎵'];
const CLICK_MESSAGES = ['欢迎光临', '今天也灵感满格', '祝你灵感大爆发', '好审美正在发生', '你的创意被看见了'];

if (!reduceMotion) {
  const burstLayer = document.createElement('div');
  burstLayer.className = 'click-burst-layer';
  burstLayer.setAttribute('aria-hidden', 'true');
  document.body.append(burstLayer);

  const interactiveSelector =
    'a, button, input, textarea, select, label, summary, video, img, [role="button"]';

  document.addEventListener('click', (event) => {
    if (event.target.closest(interactiveSelector)) return;

    const picked = [...CLICK_EMOJIS].sort(() => Math.random() - 0.5).slice(0, 4);
    const message = CLICK_MESSAGES[Math.floor(Math.random() * CLICK_MESSAGES.length)];

    picked.forEach((emoji) => {
      const burst = document.createElement('span');
      burst.className = 'emoji-burst';
      burst.textContent = emoji;
      burst.style.left = `${event.clientX}px`;
      burst.style.top = `${event.clientY}px`;
      burst.style.setProperty('--emoji-dx', `${(Math.random() - 0.5) * 140}px`);
      burst.style.setProperty('--emoji-dy', `${-40 - Math.random() * 110}px`);
      burst.style.setProperty('--emoji-rotate', `${(Math.random() - 0.5) * 90}deg`);
      burst.style.setProperty('--emoji-size', `${18 + Math.random() * 14}px`);
      burstLayer.append(burst);
      window.setTimeout(() => burst.remove(), 950);
    });

    const blessing = document.createElement('span');
    blessing.className = 'blessing-burst';
    blessing.style.left = `${event.clientX}px`;
    blessing.style.top = `${event.clientY}px`;
    blessing.style.setProperty('--blessing-dx', `${(Math.random() - 0.5) * 28}px`);
    blessing.style.setProperty('--blessing-dy', `${-78 - Math.random() * 44}px`);
    blessing.style.setProperty('--blessing-rotate', `${(Math.random() - 0.5) * 10}deg`);
    blessing.textContent = `${picked[0] ?? '✨'} ${message}`;
    burstLayer.append(blessing);
    window.setTimeout(() => blessing.remove(), 1550);

    while (burstLayer.children.length > 30) burstLayer.firstElementChild.remove();
  });
}

const manifesto = document.querySelector('.clone-manifesto');
const folderStage = document.querySelector('#folder-stage');

if (manifesto && folderStage) {
  const folderCards = Array.from(folderStage.querySelectorAll('.folder-card'));
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const clamp01 = (v) => Math.max(0, Math.min(1, v));
  let folderTarget = reduceMotion ? 1 : 0;
  let folderCurrent = folderTarget;
  let folderActive = false;

  const updateFolderTarget = () => {
    if (reduceMotion) { folderTarget = 1; return; }
    const rect = folderStage.getBoundingClientRect();
    const vh = window.innerHeight;
    folderTarget = clamp01((vh - rect.top) / (vh * 0.85));
  };

  const applyFolder = (p) => {
    const w = folderStage.clientWidth;
    const h = folderStage.clientHeight;
    folderStage.style.transform = `scale(${0.94 + 0.06 * p}) rotate(${(1 - p) * -6}deg)`;
    folderCards.forEach((card, i) => {
      const pi = easeOut(clamp01(p * 1.3 - i * 0.03));
      const bx = parseFloat(card.style.getPropertyValue('--fx')) / 100 * w + card.offsetWidth / 2;
      const by = parseFloat(card.style.getPropertyValue('--fy')) / 100 * h + card.offsetHeight / 2;
      const dx = (w / 2 - bx) * (1 - pi) * 0.92;
      const dy = (h / 2 - by) * (1 - pi) * 0.92;
      const rot = (1 - pi) * (i % 2 ? 36 : -36);
      const scale = 0.45 + 0.55 * pi;
      card.style.transform = `translate3d(${dx}px, ${dy}px, 0) rotate(${rot}deg) scale(${scale})`;
      card.style.opacity = pi < 0.02 ? 0 : Math.min(1, pi * 1.6);
    });
  };

  const folderTick = () => {
    folderCurrent += (folderTarget - folderCurrent) * 0.14;
    if (Math.abs(folderTarget - folderCurrent) < 0.001) folderCurrent = folderTarget;
    applyFolder(folderCurrent);
    if (folderActive) requestAnimationFrame(folderTick);
  };

  window.addEventListener('scroll', updateFolderTarget, { passive: true });
  window.addEventListener('resize', updateFolderTarget);

  const folderObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      folderActive = entry.isIntersecting;
      if (folderActive) {
        manifesto.classList.add('is-visible');
        updateFolderTarget();
        requestAnimationFrame(folderTick);
      }
    });
  }, { rootMargin: '15% 0px 15% 0px' });

  updateFolderTarget();
  applyFolder(folderTarget);
  folderObserver.observe(folderStage);
}

const wallSection = document.querySelector('.card-wall');
const wallCylinder = document.querySelector('#card-wall-cylinder');

if (wallSection && wallCylinder) {
  const wallImages = [
    'wall-01', 'wall-02', 'wall-03', 'wall-04', 'wall-05',
    'wall-06', 'wall-07', 'wall-08', 'wall-09', 'wall-10',
    'wall-11', 'wall-12', 'wall-13', 'wall-14', 'wall-15',
  ];
  const COLS = 20;
  const STEP = 360 / COLS;
  const wallCols = [];

  for (let i = 0; i < COLS; i++) {
    const col = document.createElement('div');
    col.className = 'wall-col';
    for (let j = 0; j < 3; j++) {
      const card = document.createElement('div');
      card.className = 'wall-card';
      const img = document.createElement('img');
      img.src = `./assets/${wallImages[(i * 3 + j) % wallImages.length]}.webp?v=2`;
      img.alt = '';
      img.loading = 'lazy';
      img.draggable = false;
      card.appendChild(img);
      col.appendChild(card);
    }
    wallCylinder.appendChild(col);
    wallCols.push(col);
  }

  let cardW = 242, cardH = 228, cardGap = 11.232, wallR = 808.5, fadeEnd = 295, fadeRange = 155;

  const layoutWall = () => {
    const s = Math.min(1, Math.max(0.5, wallSection.clientWidth / 1440));
    cardW = 242 * s; cardH = 228 * s; cardGap = 11.232 * s;
    wallR = 808.5 * s; fadeEnd = 295 * s; fadeRange = 155 * s;
    const colH = cardH * 3 + cardGap * 2;
    wallCols.forEach((col) => {
      col.style.width = `${cardW}px`;
      col.style.height = `${colH}px`;
      col.style.left = `${-cardW / 2}px`;
      col.style.top = `${-colH / 2}px`;
      Array.from(col.children).forEach((card, j) => {
        card.style.width = `${cardW}px`;
        card.style.height = `${cardH}px`;
        card.style.top = `${j * (cardH + cardGap)}px`;
      });
    });
  };

  let wallOffset = 0;
  let wallVelocity = 0;
  let wallDragging = false;
  let wallLastX = 0;
  let wallActive = false;
  const WALL_AUTO = reduceMotion ? 0 : 0.03;

  const renderWall = () => {
    for (let i = 0; i < COLS; i++) {
      let a = (i * STEP + wallOffset) % 360;
      if (a > 180) a -= 360;
      if (a < -180) a += 360;
      const rad = a * Math.PI / 180;
      const x = -wallR * Math.sin(rad);
      const z = wallR * (1 - Math.cos(rad));
      const opacity = Math.max(0, Math.min(1, (fadeEnd - z) / fadeRange));
      const col = wallCols[i];
      col.style.transform = `translate3d(${x}px, 0, ${z}px) rotateY(${a}deg)`;
      col.style.opacity = opacity;
      col.style.zIndex = Math.round(z);
      col.style.pointerEvents = opacity < 0.05 ? 'none' : 'auto';
    }
  };

  const wallTick = () => {
    if (!wallDragging) {
      wallOffset += WALL_AUTO + wallVelocity;
      wallVelocity *= 0.94;
      if (Math.abs(wallVelocity) < 0.0005) wallVelocity = 0;
    }
    renderWall();
    if (wallActive) requestAnimationFrame(wallTick);
  };

  wallSection.addEventListener('pointerdown', (event) => {
    wallDragging = true;
    wallLastX = event.clientX;
    wallVelocity = 0;
    wallSection.classList.add('is-dragging');
    wallSection.setPointerCapture(event.pointerId);
  });

  wallSection.addEventListener('pointermove', (event) => {
    if (!wallDragging) return;
    const dx = event.clientX - wallLastX;
    wallLastX = event.clientX;
    wallOffset += dx * 0.06;
    wallVelocity = dx * 0.06;
  });

  const endWallDrag = () => {
    wallDragging = false;
    wallSection.classList.remove('is-dragging');
  };
  wallSection.addEventListener('pointerup', endWallDrag);
  wallSection.addEventListener('pointercancel', endWallDrag);

  const wallObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      wallActive = entry.isIntersecting;
      if (wallActive) requestAnimationFrame(wallTick);
    });
  }, { rootMargin: '10% 0px 10% 0px' });

  layoutWall();
  renderWall();
  window.addEventListener('resize', () => { layoutWall(); renderWall(); });
  wallObserver.observe(wallSection);
}
