import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { AdPlaceholder } from '../components/AdPlaceholder';
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  MessageSquare,
  Sparkles,
  MapPin,
  Clock,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.supportEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Input Validation
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (!formData.message.trim() || formData.message.length < 15) {
      setErrorMessage('Please enter a message of at least 15 characters.');
      return;
    }

    setIsSubmitting(true);

    // Client-side validated form dispatch simulation
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: '',
      });
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
          <Mail className="w-3.5 h-3.5 text-sky-600" />
          Get in Touch
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          Contact KeyPulse
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Have a question about our WPM calculation formulas, lesson curriculum, or bug reports?
          We welcome feedback from students, educators, and speed typists.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Direct Email & Information Box */}
        <div className="md:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-7 space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900">Direct Support Channels</h2>
            <p className="text-xs text-slate-500">
              For fastest response, send an email directly to our support desk:
            </p>
          </div>

          {/* Copyable Email Box */}
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Primary Support Email
            </span>
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-sm font-bold text-sky-600 truncate">
                {siteConfig.supportEmail}
              </span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="p-1.5 text-slate-500 hover:text-slate-800 rounded-md transition-colors"
                title="Copy email address"
              >
                {copiedEmail ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            {copiedEmail && (
              <span className="text-[11px] text-emerald-600 font-medium block">
                Email copied to clipboard!
              </span>
            )}
          </div>

          <div className="space-y-3 text-xs text-slate-600">
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-sky-500 mt-0.5 shrink-0" />
              <div>
                <strong className="block text-slate-900">Support Hours</strong>
                <span>Monday – Friday, 9:00 AM – 6:00 PM EST. Response time within 24 hours.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-sky-500 mt-0.5 shrink-0" />
              <div>
                <strong className="block text-slate-900">Mailing Address</strong>
                <span>{siteConfig.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900">Send Us a Direct Message</h2>
            <p className="text-xs text-slate-500">
              Fill out the form below and our team will get back to you promptly.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3 animate-in fade-in duration-150">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="text-base font-bold text-emerald-950">Message Received!</h3>
              <p className="text-xs text-emerald-800 leading-relaxed max-w-sm mx-auto">
                Thank you for contacting KeyPulse. Our editorial and technical support team will
                review your message and reply via email within one business day.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-2 px-4 py-2 text-xs font-semibold bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Full Name *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-white"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-white"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-semibold text-slate-700 mb-1">
                  Topic / Subject
                </label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-white text-slate-700"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Bug Report or Calculation Issue">Bug Report or Calculation Issue</option>
                  <option value="Lesson / Practice Feedback">Lesson / Practice Feedback</option>
                  <option value="Partnership / Editorial Inquiries">Partnership / Editorial Inquiries</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your inquiry or feedback..."
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-white leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 disabled:opacity-50 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                {isSubmitting ? (
                  <span>Sending message...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" /> Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      <AdPlaceholder slotId="contact-page-bottom-ad" format="leaderboard" />
    </div>
  );
};
