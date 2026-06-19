import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { routeToFsPath, findNodeByPath, fsPathToRoute } from '../data/filesystemData';
import { MarkdownRenderer } from './viewers/MarkdownRenderer';
import { YamlRenderer } from './viewers/YamlRenderer';
import { JsonRenderer } from './viewers/JsonRenderer';
import { PdfRenderer } from './viewers/PdfRenderer';
import { TextRenderer } from './viewers/TextRenderer';
import { AboutDashboard } from './viewers/AboutDashboard';
import { SkillsDashboard } from './viewers/SkillsDashboard';
import { AchievementsDashboard } from './viewers/AchievementsDashboard';
import { ProjectCaseStudy } from './viewers/ProjectCaseStudy';
import { ContactDashboard } from './viewers/ContactDashboard';
import { 
  Folder, 
  FileText, 
  FileCode, 
  BookOpen, 
  Braces, 
  AlertTriangle,
  Clock,
  HardDrive
} from 'lucide-react';
import type { FSNode, FSDirectory, FSFile } from '../types/fs';

export const FileViewer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const fsPath = routeToFsPath(location.pathname);
  const node = findNodeByPath(fsPath);

  // Helper to retrieve icons for directory contents
  const getNodeIcon = (n: FSNode) => {
    if (n.type === 'directory') {
      return <Folder className="w-8 h-8 text-amber-500/90" />;
    }
    
    const file = n as FSFile;
    switch (file.extension) {
      case 'md':
        return <FileCode className="w-8 h-8 text-blue-400/90" />;
      case 'yaml':
        return <Braces className="w-8 h-8 text-amber-400/90" />;
      case 'json':
        return <Braces className="w-8 h-8 text-yellow-400/90" />;
      case 'pdf':
        return <BookOpen className="w-8 h-8 text-rose-400/90" />;
      case 'txt':
        return <FileText className="w-8 h-8 text-zinc-400/90" />;
      default:
        return <FileCode className="w-8 h-8 text-indigo-400/90" />;
    }
  };

  const getFileSize = (n: FSNode): string => {
    if (n.type === 'directory') return '--';
    const file = n as FSFile;
    const bytes = new Blob([file.content]).size;
    if (bytes < 1024) return `${bytes} B`;
    return `${(bytes / 1024).toFixed(1)} KB`;
  };

  // Render file viewer based on extension or custom path dashboards
  const renderFileContent = (file: FSFile) => {
    // Intercept with visual dashboards
    if (file.path === '/about.md') {
      return <AboutDashboard />;
    }
    if (file.path === '/skills.yaml') {
      return <SkillsDashboard content={file.content} />;
    }
    if (file.path === '/achievements.json') {
      return <AchievementsDashboard content={file.content} />;
    }
    if (file.path === '/contact.txt') {
      return <ContactDashboard />;
    }
    
    // Project case studies
    if (file.path.startsWith('/projects/')) {
      const projName = file.name.replace(/\.(md|yaml|json|txt|pdf)$/, '');
      return <ProjectCaseStudy projectName={projName} />;
    }

    switch (file.extension) {
      case 'md':
        return <MarkdownRenderer content={file.content} />;
      case 'yaml':
        return <YamlRenderer content={file.content} />;
      case 'json':
        return <JsonRenderer content={file.content} />;
      case 'pdf':
        return <PdfRenderer content={file.content} />;
      case 'txt':
        return <TextRenderer content={file.content} />;
      default:
        return (
          <div className="p-4 bg-bg-dark border border-border-dark rounded-xl font-mono text-sm text-text-secondary">
            {file.content}
          </div>
        );
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="w-full h-full flex flex-col"
      >
        {!node ? (
          /* File Not Found View */
          <div className="flex flex-col items-center justify-center py-20 text-center select-none font-mono">
            <AlertTriangle className="w-12 h-12 text-rose-500 mb-4 animate-bounce" />
            <h2 className="text-lg font-semibold text-text-primary mb-2">404: Node Not Found</h2>
            <p className="text-sm text-text-muted max-w-sm mb-6">
              The path <code className="bg-border-dark px-1.5 py-0.5 rounded text-accent-teal">{fsPath}</code> does not exist in the virtual filesystem.
            </p>
            <button
              onClick={() => navigate('/about')}
              className="px-4 py-2 bg-accent-blue/15 hover:bg-accent-blue/30 text-accent-blue rounded-lg text-xs font-semibold border border-accent-blue/20 transition-all cursor-pointer"
            >
              Go to ~/about.md
            </button>
          </div>
        ) : node.type === 'directory' ? (
          /* Directory Folder Explorer View */
          <div className="select-none">
            <div className="flex items-center justify-between border-b border-border-dark pb-3 mb-6">
              <h1 className="text-xl font-semibold text-text-primary font-mono flex items-center space-x-2">
                <Folder className="w-5 h-5 text-amber-500" />
                <span>Index of {node.name}/</span>
              </h1>
              <div className="flex items-center space-x-2 text-xs text-text-muted font-mono">
                <HardDrive className="w-3.5 h-3.5" />
                <span>virtual-fs</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {(node as FSDirectory).children.map(child => (
                <button
                  key={child.path}
                  onClick={() => navigate(fsPathToRoute(child.path))}
                  className="flex flex-col items-center p-4 border border-border-dark/60 rounded-xl bg-card-dark/20 hover:bg-card-dark/65 hover:border-border-focus hover:-translate-y-0.5 transition-all duration-200 text-center cursor-pointer group"
                >
                  <div className="mb-3 group-hover:scale-105 transition-transform duration-200">
                    {getNodeIcon(child)}
                  </div>
                  <span className="text-xs font-mono text-text-secondary group-hover:text-text-primary truncate w-full px-1">
                    {child.name}
                  </span>
                  <span className="text-[10px] font-mono text-text-muted mt-1">
                    {getFileSize(child)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* File View Layout */
          <div className="flex flex-col h-full">
            {/* File Metadata Details Panel */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-2 text-[10px] text-text-muted font-mono mb-4 border-b border-border-dark/40 pb-2 select-none">
              <div className="flex items-center space-x-3">
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-text-muted" />
                  <span>Last sync: 2026-06-19</span>
                </span>
                <span>Size: {getFileSize(node)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-1.5 py-0.5 rounded bg-border-dark/80 text-text-secondary border border-border-dark">
                  Mode: -rw-r--r--
                </span>
              </div>
            </div>

            {/* File content renderer */}
            <div className="flex-1">
              {renderFileContent(node as FSFile)}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
