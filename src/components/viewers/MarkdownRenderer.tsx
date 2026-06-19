import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Check, Terminal, ExternalLink } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <article className="prose prose-invert max-w-none text-text-secondary select-text font-sans leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl md:text-3xl font-semibold text-text-primary tracking-tight mt-2 mb-6 border-b border-border-dark pb-3">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-medium text-text-primary mt-8 mb-4 flex items-center space-x-2">
              <span className="text-accent-teal font-mono mr-1">##</span>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base font-semibold text-text-primary mt-6 mb-2 flex items-center">
              <span className="text-accent-blue font-mono mr-1">###</span>
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-sm md:text-base mb-4 text-text-secondary">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-5 space-y-2 mb-4 text-sm md:text-base text-text-secondary">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-5 space-y-2 mb-4 text-sm md:text-base text-text-secondary">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="pl-1">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-accent-blue/50 bg-border-dark/20 px-4 py-2 my-6 rounded-r-lg text-text-secondary/90 italic text-sm">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => {
            const isExternal = href?.startsWith('http');
            return (
              <a
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center text-accent-blue hover:text-blue-400 hover:underline transition-colors font-medium cursor-pointer"
              >
                {children}
                {isExternal && <ExternalLink className="w-3 h-3 ml-1" />}
              </a>
            );
          },
          hr: () => <hr className="border-border-dark my-8" />,
          code: ({ className, children }) => {
            const match = /language-(\w+)/.exec(className || '');
            const codeString = String(children).replace(/\n$/, '');
            const isInline = !className || !className.startsWith('language-');

            if (!isInline && match) {
              return <CodeBlock code={codeString} language={match[1]} />;
            }

            // Fallback for diagram / drawing blocks inside ``` or standard text blocks
            if (!isInline) {
              return <CodeBlock code={codeString} language="text" />;
            }

            return (
              <code className="px-1.5 py-0.5 rounded-md bg-border-dark/80 text-accent-teal font-mono text-xs font-semibold">
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
};

/* Sub-component to render clean code blocks with copy features */
interface CodeBlockProps {
  code: string;
  language: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Simple syntax highlighter for display representation inside portfolio
  const highlightCode = (rawCode: string, lang: string) => {
    if (lang === 'text' || lang === 'ascii') {
      return <span className="text-zinc-300 font-mono">{rawCode}</span>;
    }

    // Basic coloring for terminal outputs/boilerplates in MD
    return <span className="text-zinc-200">{rawCode}</span>;
  };

  return (
    <div className="my-6 border border-border-dark rounded-xl bg-bg-dark/80 overflow-hidden shadow-lg font-mono">
      {/* Code Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border-dark bg-sidebar-dark/40 text-xs">
        <div className="flex items-center space-x-2 text-text-secondary">
          <Terminal className="w-3.5 h-3.5 text-accent-blue" />
          <span className="uppercase text-[10px] tracking-wider text-text-muted font-bold">{language}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1.5 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
          title="Copy Code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 text-[10px]">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="text-[10px]">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <div className="p-4 overflow-x-auto text-xs md:text-sm leading-relaxed bg-[#0c0c0e]">
        <pre className="m-0">
          <code>{highlightCode(code, language)}</code>
        </pre>
      </div>
    </div>
  );
};
