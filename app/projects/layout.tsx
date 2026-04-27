import FooterSection from '@/layout/footer-section/FooterSection';
import Header from '@/layout/header/header';

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <section className="bg-[#EFF4F7] px-8 py-8 flex items-center justify-center">
        <FooterSection />
      </section>
    </>
  );
}
