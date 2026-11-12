export const profile = {
  name: "Ibrahim El Nemr",
  title: "Software Engineer",
  bio: "Hi, I’m Ibrahim. I’m a software engineer passionate about building full-stack applications, AI-powered tools, and mobile apps.",
  avatar: "https://github.com/ibrahimelnemr.png?size=512",
  github: "https://github.com/ibrahimelnemr",
  linkedin: "https://www.linkedin.com/in/ibrahimelnemr/",
  email: "ibrahimelnemr@aucegypt.edu",
  contact:
    "Have a project in mind or an interest in what I’m building? Let’s connect.",
};

export const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export const experience = [
  {
    company: "Deloitte",
    role: "Software Engineer",
    date: "Jan 2025 — Present",
    points: [
      "Contribute to an enterprise AI application platform, building frontend and backend features with React, Java, and Python.",
      "Work on LLM integration, tool execution, MCP, vector databases, and AI-enabled application development.",
      "Built a conversational analytics application for workforce utilization data and a React/Django knowledge-sharing platform.",
    ],
  },
  {
    company: "Flagak",
    role: "Software Engineer",
    date: "Jan — Dec 2024",
    points: [
      "Built Flutter mobile features and ecommerce management interfaces with React, TypeScript, and Material UI.",
      "Developed APIs with Node.js, TypeScript, and MongoDB; contributed to a backend migration to Spring Boot and PostgreSQL.",
    ],
  },
];

export const projects = [
  {
    name: "Beisa Translate",
    type: "iOS app",
    description:
      "Offline AI translation for text, voice, and camera input. Built a native Flutter bridge to llama.cpp for on-device Gemma inference and integrated Apple Intelligence.",
    stack: "Flutter · llama.cpp · On-device AI",
    href: "https://apps.apple.com/us/app/beisa-translate/id6775058145",
    linkLabel: "App Store",
  },
  {
    name: "Beisa Learn",
    type: "iOS app",
    description:
      "French and Spanish practice through AI conversations, interactive exercises, stories, and lessons. Uses local language models alongside Apple Intelligence.",
    stack: "Flutter · Local LLMs · Apple Intelligence",
    href: "https://apps.apple.com/us/app/beisa-learn/id6781236944",
    linkLabel: "App Store",
  },
  {
    name: "Arabize",
    type: "Web app",
    description:
      "An Arabic-to-Latin transliterator with optional diacritics. Runs entirely in the browser, with no backend required.",
    stack: "Next.js · React · TypeScript",
    href: "https://ibrahimelnemr.github.io/arabic-transliterator/transliterate/",
    linkLabel: "Open app",
  },
  {
    name: "PropertyFinder Database Query Tool",
    type: "Data & web",
    description:
      "A tool for collecting, cleaning, and querying real estate data, with a SQL database and a Flask interface for exploring aggregated results.",
    stack: "Python · Flask · MySQL · BeautifulSoup",
    href: "https://github.com/ibrahimelnemr/property-finder-db",
    linkLabel: "GitHub",
  },
  {
    name: "Flutter Ecommerce Demo",
    type: "Mobile app",
    description:
      "A full-stack ecommerce demo with a Flutter interface and a Node.js backend, including API testing and deployment to AWS Elastic Beanstalk.",
    stack: "Flutter · Node.js · TypeScript · MongoDB",
    href: "https://github.com/ibrahimelnemr/flutter-ecommerce-app-demo",
    linkLabel: "GitHub",
  },
];

export const skills = [
  {
    label: "Languages",
    items: ["Java", "TypeScript", "JavaScript", "Python", "SQL"],
  },
  {
    label: "Frontend & mobile",
    items: ["React", "Tailwind CSS", "Material UI", "Flutter"],
  },
  {
    label: "Backend & databases",
    items: ["Spring Boot", "Node.js", "Django", "PostgreSQL", "MongoDB"],
  },
  {
    label: "AI & cloud",
    items: [
      "LLM integration",
      "MCP",
      "llama.cpp",
      "Google Cloud",
      "AWS",
      "CircleCI",
    ],
  },
];

export const certifications = [
  {
    title: "Professional Cloud Architect",
    issuer: "Google Cloud",
    href: "https://www.credly.com/badges/1813384b-0649-4b4a-a565-515ac383b6ac/public_url",
  },
  {
    title: "Associate Cloud Engineer",
    issuer: "Google Cloud",
    href: "https://www.credly.com/badges/2a078e77-501d-49ed-a21d-f557045aae46",
  },
  {
    title: "Full-Stack JavaScript Developer Nanodegree",
    issuer: "Udacity",
    href: "https://www.udacity.com/certificate/e/f5e9b23e-094a-11ee-9036-0f71d7d20cd8",
  },
  {
    title: "iOS Developer Nanodegree",
    issuer: "Udacity",
    href: "https://www.udacity.com/certificate/e/3bf5fb20-6076-11ee-8e55-c77aaa96a8c4",
  },
];

export const education = [
  {
    institution: "The American University in Cairo",
    qualification: "BA in Economics · Minor in Computer Science",
    date: "2019 — 2024",
  },
  {
    institution: "Modern English School Cairo",
    qualification: "International Baccalaureate Diploma Programme",
    date: "2019",
  },
];
