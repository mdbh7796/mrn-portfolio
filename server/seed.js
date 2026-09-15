require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');
const Skill = require('./models/Skill');
const About = require('./models/About');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mrn_portfolio';

const projects = [
  {
    slug: 'winget-store',
    title: 'WinGet Store',
    summary: 'Modern WinUI 3 desktop GUI for the Windows Package Manager — discover, install, update, and manage packages without the terminal.',
    problem: 'WinGet is command-line only, which keeps everyday Windows users from discovering and managing packages easily.',
    solution: 'Built a WinUI 3 desktop app on .NET 8 that wraps winget.exe — package discovery, install/update flows, installed-package management, operation history, and theme settings, with MSIX packaging and automated tests.',
    outcome: 'Full package lifecycle (discover, install, update, history) in a native GUI, with tests covering parsing, execution, and persistence.',
    techStack: ['C#', 'WinUI 3', '.NET 8', 'Windows App SDK'],
    liveUrl: '',
    repoUrl: 'https://github.com/mdbh7796/WinGet-Store',
    imageUrl: '',
    featured: true,
    order: 1
  },
  {
    slug: 'modern-pos-system',
    title: 'Modern POS System',
    summary: 'Dark-themed desktop point-of-sale app with real-time inventory, loyalty tracking, multi-currency, and sales analytics.',
    problem: 'Small shops need an affordable, all-in-one way to ring up sales, track stock, and understand revenue without SaaS fees.',
    solution: 'Built a PyQt6 desktop POS with role-based auth (admin/cashier), product catalog with live cart totals, stock tracking with out-of-stock flags, loyalty points, USD/EUR/MAD currency switching, and Matplotlib sales reports.',
    outcome: 'Complete retail workflow — sales, inventory, loyalty, and analytics — in one offline desktop app.',
    techStack: ['Python', 'PyQt6', 'Matplotlib'],
    liveUrl: '',
    repoUrl: 'https://github.com/mdbh7796/Modern-POS-system',
    imageUrl: '',
    featured: true,
    order: 2
  },
  {
    slug: 'tineghir-city',
    title: 'Tineghir City',
    summary: 'Static tourism site promoting Tineghir, Morocco — Todra Gorge, palm groves, and Berber heritage.',
    problem: 'Travelers lack a single welcoming gateway to discover Tineghir’s natural and cultural attractions when planning a trip.',
    solution: 'Designed and built a responsive static site with Tailwind CSS covering attractions, heritage, and travel planning — deployable to any static host with no backend.',
    outcome: 'Mobile-friendly travel guide for the region with zero hosting cost and nothing to maintain server-side.',
    techStack: ['HTML', 'Tailwind CSS', 'JavaScript'],
    liveUrl: '',
    repoUrl: 'https://github.com/mdbh7796/Tineghir-City',
    imageUrl: '',
    featured: false,
    order: 3
  },
  {
    slug: 'marforum-website',
    title: 'MarForum',
    summary: 'Community forum web app built with Python and Django.',
    problem: 'Online communities need a self-hosted discussion space with full control over their data and features.',
    solution: 'Built a Django forum app with templated views, environment-based config, and deployment files ready for hosts like Heroku.',
    outcome: 'Deployable forum foundation with Django’s auth-ready structure and documented setup.',
    techStack: ['Python', 'Django', 'HTML'],
    liveUrl: '',
    repoUrl: 'https://github.com/mdbh7796/marforum-website',
    imageUrl: '',
    featured: false,
    order: 4
  }
];

const skills = [
  { name: 'Python', category: 'Backend', level: 'Proficient' },
  { name: 'C#', category: 'Desktop', level: 'Proficient' },
  { name: 'Django', category: 'Backend', level: 'Proficient' },
  { name: 'PyQt6', category: 'Desktop', level: 'Proficient' },
  { name: '.NET 8', category: 'Desktop', level: 'Familiar' },
  { name: 'JavaScript', category: 'Frontend', level: 'Familiar' },
  { name: 'Tailwind CSS', category: 'Frontend', level: 'Familiar' },
  { name: 'HTML/CSS', category: 'Frontend', level: 'Proficient' }
];

const about = {
  name: 'Mohamed Bougarch',
  headline: 'Full Stack Web Developer',
  bio: 'Full Stack web developer based in Tinghir, Morocco, working at the intersection of logic and design. Trained at the Web4Jobs / Tinghir Coding Center, I build desktop and web apps with Python, Django, C#, and JavaScript — from a WinUI package manager GUI to Django community forums.',
  location: 'Tinghir, Drâa-Tafilalet, Morocco',
  links: { github: 'https://github.com/mdbh7796', linkedin: 'https://www.linkedin.com/in/mdbh7/', resume: '' },
  skillsHighlight: ['Python', 'C#', 'Django'],
  certifications: [
    { name: 'Responsive Web Design', issuer: 'Web4Jobs' },
    { name: 'Front End Development Libraries', issuer: 'Web4Jobs' },
    { name: 'Passeport Numérique', issuer: 'Web4Jobs' },
    { name: 'Tronc Commun', issuer: 'Web4Jobs' }
  ]
};

async function main() {
  await mongoose.connect(MONGO_URI);
  await Project.deleteMany({});
  await Skill.deleteMany({});
  await About.deleteMany({});
  await Project.insertMany(projects);
  await Skill.insertMany(skills);
  await About.create(about);
  console.log('Seeded: projects=%d skills=%d about=1', projects.length, skills.length);
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
