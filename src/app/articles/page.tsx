'use client';

import { useEffect, useState } from 'react';
import { articleService, Article } from '@/lib/supabase';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadArticles() {
      try {
        const data = await articleService.getArticles();
        setArticles(data);
      } catch (err) {
        console.error('Error loading articles:', err);
        setError('Failed to load articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadArticles();
  }, []);

  if (loading) return (
    <div>
      <Header />
      <main className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-600 font-light">Loading articles...</div>
      </main>
      <Footer />
    </div>
  );
  
  if (error) return (
    <div>
      <Header />
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 p-4 border border-red-200 rounded-md bg-red-50 font-light">{error}</div>
      </main>
      <Footer />
    </div>
  );

  return (
    <div>
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black mb-8 text-gray-900 tracking-tight">Articles</h1>
      
      {articles.length === 0 ? (
        <div className="text-center py-12 border-t border-b border-gray-200">
          <p className="text-gray-600 font-light">No articles found.</p>
        </div>
      ) : (
        <div className="space-y-10">
          {articles.map((article) => (
            <article key={article.id} className="border-b border-gray-100 pb-8">
              <h2 className="text-xl font-bold mb-3 text-gray-900 tracking-tight">
                <Link href={`/articles/${encodeURIComponent(article.slug)}`} className="hover:text-gray-600 transition-colors">
                  {article.title}
                </Link>
              </h2>
              
              {article.excerpt && (
                <p className="text-gray-600 mb-4 leading-relaxed font-light">{article.excerpt}</p>
              )}
              
              <div className="flex flex-wrap items-center text-sm text-gray-500 font-light">
                <time dateTime={article.created_at}>
                  {new Date(article.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                
                {article.tags && article.tags.length > 0 && (
                  <div className="ml-4 flex flex-wrap gap-2">
                    {article.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
      </main>
      <Footer />
    </div>
  );
}