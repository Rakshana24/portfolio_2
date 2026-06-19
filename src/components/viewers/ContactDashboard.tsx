import React, { useState } from 'react';
import { Mail, Phone, Copy, Check, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export const ContactDashboard: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const contacts = [
    {
      id: 'email',
      title: 'Email',
      value: 'rakshanarakshana672@gmail.com',
      url: 'mailto:rakshanarakshana672@gmail.com',
      icon: <Mail className="w-5 h-5 text-accent-blue" />,
      actionText: 'Copy Email Address'
    },
    {
      id: 'linkedin',
      title: 'LinkedIn',
      value: 'linkedin.com/in/rakshanat',
      url: 'https://www.linkedin.com/in/rakshanat/',
      icon: (
        <svg className="w-5 h-5 fill-current text-accent-teal" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/>
        </svg>
      ),
      actionText: 'Open Profile'
    },
    {
      id: 'github',
      title: 'GitHub',
      value: 'github.com/Rakshana24',
      url: 'https://github.com/Rakshana24',
      icon: (
        <svg className="w-5 h-5 fill-current text-purple-400" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
        </svg>
      ),
      actionText: 'Open Repositories'
    },
    {
      id: 'phone',
      title: 'Phone',
      value: '+91 9344987283',
      url: 'tel:+919344987283',
      icon: <Phone className="w-5 h-5 text-amber-400" />,
      actionText: 'Copy Number'
    }
  ];

  const handleAction = async (id: string, value: string, url: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (id === 'email' || id === 'phone') {
      try {
        await navigator.clipboard.writeText(value);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2500);
      } catch (err) {
        console.error(err);
      }
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="space-y-8 select-text font-sans">
      
      {/* Header Info */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden border border-border-dark rounded-2xl bg-card-dark/30 p-6 md:p-8 backdrop-blur-md"
      >
        <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-accent-blue/5 rounded-full blur-[80px] pointer-events-none" />
        <h1 className="text-3xl font-extrabold tracking-tight text-text-primary">
          LET'S CONNECT
        </h1>
        <p className="text-sm text-text-secondary mt-2 max-w-lg leading-relaxed">
          I'm always interested in system architecture, multi-agent AI frameworks, distributed caching, and backend tooling. Choose any of the channels below to reach out.
        </p>
      </motion.div>

      {/* Grid of Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {contacts.map((contact, i) => {
          const isCopyAction = contact.id === 'email' || contact.id === 'phone';
          const isCopied = copiedId === contact.id;
          
          return (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              key={contact.id}
              className="glass-panel p-5 rounded-2xl glow-card flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 w-fit bg-bg-dark border border-border-dark/80 rounded-xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
                  {contact.icon}
                </div>
                
                {/* External link or Copy indicator icon */}
                <div className="text-text-muted hover:text-text-primary transition-colors cursor-pointer">
                  {isCopyAction ? (
                    isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" onClick={(e) => handleAction(contact.id, contact.value, contact.url, e)} />
                  ) : (
                    <ExternalLink className="w-4 h-4" onClick={(e) => handleAction(contact.id, contact.value, contact.url, e)} />
                  )}
                </div>
              </div>

              <div className="mt-6">
                <span className="text-[10px] uppercase tracking-wider font-mono text-text-muted">
                  {contact.title}
                </span>
                <div className="text-base font-bold text-text-primary font-mono mt-1 break-all truncate">
                  {contact.value}
                </div>
              </div>

              {/* Action Button Trigger */}
              <button
                onClick={(e) => handleAction(contact.id, contact.value, contact.url, e)}
                className={`mt-4 w-full py-2 border rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                  isCopied
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : 'bg-bg-dark/60 border-border-dark hover:border-border-focus text-text-secondary hover:text-text-primary'
                }`}
              >
                {isCopyAction ? (
                  isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{contact.actionText}</span>
                    </>
                  )
                ) : (
                  <>
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{contact.actionText}</span>
                  </>
                )}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Let's Build Something Amazing CTA Block */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden border border-border-dark rounded-2xl bg-gradient-to-br from-card-dark/20 to-border-dark/20 p-8 text-center select-none"
      >
        <div className="absolute top-0 left-[30%] w-[300px] h-[300px] bg-accent-teal/5 rounded-full blur-[100px] pointer-events-none pulse-ambient" />
        
        <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-text-primary font-sans">
          LET'S BUILD SOMETHING AMAZING
        </h2>
        <p className="text-xs md:text-sm text-text-secondary max-w-md mx-auto mt-2 leading-relaxed">
          I am currently open to internship, full-time, and contract developer opportunities. Let's work together to design intelligent backend systems.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="mailto:rakshanarakshana672@gmail.com"
            className="flex items-center justify-center w-full sm:w-auto px-5 py-2.5 bg-text-primary hover:bg-white text-bg-dark font-semibold rounded-xl text-xs transition-all duration-200 cursor-pointer"
          >
            Send an Email
          </a>
          <a
            href="https://www.linkedin.com/in/rakshanat/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center w-full sm:w-auto px-5 py-2.5 bg-card-dark border border-border-dark hover:border-border-focus text-text-secondary hover:text-text-primary font-semibold rounded-xl text-xs transition-all duration-200 cursor-pointer"
          >
            Connect on LinkedIn
          </a>
        </div>
      </motion.div>

    </div>
  );
};
