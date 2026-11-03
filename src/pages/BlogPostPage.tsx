import React, { useEffect } from 'react';
import { BLOG_POSTS } from '../data/blogArticles';
import { BlogPost } from '../types';
import { AdPlaceholder } from '../components/AdPlaceholder';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  ChevronRight,
  BookOpen,
  ArrowRight,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

interface BlogPostPageProps {
  slug: string;
  onNavigate: (route: string) => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ slug, onNavigate }) => {
  const post = BLOG_POSTS.find((p) => p.slug === slug) || BLOG_POSTS[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Dynamically update document title for SEO
    document.title = `${post.seoTitle} | KeyPulse`;
  }, [post]);

  const related = BLOG_POSTS.filter((p) => post.relatedArticles.includes(p.slug));

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500">
        <a
          href="#/"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('#/');
          }}
          className="hover:text-slate-900 transition-colors"
        >
          Home
        </a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <a
          href="#/blog"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('#/blog');
          }}
          className="hover:text-slate-900 transition-colors"
        >
          Blog
        </a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-700 truncate max-w-xs">{post.title}</span>
      </nav>

      {/* Article Header */}
      <header className="space-y-4 border-b border-slate-200 pb-8">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="font-semibold text-sky-700">{post.category}</span>
          <span>·</span>
          <span>{post.readTime}</span>
          <span>·</span>
          <span>Updated {post.updatedDate}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          {post.summary}
        </p>

        {/* Author Bylines */}
        <div className="flex items-center gap-3 pt-2 text-xs text-slate-500">
          <div className="w-9 h-9 rounded-full bg-sky-100 text-sky-800 font-bold flex items-center justify-center text-sm">
            {post.author.name[0]}
          </div>
          <div>
            <span className="font-semibold text-slate-900 block">{post.author.name}</span>
            <span className="text-slate-500">{post.author.role}</span>
          </div>
        </div>
      </header>

      {/* Table of Contents */}
      {post.tableOfContents && post.tableOfContents.length > 0 && (
        <aside className="p-6 bg-slate-50/90 border border-slate-200/90 rounded-2xl space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Table of Contents
          </h2>
          <ul className="space-y-2 text-xs sm:text-sm">
            {post.tableOfContents.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-sky-600 hover:text-sky-800 hover:underline flex items-center gap-1.5 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  <span>{item.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </aside>
      )}

      {/* Editorial Featured Visual / Placeholder */}
      {/* 
        CODE COMMENT FOR IMAGE INSERTION:
        To replace this visual with a custom editorial photo, replace the src path below.
        ALT tag must accurately describe the image content for screen readers and SEO.
      */}
      <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 relative group">
        <img
          src="/src/assets/images/typing_analytics_concept_1793687390271.jpg"
          alt={post.imagePlaceholder.alt}
          className="w-full h-[280px] sm:h-[360px] object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="p-3 bg-white border-t border-slate-100 text-[11px] text-slate-500 italic">
          {post.imagePlaceholder.caption}
        </div>
      </div>

      {/* Article Body Content */}
      <div className="space-y-10 text-slate-700 text-base leading-relaxed">
        {post.contentSections.map((section) => (
          <section key={section.id} id={section.id} className="space-y-4 scroll-mt-24">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {section.heading}
            </h2>

            {section.paragraphs.map((p, pIdx) => (
              <p key={pIdx} className="leading-relaxed">
                {p}
              </p>
            ))}

            {section.keyTakeaway && (
              <div className="p-4 bg-sky-50 border border-sky-100 rounded-xl text-xs sm:text-sm text-sky-950 font-medium">
                <strong className="block text-sky-800 mb-1">Key Takeaway:</strong>
                {section.keyTakeaway}
              </div>
            )}

            {/* Render table if section provides one */}
            {section.table && (
              <div className="overflow-x-auto my-4">
                <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
                  <thead className="bg-slate-100 text-slate-700 font-semibold">
                    <tr>
                      {section.table.headers.map((h, hIdx) => (
                        <th key={hIdx} className="p-3">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {section.table.rows.map((row, rIdx) => (
                      <tr key={rIdx}>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="p-3">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ))}

        {/* Helpful Internal Links Box */}
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 mt-8">
          <h3 className="text-sm font-bold text-slate-900">Put These Principles Into Practice</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Test what you have learned with our free online tools. No registration required:
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href="#/typing-test"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('#/typing-test');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-sky-700 bg-sky-100 hover:bg-sky-200 rounded-lg transition-colors"
            >
              Take 60s Typing Test <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="#/typing-practice"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('#/typing-practice');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Interactive Practice Drills <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="#/typing-lessons"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('#/typing-lessons');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors"
            >
              View Lessons Syllabus <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* FAQs Section */}
        {post.faqs && post.faqs.length > 0 && (
          <section id="faq" className="space-y-4 pt-6 border-t border-slate-200">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {post.faqs.map((faq, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                  <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-sky-600 shrink-0" />
                    {faq.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Compliant In-Article Ad Slot */}
      <AdPlaceholder slotId={`article-${post.slug}-bottom-slot`} format="leaderboard" />

      {/* Related Articles Section */}
      {related.length > 0 && (
        <section className="pt-8 border-t border-slate-200 space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((rel) => (
              <a
                key={rel.slug}
                href={`#/blog/${rel.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`#/blog/${rel.slug}`);
                }}
                className="p-4 bg-white border border-slate-200 rounded-xl hover:border-sky-300 transition-colors block space-y-1.5 group"
              >
                <span className="text-[11px] font-semibold text-sky-700">{rel.category}</span>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-sky-600 line-clamp-2">
                  {rel.title}
                </h3>
                <span className="text-[11px] text-slate-400 block pt-1">{rel.readTime}</span>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Back to Central Blog */}
      <div className="pt-6">
        <a
          href="#/blog"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('#/blog');
          }}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Articles
        </a>
      </div>
    </article>
  );
};
