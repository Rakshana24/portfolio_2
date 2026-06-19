import React, { useState } from 'react';
import { FileText, Copy, Check } from 'lucide-react';

interface TextRendererProps {
  content: string;
}

export const TextRenderer: React.FC<TextRendererProps> = ({ content }) => {
  const [copied, setCopied] = useState(false);
  const lines = content.split('\n');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="border border-border-dark rounded-xl bg-card-dark/60 overflow-hidden shadow-lg flex flex-col h-full min-h-[450px]">
      
      {/* Viewer Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-dark bg-sidebar-dark/40 flex-shrink-0">
        <div className="flex items-center space-x-2 text-xs font-mono">
          <FileText className="w-4 h-4 text-zinc-400" />
          <span className="text-text-primary font-medium">contact.txt</span>
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

      {/* Text Viewer Content */}
      <div className="flex-1 p-4 overflow-y-auto bg-[#0a0a0c] font-mono text-xs md:text-sm leading-6 select-text flex">
        {/* Gutter Line Numbers */}
        <div className="text-right text-text-muted pr-4 border-r border-border-dark/40 select-none min-w-[2.5rem]">
          {lines.map((_, i) => (
            <div key={i} className="h-6">
              {i + 1}
            </div>
          ))}
        </div>
        
        {/* Raw Text Lines */}
        <div className="pl-4 flex-1 overflow-x-auto whitespace-pre">
          {lines.map((line, i) => (
            <div key={i} className="h-6 hover:bg-border-dark/20 px-1 rounded-sm text-zinc-300">
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
