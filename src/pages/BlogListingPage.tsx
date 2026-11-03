import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/blogArticles';
import { BlogPost } from '../types';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { Search, ArrowRight, BookOpen, Clock, Calendar, Sparkles } from 'lucide-react';

interface BlogListingPageProps {
  onNavigate: (route: string) => void;
}

export const BlogListingPage: React.FC<BlogListingPageProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(BLOG_POSTS.map((p) => p.category)))];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Blog Index Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
          <BookOpen className="w-3.5 h-3.5 text-sky-600" />
          The KeyPulse Library
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          Typing Insights, Guides & Tutorials
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Comprehensive, evidence-based articles covering the biomechanics of touch typing,
          words-per-minute calculations, ergonomic health, and structured daily practice routines.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        {/* Interactive Segmented Filter Control */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search articles..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-white"
          />
        </div>
      </div>

      {/* Article Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <article
            key={post.slug}
            className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:border-sky-300 transition-colors shadow-xs group"
          >
            <div className="space-y-3">
              {/* Clean Unboxed Metadata per Zero-Pill Discipline */}
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-medium text-sky-700">{post.category}</span>
                <span aria-hidden="true">·</span>
                <span>{post.readTime}</span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2">
                <a
                  href={`#/blog/${post.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`#/blog/${post.slug}`);
                  }}
                >
                  {post.title}
                </a>
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {post.summary}
              </p>
            </div>

            <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">{post.publishedDate}</span>
              <a
                href={`#/blog/${post.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`#/blog/${post.slug}`);
                }}
                className="font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
              >
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="p-12 text-center bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No articles matched your query</h3>
          <p className="text-xs text-slate-500">
            Try clearing your search term or selecting "All" categories.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
            }}
            className="px-4 py-2 text-xs font-semibold bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Compliant Ad Slot */}
      <AdPlaceholder slotId="blog-listing-bottom-ad" format="leaderboard" />
    </div>
  );
};
