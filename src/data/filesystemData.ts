import type { FSDirectory, FSFile, FSNode } from '../types/fs';

export const filesystem: FSDirectory = {
  name: 'root',
  type: 'directory',
  path: '/',
  children: [
    {
      name: 'about.md',
      type: 'file',
      extension: 'md',
      path: '/about.md',
      content: `# About Me

## Introduction
Hello! I'm **Rakshana**, a passionate Software Engineer and Architect who loves building elegant, high-performance web applications. I design solutions that bridge the gap between complex backend architectures and pixel-perfect, interactive user interfaces.

Inspired by clean code, developer workflows, and the simplicity of Unix design systems, I built this portfolio to showcase my journey and technical philosophy.

---

## Career Objective
To leverage my engineering skills in a dynamic, forward-thinking organization to design and scale next-generation applications, optimize user experiences, and solve complex system-level problems.

---

## Education
* **B.Tech in Computer Science and Business Systems (CSBS)** — Bannari Amman Institute of Technology (2024 - 2028)
  * *Focus:* Backend Engineering, AI & Agentic Systems, Cloud & DevOps, Problem Solving.


---

## Interests & Passions
- **System Design & Performance:** I enjoy profiling DB queries, tuning build processes, and caching workflows.
- **Developer Tools:** Writing scripts, customizing build tools, and building command-line utilities.
- **Open Source:** Contributing to developer libraries, UI frameworks, and local developer productivity utilities.
- **Aesthetics & UI:** Studying typography, motion design, and user behavior to build software that is both powerful and beautiful.
`
    },
    {
      name: 'skills.yaml',
      type: 'file',
      extension: 'yaml',
      path: '/skills.yaml',
      content: `languages:
  - Python
  - Java
  - C

backend:
  - Node.js (Express, Fastify)
  - Python (FastAPI, Django)
  - Java (Spring Boot)
  - GraphQL & REST APIs

frontend:
  - React JS
  - Tailwind CSS

agentic_ai:
  - LangChain
  - LangGraph
  - CrewAI
  - RAG (Retrieval-Augmented Generation)
  - AI Agents & Multi-Agent Systems
  - Prompt Engineering
  - Vector Databases

database_cloud:
  - PostgreSQL & MySQL
  - MongoDB & Redis
  - Vercel & Netlify

tooling_workflows:
  - Git & GitHub Actions
  - n8n Automation
  - VS Code
  - Postman
  - Docker
`
    },
    {
      name: 'projects',
      type: 'directory',
      path: '/projects',
      children: [
        {
          name: 'forestmind.md',
          type: 'file',
          extension: 'md',
          path: '/projects/forestmind.md',
          content: `# ForestMind 🌲

> AI-Powered Distributed Forest Monitoring & Protection System

---

### Project Overview
ForestMind is an intelligent forest surveillance platform that combines Edge AI, Computer Vision, Audio Intelligence, and Offline Mesh Networking to detect threats such as human intrusion, illegal logging, gunshots, forest fires, vehicles, and endangered species activity in real time. Built for remote forest environments with no internet connectivity, the system deploys Jetson Nano-powered monitoring nodes equipped with cameras, microphones, and wireless communication modules. Detected events are processed locally using YOLOv8-based vision models and CNN-based audio classification models, then transmitted through a self-healing mesh network using Dijkstra’s shortest-path routing algorithm to reach the nearest forest office. Forest officers receive live alerts, captured images, and location data through a centralized dashboard, enabling rapid response and proactive conservation efforts.

---

### Tech Stack
- **Frontend:** React, Vite, React Router, Context API
- **Backend:** Node.js, Express.js, REST APIs
- **Database:** MongoDB Atlas, Mongoose
- **AI/ML:** YOLOv8, OpenCV, CNN Audio Classification, Edge AI
- **Hardware:** Jetson Nano, USB Camera, Microphone, Wireless Antenna Modules
- **Networking:** Mesh Communication Network, Dijkstra Routing
- **Deployment:** Local Edge Nodes + Central Monitoring Dashboard

---

### Key Features
1. **Real-Time Human & Vehicle Detection:** Employs YOLOv8 computer vision at local edge nodes to log visual threats in real time.
2. **Chainsaw, Gunshot & Distress Sound Recognition:** Identifies chainsaw noises, gunshots, and distress sounds using CNN-based audio classification models.
3. **Offline Mesh-Based Alert Transmission:** Transmits alerts through a self-healing mesh network using Dijkstra’s shortest-path routing algorithm to reach the nearest forest office.
4. **Geo-Fencing & Restricted Zone Monitoring:** Configures virtual boundaries and warns rangers when intruders breach lines.
5. **Endangered Species Identification & Tracking:** Recognizes and tracks native endangered fauna to log population trends and migration activity.
6. **Live Forest Office Alert Dashboard:** Displays active maps, live alerts, captured threat images, and location data for forest officers.
7. **Environmental Insights & Forest Well-Being Recommendations:** Generates forest health insights and actionable recommendations from analytical models.

---

### GitHub Link
[View Repository on GitHub](https://github.com/Rakshana24/ForestMind)
`
        },
        {
          name: 'apiforge.md',
          type: 'file',
          extension: 'md',
          path: '/projects/apiforge.md',
          content: `# APIForge ⚙️

> AI-Powered Autonomous Backend Generation & Self-Healing API Development Platform

---

### Project Overview
APIForge is an intelligent backend generation platform that transforms natural language software requirements into fully functional FastAPI applications. Instead of manually designing database models, schemas, routes, authentication systems, and test cases, the platform leverages a multi-agent AI architecture to automatically analyze requirements, generate backend architecture, create production-ready code, validate generated components, execute automated tests, and repair failures when issues are detected. Designed for rapid backend development and API prototyping, APIForge combines code generation, automated validation, runtime execution, test generation, and self-healing capabilities to drastically reduce development time. By integrating AI-driven software engineering workflows with automated debugging and repair loops, the platform transforms backend development from a manual coding process into an autonomous API creation system.

---

### Tech Stack
- **Backend Framework:** FastAPI, Python
- **Database Layer:** SQLAlchemy, SQLite
- **Schema Validation:** Pydantic
- **AI Layer:** Groq API, Large Language Models, Multi-Agent Architecture
- **Testing Framework:** Pytest, FastAPI TestClient
- **Validation Engine:** AST Parsing, Static Code Validation
- **Runtime Execution:** Automated Application Execution & Verification
- **Development Environment:** Python Virtual Environment
- **Deployment Ready:** FastAPI-Based REST APIs

---

### Key Features
1. **Natural Language Requirement Processing:** Converts plain English software requirements into structured backend specifications automatically.
2. **Multi-Agent Backend Generation:** Uses specialized AI agents for requirement analysis, architecture planning, model generation, schema creation, route generation, and application setup.
3. **Automated Database Model Generation:** Creates SQLAlchemy models with relationships, constraints, timestamps, and database configurations.
4. **Intelligent API Schema Generation:** Generates Pydantic request and response schemas directly from generated architecture and models.
5. **Dynamic Route Generation:** Automatically creates FastAPI CRUD endpoints with dependency injection, database integration, and response validation.
6. **Automated Test Case Generation:** Builds pytest test suites capable of validating generated API functionality without manual test writing.
7. **Static Code Validation Engine:** Performs rule-based validation to detect missing imports, schema inconsistencies, circular dependencies, invalid patterns, and generated code issues before execution.
8. **Self-Healing Repair System:** Detects failures during execution or testing, classifies the root cause, repairs affected components, and retries generation automatically.
9. **Intelligent Error Classification:** Analyzes runtime, schema, model, route, and test failures to determine the correct repair strategy.
10. **End-to-End Backend Automation:** Transforms software requirements into executable, tested, and validated backend applications with minimal developer intervention.
11. **Extensible AI Software Engineering Platform:** Built to support future capabilities such as authentication generation, relationship modeling, deployment automation, documentation generation, Docker support, multi-database integration, and advanced workflow-based backend systems.

---

### GitHub Link
[View Repository on GitHub](https://github.com/Rakshana24/APIForge)
`
        },
        {
          name: 'causal-debugger.md',
          type: 'file',
          extension: 'md',
          path: '/projects/causal-debugger.md',
          content: `# Causal Debugger 🤖

> AI-Powered Runtime Error Analysis & Root Cause Detection Platform

---

### Project Overview
Causal Debugger is an intelligent debugging platform that automatically captures runtime events, user interactions, console errors, and application behavior to identify the true root cause of frontend failures. Instead of relying solely on error messages, the system builds a causal timeline of events leading up to a failure and uses AI-powered reasoning to analyze what actually happened, where the failure originated, and how it can be fixed. Designed specifically for developers working in local development environments, Causal Debugger observes application behavior in real time, detects anomalies such as API failures, schema mismatches, undefined object access, and broken user flows, then generates structured debugging insights with actionable fixes. By combining runtime observability with AI analysis, the platform transforms debugging from a reactive process into an intelligent root-cause investigation system.

---

### Tech Stack
- **Frontend:** Chrome Extension, HTML, CSS, JavaScript
- **Backend:** FastAPI, Python, REST APIs
- **AI Layer:** Groq API, LLM-based Root Cause Analysis, Structured JSON Reasoning
- **Storage:** Chrome Local Storage
- **Deployment:** Render
- **Monitoring:** Runtime Event Tracking, Error Correlation Engine
- **Development Environment:** Localhost Application Monitoring

---

### Key Features
1. **Runtime Event Timeline Tracking:** Captures clicks, user interactions, navigation flow, and application events before failures occur.
2. **AI-Powered Root Cause Analysis:** Uses LLM reasoning to identify the actual source of errors instead of only reporting symptoms.
3. **Structured Debugging Reports:** Provides clear output including Root Cause, Trigger Event, Failure Location, Technical Reason, and Recommended Fixes.
4. **Schema Mismatch Detection:** Detects inconsistencies between frontend expectations and backend API responses.
5. **Console & Runtime Error Monitoring:** Automatically captures JavaScript exceptions and console errors in real time.
6. **Local-First Privacy Architecture:** Monitors application behavior without requiring developers to paste source code into AI tools.
7. **Causal Chain Reconstruction:** Rebuilds the sequence of events that led to a failure for faster debugging and troubleshooting.
8. **Developer-Focused Localhost Monitoring:** Designed specifically for React, Vite, Next.js, and modern frontend development environments.
9. **Deployable AI Analysis Backend:** Cloud-hosted AI engine capable of processing debugging sessions from multiple developers.
10. **Extensible Debugging Intelligence Layer:** Built to support future capabilities such as API contract validation, automated bug classification, replayable debugging sessions, and framework-aware error analysis.

---

### GitHub Link
[View Repository on GitHub](https://github.com/Rakshana24/debugging-agent)
`
        },
        {
          name: 'venuebook.md',
          type: 'file',
          extension: 'md',
          path: '/projects/venuebook.md',
          content: `# VenueBook 📅

> Smart College Venue Booking & Event Management Platform

---

### Project Overview
VenueBook is a centralized venue reservation and event management platform designed to streamline the process of booking college infrastructure such as seminar halls, auditoriums, conference rooms, laboratories, and event spaces. The platform eliminates manual booking procedures and fragmented communication by providing a digital workflow for venue discovery, availability tracking, booking requests, approval management, and scheduling. Students, faculty members, clubs, and departments can easily browse available venues, submit reservation requests, monitor booking status, and manage upcoming events through an intuitive web interface.

The system integrates role-based access control, real-time booking management, conflict prevention mechanisms, and administrative approval workflows to ensure efficient utilization of institutional resources. By combining a modern React frontend with a scalable Node.js backend and relational database architecture, VenueBook provides a reliable solution for managing venue reservations across educational institutions while reducing scheduling conflicts, administrative overhead, and manual coordination efforts.

---

### Tech Stack
- **Frontend:** React.js, Vite, JavaScript, HTML5, CSS3
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Authentication & Security:** bcrypt.js, Session-Based Authentication
- **API Communication:** REST APIs, Axios
- **Environment Management:** dotenv
- **Cross-Origin Support:** CORS
- **Development Tools:** npm, Git, GitHub
- **Architecture:** Full-Stack Web Application

---

### Key Features
1. **Venue Discovery & Availability Management:** Allows users to browse available venues, view venue details, capacity information, and booking availability schedules.
2. **Centralized Booking System:** Provides a unified platform for creating, managing, and tracking venue reservation requests across the institution.
3. **Booking Conflict Prevention:** Prevents overlapping reservations by validating venue availability before confirming bookings.
4. **Role-Based Access Management:** Supports different user roles such as administrators, faculty members, student coordinators, and event organizers with controlled access permissions.
5. **Secure User Authentication:** Implements secure authentication and password protection mechanisms to safeguard user accounts and booking operations.
6. **Administrative Approval Workflow:** Enables administrators to review, approve, reject, or modify booking requests before final confirmation.
7. **Real-Time Booking Status Tracking:** Allows users to monitor booking progress, approval status, and reservation history through an interactive dashboard.
8. **Venue Schedule Management:** Maintains a structured schedule of reservations to ensure efficient utilization of college facilities.
9. **Event Planning Support:** Facilitates coordination of academic events, workshops, seminars, club activities, and institutional programs through organized venue management.
10. **Scalable Institutional Resource Management:** Provides a scalable foundation that can be extended to support equipment booking, event notifications, automated scheduling, calendar integration, analytics dashboards, email notifications, and multi-campus venue management in future versions.

---

### GitHub Link
[View Repository on GitHub](https://github.com/Rakshana24/VenueBooking)
`
        }
      ]
    },
    {
      name: 'achievements.json',
      type: 'file',
      extension: 'json',
      path: '/achievements.json',
      content: `{
  "summary": {
    "leetcode_solved": "200+",
    "hackathons_attended": 1,
    "oracle_certifications": 2,
    "workshops_conducted": 1
  },
  "leetcode_profile": {
    "url": "https://leetcode.com/u/trakshana/",
    "solved": "200+"
  },
  "hackathons": [
    {
      "name": "Hack To The Future 2025",
      "position": "Offline Finalist",
      "details": "Selected in the online round to proceed and participate in the offline hackathon."
    }
  ],
  "projects": [
    {
      "name": "TANCAM-2025",
      "details": "Built a web application for disabled people to find their related job."
    }
  ],
  "academics": {
    "milestone": "Highest CGPA (above 9.0) in the department in the first and second semester."
  },
  "workshops": [
    {
      "title": "Agentic AI Workshop",
      "audience": "Junior Students",
      "details": "Conducted a workshop instructing junior students on Agentic AI frameworks."
    }
  ],
  "certifications": [
    {
      "title": "Oracle Foundations Certifications (2x)",
      "issuer": "Oracle"
    }
  ]
}
`
    },
    {
      name: 'resume.pdf',
      type: 'file',
      extension: 'pdf',
      path: '/resume.pdf',
      content: 'PDF_FILE_BINARY_PLACEHOLDER'
    },
    {
      name: 'contact.txt',
      type: 'file',
      extension: 'txt',
      path: '/contact.txt',
      content: `===================================================================
                  CONTACT INFORMATION - RAKSHANA
===================================================================

Please feel free to reach out via any of the channels below. I'm 
always interested in challenging software opportunities, system 
architectures, and collaborating on developer tools.

  Email:     rakshanarakshana672@gmail.com
  LinkedIn:  https://www.linkedin.com/in/rakshanat/
  GitHub:    https://github.com/Rakshana24
  Phone:     +91 9344987283
  Location:  India

-------------------------------------------------------------------
      "The best way to predict the future is to invent it."
-------------------------------------------------------------------
`
    }
  ]
};

