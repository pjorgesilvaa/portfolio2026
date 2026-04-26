'use client';

import { Download } from 'lucide-react';

export default function WorkResumeDownloadButton() {
  function handleResumeDownload() {
    const link = document.createElement('a');
    link.href = 'resume.pdf';
    link.download = 'Paulo-Silva-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div
      className="flex items-center gap-4 p-4 bg-primary/20 rounded-xl mt-4 hover:cursor-pointer hover:bg-primary/10 transition-colors transition-duration-300"
      onClick={handleResumeDownload}
    >
      <div className="w-12 h-12 bg-primary text-on-primary rounded-xl flex items-center justify-center">
        <Download />
      </div>
      <div>
        <p className="font-bold text-sm text-[#2B3437]">Download Resume</p>
        <p className="text-xs text-on-surface-variant text-gray-600">PDF, 2.4 MB</p>
      </div>
    </div>
  );
}
