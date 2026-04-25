export default interface BlogPost {
  id: string;
  slug: string;
  title: string;
  content: string;
  tags: string[];
  publishedAt: Date;
}
