import React, { useState } from 'react';
import { JsonView, darkStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import { Braces, Network, Copy, Check } from 'lucide-react';

interface JsonRendererProps {
  content: string;
}

export const JsonRenderer: React.FC<JsonRendererProps> = ({ content }) => {
  const [viewMode, setViewMode] = useState<'tree' | 'raw'>('tree');
  const [copied, setCopied] = useState(false);

  let parsedData: any = {};
  let parseError: string | null = null;
  try {
    parsedData = JSON.parse(content);
  } catch (err: any) {
    parseError = err.message || 'Invalid JSON';
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

  const lines = JSON.stringify(parsedData, null, 2).split('\n');

  // Syntax highlighting helper for raw JSON lines
  const tokenizeJsonLine = (line: string, index: number) => {
    // Matches keys like "summary":
    const keyMatch = line.match(/^(\s*)(".*?")(\s*:\s*)(.*)/);
    if (keyMatch) {
      const indent = keyMatch[1];
      const key = keyMatch[2];
      const colon = keyMatch[3];
      const val = keyMatch[4];
      
      let coloredValue = <span>{val}</span>;
      if (val.trim().startsWith('"')) {
        coloredValue = <span className="code-string">{val}</span>;
      } else if (val.trim().match(/^[0-9]+,?$/)) {
        coloredValue = <span className="code-number">{val}</span>;
      } else if (val.trim().startsWith('true') || val.trim().startsWith('false')) {
        coloredValue = <span className="code-boolean">{val}</span>;
      }

      return (
        <span key={index}>
          {indent}
          <span className="code-key">{key}</span>
          {colon}
          {coloredValue}
        </span>
      );
    }
    return <span key={index}>{line}</span>;
  };

  return (
    <div className="border border-border-dark rounded-xl bg-card-dark/60 overflow-hidden shadow-lg flex flex-col h-full min-h-[450px]">
      
      {/* Viewer Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-dark bg-sidebar-dark/40 flex-shrink-0">
        {/* Toggle buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('tree')}
            disabled={!!parseError}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer disabled:opacity-50 ${
              viewMode === 'tree' 
                ? 'bg-border-dark text-text-primary' 
                : 'text-text-secondary hover:text-text-primary hover:bg-border-dark/40'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>Interactive Tree</span>
          </button>
          
          <button
            onClick={() => setViewMode('raw')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              viewMode === 'raw' 
                ? 'bg-border-dark text-text-primary' 
                : 'text-text-secondary hover:text-text-primary hover:bg-border-dark/40'
            }`}
          >
            <Braces className="w-3.5 h-3.5" />
            <span>achievements.json</span>
          </button>
        </div>

        {/* Copy button */}
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
        {parseError ? (
          <div className="text-rose-400 font-mono text-sm p-4 border border-rose-500/20 bg-rose-500/5 rounded-lg">
            Error parsing JSON: {parseError}
          </div>
        ) : viewMode === 'tree' ? (
          /* Tree Renderer using react-json-view-lite */
          <div className="json-tree-container font-mono text-xs md:text-sm p-2 select-text leading-relaxed">
            <JsonView 
              data={parsedData} 
              style={{
                ...darkStyles,
                container: 'bg-transparent',
                label: 'text-accent-teal font-medium mr-1',
                stringValue: 'text-emerald-400 font-medium',
                booleanValue: 'text-blue-400 font-semibold',
                numberValue: 'text-amber-500 font-semibold',
                punctuation: 'text-text-muted',
              }}
            />
          </div>
        ) : (
          /* Raw Editor View with Line Numbers */
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
                  {tokenizeJsonLine(line, i)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
