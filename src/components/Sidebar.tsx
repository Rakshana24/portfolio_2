import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Folder, 
  FolderOpen, 
  FileCode, 
  ChevronRight, 
  ChevronDown, 
  Search, 
  BookOpen, 
  Braces, 
  FileText,
  Mail,
  User,
  X
} from 'lucide-react';
import { filesystem, fsPathToRoute } from '../data/filesystemData';
import type { FSNode, FSDirectory, FSFile } from '../types/fs';

interface SidebarProps {
  onOpenSearch: () => void;
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  onOpenSearch, 
  isCollapsed, 
  isMobileOpen,
  onCloseMobile
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Track open/collapsed folders by path (projects is open by default)
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    '/projects': true
  });

  const toggleFolder = (path: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedFolders(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const handleFileClick = (path: string) => {
    const route = fsPathToRoute(path);
    navigate(route);
    onCloseMobile(); // Close mobile drawer on navigation
  };

  const getFileIcon = (file: FSFile) => {
    switch (file.extension) {
      case 'md':
        if (file.name === 'about.md') return <User className="w-4 h-4 text-emerald-400" />;
        return <FileCode className="w-4 h-4 text-blue-400" />;
      case 'yaml':
        return <Braces className="w-4 h-4 text-amber-400" />;
      case 'json':
        return <Braces className="w-4 h-4 text-yellow-400" />;
      case 'pdf':
        return <BookOpen className="w-4 h-4 text-rose-400" />;
      case 'txt':
        return <FileText className="w-4 h-4 text-zinc-400" />;
      default:
        return <FileCode className="w-4 h-4 text-indigo-400" />;
    }
  };

  // Render tree recursively
  const renderTree = (node: FSNode, depth = 0) => {
    const isDirectory = node.type === 'directory';
    const isExpanded = expandedFolders[node.path];
    const isActive = location.pathname === fsPathToRoute(node.path);

    if (isDirectory) {
      const dir = node as FSDirectory;
      return (
        <div key={dir.path} className="w-full">
          <button
            onClick={(e) => toggleFolder(dir.path, e)}
            style={{ paddingLeft: `${depth * 12 + 8}px` }}
            className="flex items-center w-full py-1.5 px-2 hover:bg-border-dark/40 text-text-secondary hover:text-text-primary rounded-md transition-colors text-xs font-mono group"
          >
            <span className="mr-1 text-text-muted group-hover:text-text-secondary transition-colors">
              {isExpanded ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </span>
            <span className="mr-2 text-amber-500/80">
              {isExpanded ? (
                <FolderOpen className="w-4 h-4" />
              ) : (
                <Folder className="w-4 h-4" />
              )}
            </span>
            <span className="truncate">{dir.name}</span>
          </button>
          
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.18, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                {dir.children.map(child => renderTree(child, depth + 1))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    } else {
      const file = node as FSFile;
      return (
        <button
          key={file.path}
          onClick={() => handleFileClick(file.path)}
          style={{ paddingLeft: `${depth * 12 + 20}px` }}
          className={`flex items-center w-full py-1.5 px-2 rounded-md transition-all text-xs font-mono border-l-2 ${
            isActive
              ? 'bg-border-dark/60 text-text-primary border-accent-blue shadow-[inset_4px_0_12px_-4px_rgba(59,130,246,0.15)]'
              : 'text-text-secondary border-transparent hover:bg-border-dark/30 hover:text-text-primary'
          }`}
        >
          <span className="mr-2 flex-shrink-0">
            {getFileIcon(file)}
          </span>
          <span className="truncate">{file.name}</span>
        </button>
      );
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-sidebar-dark border-r border-border-dark select-none">
      {/* Sidebar Header: App Dots & Title */}
      <div className="flex items-center justify-between p-4 border-b border-border-dark flex-shrink-0">
        <div className="flex items-center space-x-2">
          {/* OS Window dots */}
          <div className="flex space-x-1.5">
            <span className="window-dot window-dot-red" />
            <span className="window-dot window-dot-yellow" />
            <span className="window-dot window-dot-green" />
          </div>
          {!isCollapsed && (
            <span className="text-[10px] text-text-muted font-mono pl-2 tracking-wider uppercase">
              FS-Explorer
            </span>
          )}
        </div>
        
        {/* Mobile close button */}
        <button 
          onClick={onCloseMobile}
          className="md:hidden p-1 text-text-secondary hover:text-text-primary rounded-md"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Profile Card Block */}
      {!isCollapsed && (
        <div className="p-4 border-b border-border-dark bg-sidebar-dark/20 flex-shrink-0">
          <div className="flex items-center space-x-3">
            {/* Visual Avatar */}
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-tr from-accent-blue/40 to-accent-teal/40 p-[1px] flex-shrink-0 overflow-hidden shadow-md">
              <img 
                src="/avatar.jpg" 
                alt="Rakshana T" 
                className="w-full h-full object-cover rounded-xl"
              />
              {/* Pulse Online Indicator */}
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-bg-dark ring-2 ring-emerald-500/20 animate-pulse" />
            </div>
            
            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-text-primary tracking-tight font-sans">RAKSHANA T</h2>
              <p className="text-[10px] text-text-secondary truncate mt-0.5 font-sans">Backend • AI • DevOps</p>
              <div className="flex items-center space-x-1.5 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[9px] text-emerald-400 font-mono tracking-wider uppercase font-medium">Available</span>
              </div>
            </div>
          </div>

          {/* Quick stats grid */}
          <div className="grid grid-cols-3 gap-1.5 mt-4 pt-3 border-t border-border-dark/40 text-center font-mono">
            <div className="px-1 py-1 rounded-md bg-bg-dark/40 border border-border-dark/30">
              <div className="text-[9px] text-text-muted uppercase tracking-wider">CGPA</div>
              <div className="text-[11px] font-bold text-text-primary mt-0.5">8.97</div>
            </div>
            <div className="px-1 py-1 rounded-md bg-bg-dark/40 border border-border-dark/30">
              <div className="text-[9px] text-text-muted uppercase tracking-wider">LeetCode</div>
              <div className="text-[11px] font-bold text-text-primary mt-0.5">200+</div>
            </div>
            <div className="px-1 py-1 rounded-md bg-bg-dark/40 border border-border-dark/30">
              <div className="text-[9px] text-text-muted uppercase tracking-wider">Projects</div>
              <div className="text-[11px] font-bold text-text-primary mt-0.5">5+</div>
            </div>
          </div>
        </div>
      )}

      {/* Search Trigger Button */}
      <div className="p-3 flex-shrink-0">
        <button
          onClick={onOpenSearch}
          className={`flex items-center w-full px-3 py-1.5 bg-bg-dark/70 hover:bg-bg-dark border border-border-dark hover:border-border-focus rounded-lg text-left text-text-muted hover:text-text-secondary transition-all font-sans cursor-pointer ${
            isCollapsed ? 'justify-center py-2' : ''
          }`}
        >
          <Search className="w-4 h-4 flex-shrink-0" />
          {!isCollapsed && (
            <div className="flex items-center justify-between w-full ml-2 text-xs">
              <span>Quick Search</span>
              <span className="px-1 py-0.5 text-[9px] font-mono border rounded border-border-dark bg-sidebar-dark text-text-muted">
                ⌘K
              </span>
            </div>
          )}
        </button>
      </div>

      {/* Navigation Filesystem Tree */}
      <div className="flex-1 overflow-y-auto px-2 py-1 space-y-1">
        {isCollapsed ? (
          <div className="flex flex-col items-center pt-4 space-y-4">
            <User className="w-5 h-5 text-emerald-400" onClick={() => navigate('/about')} />
            <Braces className="w-5 h-5 text-amber-400" onClick={() => navigate('/skills')} />
            <Folder className="w-5 h-5 text-amber-500" onClick={() => navigate('/projects/forestmind')} />
            <BookOpen className="w-5 h-5 text-rose-400" onClick={() => navigate('/resume')} />
            <FileText className="w-5 h-5 text-zinc-400" onClick={() => navigate('/contact')} />
          </div>
        ) : (
          filesystem.children.map(node => renderTree(node))
        )}
      </div>

      {/* Sidebar Footer: Social profiles & settings */}
      {!isCollapsed && (
        <div className="p-4 border-t border-border-dark bg-sidebar-dark/40 flex-shrink-0 space-y-3 font-mono">
          <div className="flex items-center justify-around text-text-secondary">
            <a 
              href="https://github.com/Rakshana24" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-text-primary hover:scale-105 transition-all text-text-secondary hover:text-white"
              title="GitHub"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </a>
            <a 
              href="https://www.linkedin.com/in/rakshanat/" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-text-primary hover:scale-105 transition-all text-text-secondary hover:text-white"
              title="LinkedIn"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/>
              </svg>
            </a>
            <a 
              href="mailto:rakshanarakshana672@gmail.com"
              className="hover:text-text-primary hover:scale-105 transition-all text-text-secondary hover:text-white"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
          
          <div className="flex items-center justify-between text-[9px] text-text-muted pt-1 border-t border-border-dark/40">
            <span>branch: <span className="text-accent-blue font-semibold">main</span></span>
            <span>v1.2.0</span>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar: normal container */}
      <aside 
        className={`hidden md:block h-full transition-all duration-300 ease-in-out flex-shrink-0 ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar: Animated Drawer Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
              className="fixed inset-0 z-40 bg-black md:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-64 h-full md:hidden"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
