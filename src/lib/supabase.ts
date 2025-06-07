import { createClient } from '@supabase/supabase-js';

// Define reference type
export type Reference = {
  id: number;
  title: string;
  authors?: string;
  publication?: string;
  year?: number;
  url?: string;
}

// Define database types for better TypeScript support
export type Article = {
  id: number;
  created_at: string;
  title: string;
  content: string; // Markdown content
  published: boolean;
  slug: string;
  excerpt?: string;
  tags?: string[];
  references?: Reference[]; // Add this new field
}

// Database type definitions
export type Database = {
  public: {
    Tables: {
      articles: {
        Row: Article;
        Insert: Omit<Article, 'id' | 'created_at'>;
        Update: Partial<Omit<Article, 'id' | 'created_at'>>;
      };
    };
  };
};

// These environment variables are set in .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper functions for article operations
export const articleService = {
  // Get all published articles
  getArticles: async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },
  
  // Get a single article by slug
  getArticleBySlug: async (slug: string) => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  // Create a new article
  createArticle: async (article: Database['public']['Tables']['articles']['Insert']) => {
    const { data, error } = await supabase
      .from('articles')
      .insert(article)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  // Update an existing article
  updateArticle: async (id: number, updates: Database['public']['Tables']['articles']['Update']) => {
    const { data, error } = await supabase
      .from('articles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  // Delete an article
  deleteArticle: async (id: number) => {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  }
};