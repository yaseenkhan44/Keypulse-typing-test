import React from 'react';
import { Keyboard, Shield, Award, Sparkles } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLinkClick = (href: string) => {
    onNavigate(href);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & About Column */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="#/"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#/');
              }}
              className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-white"
            >
              <span className="w-8 h-8 rounded-lg bg-sky-500 text-white flex items-center justify-center">
                <Keyboard className="w-5 h-5" />
              </span>
              <span>
                Key<span className="text-sky-400">Pulse</span>
              </span>
            </a>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              KeyPulse is a free, professional English typing platform built to help students,
              professionals, and transcriptionists master touch typing, boost Words Per Minute, and
              eliminate repetitive typing strain through scientific deliberate practice.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-sky-400" /> Free & Registration-Free
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-sky-400" /> Standard 5-Stroke WPM
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Serving typists across the United States, Canada, Australia, Italy, and worldwide.
            </p>
          </div>

          {/* Column 1: Typing Tools */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Typing Tests
            </h3>
            <ul className="space-y-2.5">
              {siteConfig.footerLinks.tools.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="text-slate-400 hover:text-white transition-colors text-xs"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Lessons & Guides */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Lessons & Guides
            </h3>
            <ul className="space-y-2.5">
              {siteConfig.footerLinks.lessons.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="text-slate-400 hover:text-white transition-colors text-xs"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {siteConfig.footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="text-slate-400 hover:text-white transition-colors text-xs"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Important Trust & Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Trust & Legal
            </h3>
            <ul className="space-y-2.5">
              {siteConfig.footerLinks.trust.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="text-slate-400 hover:text-white transition-colors text-xs"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} KeyPulse (keypulse.org). All rights reserved.</p>
          <p className="text-center sm:text-right text-slate-400">
            Compliant with Google Publisher Policies. No personal typing data is sold or stored without consent.
          </p>
        </div>
      </div>
    </footer>
  );
};
