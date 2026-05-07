export const randomImages = [
  { src: "/Genai.png", caption: "Helped organize one of Toronto's largest AI hackathons!" },
  { src: "/Calculus.png", caption: "Calculus II introduced me to series, integrals, and suffering" },
  { src: "/Ada.png", caption: "Ada Lovelace is considered the world's first computer programmer" },
  { src: "/Grace.png", caption: "Grace Hopper popularized the term 'debugging' in computing" },
  { src: "/Hedy.png", caption: "Hedy Lamarr co-invented frequency-hopping technology" },
  { src: "/Annie.png", caption: "Annie Easley worked on rocket systems and energy technologies at NASA" },
  { src: "/Hackathon.png", caption: "My first hackathon was Hack the Valley 9" },
  {
    src: "/CMStrivia.png",
    caption: "Won the CMS Faculty-Student Trivia competition at UTSC",
    link: "https://www.instagram.com/p/DImAht5xzjO/?hl=en&img_index=10"
  },
  { src: "/Painting.png", caption: "Painting is one of my favorite ways to de-stress" },
  {
    src: "/SummerSchool.png",
    caption: "Volunteered with UTSC's Computer Science summer program",
    link: "https://www.instagram.com/reel/DN35y5sCeyv/?hl=en"
  },
  { src: "/A48-W26-Team.png", caption: "TA'd Comp Sci II during Winter 2026 (for the t-shirt)" },
];


export const journeyItems = [
  {
    year: "Jan '23",
    label: "Jan '23 - Aug '23",
    station: "Software Engineering & SEO Co-op", // role
    org: "DigiPix Inc.",
    description: [
      "First industry co-op I did in highschool at an established digital agency",
      "Improved website performance and search rankings",
      "Analyzed data to fix SEO and performance issues",
    ],
    link: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7077007488620924929/",
    linkLabel: "View on LinkedIn",
  },
  {
    year: "Oct '24",
    label: "Oct '24 - May '25",
    station: "Associate Developer",
    org: "Google Developer Groups (GDG)",
    description: [
      "Led the biggest AI hackathon at UofT (GenAI Genesis)",
      "Helped build and maintain web tools",
      "Fixed technical issues during events",
      "Supported workshops and developer sessions",
      ],
    link: null,
    linkLabel: null
  },
  {
    year: "Oct '24",
    label: "Oct '24 - May '25",
    station: "Web Developer",
    org: "UofT Scarborough - Lovejoy Lab",
    description: [
      "Built out the department website for the Biological & Physical Sciences Lovejoy Lab research group"
    ],
    link: null,
    linkLabel: null
  },
  {
    year: "Jan '26",
    label: "Jan '26 - Present",
    station: "UofT Scarborough",
    org: "Teaching Assistant x2",
    description: [
      "Explained CS concepts for CSCA48 (ADTs, data structures, object oriented programming, complexity, recursion)",
      "Helped students debug code during office hours and led tutorials",
      "Marked coursework for correctness and quality",
      "Answered questions and supported student learning"
    ],
    link: null,
    linkLabel: null
  },
  {
    year: "May '26",
    label: "Oct '24 - Present",
    station: "UofT Scarborough",
    org: "Computer Science Enrichment Club",
    description: [
      "Led planning and execution of technical and community events",
      "Drove outreach using analytics and digital content to increase engagement",
      "Coordinated with the executive team to define and deliver on club initiatives",
    ],
    roles: [
      {
        title: "President",
        period: "May '26 - Present",
        description: [
          "Led planning and execution of technical and community events",
          "Coordinated with exec team to define and deliver on club initiatives",
          "Drove outreach initiatives to increase engagement",
        ]
      },
      {
        title: "VP of Marketing",
        period: "Oct '25 - May '26",
        description: [
          "Improved outreach using analytics and digital content",
          "Worked with the executive team on club initiatives",
          "Helped plan and promote club events",
        ]
      },
      {
        title: "Tech Developer",
        period: "Oct '24 - Oct '25",
        description: [
          "Built and maintained websites and internal tools using JavaScript",
          "Added technical features to support club events",
          "Worked with team members to turn ideas into web solutions",
        ]
      },
    ],
    link: "https://csecuoft.ca/",
    linkLabel: "Checkout our website :)",
  },
];

export const projects = [
  {
    title: 'Marketplace Platform',
    tech: 'MongoDB • ExpressJS • GraphQL • Angular • NodeJS',
    desc: 'Full MEAN stack e-commerce web app that supports the full commerce lifecycle',
    year: '2026',
    link: 'https://github.com/PatidarAnjali/Marketplace-Platform',
    filter: 'Web App'
  },
  {
    title: 'Systems Programming Projects',
    tech: 'C • Linux • /proc • System Calls • IPC (fork, pipe) • Signals',
    desc: 'Three C systems projects progressing from terminal monitoring to concurrent multi-process architectures',    
    year: '2026',
    link: 'https://github.com/PatidarAnjali/Systems-Programming-Projects',
    filter: 'Other'
  },
  {
    title: 'Smart-Air',
    tech: 'Android • Java • Firebase',
    desc: 'Role-based Android app for asthma management using Firebase Auth and Firestore, with real-time logging, alerts, and PDF/CSV reports',
    year: '2025',
    link: 'https://github.com/kr1shap/smart-air',
    filter: 'Mobile App'
  },
  {
    title: 'EventFlow API',
    tech: 'Node.js • Express • PostgreSQL • Docker • Redis',
    desc: 'Event aggregation platform with automated web scraping using Puppeteer and Cheerio. Features REST API with caching, rate limiting, and scheduled scraping jobs via Bull queues',
    year: '2025',
    link: 'https://github.com/PatidarAnjali/Eventflow-API',
    filter: 'API'
  },
    {
    title: 'Movie Recommendation Model',
    tech: 'Python • FastAPI • scikit-learn • Pandas • NumPy',
    desc: 'AI-powered recommendation engine implementing collaborative filtering, matrix factorization (SVD), and content-based filtering. Feat.: RESTful API with multiple ML algorithms and real-time predictions',
    year: '2025',
    link: 'https://github.com/PatidarAnjali/Movie-Rec-System',
    filter: 'ML/AI'
  },
  {
    title: 'Job Application CRM',
    tech: 'React • Vite • Tailwind CSS • dnd-kit • Recharts',
    desc: 'React-based job application tracker with a drag-and-drop workflow & analytics dashboard to visualize application progress',
    year: '2025',
    link: 'https://github.com/PatidarAnjali/Job-App-CRM',
    filter: 'Web App'
  },
  {
    title: 'Nuvou',
    tech: 'MongoDB • ExpressJS • Angular • NodeJS',
    desc: 'Full-stack journaling app for artists. Features authentication, CRUD operations, and portfolio sharing',
    year: '2024',
    link: 'https://github.com/PatidarAnjali/nuvou-newapp-frontend',
    filter: 'Web App'
  },
  {
    title: 'Animal Paintings Gallery',
    tech: 'Angular • TypeScript',
    desc: 'Interactive art gallery with dynamic rendering and smooth transitions',
    year: '2023',
    link: 'https://github.com/PatidarAnjali/animal-paintings',
    filter: 'Web App'
  },
  {
    title: 'The Dino Game',
    tech: 'Java • Swing • AWT',
    desc: 'A 2D game with collision detection and smooth animations. My first real project that sparked my passion for coding',
    year: '2022',
    link: 'https://github.com/PatidarAnjali/Dino-Game',
    filter: 'Games'
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

