import Site from './site';

export default interface Category {
  id: string;
  site: Site;
  name: string;
  slug: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
