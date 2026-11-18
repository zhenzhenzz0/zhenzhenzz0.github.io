const progress = document.querySelector('.scroll-progress');
const mobileNav = document.querySelector('.mobile-nav');
const menuButton = document.querySelector('.menu-button');
const cursor = document.querySelector('.cursor');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const homeView = document.querySelector('main');
const detailView = document.querySelector('#project-view');

const projects = [
  {
    id: 'mossio',
    index: '01',
    name: 'MOSSIO',
    year: '2025',
    image: './assets/project-01.png',
    alt: '林美言作品 MOSSIO，苔藓、岩石与神社',
    category: 'AI Art Direction / World Building',
    code: 'LMY—001',
    services: 'Art Direction<br />AI Image<br />Visual World',
    heading: 'A world hidden in moss.',
    description:
      'MOSSIO 以湿润苔藓、古石与隐约可见的鸟居为线索，构建一个安静而具有生命感的自然场域。作品将真实材质与生成式影像结合，在宏观与微观之间寻找观看的张力。',
  },
  {
    id: 'stillwater',
    index: '02',
    name: 'STILLWATER',
    year: '2025',
    image: './assets/project-02.jpg',
    alt: '林美言作品 STILLWATER，雾山与湖泊',
    category: 'Visual Campaign / AI Image',
    code: 'LMY—002',
    services: 'Creative Direction<br />AI Image<br />Campaign',
    heading: 'Where silence becomes landscape.',
    description:
      'STILLWATER 从雾、山与水的静默关系中提取视觉语言。冷暖交错的自然光线让空间显得遥远而真实，作品探索生成式影像如何承载平静、记忆与距离感。',
  },
  {
    id: 'wild-signal',
    index: '03',
    name: 'WILD SIGNAL',
    year: '2024',
    image: './assets/project-03.jpg',
    alt: '林美言作品 WILD SIGNAL，日落与森林',
    category: 'Concept Film / Motion Direction',
    code: 'LMY—003',
    services: 'Art Direction<br />Motion Study<br />Concept Film',
    heading: 'A signal from the wild.',
    description:
      'WILD SIGNAL 将落日、冷杉与雾气组织成一段具有节奏感的视觉叙事。画面以自然为信号源，在秩序与未知之间制造轻微的失控感。',
  },
  {
    id: 'afterglow',
    index: '04',
    name: 'AFTERGLOW',
    year: '2024',
    image: './assets/project-04.jpg',
    alt: '林美言作品 AFTERGLOW，群山落日',
    category: 'AI Photography / Art Direction',
    code: 'LMY—004',
    services: 'AI Photography<br />Color Design<br />Art Direction',
    heading: 'The last light before night.',
    description:
      'AFTERGLOW 以落日后最短暂的光线为核心，让层叠山峦逐渐退入黑暗。作品关注色温、层次与情绪之间的细微变化，把环境光转化为一种可视的时间。',
  },
  {
    id: 'terra',
    index: '05',
    name: 'TERRA',
    year: '2023',
    image: './assets/project-05.jpg',
    alt: '林美言作品 TERRA，海岸、瀑布与岩石',
    category: 'Brand World / Generative Image',
    code: 'LMY—005',
    services: 'Brand World<br />Generative Image<br />Visual System',
    heading: 'An earth beyond the horizon.',
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
    } else if (window.location.hash === '#top' || !window.location.hash) {
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