// Helper function to find a node by path
export function findNodeByPath(path: string, node: FSNode = filesystem): FSNode | null {
  // Normalize path segments, removing trailing/leading slashes
  const cleanPath = path.replace(/\/$/, '');
  const cleanNodePath = node.path.replace(/\/$/, '');

  if (cleanPath === cleanNodePath || (cleanPath === '' && cleanNodePath === '')) {
    return node;
  }

  if (node.type === 'directory') {
    for (const child of node.children) {
      const found = findNodeByPath(cleanPath, child);
      if (found) return found;
    }
  }

  return null;
}

// Helper to get all files in the filesystem as a flat list
export function getFlatFiles(node: FSNode = filesystem): FSFile[] {
  if (node.type === 'file') {
    return [node];
  }
  
  const files: FSFile[] = [];
  for (const child of node.children) {
    files.push(...getFlatFiles(child));
  }
  return files;
}

// Convert path to user-friendly label, e.g. "~/projects/apiforge.md"
export function formatDisplayPath(path: string): string {
  if (!path) return '~/';
  if (path === '/') return '~/';
  
  // Format starting with ~
  const normalized = path.startsWith('/') ? path : '/' + path;
  
  // Append extension display fallback if needed, or return with ~/ prefix
  return '~' + normalized;
}

// Convert FS path to route
// /about.md -> /about
// /projects/apiforge.md -> /projects/apiforge
export function fsPathToRoute(fsPath: string): string {
  let route = fsPath;
  // Remove extensions
  route = route.replace(/\.(md|yaml|json|pdf|txt)$/, '');
  return route;
}

// Convert route to FS path
export function routeToFsPath(route: string): string {
  if (route === '/' || route === '') return '/about.md';
  
  const clean = route.replace(/\/$/, '');
  
  if (clean === '/about') return '/about.md';
  if (clean === '/skills') return '/skills.yaml';
  if (clean === '/achievements') return '/achievements.json';
  if (clean === '/resume') return '/resume.pdf';
  if (clean === '/contact') return '/contact.txt';
  
  // Projects
  if (clean.startsWith('/projects/')) {
    const projectName = clean.replace('/projects/', '');
    if (projectName === 'causal-debugger') return '/projects/causal-debugger.md';
    return `/projects/${projectName}.md`;
  }
  
  if (clean.includes('.')) return clean;
  return clean + '.md';
}

