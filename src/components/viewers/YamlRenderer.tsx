import React, { useState } from 'react';
import yaml from 'js-yaml';
import { FileCode, Eye, ChevronDown, ChevronRight, Check, Copy } from 'lucide-react';

interface YamlRendererProps {
  content: string;
}

export const YamlRenderer: React.FC<YamlRendererProps> = ({ content }) => {
  const [viewMode, setViewMode] = useState<'raw' | 'outline'>('raw');
  const [copied, setCopied] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  // Parse YAML for interactive outline view
  let parsedData: any = null;
  let parseError: string | null = null;
  try {
    parsedData = yaml.load(content);
  } catch (err: any) {
    parseError = err.message || 'Error parsing YAML';
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleSection = (section: string) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Syntax highlighting helper for raw YAML lines
  const tokenizeLine = (line: string, index: number) => {
    if (line.trim().startsWith('#')) {
      return <span className="code-comment">{line}</span>;
    }

    // List item e.g., "  - TypeScript"
    const dashMatch = line.match(/^(\s*-\s*)(.*)/);
    if (dashMatch) {
      const prefix = dashMatch[1];
      const val = dashMatch[2];
      return (
        <span key={index}>
          <span className="text-accent-teal font-semibold">{prefix}</span>
          <span className="code-string">{val}</span>
        </span>
      );
    }

    // Key-value pair e.g., "languages:" or "port: 3000"
    const kvMatch = line.match(/^(\s*)([a-zA-Z0-9_\-]+):(.*)/);
    if (kvMatch) {
      const spacing = kvMatch[1];
      const key = kvMatch[2];
      const val = kvMatch[3];
      
      return (
        <span key={index}>
          {spacing}
          <span className="code-key">{key}</span>:
          {val && <span className="code-string">{val}</span>}
        </span>
      );
    }

    return <span key={index}>{line}</span>;
  };

  const lines = content.split('\n');

  return (
    <div className="border border-border-dark rounded-xl bg-card-dark/60 overflow-hidden shadow-lg flex flex-col h-full min-h-[450px]">
      
      {/* Viewer Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-dark bg-sidebar-dark/40 flex-shrink-0">
        {/* Toggle tabs */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('raw')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              viewMode === 'raw' 
                ? 'bg-border-dark text-text-primary' 
                : 'text-text-secondary hover:text-text-primary hover:bg-border-dark/40'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>yaml_code.yaml</span>
          </button>
          
          <button
            onClick={() => setViewMode('outline')}
            disabled={!!parseError}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer disabled:opacity-50 ${
              viewMode === 'outline' 
                ? 'bg-border-dark text-text-primary' 
                : 'text-text-secondary hover:text-text-primary hover:bg-border-dark/40'
            }`}
            title={parseError ? 'YAML syntax error prevents outline view' : 'Outline view'}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Interactive Outline</span>
          </button>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1.5 text-xs text-text-muted hover:text-text-primary transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Viewer Content Area */}
      <div className="flex-1 p-4 overflow-y-auto bg-[#0a0a0c]">
        {viewMode === 'raw' ? (
          /* Editor Layout with Line Numbers */
          <div className="font-mono text-xs md:text-sm select-text flex">
            {/* Gutter Line Numbers */}
            <div className="text-right text-text-muted pr-4 border-r border-border-dark/40 select-none min-w-[2.5rem]">
              {lines.map((_, i) => (
                <div key={i} className="h-5">
                  {i + 1}
                </div>
              ))}
            </div>
            
            {/* Tokens Container */}
            <div className="pl-4 flex-1 overflow-x-auto whitespace-pre leading-5">
              {lines.map((line, i) => (
                <div key={i} className="h-5 hover:bg-border-dark/20 px-1 rounded-sm">
                  {tokenizeLine(line, i)}
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Interactive Outline Mode */
          <div className="space-y-4 max-w-2xl mx-auto py-2 select-text">
            {parsedData && typeof parsedData === 'object' ? (
              Object.entries(parsedData).map(([key, val]) => {
                const isCollapsed = collapsedSections[key];
                return (
                  <div 
                    key={key} 
                    className="border border-border-dark rounded-xl bg-card-dark/40 overflow-hidden transition-all duration-200"
                  >
                    {/* Collapsible Header */}
                    <button
                      onClick={() => toggleSection(key)}
                      className="flex items-center justify-between w-full px-4 py-3 bg-sidebar-dark/30 hover:bg-sidebar-dark/65 transition-colors font-mono text-sm cursor-pointer"
                    >
                      <div className="flex items-center space-x-2 text-text-primary">
                        <span className="text-accent-blue font-bold font-sans">#</span>
                        <span className="font-semibold text-accent-teal">{key}</span>
                        {Array.isArray(val) && (
                          <span className="text-xs text-text-muted">({val.length} items)</span>
                        )}
                      </div>
                      <span className="text-text-muted">
                        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </span>
                    </button>

                    {/* Section Body */}
                    {!isCollapsed && (
                      <div className="p-4 border-t border-border-dark bg-card-dark/10">
                        {Array.isArray(val) ? (
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs md:text-sm">
                            {val.map((item: any, i: number) => (
                              <li 
                                key={i}
                                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-bg-dark/60 border border-border-dark/40 text-text-secondary hover:border-accent-blue/30 transition-all"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-accent-teal" />
                                <span className="font-medium text-text-primary">{item}</span>
                              </li>
                            ))}
                          </ul>
                        ) : typeof val === 'object' && val !== null ? (
                          <div className="grid grid-cols-1 gap-3 font-mono text-xs">
                            {Object.entries(val).map(([subK, subV]: [string, any]) => (
                              <div key={subK} className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-3 py-2 bg-bg-dark/40 border border-border-dark/30 rounded-lg">
                                <span className="text-text-secondary font-medium">{subK}</span>
                                <span className="text-accent-teal truncate max-w-[250px]">{String(subV)}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-text-secondary font-mono text-sm">
                            {String(val)}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-text-muted text-center py-6">
                No structural records to outline.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
