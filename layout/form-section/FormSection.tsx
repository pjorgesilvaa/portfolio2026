'use client';

import { Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import { sendEmail } from '@/app/actions/sendEmail';
import { useRef, useState } from 'react';
import AnimateIn from '@/components/animateIn';
import type { Translations } from '@/lib/i18n';
import { trackEvent } from '@/lib/analytics';

export default function FormSection({ t }: { t: Translations['form'] }) {
  const formRef = useRef<HTMLFormElement>(null);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });

  const isFormValid = formState.name.trim() && formState.email.trim() && formState.message.trim();

  return (
    <AnimateIn className="w-full md:max-w-7xl mx-auto md:px-8" animation="fade-up">
      <div className="bg-primary p-12 md:p-20 rounded-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path d="M0 0 L100 0 L100 100 Z" fill="white"></path>
          </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 relative z-10">
          {/* LEFT SIDE */}
          <AnimateIn animation="fade-left" delay={150}>
            <h2 className="font-headline text-2xl md:text-5xl font-bold text-on-primary leading-tight">
              {t.title}
            </h2>

            <p className="text-on-primary opacity-80 text-sm md:text-lg md:mt-4 mt-8">
              {t.subtitle}
            </p>

            <div className="mt-6 md:mt-12">
              <div className="flex items-center gap-4 text-on-primary">
                <Mail className="min-w-6 min-h-6" />
                <Link href="mailto:pjorge.silvaa@gmail.com" onClick={() => trackEvent({ event: 'email_click' })} className="font-medium text-sm md:text-base hover:underline">
                  pjorge.silvaa@gmail.com
                </Link>
              </div>

              <div className="flex items-center gap-4 text-on-primary mt-2 md:mt-6">
                <MapPin className="min-w-6 min-h-6" />
                <span className="font-medium text-sm md:text-base">{t.location}</span>
              </div>
            </div>
          </AnimateIn>

          {/* FORM */}
          <AnimateIn animation="fade-right" delay={250}>
          <div className="bg-white p-4 md:p-10 rounded-xl relative overflow-hidden">
            {/* SUCCESS OVERLAY */}
            {status === 'success' && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/90 z-10 animate-fadeIn">
                <div className="text-center">
                  <div className="text-4xl mb-2 animate-bounce">🚀</div>
                  <p className="font-bold text-[#2B3437]">{t.successTitle}</p>
                  <p className="text-sm text-[#2B3437]">{t.successSubtitle}</p>
                </div>
              </div>
            )}

            <form
              ref={formRef}
              action={async formData => {
                setLoading(true);
                setStatus('idle');

                const trap = formData.get('company'); // honeypot
                if (trap) {
                  setLoading(false);
                  return;
                }

                try {
                  const res = await sendEmail(formData);

                  if (res?.success !== false) {
                    setStatus('success');
                    trackEvent({ event: 'contact_form_submit' });

                    formRef.current?.reset();

                    setFormState({
                      name: '',
                      email: '',
                      message: '',
                    });

                    /* setTimeout(() => setStatus('idle'), 5000); */
                  } else {
                    setStatus('error');
                    trackEvent({ event: 'contact_form_error' });
                  }
                } catch {
                  setStatus('error');
                  trackEvent({ event: 'contact_form_error' });
                }

                setLoading(false);
              }}
              className="space-y-6"
            >
              {/* 🛡️ HONEYPOT */}
              <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

              {/* NAME */}
              <div>
                <label className="block text-sm font-semibold text-secondary mb-2">{t.nameLabel}</label>
                <input
                  name="name"
                  value={formState.name}
                  onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                  className="w-full bg-gray-200 text-[#2B3437] rounded-lg p-4 outline-none focus:ring-2 focus:ring-primary"
                  placeholder={t.namePlaceholder}
                  type="text"
                  required
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-semibold text-secondary mb-2">{t.emailLabel}</label>
                <input
                  name="email"
                  value={formState.email}
                  onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                  className="w-full bg-gray-200 text-[#2B3437] rounded-lg p-4 outline-none focus:ring-2 focus:ring-primary"
                  placeholder={t.emailPlaceholder}
                  type="email"
                  required
                />
              </div>

              {/* MESSAGE */}
              <div>
                <label className="block text-sm font-semibold text-secondary mb-2">{t.messageLabel}</label>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                  className="w-full bg-gray-200 text-[#2B3437] rounded-lg p-4 outline-none focus:ring-2 focus:ring-primary"
                  placeholder={t.messagePlaceholder}
                  rows={4}
                  required
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading || !isFormValid}
                className="w-full bg-primary text-on-primary py-4 rounded-lg font-bold transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? t.sending : t.send}
              </button>

              {/* ERROR */}
              {status === 'error' && <p className="text-red-600 text-sm">{t.error}</p>}
            </form>

            {/* ANIMATION */}
            <style jsx>{`
              .animate-fadeIn {
                animation: fadeIn 0.25s ease-out forwards;
              }

              @keyframes fadeIn {
                from {
                  opacity: 0;
                  transform: scale(0.98);
                }
                to {
                  opacity: 1;
                  transform: scale(1);
                }
              }
            `}</style>
          </div>
          </AnimateIn>
        </div>
      </div>
    </AnimateIn>
  );
}
