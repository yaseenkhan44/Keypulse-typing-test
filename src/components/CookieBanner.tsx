import React, { useState, useEffect } from 'react';
import { Shield, Settings, X, Check } from 'lucide-react';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  advertising: boolean;
  timestamp: string;
}

const STORAGE_KEY = 'keypulse_cookie_consent_v1';

export const CookieBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);
  const [advertisingAllowed, setAdvertisingAllowed] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Small delay so page renders smoothly first
        const timer = setTimeout(() => setIsOpen(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage may be disabled in private mode
    }
  }, []);

  const savePreferences = (analytics: boolean, advertising: boolean) => {
    const prefs: CookiePreferences = {
      essential: true,
      analytics,
      advertising,
      timestamp: new Date().toISOString(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {}
    setIsOpen(false);
    setShowModal(false);
  };

  const handleAcceptAll = () => savePreferences(true, true);
  const handleRejectNonEssential = () => savePreferences(false, false);
  const handleSaveCustom = () => savePreferences(analyticsAllowed, advertisingAllowed);

  if (!isOpen && !showModal) return null;

  return (
    <>
      {/* Non-intrusive bottom banner */}
      {isOpen && !showModal && (
        <div
          role="region"
          aria-label="Cookie consent banner"
          className="fixed bottom-0 inset-x-0 z-50 p-4 bg-slate-900/95 backdrop-blur-md text-white border-t border-slate-800 shadow-2xl transition-all"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs sm:text-sm text-slate-300 space-y-1">
              <p className="font-semibold text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-sky-400 shrink-0" />
                Privacy & Cookie Transparency
              </p>
              <p className="max-w-3xl leading-relaxed text-slate-300">
                KeyPulse uses essential browser storage to remember your typing test progress and settings.
                Optional analytics and advertising cookies help us maintain free educational tools. For visitors
                in the European Economic Area (EEA), UK, and California, we respect your rights under GDPR and CCPA.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full md:w-auto">
              <button
                type="button"
                onClick={handleAcceptAll}
                className="flex-1 md:flex-none px-4 py-2 text-xs font-semibold bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white rounded-md transition-colors whitespace-nowrap"
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="flex-1 md:flex-none px-4 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-200 border border-slate-700 rounded-md transition-colors whitespace-nowrap"
              >
                Essential Only
              </button>
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1 transition-colors whitespace-nowrap"
              >
                <Settings className="w-3.5 h-3.5" />
                Customize
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-modal-title"
        >
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 text-slate-900 border border-slate-200 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <h2 id="cookie-modal-title" className="text-base font-bold text-slate-900">
                Cookie & Privacy Preferences
              </h2>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
                aria-label="Close preferences"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-5 leading-relaxed">
              Configure which cookies and local data storages you permit on KeyPulse. Essential items
              are strictly necessary for keyboard input calculation and navigation.
            </p>

            <div className="space-y-4 text-xs">
              {/* Category 1: Strictly Necessary */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-900">1. Strictly Necessary (Required)</span>
                  <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded">Always Active</span>
                </div>
                <p className="text-slate-600">
                  Enables typing session calculations, high-score memory, accessibility settings, and route preservation. Cannot be disabled.
                </p>
              </div>

              {/* Category 2: Performance & Analytics */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-900">2. Performance & Analytics</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={analyticsAllowed}
                      onChange={(e) => setAnalyticsAllowed(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-sky-600"></div>
                  </label>
                </div>
                <p className="text-slate-600">
                  Collects anonymous telemetry on page speeds, device viewports, and navigation paths to diagnose errors and enhance platform performance.
                </p>
              </div>

              {/* Category 3: Advertising */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-900">3. Advertising & Personalization</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={advertisingAllowed}
                      onChange={(e) => setAdvertisingAllowed(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-sky-600"></div>
                  </label>
                </div>
                <p className="text-slate-600">
                  Allows Google AdSense partners to serve contextual or personalized advertisements. In EEA/UK jurisdictions, a Google-certified Consent Management Platform (CMP) will additionally govern TCF v2.2 compliance when real ad tags are activated.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Reject Non-Essential
              </button>
              <button
                type="button"
                onClick={handleSaveCustom}
                className="px-4 py-2 text-xs font-semibold bg-sky-600 hover:bg-sky-700 text-white rounded-md transition-colors flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
