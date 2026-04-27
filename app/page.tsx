import BlogSection from '@/layout/blog-section/BlogSection';
import FeedbackSection from '@/layout/feedback-section/FeedbackSection';
import FooterSection from '@/layout/footer-section/FooterSection';
import FormSection from '@/layout/form-section/FormSection';
import Header from '@/layout/header/header';
import HeroSection from '@/layout/hero-section/heroSection';
import ProjectSection from '@/layout/project-section/ProjectSection';
import WorkSection from '@/layout/work-section/workSection';

export default function Home() {
  return (
    <>
      <Header />
      <section className="min-h-[calc(100vh-84px)] px-8 py-8 md:py-16 drop-shadow-xs flex items-center justify-center" id="home">
        <HeroSection />
      </section>
      <section className="bg-[#EFF4F7] min-h-screen px-8 py-8 drop-shadow-xs flex items-center justify-center" id="projects">
        <ProjectSection />
      </section>
      <section className="min-h-screen px-8 py-8 drop-shadow-xs flex items-center justify-center" id="work">
        <WorkSection />
      </section>
      <section className="bg-[#EFF4F7] min-h-screen px-8 py-8 drop-shadow-xs flex items-center justify-center" id="feedback">
        <FeedbackSection />
      </section>
      <section className="md:min-h-screen px-8 py-8 drop-shadow-xs flex items-center justify-center" id="form">
        <FormSection />
      </section>
      <section className="bg-[#EFF4F7] min-h-screen px-8 py-8 drop-shadow-xs flex items-center justify-center" id="feedback">
        <BlogSection />
      </section>
      <section className="bg-[#EFF4F7] px-8 py-8 drop-shadow-xs flex items-center justify-center">
        <FooterSection />
      </section>
    </>
  );
}
