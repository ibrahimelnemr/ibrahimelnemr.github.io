export const profile = {
  name: "Ibrahim El Nemr",
  bio: "Hi, I'm Ibrahim. I’m a software engineer passionate about building full-stack applications, AI-powered tools, and mobile apps.",
  contact:
    "Have a project in mind or an interest in what I’m building? Let’s connect.",
  email: "ibrahimelnemr@aucegypt.edu",
  github: "https://github.com/ibrahimelnemr",
  linkedin: "https://www.linkedin.com/in/ibrahimelnemr/",
  avatar: "https://github.com/ibrahimelnemr.png?size=768",
};

export const apps = [
  {
    id: "translate",
    number: "01",
    name: "Beisa Translate",
    category: "ON-DEVICE AI · iOS APP",
    headline: "A world of words.\nRight in your pocket.",
    description:
      "Text, voice, and camera translation, powered by AI that runs on your iPhone. Built for the moments when a connection isn’t an option.",
    tags: ["Flutter", "llama.cpp", "On-device AI"],
    url: "https://apps.apple.com/us/app/beisa-translate/id6775058145",
    website: "https://beisa.app/translate/",
    detail: "Private by design. Offline after setup.",
  },
  {
    id: "learn",
    number: "02",
    name: "Beisa Learn",
    category: "LANGUAGE LEARNING · iOS APP",
    headline: "A little practice.\nA whole new language.",
    description:
      "An AI language tutor for French and Spanish. Practice through conversations, interactive exercises, and stories, with on-device intelligence.",
    tags: ["Flutter", "Apple Intelligence", "Local LLMs"],
    url: "https://apps.apple.com/us/app/beisa-learn/id6781236944",
    website: "https://beisa.app/learn/",
    detail: "Your pace. Your conversations. Your device.",
  },
];

export const experience = [
  {
    company: "Deloitte",
    role: "Software Engineer",
    date: "Jan 2025 — Present",
    description:
      "Building enterprise AI applications and internal tools across React, Java, and Python. Working with LLM integration, tool execution, and conversational analytics.",
  },
  {
    company: "Flagak",
    role: "Software Engineer",
    date: "Jan — Dec 2024",
    description:
      "Developed mobile experiences, ecommerce interfaces, and backend APIs with Flutter, React, and Node.js. Contributed to a migration to Spring Boot and PostgreSQL.",
  },
];

export const capabilities = [
  {
    number: "01",
    title: "Across the stack",
    detail: "From the interface to the API.",
    technologies: [
      "React",
      "TypeScript",
      "Java",
      "Spring Boot",
      "Python",
      "SQL",
    ],
  },
  {
    number: "02",
    title: "AI, applied",
    detail: "Useful intelligence, thoughtfully integrated.",
    technologies: [
      "LLM integration",
      "MCP",
      "Vector databases",
      "On-device inference",
    ],
  },
  {
    number: "03",
    title: "Ideas to apps",
    detail: "Built, shipped, and in your pocket.",
    technologies: ["Flutter", "iOS", "llama.cpp", "Apple Intelligence"],
  },
];

// Display labels for familiar projects; GitHub still determines recency and membership.
export const projectDetails = {
  "switch-orbit": {
    title: "Switch Orbit",
    description:
      "A one-button arcade game. Switch orbits, dodge blockers, and chase your next high score.",
  },
  "neon-survival-game": {
    title: "Pulse Runner",
    description:
      "A neon-styled browser survival game. A small exploration of playful interfaces and game development.",
  },
  "getbeisa-website-translate": {
    title: "Beisa Translate · Website",
    description:
      "The product website for my private, on-device translation app.",
  },
  "getbeisa-website-learn": {
    title: "Beisa Learn · Website",
    description: "The product website for my AI-powered language learning app.",
  },
  "getbeisa-website": {
    title: "Beisa · Website",
    description: "A home for the Beisa family of on-device AI apps.",
  },
  "dih-answers": {
    title: "DIH Answers",
    description:
      "A full-stack application built with Django, React, and PostgreSQL.",
  },
};
