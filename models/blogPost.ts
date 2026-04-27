import Author from './author';
import Category from './category';
import Site from './site';

export default interface BlogPost {
  id: string;
  site: Site;
  author: Author;
  category: Category;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: string;
  language: string;
  coverImageUrl: string;
  metaTitle: string;
  metaDescription: string;
  ogImageUrl: string;
  canonicalUrl: string;
  isIndexed: boolean;
  readingTimeMinutes: number;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
