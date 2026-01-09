/**
 * Admin article service for managing articles
 * Extends the existing articleService with admin functions
 */

import type { ArticleContent } from "../types/content";
import { getAIArticles, type Article } from "./articleService";

const ADMIN_ARTICLES_KEY = "orca_admin_articles";

/**
 * Convert Article (from articleService) to ArticleContent (for admin)
 */
function convertArticleToContent(article: Article): ArticleContent {
  return {
    id: article.id,
    title: article.title,
    content: article.description || "",
    excerpt: article.description || "",
    author: article.author || "Orca Editorial",
    date: article.date,
    category: article.category,
    tags: [],
    imageUrl: article.imageUrl,
    featured: false,
    published: true
  };
}

/**
 * Get all articles (for admin)
 */
export async function getAllArticles(): Promise<ArticleContent[]> {
  // Get AI-generated articles and convert to ArticleContent
  const aiArticles = getAIArticles();
  const convertedAIArticles = aiArticles.map(convertArticleToContent);
  
  // Get admin-managed articles (stored separately)
  const adminArticlesStr = localStorage.getItem(ADMIN_ARTICLES_KEY);
  const adminArticles: ArticleContent[] = adminArticlesStr 
    ? JSON.parse(adminArticlesStr) 
    : [];

  // Combine and sort by date
  const allArticles = [...convertedAIArticles, ...adminArticles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return allArticles;
}

/**
 * Get article by ID
 */
export async function getArticleById(id: string): Promise<ArticleContent | null> {
  const articles = await getAllArticles();
  return articles.find(a => a.id === id) || null;
}

/**
 * Save article (create or update)
 */
export async function saveArticle(article: ArticleContent): Promise<{ success: boolean; error?: string }> {
  try {
    const articles = await getAllArticles();
    
    // Remove old version if updating
    const filtered = articles.filter(a => a.id !== article.id);
    
    // Add new/updated article
    filtered.push(article);
    
    // Separate AI articles from admin articles
    const aiArticles = filtered.filter(a => a.category === "ai-generated" && a.id.startsWith("ai-"));
    const adminArticles = filtered.filter(a => !(a.category === "ai-generated" && a.id.startsWith("ai-")));
    
    // Save AI articles using existing service
    if (aiArticles.length > 0) {
      // Note: This is a simplified approach. In production, we'd need to update the articleService
      // to handle updates, not just creates
    }
    
    // Save admin articles
    localStorage.setItem(ADMIN_ARTICLES_KEY, JSON.stringify(adminArticles));
    
    // In production, this would call a Netlify Function
    // await fetch('/api/articles/save', { method: 'POST', body: JSON.stringify(article) });
    
    return { success: true };
  } catch (error) {
    console.error("Error saving article:", error);
    return { success: false, error: "Failed to save article" };
  }
}

/**
 * Delete article
 */
export async function deleteArticle(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const articles = await getAllArticles();
    const filtered = articles.filter(a => a.id !== id);
    
    // Separate and save
    const adminArticles = filtered.filter(a => !(a.category === "ai-generated" && a.id.startsWith("ai-")));
    localStorage.setItem(ADMIN_ARTICLES_KEY, JSON.stringify(adminArticles));
    
    // In production, this would call a Netlify Function
    // await fetch(`/api/articles/delete/${id}`, { method: 'DELETE' });
    
    return { success: true };
  } catch (error) {
    console.error("Error deleting article:", error);
    return { success: false, error: "Failed to delete article" };
  }
}

/**
 * Create new article
 */
export function createNewArticle(): ArticleContent {
  return {
    id: `admin-${Date.now()}`,
    title: "",
    content: "",
    excerpt: "",
    author: "Orca Editorial",
    date: new Date().toISOString(),
    category: "ai-generated",
    tags: [],
    featured: false,
    published: false
  };
}
