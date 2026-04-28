'use client';

import { Download } from 'lucide-react';
import { useState } from 'react';
import { trackEvent } from '@/lib/analytics';

interface Props {
  downloadLabel: string;
  sizeLabel: string;
}

export default function WorkResumeDownloadButton({ downloadLabel, sizeLabel }: Props) {
  const [hovered, setHovered] = useState(false);

  function handleResumeDownload() {
    trackEvent({ event: 'resume_download' });
    const link = document.createElement('a');
    link.href = 'resume.pdf';
    link.download = 'Paulo-Silva-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <>
      <style>{`
        @keyframes icon-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .icon-bounce {
          animation: icon-bounce 0.6s ease-in-out infinite;
        }
      `}</style>

      <div
        className="flex items-center gap-4 p-4 bg-primary/10 rounded-xl mt-4 cursor-pointer hover:bg-primary/30 hover:shadow-md active:scale-95 active:shadow-none transition-all duration-200"
        onClick={handleResumeDownload}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="w-12 h-12 bg-primary text-on-primary rounded-xl flex items-center justify-center overflow-visible">
          <Download className={hovered ? 'icon-bounce' : ''} />
        </div>
        <div>
          <p className="font-bold text-sm text-[#2B3437]">{downloadLabel}</p>
          <p className="text-xs text-on-surface-variant text-gray-600">{sizeLabel}</p>
        </div>
      </div>
    </>
  );
}
