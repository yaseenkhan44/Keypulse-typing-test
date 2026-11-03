import React, { useState } from 'react';
import { Menu, X, Keyboard } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface HeaderProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (href: string) => {
    onNavigate(href);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Home', href: '#/' },
    { label: 'Typing Test', href: '#/typing-test' },
    { label: 'Practice', href: '#/typing-practice' },
    { label: 'Lessons', href: '#/typing-lessons' },
    { label: 'Games', href: '#/typing-games' },
    { label: 'Blog', href: '#/blog' },
    { label: 'About', href: '#/about' },
    { label: 'Contact', href: '#/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '#/' && (currentRoute === '#/' || currentRoute === '' || currentRoute === '#')) {
      return true;
    }
    return currentRoute.startsWith(href) && href !== '#/';
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a
          href="#/"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('#/');
          }}
          className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 group"
        >
          <span className="w-8 h-8 rounded-lg bg-sky-500 text-white flex items-center justify-center shadow-xs group-hover:bg-sky-600 transition-colors">
            <Keyboard className="w-5 h-5" />
          </span>
          <span>
            Key<span className="text-sky-600">Pulse</span>
          </span>
        </a>

        {/* Zone 2: Navigation Links (Clean single-line prose, no pills) */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-slate-600"
        >
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                  active
                    ? 'text-sky-600 border-sky-600 font-semibold'
                    : 'border-transparent hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action (Single button) & Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#/typing-test"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#/typing-test');
            }}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-700 active:bg-sky-800 transition-colors shadow-xs whitespace-nowrap shrink-0"
          >
            Start Test
          </a>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md focus:outline-hidden focus:ring-2 focus:ring-sky-500"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-lg">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className={`block px-3 py-2 text-base font-medium rounded-md ${
                  active
                    ? 'bg-sky-50 text-sky-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <div className="pt-3">
            <a
              href="#/typing-test"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#/typing-test');
              }}
              className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-700 transition-colors"
            >
              Start Free Typing Test
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
