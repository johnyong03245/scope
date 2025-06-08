'use client';

import { useEffect, useState } from 'react';
import { articleService, Article } from '@/lib/supabase';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadArticle() {
      try {
        const data = await articleService.getArticleBySlug(slug);
        setArticle(data);
      } catch (err) {
        console.error('Error loading article:', err);
        setError('Failed to load article. It may not exist or has been removed.');
      } finally {
        setLoading(false);
      }
    }

    loadArticle();
  }, [slug]);

  if (loading) return (
    <div>
      <Header />
      <main className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-600 font-light">Loading article...</div>
      </main>
      <Footer />
    </div>
  );
  
  if (error || !article) return (
    <div>
      <Header />
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 p-4 border border-red-200 rounded-md bg-red-50 font-light">
          {error || 'Article not found'}
        </div>
      </main>
      <Footer />
    </div>
  );

  return (
    <div>
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/articles" className="text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1">
            <span aria-hidden="true">&larr;</span> Back to articles
          </Link>
        </div>
        
        <article>
          <h1 className="text-3xl font-black mb-4 text-gray-900 tracking-tight">{article.title}</h1>
          
          <div className="flex flex-wrap items-center text-sm text-gray-500 font-light mb-8">
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
          
          <div className="prose prose-lg prose-gray max-w-none">
            <ReactMarkdown
              components={{
                // Custom renderer for headings to ensure proper styling
                h1: ({ ...props }) => {
                  return <h1 {...props} className="text-3xl font-bold mt-8 mb-4">{props.children}</h1>;
                },
                h2: ({ ...props }) => {
                  return <h2 {...props} className="text-2xl font-bold mt-8 mb-4">{props.children}</h2>;
                },
                h3: ({ ...props }) => {
                  return <h3 {...props} className="text-xl font-bold mt-6 mb-3">{props.children}</h3>;
                },
                h4: ({ ...props }) => {
                  return <h4 {...props} className="text-lg font-bold mt-5 mb-2">{props.children}</h4>;
                },
                h5: ({ ...props }) => {
                  return <h5 {...props} className="text-base font-bold mt-4 mb-2">{props.children}</h5>;
                },
                h6: ({ ...props }) => {
                  return <h6 {...props} className="text-sm font-bold mt-4 mb-2">{props.children}</h6>;
                },
                // Custom renderer for paragraphs to add citation numbers
                p: ({ ...props }) => {
                  const content = props.children;
                  // Check if the paragraph has a citation marker like [1] at the end
                  const citationMatch = String(content).match(/\[(\d+)\]$/); 
                  
                  if (citationMatch) {
                    const citationNumber = citationMatch[1];
                    // Remove the citation marker from the content
                    const textContent = String(content).replace(/\[\d+\]$/, '');
                    
                    return (
                      <p {...props} className="whitespace-pre-line">
                        {textContent}
                        <a href={`#reference-${citationNumber}`} id={`citation-${citationNumber}`} 
                           className="text-blue-500 align-super text-xs ml-1">
                          [{citationNumber}]
                        </a>
                      </p>
                    );
                  }
                  
                  return <p {...props} className="whitespace-pre-line">{content}</p>;
                },
                // Add custom renderers for lists
                ul: ({ ...props }) => {
                  return <ul {...props} className="list-disc pl-6 my-4 space-y-2">{props.children}</ul>;
                },
                li: ({ ...props }) => {
                  return <li {...props} className="pl-2">{props.children}</li>;
                },
                // Add this new renderer for ordered/numbered lists
                ol: ({ ...props }) => {
                  return <ol {...props} className="list-decimal pl-6 my-4 space-y-2">{props.children}</ol>;
                }
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>
          
          {/* References Section */}
          {article.references && article.references.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold mb-6">References</h2>
              <ol className="space-y-4">
                {article.references.map((reference) => (
                  <li key={reference.id} id={`reference-${reference.id}`} className="flex">
                    <span className="font-medium mr-2">[{reference.id}]</span>
                    <div>
                      <p className="font-medium">{reference.title}</p>
                      {reference.authors && <p className="text-sm">{reference.authors}</p>}
                      <p className="text-sm">
                        {reference.publication}
                        {reference.year && ` (${reference.year})`}
                      </p>
                      {reference.url && (
                        <a href={reference.url} target="_blank" rel="noopener noreferrer" 
                           className="text-blue-500 text-sm hover:underline">
                          {reference.url}
                        </a>
                      )}
                      <a href={`#citation-${reference.id}`} className="text-xs text-gray-500 ml-2">
                        ↑ Back
                      </a>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </article>
      </main>
      <Footer/>
    </div>
  );
}