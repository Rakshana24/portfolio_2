import React from 'react';
import { YamlRenderer } from './YamlRenderer';
import { Cpu, Server, Terminal, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

interface SkillsDashboardProps {
  content: string;
}

export const SkillsDashboard: React.FC<SkillsDashboardProps> = ({ content }) => {
  const skillSliders = [
    { name: 'Backend Engineering', percent: 100, color: 'from-blue-600 to-accent-blue', icon: <Server className="w-4 h-4 text-accent-blue" /> },
    { name: 'AI & LLMs (CrewAI, LangGraph)', percent: 90, color: 'from-purple-600 to-accent-purple', icon: <Cpu className="w-4 h-4 text-accent-purple" /> },
    { name: 'DevOps & Containers (Docker, Redis)', percent: 80, color: 'from-teal-600 to-accent-teal', icon: <Terminal className="w-4 h-4 text-accent-teal" /> },
    { name: 'DSA & Logical Problem Solving', percent: 80, color: 'from-indigo-600 to-indigo-400', icon: <Layers className="w-4 h-4 text-indigo-400" /> }
  ];

  return (
    <div className="space-y-6 select-text">
      {/* Top Section: Graphic Slider Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden border border-border-dark rounded-2xl bg-card-dark/30 p-5 md:p-6 backdrop-blur-md"
      >
        <div className="absolute top-0 right-0 w-[180px] h-[180px] bg-accent-teal/5 rounded-full blur-[70px] pointer-events-none" />
        
        <h2 className="text-sm font-semibold font-mono uppercase tracking-wider text-text-primary mb-4 flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-accent-teal" />
          <span>Core Competencies Dashboard</span>
        </h2>

        {/* Progress Grid */}
        <div className="space-y-4 max-w-2xl">
          {skillSliders.map((skill, i) => (
            <div key={skill.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono text-text-secondary">
                <div className="flex items-center space-x-2">
                  {skill.icon}
                  <span className="font-semibold text-text-primary font-sans">{skill.name}</span>
                </div>
                <span className="text-text-muted">{skill.percent}%</span>
              </div>
              
              {/* Slider Track */}
              <div className="w-full h-2 rounded-full bg-bg-dark border border-border-dark overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.percent}%` }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 1.2, ease: 'easeOut' }}
                  className={`h-full rounded-full bg-gradient-to-r ${skill.color} shadow-[0_0_10px_rgba(59,130,246,0.15)]`}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Code Gutter YAML section */}
      <div className="space-y-3">
        <div className="text-xs font-mono text-text-muted pl-1 uppercase tracking-wider flex items-center space-x-2 select-none">
          <span>Source Code File Representation</span>
        </div>
        
        {/* Reuses our customized YAML syntax code block */}
        <YamlRenderer content={content} />
      </div>
    </div>
  );
};
