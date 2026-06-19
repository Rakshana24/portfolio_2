import React from 'react';
import { motion } from 'framer-motion';
import { 
  Layers, 
  ArrowRight
} from 'lucide-react';

interface ProjectCaseStudyProps {
  projectName: string;
}

export const ProjectCaseStudy: React.FC<ProjectCaseStudyProps> = ({ projectName }) => {
  // Setup project-specific content details
  const getProjectData = () => {
    switch (projectName.toLowerCase()) {
      case 'apiforge':
        return {
          title: 'APIForge',
          tagline: 'AI-Powered Autonomous Backend Generation & Self-Healing API Development Platform',
          status: 'Active',
          techStack: [
            'FastAPI', 
            'Python', 
            'SQLAlchemy', 
            'SQLite', 
            'Pydantic', 
            'Groq API', 
            'LLMs', 
            'Multi-Agent AI', 
            'Pytest', 
            'FastAPI TestClient', 
            'AST Parsing', 
            'Static Code Validation'
          ],
          metrics: [
            { label: 'AI Agents', val: 'Multi-Agent' },
            { label: 'Engine', val: 'Self-Healing' },
            { label: 'Validator', val: 'AST & Pytest' },
            { label: 'Framework', val: 'FastAPI' }
          ],
          flow: [
            'Natural Language Requirement',
            'Multi-Agent Generation',
            'Static Code Validation',
            'Automated Test Suites',
            'Self-Healing Repair Loop'
          ],
          features: [
            { title: 'Natural Language Requirement Processing', desc: 'Converts plain English software requirements into structured backend specifications automatically.' },
            { title: 'Multi-Agent Backend Generation', desc: 'Uses specialized AI agents for requirement analysis, architecture planning, model generation, schema creation, route generation, and application setup.' },
            { title: 'Automated Database Model Generation', desc: 'Creates SQLAlchemy models with relationships, constraints, timestamps, and database configurations.' },
            { title: 'Intelligent API Schema Generation', desc: 'Generates Pydantic request and response schemas directly from generated architecture and models.' },
            { title: 'Dynamic Route Generation', desc: 'Automatically creates FastAPI CRUD endpoints with dependency injection, database integration, and response validation.' },
            { title: 'Automated Test Case Generation', desc: 'Builds pytest test suites capable of validating generated API functionality without manual test writing.' },
            { title: 'Static Code Validation Engine', desc: 'Performs rule-based validation to detect missing imports, schema inconsistencies, circular dependencies, invalid patterns, and generated code issues before execution.' },
            { title: 'Self-Healing Repair System', desc: 'Detects failures during execution or testing, classifies the root cause, repairs affected components, and retries generation automatically.' },
            { title: 'Intelligent Error Classification', desc: 'Analyzes runtime, schema, model, route, and test failures to determine the correct repair strategy.' },
            { title: 'End-to-End Backend Automation', desc: 'Transforms software requirements into executable, tested, and validated backend applications with minimal developer intervention.' },
            { title: 'Extensible AI Software Engineering Platform', desc: 'Built to support future capabilities such as authentication generation, relationship modeling, deployment automation, documentation generation, Docker support, multi-database integration, and advanced workflow-based backend systems.' }
          ],
          github: 'https://github.com/Rakshana24/APIForge'
        };

      case 'causal-debugger':
      case 'debugging-agent':
        return {
          title: 'Causal Debugger',
          tagline: 'AI-Powered Runtime Error Analysis & Root Cause Detection Platform',
          status: 'Active',
          techStack: [
            'Chrome Extension', 
            'HTML', 
            'CSS', 
            'JavaScript', 
            'FastAPI', 
            'Python', 
            'REST APIs', 
            'Groq API', 
            'LLM Reasoning', 
            'Chrome Local Storage', 
            'Render', 
            'Error Correlation Engine'
          ],
          metrics: [
            { label: 'Observability', val: 'Chrome Extension' },
            { label: 'Reasoning', val: 'Groq AI Layer' },
            { label: 'Analysis', val: 'Causal Timeline' },
            { label: 'Target Env', val: 'Localhost Apps' }
          ],
          flow: [
            'Runtime Event Capture',
            'Causal Timeline Builder',
            'FastAPI Backend Payload',
            'Groq LLM Analysis',
            'Structured Debugging Report'
          ],
          features: [
            { title: 'Runtime Event Timeline Tracking', desc: 'Captures clicks, user interactions, navigation flow, and application events before failures occur.' },
            { title: 'AI-Powered Root Cause Analysis', desc: 'Uses LLM reasoning to identify the actual source of errors instead of only reporting symptoms.' },
            { title: 'Structured Debugging Reports', desc: 'Provides clear output including Root Cause, Trigger Event, Failure Location, Technical Reason, and Recommended Fixes.' },
            { title: 'Schema Mismatch Detection', desc: 'Detects inconsistencies between frontend expectations and backend API responses.' },
            { title: 'Console & Runtime Error Monitoring', desc: 'Automatically captures JavaScript exceptions and console errors in real time.' },
            { title: 'Local-First Privacy Architecture', desc: 'Monitors application behavior without requiring developers to paste source code into AI tools.' },
            { title: 'Causal Chain Reconstruction', desc: 'Rebuilds the sequence of events that led to a failure for faster debugging and troubleshooting.' },
            { title: 'Developer-Focused Localhost Monitoring', desc: 'Designed specifically for React, Vite, Next.js, and modern frontend development environments.' },
            { title: 'Deployable AI Analysis Backend', desc: 'Cloud-hosted AI engine capable of processing debugging sessions from multiple developers.' },
            { title: 'Extensible Debugging Intelligence Layer', desc: 'Built to support future capabilities such as API contract validation, automated bug classification, replayable debugging sessions, and framework-aware error analysis.' }
          ],
          github: 'https://github.com/Rakshana24/debugging-agent'
        };

      case 'venuebook':
        return {
          title: 'VenueBook',
          tagline: 'Smart College Venue Booking & Event Management Platform',
          status: 'Active',
          techStack: [
            'React.js', 
            'Vite', 
            'JavaScript', 
            'HTML5', 
            'CSS3', 
            'Node.js', 
            'Express.js', 
            'MySQL', 
            'bcrypt.js', 
            'Session Authentication', 
            'REST APIs', 
            'Axios'
          ],
          metrics: [
            { label: 'Architecture', val: 'Full-Stack Web' },
            { label: 'Database', val: 'MySQL' },
            { label: 'Auth', val: 'bcrypt & Session' },
            { label: 'Client', val: 'React & Vite' }
          ],
          flow: [
            'Venue Search & Filter',
            'Reservation Request Submission',
            'Conflict Prevention Check',
            'Admin Approval Review',
            'Real-Time Status & Scheduling'
          ],
          features: [
            { title: 'Venue Discovery & Availability Management', desc: 'Allows users to browse available venues, view venue details, capacity information, and booking availability schedules.' },
            { title: 'Centralized Booking System', desc: 'Provides a unified platform for creating, managing, and tracking venue reservation requests across the institution.' },
            { title: 'Booking Conflict Prevention', desc: 'Prevents overlapping reservations by validating venue availability before confirming bookings.' },
            { title: 'Role-Based Access Management', desc: 'Supports different user roles such as administrators, faculty members, student coordinators, and event organizers with controlled access permissions.' },
            { title: 'Secure User Authentication', desc: 'Implements secure authentication and password protection mechanisms to safeguard user accounts and booking operations.' },
            { title: 'Administrative Approval Workflow', desc: 'Enables administrators to review, approve, reject, or modify booking requests before final confirmation.' },
            { title: 'Real-Time Booking Status Tracking', desc: 'Allows users to monitor booking progress, approval status, and reservation history through an interactive dashboard.' },
            { title: 'Venue Schedule Management', desc: 'Maintains a structured schedule of reservations to ensure efficient utilization of college facilities.' },
            { title: 'Event Planning Support', desc: 'Facilitates coordination of academic events, workshops, seminars, club activities, and institutional programs through organized venue management.' },
            { title: 'Scalable Institutional Resource Management', desc: 'Provides a scalable foundation that can be extended to support equipment booking, event notifications, automated scheduling, calendar integration, analytics dashboards, email notifications, and multi-campus venue management.' }
          ],
          github: 'https://github.com/Rakshana24/VenueBooking'
        };

      default: // forestmind
        return {
          title: 'ForestMind',
          tagline: 'AI-Powered Distributed Forest Monitoring & Protection System',
          status: 'Active',
          techStack: [
            'React', 
            'Vite', 
            'React Router', 
            'Context API', 
            'Node.js', 
            'Express.js', 
            'REST APIs', 
            'MongoDB Atlas', 
            'Mongoose', 
            'YOLOv8', 
            'OpenCV', 
            'CNN Audio Classification', 
            'Edge AI', 
            'Jetson Nano', 
            'USB Camera & Mic', 
            'Mesh Communication Network', 
            'Dijkstra Routing'
          ],
          metrics: [
            { label: 'Vision Model', val: 'YOLOv8' },
            { label: 'Audio Classifier', val: 'CNN Models' },
            { label: 'Edge Hardware', val: 'Jetson Nano' },
            { label: 'Network Route', val: 'Dijkstra Routing' }
          ],
          flow: [
            'Edge Camera & Mic Capture',
            'Local Jetson Nano Inference',
            'Offline Mesh Nodes',
            'Dijkstra Routing Calculations',
            'Central Dashboard Alerts'
          ],
          features: [
            { title: 'Real-Time Human & Vehicle Detection', desc: 'Employs YOLOv8 computer vision at local edge nodes to log visual threats in real time.' },
            { title: 'Chainsaw, Gunshot & Distress Sound Recognition', desc: 'Identifies chainsaw noises, gunshots, and distress sounds using CNN-based audio classification models.' },
            { title: 'Offline Mesh-Based Alert Transmission', desc: 'Transmits alerts through a self-healing mesh network using Dijkstra’s shortest-path routing algorithm to reach the nearest forest office.' },
            { title: 'Geo-Fencing & Restricted Zone Monitoring', desc: 'Configures virtual boundaries and warns rangers when intruders breach lines.' },
            { title: 'Endangered Species Identification & Tracking', desc: 'Recognizes and tracks native endangered fauna to log population trends and migration activity.' },
            { title: 'Live Forest Office Alert Dashboard', desc: 'Displays active maps, live alerts, captured threat images, and location data for forest officers.' },
            { title: 'Environmental Insights & Forest Well-Being Recommendations', desc: 'Generates forest health insights and actionable recommendations from analytical models.' }
          ],
          github: 'https://github.com/Rakshana24/ForestMind'
        };
    }
  };

  const project = getProjectData();

  return (
    <div className="space-y-8 select-text font-sans">
      
      {/* 1. Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative border border-border-dark rounded-2xl bg-card-dark/30 p-6 md:p-8 overflow-hidden backdrop-blur-md"
      >
        {/* Spotlighting */}
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-accent-blue/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded-full bg-accent-teal/10 text-accent-teal border border-accent-teal/20 text-[10px] font-mono font-medium">
                PROJECT CASE STUDY
              </span>
              <span className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono">
                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                <span>{project.status}</span>
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-primary">
              {project.title.toUpperCase()}
            </h1>
            <p className="text-sm text-text-secondary font-medium">
              {project.tagline}
            </p>
          </div>
        </div>

        {/* Tech Badging */}
        <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-border-dark/30">
          {project.techStack.map(tag => (
            <span key={tag} className="text-xs font-mono px-3 py-1 bg-bg-dark border border-border-dark rounded-lg text-text-secondary">
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* 2. Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {project.metrics.map((metric, i) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            key={metric.label}
            className="glass-panel p-4 rounded-xl text-center glow-card"
          >
            <div className="text-[10px] text-text-secondary uppercase tracking-wider font-mono">
              {metric.label}
            </div>
            <div className="text-base font-bold text-text-primary mt-2 font-sans">
              {metric.val}
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3. System Flowchart Diagram */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono uppercase tracking-wider text-text-muted pl-1 flex items-center space-x-2">
          <Layers className="w-4 h-4 text-accent-blue" />
          <span>System Flow & Architecture Pipeline</span>
        </h3>
        
        <div className="border border-border-dark rounded-xl bg-card-dark/20 p-5 md:p-6 overflow-x-auto">
          <div className="flex items-center space-x-3 min-w-max py-2 px-1">
            {project.flow.map((node, index) => {
              const isLast = index === project.flow.length - 1;
              return (
                <React.Fragment key={node}>
                  <div className="flex items-center px-3 py-2 border border-border-dark rounded-lg bg-bg-dark font-mono text-[10px] md:text-xs text-text-primary hover:border-accent-blue/40 shadow-sm transition-colors">
                    <span className="mr-1.5 text-accent-teal font-bold">{index + 1}.</span>
                    <span>{node}</span>
                  </div>
                  {!isLast && (
                    <ArrowRight className="w-4 h-4 text-text-muted flex-shrink-0 animate-pulse" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>



      {/* 5. Features Grid */}
      <div className="space-y-4">
        <h3 className="text-xs font-mono uppercase tracking-wider text-text-muted pl-1 flex items-center space-x-2 select-none">
          <Layers className="w-4 h-4 text-accent-teal" />
          <span>Core Capabilities & Features</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.features.map(feat => (
            <div
              key={feat.title}
              className="glass-panel p-4 rounded-xl border border-border-dark/60 hover:border-accent-blue/30 hover:bg-card-dark/30 transition-all duration-200"
            >
              <h4 className="text-sm font-semibold text-text-primary font-sans">
                {feat.title}
              </h4>
              <p className="text-xs text-text-secondary mt-1.5 leading-relaxed font-sans">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. GitHub CTA Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="border border-border-dark rounded-xl bg-gradient-to-br from-card-dark/20 to-border-dark/20 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 select-none"
      >
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-sm font-bold text-text-primary">Interested in looking at the source code?</h4>
          <p className="text-xs text-text-secondary">Inspect the agent codebases, docker configurations, and schemas on GitHub.</p>
        </div>
        
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="flex items-center space-x-2 px-5 py-2.5 bg-text-primary hover:bg-white text-bg-dark rounded-xl text-sm font-semibold shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
          </svg>
          <span>View GitHub Repository</span>
        </a>
      </motion.div>
    </div>
  );
};
