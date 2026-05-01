import BlogSection from '@/layout/blog-section/BlogSection';
import FeedbackSection from '@/layout/feedback-section/FeedbackSection';
import FooterSection from '@/layout/footer-section/FooterSection';
import FormSection from '@/layout/form-section/FormSection';
import Header from '@/layout/header/header';
import HeroSection from '@/layout/hero-section/heroSection';
import ProjectSection from '@/layout/project-section/ProjectSection';
import WorkSection from '@/layout/work-section/workSection';
import { getT } from '@/lib/i18n.server';
import { Metadata } from 'next';
import { LOCALES, LOCALE_TO_HREFLANG } from '@/lib/language';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://paulosilva.com';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const languages: Record<string, string> = { 'x-default': `${BASE_URL}/en` };
  for (const l of LOCALES) {
    languages[LOCALE_TO_HREFLANG[l]] = `${BASE_URL}/${l}`;
  }

  return {
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages,
    },
  };
}

export default async function Home() {
  const t = await getT();

  return (
    <>
      <Header />
      <main>
        <section aria-label="Hero" className="min-h-[calc(100vh-84px)] px-8 py-8 md:py-16 drop-shadow-xs flex items-center justify-center" id="home">
          <HeroSection />
        </section>
        <section aria-label="Projects" className="bg-[#EFF4F7] min-h-screen px-8 py-8 drop-shadow-xs flex items-center justify-center" id="projects">
          <ProjectSection />
        </section>
        <section aria-label="Work experience" className="min-h-screen px-8 py-8 drop-shadow-xs flex items-center justify-center" id="work">
          <WorkSection />
        </section>
        <section aria-label="Feedback" className="bg-[#EFF4F7] min-h-screen px-8 py-8 drop-shadow-xs flex items-center justify-center" id="feedback">
          <FeedbackSection />
        </section>
        <section aria-label="Contact" className="md:min-h-screen px-8 py-8 drop-shadow-xs flex items-center justify-center" id="form">
          <FormSection t={t.form} />
        </section>
        <section aria-label="Journal" className="bg-[#EFF4F7] min-h-screen px-8 py-8 drop-shadow-xs flex items-center justify-center" id="journal">
          <BlogSection />
        </section>
      </main>
      <footer className="px-8 py-8 drop-shadow-xs flex items-center justify-center">
        <FooterSection />
      </footer>
    </>
  );
}
