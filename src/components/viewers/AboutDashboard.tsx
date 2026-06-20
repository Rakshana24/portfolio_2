import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, GraduationCap, Cpu, Globe, Rocket, Server, Code2 } from 'lucide-react';

// Count-up helper component
const CountUp: React.FC<{ end: number; duration?: number; suffix?: string; decimals?: number }> = ({ 
  end, 
  duration = 1200, 
  suffix = '', 
  decimals = 0 
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(progress * end);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{count.toFixed(decimals)}{suffix}</span>;
};

export const AboutDashboard: React.FC = () => {
  const [terminalTab, setTerminalTab] = useState<'whoami' | 'spec'>('whoami');

  const badges = [
    { text: 'AI Agents', color: 'border-accent-purple/40 text-purple-400 bg-purple-500/5' },
    { text: 'FastAPI', color: 'border-accent-teal/40 text-teal-400 bg-teal-500/5' },
    { text: 'LangGraph', color: 'border-accent-blue/40 text-blue-400 bg-blue-500/5' },
    { text: 'CrewAI', color: 'border-rose-500/40 text-rose-400 bg-rose-500/5' },
    { text: 'Docker', color: 'border-sky-500/40 text-sky-400 bg-sky-500/5' },
    { text: 'Redis', color: 'border-red-500/40 text-red-400 bg-red-500/5' }
  ];

  const interests = [
    { title: 'Backend Engineering', desc: 'Designing fast, scalable architectures and concurrent pipelines.', icon: <Server className="w-5 h-5 text-accent-blue" /> },
    { title: 'AI Agents', desc: 'Orchestrating multi-agent systems, memory syncs, and prompt graphs.', icon: <Cpu className="w-5 h-5 text-accent-purple" /> },
    { title: 'DevOps & Cloud', desc: 'Deploying isolated microservices, scaling caches, and CI/CD pipelines.', icon: <Rocket className="w-5 h-5 text-accent-teal" /> },
    { title: 'System Design', desc: 'Structuring databases, designing pub-subs, and load balancing routers.', icon: <Globe className="w-5 h-5 text-indigo-400" /> },
    { title: 'Distributed Systems', desc: 'Designing resilient APIs, handling consensus, and rate limiting requests.', icon: <Code2 className="w-5 h-5 text-emerald-400" /> },
    { title: 'Open Source', desc: 'Building libraries, contributing to dev-tools, and writing developer scripts.', icon: <BookOpen className="w-5 h-5 text-amber-400" /> }
  ];

  return (
    <div className="space-y-8 select-text">
      {/* Hero Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden border border-border-dark rounded-2xl bg-card-dark/30 p-6 md:p-8 backdrop-blur-md"
      >
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-accent-blue/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5 flex-1">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-text-primary via-zinc-200 to-zinc-400 bg-clip-text text-transparent font-sans">
              RAKSHANA T
            </h1>
            <p className="text-sm md:text-base font-mono text-text-secondary mt-2 tracking-wide">
              Backend Engineer &bull; AI Builder &bull; DevOps Enthusiast
            </p>
            <p className="text-base text-text-secondary mt-4 max-w-xl font-sans leading-relaxed">
              Building intelligent systems, autonomous workflows, and developer tools.
            </p>
          </div>

          {/* Large Hero Profile Image */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-accent-blue/30 to-accent-teal/30 p-[1.5px] flex-shrink-0 shadow-2xl overflow-hidden self-start md:self-center">
            <img 
              src="/avatar.jpg" 
              alt="Rakshana T" 
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>

        {/* Animated badging */}
        <div className="flex flex-wrap gap-2 mt-6">
          {badges.map((badge, i) => (
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              key={badge.text}
              className={`px-3 py-1 rounded-full text-xs font-mono border ${badge.color}`}
            >
              {badge.text}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Metrics Section */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: 'B.Tech CGPA', end: 8.97, suffix: '', decimals: 2 },
          { label: 'LeetCode', end: 200, suffix: '+', decimals: 0 },
          { label: 'Projects', end: 5, suffix: '+', decimals: 0 },
          { label: 'Hackathons', end: 2, suffix: '+', decimals: 0 },
          { label: 'Certifications', end: 2, suffix: '', decimals: 0 }
        ].map((stat, i) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.04 }}
            key={stat.label}
            className="glass-panel glow-card p-4 rounded-xl flex flex-col items-center justify-center text-center group"
          >
            <div className="text-[10px] text-text-secondary uppercase font-mono tracking-wider font-semibold">
              {stat.label}
            </div>
            <div className="text-2xl font-bold font-sans text-text-primary tracking-tight mt-2.5">
              <CountUp end={stat.end} suffix={stat.suffix} decimals={stat.decimals} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Whoami Terminal Card & Education Timeline Split Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Terminal Widget */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="border border-border-dark rounded-xl bg-bg-dark/80 overflow-hidden flex flex-col h-[340px]"
        >
          {/* Terminal Tabs Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-sidebar-dark/60 border-b border-border-dark select-none">
            <div className="flex space-x-1.5">
              <span className="window-dot window-dot-red" />
              <span className="window-dot window-dot-yellow" />
              <span className="window-dot window-dot-green" />
            </div>
            
            <div className="flex space-x-2 font-mono text-[10px]">
              <button 
                onClick={() => setTerminalTab('whoami')}
                className={`px-2 py-0.5 rounded ${terminalTab === 'whoami' ? 'bg-border-dark text-accent-blue font-bold' : 'text-text-muted hover:text-text-secondary'}`}
              >
                whoami.sh
              </button>
              <button 
                onClick={() => setTerminalTab('spec')}
                className={`px-2 py-0.5 rounded ${terminalTab === 'spec' ? 'bg-border-dark text-accent-teal font-bold' : 'text-text-muted hover:text-text-secondary'}`}
              >
                sys_spec.log
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-4 flex-1 font-mono text-xs md:text-sm overflow-y-auto space-y-3 leading-relaxed text-zinc-300">
            {terminalTab === 'whoami' ? (
              <>
                <div>
                  <span className="text-emerald-400">rakshana@workstation:~$</span> <span className="text-text-primary">whoami</span>
                </div>
                <div className="text-text-secondary pl-3">
                  Rakshana T &mdash; Backend Developer specializing in multi-agent workflow systems and containerized microservices.
                </div>
                <div className="pt-2">
                  <span className="text-emerald-400">rakshana@workstation:~$</span> <span className="text-text-primary">current_focus</span>
                </div>
                <ul className="list-none pl-6 text-text-secondary space-y-1">
                  <li>&bull; Building Agentic AI graphs via CrewAI and LangGraph</li>
                  <li>&bull; Architecting scalable microservices with FastAPI</li>
                  <li>&bull; Automation, Redis caching, and DevOps pipelines</li>
                </ul>
                <div className="pt-2">
                  <span className="text-emerald-400">rakshana@workstation:~$</span> <span className="text-text-primary">status</span>
                </div>
                <div className="pl-3 text-accent-teal font-bold">
                  Learning &bull; Designing &bull; Deploying &bull; Growing
                </div>
                <div className="flex items-center text-[10px] text-text-muted pt-2 border-t border-border-dark/40">
                  <span>Connection: Secure SSH (Ed25519)</span>
                </div>
              </>
            ) : (
              <>
                <div>
                  <span className="text-emerald-400">rakshana@workstation:~$</span> <span className="text-text-primary">cat /proc/cpuinfo</span>
                </div>
                <div className="text-text-secondary pl-3">
                  CPU Model: Bannari CSBS Graduate Core v2.6<br />
                  Frequency: 8.97 GHz (CGPA Max Turbo)<br />
                  Cores: Multithreaded Learner (AI & Backend Systems)
                </div>
                <div className="pt-2">
                  <span className="text-emerald-400">rakshana@workstation:~$</span> <span className="text-text-primary">docker ps</span>
                </div>
                <div className="text-text-secondary pl-3 font-mono text-[10px] whitespace-pre">
                  CONTAINER ID   IMAGE         COMMAND     STATUS<br />
                  897b2f4c3a2f   fastapi-app   "uvicorn"   Up 12 hours<br />
                  ca820f4c9c10   redis:latest  "docker-e"  Up 48 hours<br />
                  c3b8214a6015   crewai-node   "python"    Up 3 hours
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Education Timeline */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="border border-border-dark rounded-xl bg-card-dark/30 p-5 flex flex-col justify-between"
        >
          <div className="flex items-center space-x-2 border-b border-border-dark pb-2 mb-4">
            <GraduationCap className="w-5 h-5 text-accent-blue" />
            <h3 className="text-sm font-semibold font-mono uppercase tracking-wider text-text-primary">Education Journey</h3>
          </div>

          <div className="relative flex-1 pl-8 min-h-[220px]">
            {/* Custom Vertical Connector Line */}
            <div className="timeline-line" />

            {/* Timeline Item */}
            <div className="relative space-y-2">
              <span className="absolute left-[-26px] top-1.5 w-4 h-4 rounded-full bg-bg-dark border-2 border-accent-blue flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-ping" />
              </span>
              
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="px-2 py-0.5 bg-accent-blue/15 text-accent-blue border border-accent-blue/20 rounded-md">2024 &mdash; 2028</span>
                <span className="text-text-muted">B.Tech</span>
              </div>
              
              <h4 className="text-sm font-bold text-text-primary font-sans leading-tight">
                Computer Science and Business Systems (CSBS)
              </h4>
              <p className="text-xs text-text-secondary font-medium">
                Bannari Amman Institute of Technology
              </p>
              <div className="text-xs font-mono text-accent-teal mt-1">
                CGPA: <span className="font-bold text-text-primary bg-border-dark px-1.5 py-0.5 rounded">8.97</span>
              </div>

              <div className="pt-2">
                <div className="text-[10px] text-text-muted uppercase font-mono tracking-wider">Key Focus Areas:</div>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {['Backend Engineering', 'AI & Agentic Systems', 'Cloud & DevOps', 'Problem Solving'].map(tag => (
                    <span key={tag} className="text-[10px] font-mono bg-border-dark/60 text-text-secondary border border-border-dark px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Interests Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Award className="w-5 h-5 text-accent-teal" />
          <h3 className="text-sm font-semibold font-mono uppercase tracking-wider text-text-primary">
            Engineering Domains & Interests
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {interests.map((interest, i) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
              key={interest.title}
              className="glass-panel glow-card p-4 rounded-xl flex flex-col justify-between"
            >
              <div>
                <div className="p-2 w-fit bg-bg-dark border border-border-dark/80 rounded-lg mb-3 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
                  {interest.icon}
                </div>
                <h4 className="text-sm font-semibold text-text-primary font-sans leading-snug">
                  {interest.title}
                </h4>
                <p className="text-xs text-text-secondary mt-1.5 leading-relaxed font-sans">
                  {interest.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
