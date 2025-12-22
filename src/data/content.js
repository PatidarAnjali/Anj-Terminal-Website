export const randomImages = [
  { src: "/Genai.png", caption: "Part of the team that ran this massive AI Hackathon - unforgettable experience!" },
  { src: "/Calculus.png", caption: "The time when Calculus II humbled me" },
  { src: "/Ada.png", caption: "Did you know? Ada Lovelace wrote the first algorithm" },
  { src: "/Grace.png", caption: "Grace Hopper popularized the term 'debugging'" },
  { src: "/Hedy.png", caption: "Hedy Lamarr co-invented frequency hopping for secure commss" },
  { src: "/Annie.png", caption: "Annie Easley: Rocket scientist & coding pioneer" },
  { src: "/Hackathon.png", caption: "My first ever hackathon was HTV 9" },
  {
    src: "/CMStrivia.png",
    caption: "Winning the CMS-Faculty Student Trivia at UTSC",
    link: "https://www.instagram.com/p/DImAht5xzjO/?hl=en&img_index=10"
  },
  { src: "/Painting.png", caption: "I love painting to de-stress" },
  {
    src: "/SummerSchool.png",
    caption: "Volunteering for the Computer Science summer school at UTSC",
    link: "https://www.instagram.com/reel/DN35y5sCeyv/?hl=en"
  },
];


export const journeyItems = [
    {
    title: 'UofT Scarborough',
    positions: [
      { year: "2026 - Present", role: 'CSCA48 Teaching Assistant' },
    ]
  },
  {
    title: 'Computer Science Enrichment Club (CSEC)',
    positions: [
      { year: "2025 - Present", role: 'VP of Marketing' },
      { year: "2024 - '25", role: 'Technology Director' }
    ]
  },
  {
    title: 'Google Developer Groups (GDG)',
    positions: [
      { year: "2024 - '25", role: 'Technology Director' }
    ]
  },
  {
    title: 'UofT Scarborough (Department of Biological & Physical Sciences)',
    positions: [
      { year: "2024 - '25", role: 'Web Developer for Lovejoy Lab' }
    ]
  },
];

export const projects = [
  {
    title: 'Smart-Air',
    tech: 'Android • Java • Firebase',
    desc: 'Role-based Android app for asthma management using Firebase Auth and Firestore, with real-time logging, alerts, and PDF/CSV reports.',
    year: '2025',
    link: 'https://github.com/kr1shap/smart-air'
  }, {
    title: 'Nuvou',
    tech: 'MEAN Stack • MongoDB',
    desc: 'Full-stack journaling app for artists. Features authentication, CRUD operations, and portfolio sharing.',
    year: '2024',
    link: 'https://github.com/PatidarAnjali/nuvou-newapp-frontend'
  },
  {
    title: 'Animal Paintings Gallery',
    tech: 'Angular • TypeScript',
    desc: 'Interactive art gallery with dynamic rendering and smooth transitions.',
    year: '2023',
    link: 'https://github.com/PatidarAnjali/animal-paintings'
  },
  {
    title: 'The Dino Game',
    tech: 'Java • Swing • AWT',
    desc: 'A 2D game with collision detection and smooth animations. My first real project that sparked my passion for coding.',
    year: '2022',
    link: 'https://github.com/PatidarAnjali/Dino-Game'
  },
];


export const skills = {
  'Languages': ['Java', 'TypeScript', 'JavaScript', 'Python', 'C', 'C++'],
  'Frontend': ['React', 'Angular', 'HTML/CSS', 'Bootstrap'],
  'Backend': ['Node.js', 'MongoDB', 'REST APIs', 'Git']
};


// helper fcn to generate devicon URLs
const getDevIcon = (name) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-original.svg`;
const getDevIconPlain = (name) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-plain.svg`;


// skill name to devicon name mapping (only for ones that differ)
const iconMapping = {
  'Python': 'python',
  'Java': 'java',
  'JavaScript': 'javascript',
  'TypeScript': 'typescript',
  'C': 'c',
  'C++': 'cplusplus',
  'HTML/CSS': 'html5',
  'React': 'react',
  'Angular': 'angularjs',
  'Bootstrap': 'bootstrap',
  'Node.js': 'nodejs',
  'MongoDB': 'mongodb',
  'REST APIs': null, // No icon
  'Git': 'git',
  'Express': 'express',
  'Django': { name: 'django', type: 'plain' },
  'Next.js': 'nextjs',
  'Tailwind CSS': 'tailwindcss',
  'Docker': 'docker',
  'PostgreSQL': 'postgresql',
  'Firebase': { name: 'firebase', type: 'plain' },
  'VS Code': 'vscode',
  'SQL': 'postgresql',
};


// generate skillLogos object dynamically
export const skillLogos = Object.fromEntries(
  Object.entries(iconMapping)
    .filter(([, value]) => value !== null)
    .map(([skill, icon]) => {
      if (typeof icon === 'object') {
        return [skill, getDevIconPlain(icon.name)];
      }
      return [skill, getDevIcon(icon)];
    })
);

