import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FileCode, CornerDownLeft } from 'lucide-react';
import { getFlatFiles, fsPathToRoute } from '../data/filesystemData';
import type { FSFile } from '../types/fs';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const files = getFlatFiles();
  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(query.toLowerCase()) ||
    file.path.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredFiles.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredFiles.length) % Math.max(1, filteredFiles.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredFiles[selectedIndex]) {
          handleSelect(filteredFiles[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredFiles, selectedIndex]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const handleSelect = (file: FSFile) => {
    const route = fsPathToRoute(file.path);
    navigate(route);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 bg-black/60 backdrop-blur-xs transition-opacity duration-300">
      <div 
        ref={containerRef}
        className="w-full max-w-lg overflow-hidden border rounded-xl bg-card-dark border-border-dark shadow-2xl transition-all duration-300 transform scale-100"
      >
        {/* Search Input */}
        <div className="flex items-center px-4 border-b border-border-dark">
          <Search className="w-5 h-5 text-text-secondary mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search files... (e.g. apiforge, skills)"
            className="w-full h-12 text-sm text-text-primary bg-transparent outline-hidden placeholder-text-muted font-sans"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <div className="px-1.5 py-0.5 text-[10px] font-mono border rounded-md border-border-dark text-text-muted bg-bg-dark">
            ESC
          </div>
        </div>

        {/* Results List */}
        <div className="max-h-[300px] overflow-y-auto p-2">
          {filteredFiles.length === 0 ? (
            <div className="py-8 text-center text-sm text-text-muted">
              No matching files found.
            </div>
          ) : (
            filteredFiles.map((file, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={file.path}
                  onClick={() => handleSelect(file)}
                  className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-left transition-colors duration-150 ${
                    isSelected 
                      ? 'bg-border-dark text-text-primary' 
                      : 'text-text-secondary hover:bg-border-dark/40 hover:text-text-primary'
                  }`}
                >
                  <div className="flex items-center min-w-0">
                    <FileCode className={`w-4 h-4 mr-3 flex-shrink-0 ${
                      isSelected ? 'text-accent-blue' : 'text-text-secondary'
                    }`} />
                    <div className="truncate">
                      <div className="text-sm font-medium font-sans">{file.name}</div>
                      <div className="text-xs text-text-muted font-mono">{file.path}</div>
                    </div>
                  </div>
                  
                  {isSelected && (
                    <div className="flex items-center text-[10px] text-text-muted font-mono bg-bg-dark px-1.5 py-0.5 rounded border border-border-dark">
                      <span className="mr-1">Select</span>
                      <CornerDownLeft className="w-2.5 h-2.5" />
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center px-4 py-2 border-t border-border-dark bg-sidebar-dark/50 text-[10px] text-text-muted font-mono">
          <div>
            Use <span className="text-text-secondary">↑↓</span> to navigate, <span className="text-text-secondary">Enter</span> to select
          </div>
          <div>
            Total {files.length} virtual files
          </div>
        </div>
      </div>
    </div>
  );
};
