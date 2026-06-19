import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Breadcrumbs } from './Breadcrumbs';
import { CommandPalette } from './CommandPalette';
import { 
  Menu, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Command, 
  Maximize2,
  Minimize2,
  FolderOpen,
  Sun,
  Moon,
  FileDown
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // Monitor screen resizing to handle collapses automatically
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Set up Ctrl+K global listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="flex w-screen h-screen overflow-hidden bg-bg-dark text-text-primary">
      {/* Sidebar Explorer */}
      <Sidebar
        onOpenSearch={() => setIsSearchOpen(true)}
        isCollapsed={isCollapsed}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col h-full min-w-0 relative">
        
        {/* Top Path Navigation / Control Header */}
        <header className="h-14 border-b border-border-dark flex items-center justify-between px-4 bg-sidebar-dark/40 flex-shrink-0 backdrop-blur-md z-30">
          <div className="flex items-center space-x-3 min-w-0">
            {/* Sidebar toggle for mobile */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden p-1.5 text-text-secondary hover:text-text-primary hover:bg-border-dark/50 rounded-lg transition-colors cursor-pointer"
              title="Open Explorer"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Sidebar toggle for desktop */}
            <button
              onClick={() => setIsCollapsed(prev => !prev)}
              className="hidden md:block p-1.5 text-text-secondary hover:text-text-primary hover:bg-border-dark/50 rounded-lg transition-colors cursor-pointer"
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              <FolderOpen className="w-4 h-4" />
            </button>

            {/* Browser-style Back / Forward Navigation */}
            <div className="hidden sm:flex items-center space-x-1 border-r border-border-dark/60 pr-3 mr-1">
              <button
                onClick={() => navigate(-1)}
                className="p-1 text-text-secondary hover:text-text-primary hover:bg-border-dark/40 rounded-md transition-colors cursor-pointer"
                title="Go Back"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate(1)}
                className="p-1 text-text-secondary hover:text-text-primary hover:bg-border-dark/40 rounded-md transition-colors cursor-pointer"
                title="Go Forward"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Filesystem Breadcrumbs */}
            <Breadcrumbs currentRoute={location.pathname} />
          </div>

          {/* Top Right Utilities */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            {/* Search trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-text-secondary hover:text-text-primary hover:bg-border-dark/50 rounded-lg transition-colors cursor-pointer"
              title="Search Files (Ctrl+K)"
            >
              <Search className="w-4 h-4" />
            </button>
            
            {/* Theme Toggle (Visual Mock with glow feedback) */}
            <button
              onClick={() => setIsDarkTheme(prev => !prev)}
              className="p-2 text-text-secondary hover:text-text-primary hover:bg-border-dark/50 rounded-lg transition-colors cursor-pointer"
              title="Toggle Theme"
            >
              {isDarkTheme ? <Moon className="w-4 h-4 text-accent-blue" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>

            {/* Quick Resume Download */}
            <a
              href="/resume.pdf"
              download="Rakshana_Resume.pdf"
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 bg-accent-teal/10 hover:bg-accent-teal/20 text-accent-teal border border-accent-teal/20 hover:border-accent-teal/30 rounded-lg text-xs font-mono transition-all font-medium cursor-pointer"
              title="Download Resume"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>

            {/* GitHub Profile Button */}
            <a
              href="https://github.com/Rakshana24"
              target="_blank"
              rel="noreferrer"
              className="p-2 text-text-secondary hover:text-text-primary hover:bg-border-dark/50 rounded-lg transition-colors cursor-pointer"
              title="View GitHub Profile"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </a>
            
            {/* Fullscreen control */}
            <button
              onClick={handleToggleFullscreen}
              className="p-2 text-text-secondary hover:text-text-primary hover:bg-border-dark/50 rounded-lg transition-colors cursor-pointer"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Viewer"}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <div className="hidden lg:flex items-center space-x-1 text-xs text-text-muted font-mono bg-bg-dark/60 px-2.5 py-1 rounded-md border border-border-dark/50">
              <Command className="w-3 h-3" />
              <span>+ K</span>
            </div>
          </div>
        </header>

        {/* Content Panel Wrapper */}
        <main className="flex-1 overflow-hidden relative grid-dots bg-bg-dark">
          {/* Spotlight Ambient Lighting Effects (Linear-style Glowing Orbs) */}
          <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-accent-blue/4 blur-[120px] pointer-events-none pulse-ambient" />
          <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] rounded-full bg-accent-teal/3 blur-[100px] pointer-events-none pulse-ambient" style={{ animationDelay: '2s' }} />
          <div className="absolute top-[30%] right-[20%] w-[300px] h-[300px] rounded-full bg-accent-purple/3 blur-[90px] pointer-events-none pulse-ambient" style={{ animationDelay: '4s' }} />
          
          {/* Main scrollable layout panel */}
          <div className="h-full w-full overflow-y-auto px-4 py-6 md:px-8 md:py-8 z-10 relative">
            <div className="max-w-4xl mx-auto w-full h-full">
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* Global Command Palette */}
      <CommandPalette 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </div>
  );
};
