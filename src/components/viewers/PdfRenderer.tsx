import React, { useState, useRef } from 'react';
import { Download, ZoomIn, ZoomOut, Maximize, Minimize, ExternalLink, FileText } from 'lucide-react';

interface PdfRendererProps {
  content: string; // Placeholder string in filesystem node
}

export const PdfRenderer: React.FC<PdfRendererProps> = () => {
  const [zoom, setZoom] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 15, 150));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 15, 70));
  };

  const handleToggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error(err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }

    // Handle exiting via ESC key
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
  };

  return (
    <div 
      ref={containerRef}
      className={`border border-border-dark rounded-xl bg-card-dark/60 overflow-hidden shadow-lg flex flex-col transition-all ${
        isFullscreen ? 'w-screen h-screen rounded-none border-none p-4 bg-bg-dark' : 'h-[650px]'
      }`}
    >
      {/* PDF Action Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-dark bg-sidebar-dark/40 flex-shrink-0 z-10">
        <div className="flex items-center space-x-2 text-xs font-mono">
          <FileText className="w-4 h-4 text-rose-500" />
          <span className="text-text-primary font-medium">resume.pdf</span>
        </div>

        {/* Zoom & View Controls */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center border border-border-dark rounded-lg bg-bg-dark/50 px-1 py-0.5 space-x-1">
            <button
              onClick={handleZoomOut}
              disabled={zoom <= 70}
              className="p-1 text-text-secondary hover:text-text-primary hover:bg-border-dark rounded-md disabled:opacity-30 cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono text-text-secondary min-w-[36px] text-center">
              {zoom}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoom >= 150}
              className="p-1 text-text-secondary hover:text-text-primary hover:bg-border-dark rounded-md disabled:opacity-30 cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Fullscreen toggle */}
          <button
            onClick={handleToggleFullscreen}
            className="p-1.5 text-text-secondary hover:text-text-primary hover:bg-border-dark rounded-lg cursor-pointer"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Viewer"}
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>

        {/* PDF Actions */}
        <div className="flex items-center space-x-2">
          {/* New Tab link */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="p-1.5 text-text-secondary hover:text-text-primary hover:bg-border-dark rounded-lg transition-colors cursor-pointer"
            title="Open in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </a>

          {/* Download button */}
          <a
            href="/resume.pdf"
            download="Rakshana_Resume.pdf"
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-accent-blue/15 hover:bg-accent-blue/30 text-accent-blue hover:text-blue-300 rounded-lg text-xs font-medium transition-all cursor-pointer"
            title="Download PDF file"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download</span>
          </a>
        </div>
      </div>

      {/* Embedded PDF View */}
      <div className="flex-1 bg-[#18181c] overflow-auto p-4 flex items-start justify-center relative">
        <div 
          className="transition-all duration-200 h-full shadow-2xl rounded-sm border border-border-dark/60 bg-white"
          style={{ width: `${zoom}%`, maxWidth: '100%', minWidth: '320px' }}
        >
          {/* Web standard tag for embedded documents */}
          <object
            data="/resume.pdf#toolbar=0&navpanes=0&scrollbar=1"
            type="application/pdf"
            className="w-full h-full"
          >
            {/* Fallback iframe */}
            <iframe
              src="/resume.pdf#toolbar=0&navpanes=0"
              title="Resume Preview"
              className="w-full h-full border-none"
            >
              {/* Fallback message for unsupported browsers */}
              <div className="flex flex-col items-center justify-center h-full p-8 text-center text-text-secondary bg-[#141418] font-mono text-sm">
                <FileText className="w-12 h-12 text-rose-500/80 mb-4" />
                <p className="mb-4">This browser does not support embedded PDF previews.</p>
                <a
                  href="/resume.pdf"
                  download="Rakshana_Resume.pdf"
                  className="px-4 py-2 bg-accent-blue hover:bg-blue-600 text-white rounded-lg transition-colors font-sans"
                >
                  Download resume.pdf
                </a>
              </div>
            </iframe>
          </object>
        </div>
      </div>
    </div>
  );
};
