import AnimateIn from '@/components/animateIn';
import { getT } from '@/lib/i18n.server';

const avatars = ['images/jose.jpg', 'images/simao.jpg', 'images/goncalo.jpg'];
const alts    = ['José Araújo', 'Simão Carvalho', 'Gonçalo Pinto'];

export default async function FeedbackSection() {
  const t = await getT();

  return (
    <div className="w-full md:w-7xl md:px-8">
      <AnimateIn className="flex flex-col justify-center items-center gap-4" animation="fade-up">
        <h2 className="text-primary font-semibold uppercase">{t.feedback.eyebrow}</h2>
        <h3 className="text-2xl md:text-4xl font-bold text-[#2B3437]">{t.feedback.title}</h3>
      </AnimateIn>

      <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 mt-8 md:mt-32">
        {t.feedback.items.map((item, index) => (
          <AnimateIn
            key={index}
            animation="fade-up"
            delay={index * 120}
            className={`w-full ${index === 1 ? 'md:mt-32' : ''}`}
          >
            <div className="md:min-h-110 bg-white rounded-lg shadow-md overflow-hidden p-8 flex flex-col justify-between items-start gap-4 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
              <p className="text-secondary italic">&ldquo;{item.quote}&rdquo;</p>
              <div className="flex gap-4 md:gap-8 items-center">
                <img
                  src={avatars[index]}
                  alt={alts[index]}
                  className="aspect-square h-12 md:h-16 rounded-lg shrink-0 shadow-2xl"
                />
                <div>
                  <p className="text-[#2B3437] text-base md:text-xl font-bold">{item.name}</p>
                  <p className="text-primary text-base md:text-xl font-bold">{item.role}</p>
                </div>
              </div>
            </div>
          </AnimateIn>
        ))}
      </div>
    </div>
  );
}
