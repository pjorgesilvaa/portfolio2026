import { Mail, MapPin } from "lucide-react";

export default function FormSection() {
  return (
    <div className="w-full md:max-w-7xl mx-auto md:px-8">
      <div className="bg-primary p-12 md:p-20 rounded-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path d="M0 0 L100 0 L100 100 Z" fill="white"></path>
          </svg>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 relative z-10">
          <div>
            <h2 className="font-headline text-2xl md:text-5xl font-bold text-on-primary leading-tight">Let's build something remarkable</h2>
            <p className="text-on-primary opacity-80 text-sm md:text-lg md:mt-4 mt-8">
              Whether you have a clear vision or need help defining one, I'm here to help architect your digital future.
            </p>
            <div className="mt-6 md:mt-12">
              <div className="flex items-center gap-4 text-on-primary">
                <div className="flex items-center justify-center">
                  <Mail />
                </div>
                <span className="font-medium text-sm md:text-base">paulo@architect.digital</span>
              </div>
              <div className="flex items-center gap-4 text-on-primary mt-2 md:mt-6">
                <div className="flex items-center justify-center">
                  <MapPin />
                </div>
                <span className="font-medium text-sm md:text-base">Lisbon, PT / Remote Worldwide</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block bg-white p-4 md:p-10 rounded-xl">
            <form action="#" className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-secondary mb-2">Full Name</label>
                <input
                  className="w-full bg-gray-200 text-[#2B3437] border-none rounded-lg p-4 focus:ring-2 focus:ring-primary focus:bg-gray-100 transition-all outline-none"
                  placeholder="John Doe"
                  type="text"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-secondary mb-2">Email Address</label>
                <input
                  className="w-full bg-gray-200 text-[#2B3437] border-none rounded-lg p-4 focus:ring-2 focus:ring-primary focus:bg-gray-100 transition-all outline-none"
                  placeholder="john@example.com"
                  type="email"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-secondary mb-2">Your Vision</label>
                <textarea
                  className="w-full bg-gray-200 text-[#2B3437] border-none rounded-lg p-4 focus:ring-2 focus:ring-primary focus:bg-gray-100 transition-all outline-none"
                  placeholder="Describe your project..."
                  rows={4}
                />
              </div>
              <button
                className="w-full bg-primary text-on-primary py-4 rounded-lg font-bold hover:bg-primary-dim transition-all shadow-lg active:scale-95"
                type="submit"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
