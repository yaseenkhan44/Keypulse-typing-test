/**
 * Central site configuration for KeyPulse.
 * Easily configure your Google AdSense Publisher ID and Google Analytics 4 Measurement ID here.
 */
export const siteConfig = {
  name: 'KeyPulse',
  tagline: 'Precision English Typing Speed Test & Keyboard Mastery',
  domain: 'keypulse.org',
  canonicalUrl: 'https://keypulse.org',
  supportEmail: 'support@keypulse.org',
  contactEmail: 'contact@keypulse.org',
  pressEmail: 'press@keypulse.org',
  phone: '+1 (800) 555-0199',
  address: '100 Montgomery St, Suite 1400, San Francisco, CA 94104',

  // Google AdSense Configuration
  // Replace with your real Publisher ID once approved by Google AdSense (e.g., 'ca-pub-1234567890123456')
  // When empty or placeholder, clean non-intrusive compliance placeholders will be rendered.
  adsense: {
    publisherId: '', // Example: 'ca-pub-XXXXXXXXXXXXXXXX'
    enabled: false, // Set to true after approved and ad units are verified
  },

  // Google Analytics 4 Configuration
  // Replace with your GA4 Measurement ID (e.g., 'G-ABC123XYZ0')
  analytics: {
    ga4MeasurementId: '', // Example: 'G-XXXXXXXXXX'
    enabled: false,
  },

  // Navigation Links
  navItems: [
    { label: 'Home', href: '#/' },
    { label: 'Typing Test', href: '#/typing-test' },
    { label: 'Typing Practice', href: '#/typing-practice' },
    { label: 'Typing Lessons', href: '#/typing-lessons' },
    { label: 'Typing Games', href: '#/typing-games' },
    { label: 'Blog', href: '#/blog' },
    { label: 'About Us', href: '#/about' },
    { label: 'Contact Us', href: '#/contact' },
  ],

  // Footer Links & Legal
  footerLinks: {
    tools: [
      { label: '15-Second Typing Test', href: '#/typing-test?time=15' },
      { label: '30-Second Typing Test', href: '#/typing-test?time=30' },
      { label: '60-Second Typing Test', href: '#/typing-test?time=60' },
      { label: '120-Second Typing Test', href: '#/typing-test?time=120' },
      { label: 'Touch Typing Practice', href: '#/typing-practice' },
      { label: 'Educational Typing Games', href: '#/typing-games' },
    ],
    lessons: [
      { label: 'Home Row Keys Guide', href: '#/typing-lessons?lesson=home-row' },
      { label: 'Finger Placement Chart', href: '#/typing-lessons?lesson=finger-placement' },
      { label: 'Accuracy vs Speed Strategy', href: '#/typing-lessons?lesson=accuracy-vs-speed' },
      { label: 'Daily Practice Regimen', href: '#/typing-lessons?lesson=daily-practice' },
      { label: 'Common Typing Pitfalls', href: '#/typing-lessons?lesson=common-mistakes' },
    ],
    resources: [
      { label: 'How to Calculate WPM', href: '#/blog/how-to-calculate-wpm' },
      { label: 'What Is a Good Typing Speed?', href: '#/blog/what-is-a-good-typing-speed' },
      { label: 'Touch Typing Guide for Beginners', href: '#/blog/touch-typing-guide-for-beginners' },
      { label: 'All Articles', href: '#/blog' },
    ],
    trust: [
      { label: 'About Us', href: '#/about' },
      { label: 'Contact Us', href: '#/contact' },
      { label: 'Privacy Policy', href: '#/privacy-policy' },
      { label: 'Terms and Conditions', href: '#/terms' },
      { label: 'Disclaimer', href: '#/disclaimer' },
      { label: 'Cookie Policy', href: '#/cookie-policy' },
    ],
  },
};
