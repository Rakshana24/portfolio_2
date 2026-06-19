import React from 'react';
import { JsonRenderer } from './JsonRenderer';
import { Trophy, Award, Code2, Users, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface AchievementsDashboardProps {
  content: string;
}

export const AchievementsDashboard: React.FC<AchievementsDashboardProps> = ({ content }) => {
  const cards = [
    { title: 'Highest CGPA', val: 'Department Topper', desc: 'Academics core focus.', icon: <Award className="w-5 h-5 text-amber-400" /> },
    { title: 'LeetCode', val: '200+ Solved', desc: 'Data structures & problem solving.', icon: <Code2 className="w-5 h-5 text-accent-blue" /> },
    { title: 'Oracle Certified', val: '2 Certifications', desc: 'Cloud Infra & Java expertise.', icon: <Star className="w-5 h-5 text-rose-500" /> },
    { title: 'AI Workshop', val: 'Agentic AI Speaker', desc: 'Led technical agentic build labs.', icon: <Users className="w-5 h-5 text-accent-teal" /> },
    { title: 'Hackathons', val: '2 Projects Built', desc: 'Autonomous system developer tools.', icon: <Trophy className="w-5 h-5 text-purple-400" /> }
  ];

  return (
    <div className="space-y-6 select-text">
      {/* Top Section: Graphic Achievements Cards */}
      <div className="space-y-3">
        <h2 className="text-xs font-mono text-text-muted pl-1 uppercase tracking-wider flex items-center space-x-2 select-none">
          <span className="w-2 h-2 rounded-full bg-accent-blue" />
          <span>Professional Achievements Dashboard</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          {cards.map((card, i) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
              key={card.title}
              className="glass-panel glow-card p-4 rounded-xl flex flex-col justify-between"
            >
              <div>
                <div className="p-2 w-fit bg-bg-dark border border-border-dark/80 rounded-lg mb-3 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
                  {card.icon}
                </div>
                <h4 className="text-[10px] uppercase tracking-wider font-mono text-text-muted">
                  {card.title}
                </h4>
                <div className="text-sm font-bold text-text-primary font-sans leading-snug mt-1.5">
                  {card.val}
                </div>
              </div>
              <p className="text-[10px] text-text-secondary mt-2 leading-relaxed font-sans border-t border-border-dark/30 pt-1.5">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Code Gutter JSON Section */}
      <div className="space-y-3">
        <div className="text-xs font-mono text-text-muted pl-1 uppercase tracking-wider flex items-center space-x-2 select-none">
          <span>Source Code File Representation</span>
        </div>
        
        {/* Reuses our customized JSON syntax tree viewer */}
        <JsonRenderer content={content} />
      </div>
    </div>
  );
};
