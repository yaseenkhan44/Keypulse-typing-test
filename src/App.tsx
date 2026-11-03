import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { HomePage } from './pages/HomePage';
import { TypingTestPage } from './pages/TypingTestPage';
import { TypingPracticePage } from './pages/TypingPracticePage';
import { TypingLessonsPage } from './pages/TypingLessonsPage';
import { TypingGamesPage } from './pages/TypingGamesPage';
import { BlogListingPage } from './pages/BlogListingPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage, LegalDocType } from './pages/LegalPage';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return window.location.hash || '#/';
  });

  // Sync hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash || '#/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (route: string) => {
    window.location.hash = route;
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Route titles & SEO update
  useEffect(() => {
    if (currentRoute === '#/' || currentRoute === '' || currentRoute === '#') {
      document.title = 'KeyPulse | Free Online Typing Speed Test, Lessons & Practice';
    } else if (currentRoute.startsWith('#/typing-test')) {
      document.title = 'Typing Speed Test (WPM) | Accurate Online Test - KeyPulse';
    } else if (currentRoute.startsWith('#/typing-practice')) {
      document.title = 'Typing Practice | Home Row, Numbers & Advanced Drills - KeyPulse';
    } else if (currentRoute.startsWith('#/typing-lessons')) {
      document.title = 'Touch Typing Lessons | 8-Part Biomechanics Curriculum - KeyPulse';
    } else if (currentRoute.startsWith('#/typing-games')) {
      document.title = 'Educational Typing Games | Word Challenge & Racer - KeyPulse';
    } else if (currentRoute === '#/blog') {
      document.title = 'Typing Speed & Keyboard Mastery Blog | KeyPulse Articles';
    } else if (currentRoute.startsWith('#/about')) {
      document.title = 'About KeyPulse | Methodology, Standards & Mission';
    } else if (currentRoute.startsWith('#/contact')) {
      document.title = 'Contact KeyPulse | Support & Feedback';
    } else if (currentRoute.startsWith('#/privacy-policy')) {
      document.title = 'Privacy Policy | KeyPulse Data Protection';
    } else if (currentRoute.startsWith('#/terms')) {
      document.title = 'Terms and Conditions | KeyPulse';
    } else if (currentRoute.startsWith('#/disclaimer')) {
      document.title = 'Platform Disclaimer | KeyPulse';
    } else if (currentRoute.startsWith('#/cookie-policy')) {
      document.title = 'Cookie Policy & Consent | KeyPulse';
    }
  }, [currentRoute]);

  // Route Dispatcher
  const renderView = () => {
    const cleanRoute = currentRoute.split('?')[0];

    if (cleanRoute === '#/' || cleanRoute === '' || cleanRoute === '#') {
      return <HomePage onNavigate={handleNavigate} />;
    }
    if (cleanRoute.startsWith('#/typing-test')) {
      return <TypingTestPage />;
    }
    if (cleanRoute.startsWith('#/typing-practice')) {
      return <TypingPracticePage onNavigate={handleNavigate} />;
    }
    if (cleanRoute.startsWith('#/typing-lessons')) {
      return <TypingLessonsPage onNavigate={handleNavigate} />;
    }
    if (cleanRoute.startsWith('#/typing-games')) {
      return <TypingGamesPage />;
    }
    if (cleanRoute === '#/blog') {
      return <BlogListingPage onNavigate={handleNavigate} />;
    }
    if (cleanRoute.startsWith('#/blog/')) {
      const slug = cleanRoute.replace('#/blog/', '');
      return <BlogPostPage slug={slug} onNavigate={handleNavigate} />;
    }
    if (cleanRoute.startsWith('#/about')) {
      return <AboutPage onNavigate={handleNavigate} />;
    }
    if (cleanRoute.startsWith('#/contact')) {
      return <ContactPage />;
    }
    if (cleanRoute.startsWith('#/privacy-policy')) {
      return <LegalPage initialDoc="privacy" onNavigate={handleNavigate} />;
    }
    if (cleanRoute.startsWith('#/terms')) {
      return <LegalPage initialDoc="terms" onNavigate={handleNavigate} />;
    }
    if (cleanRoute.startsWith('#/disclaimer')) {
      return <LegalPage initialDoc="disclaimer" onNavigate={handleNavigate} />;
    }
    if (cleanRoute.startsWith('#/cookie-policy')) {
      return <LegalPage initialDoc="cookies" onNavigate={handleNavigate} />;
    }

    // Default Fallback to Homepage
    return <HomePage onNavigate={handleNavigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans">
      {/* Top Bar Contract Navigation */}
      <Header currentRoute={currentRoute} onNavigate={handleNavigate} />

      {/* Main Page Canvas */}
      <main className="flex-1" id="main-content">
        {renderView()}
      </main>

      {/* Footer Navigation & Disclosures */}
      <Footer onNavigate={handleNavigate} />

      {/* GDPR / CCPA Compliant Cookie Banner */}
      <CookieBanner />
    </div>
  );
}
