import AnimateIn from '@/components/animateIn';
import { getT } from '@/lib/i18n.server';
import WorkItem from './workItem';
import WorkResumeDownloadButton from './workResumeDownloadButton';

export default async function WorkSection() {
  const t = await getT();

  return (
    <>
      <div className="w-full md:w-7xl m-auto flex flex-col md:flex-row items-baseline justify-between gap-8 md:gap-16 md:px-8">
        <AnimateIn className="w-full md:w-6xl" animation="fade-left">
          <h2 className="text-primary font-semibold uppercase">{t.work.eyebrow}</h2>
          <h1 className="text-[#2B3437] text-2xl md:text-4xl font-bold">{t.work.title}</h1>
          <p className="text-secondary text-sm md:text-base mt-4">{t.work.subtitle}</p>
          <WorkResumeDownloadButton downloadLabel={t.work.downloadResume} sizeLabel={t.work.resumeSize} />
        </AnimateIn>

        <div>
          {t.work.items.map((item, index) => (
            <AnimateIn key={index} animation="fade-right" delay={index * 100}>
              <WorkItem item={item} isCurrent={index === 0} />
            </AnimateIn>
          ))}
        </div>
      </div>
    </>
  );
}
