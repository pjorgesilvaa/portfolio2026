import AnimateIn from '@/components/animateIn';

export default function FeedbackSection() {
  return (
    <div className="w-full md:w-7xl md:px-8">
      <AnimateIn className="flex flex-col justify-center items-center gap-4" animation="fade-up">
        <h2 className="text-primary font-semibold uppercase">Feedback</h2>
        <h3 className="text-2xl md:text-4xl font-bold text-[#2B3437]">Voices of Trust</h3>
      </AnimateIn>

      <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 mt-8 md:mt-32">
        <AnimateIn animation="fade-up" delay={0} className="w-full">
          <div className="md:min-h-110 bg-white rounded-lg shadow-md overflow-hidden p-8 flex flex-col justify-between items-start gap-4 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
            <p className="text-secondary italic">
              "Paulo is someone you can trust to build scalable, reliable systems. His architectural decisions are well thought out and
              consistently facilitate my work, especially when integrating AI solutions. I’ve known him for a long time and have always
              appreciated how open he is to discussing ideas. He’s someone I can rely on whenever I need to think through technical
              challenges. He truly cares about what he does and takes pride in delivering high-quality, well-crafted solutions."
            </p>
            <div className="flex gap-4 md:gap-8 items-center">
              {/* <div className="aspect-square h-12 md:h-16 bg-gray-200 rounded-lg shrink-0" /> */}
              <img src="images/jose.jpg" alt="José Araújo" className="aspect-square h-12 md:h-16 rounded-lg shrink-0 shadow-2xl" />
              <div>
                <p className="text-[#2B3437] text-base md:text-xl font-bold">José Araújo</p>
                <p className="text-primary text-base md:text-xl font-bold">AI Engineer</p>
              </div>
            </div>
          </div>
        </AnimateIn>

        <AnimateIn animation="fade-up" delay={120} className="w-full md:mt-32">
          <div className="md:min-h-110 bg-white rounded-lg shadow-md overflow-hidden p-8 flex flex-col justify-between items-start gap-4 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
            <p className="text-secondary italic">
              "Working with Paulo on Vellonti’s e-commerce website was a very smooth experience. As a founder without a deep technical
              background, I often had complex ideas around the product and user experience that weren’t always easy to translate into
              technical requirements. Paulo had a real ability to break those concepts down into clear, practical solutions and guide the
              implementation in a way that made everything easy to understand and iterate on."
            </p>
            <div className="flex gap-4 md:gap-8 items-center">
              {/* <div className="aspect-square h-12 md:h-16 bg-gray-200 rounded-lg shrink-0" /> */}
              <img src="images/simao.jpg" alt="Simão Carvalho" className="aspect-square h-12 md:h-16 rounded-lg shrink-0 shadow-2xl" />
              <div>
                <p className="text-[#2B3437] text-base md:text-xl font-bold">Simão Carvalho</p>
                <p className="text-primary text-base md:text-xl font-bold">Founder, Vellonti</p>
              </div>
            </div>
          </div>
        </AnimateIn>

        <AnimateIn animation="fade-up" delay={240} className="w-full">
          <div className="md:min-h-110 bg-white rounded-lg shadow-md overflow-hidden p-8 flex flex-col justify-between items-start gap-4 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
            <p className="text-secondary italic">
              "Paulo and I met back in college, and later we ended up working together at Noesis. We’ve been in the same professional
              journey since then, growing side by side as Full Stack Developers. Throughout that time, I’ve always found him easy to work
              with, he has a structured way of thinking, makes solid technical decisions, and communicates in a very clear and practical
              way."
            </p>
            <div className="flex gap-4 md:gap-8 items-center">
              {/* <div className="aspect-square h-12 md:h-16 bg-gray-200 rounded-lg shrink-0" /> */}
              <img src="images/goncalo.jpg" alt="Gonçalo Pinto" className="aspect-square h-12 md:h-16 rounded-lg shrink-0 shadow-2xl" />
              <div>
                <p className="text-[#2B3437] text-base md:text-xl font-bold">Gonçalo Pinto</p>
                <p className="text-primary text-base md:text-xl font-bold">Tech Lead</p>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </div>
  );
}
