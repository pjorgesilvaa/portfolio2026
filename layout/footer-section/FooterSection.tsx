import { getT } from '@/lib/i18n.server';
import { GithubIcon, LinkedinIcon } from 'lucide-react';
import Link from 'next/link';

export default async function FooterSection() {
  const t = await getT();

  return (
    <div className="w-full md:w-7xl m-auto flex flex-col md:flex-row justify-between items-center md:px-8 md:py-8 gap-4 md:gap-0">
      <div></div>
      <p className="text-secondary text-sm text-center">{t.footer.copyright}</p>
      <div className="flex justify-between items-center gap-8">
        <Link
          href="https://www.linkedin.com/in/paulo-silva171"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-125 hover:opacity-70 transition-all duration-200"
        >
          <LinkedinIcon color="#23677a" />
        </Link>
        <Link
          href="https://github.com/pjorgesilvaa"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-125 hover:opacity-70 transition-all duration-200"
        >
          <GithubIcon color="#23677a" />
        </Link>
      </div>
    </div>
  );
}
