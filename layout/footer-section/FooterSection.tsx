import { GithubIcon, LinkedinIcon } from 'lucide-react';
import Link from 'next/link';

export default function FooterSection() {
  return (
    <div className="w-7xl m-auto flex justify-between items-center px-8">
      <div></div>
      <p className="text-secondary text-sm">© 2026 Paulo Silva. All rights reserved.</p>
      <div className="flex justify-between items-center gap-8">
        <Link href="" target="_blank" rel="noopener noreferrer">
          <LinkedinIcon color="#23677a" />
        </Link>
        <Link href="" target="_blank" rel="noopener noreferrer">
          <GithubIcon color="#23677a" />
        </Link>
      </div>
    </div>
  );
}
