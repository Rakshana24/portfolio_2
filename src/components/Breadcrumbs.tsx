import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Folder, File, Terminal } from 'lucide-react';
import { routeToFsPath } from '../data/filesystemData';

interface BreadcrumbsProps {
  currentRoute: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ currentRoute }) => {
  const navigate = useNavigate();
  const fsPath = routeToFsPath(currentRoute);
  
  // E.g., "/projects/apiforge.md" -> ["projects", "apiforge.md"]
  // "/" or "/about" -> ["about.md"]
  const segments = fsPath.split('/').filter(Boolean);

  const handleHomeClick = () => {
    navigate('/about');
  };

  return (
    <div className="flex items-center space-x-1.5 text-xs text-text-secondary select-none font-mono py-1 px-3 bg-bg-dark/40 rounded-lg border border-border-dark/50 backdrop-blur-xs">
      <button 
        onClick={handleHomeClick}
        className="flex items-center space-x-1 hover:text-text-primary transition-colors cursor-pointer"
      >
        <Terminal className="w-3.5 h-3.5 text-accent-blue" />
        <span>~</span>
      </button>

      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1;
        const Icon = isLast ? File : Folder;
        
        return (
          <React.Fragment key={segment}>
            <ChevronRight className="w-3 h-3 text-text-muted flex-shrink-0" />
            <div className={`flex items-center space-x-1 ${isLast ? 'text-text-primary font-medium' : 'text-text-secondary'}`}>
              <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isLast ? 'text-accent-teal' : 'text-text-secondary/80'}`} />
              <span className="truncate max-w-[120px] sm:max-w-none">{segment}</span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};
