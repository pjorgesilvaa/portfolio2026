import Site from './site';

export default interface Project {
  id: string;
  site: Site;
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  tags: string[];
  bannerUrl: string;
  projectGitUrl: string | null;
  projectDeployedUrl: string | null;
  language: string;
  createdAt: Date;
  updatedAt: Date;
}
