import { Badge } from "@/components/ui/badge";
import { ReactNode } from "react";

export default function WorkItem({
  item,
  isCurrent,
}: {
  item: { title: string; company: string; place: string; period: string; description: ReactNode };
  isCurrent: boolean;
}) {
  return (
    <div className="group flex items-stretch justify-center gap-4 mb-8">
      {/* LEFT SIDE */}
      <div className="flex flex-col items-center self-stretch">
        <div
          className={`w-2.5 h-2.5 rounded-full transition-transform duration-300 group-hover:scale-125 ${
            isCurrent ? 'bg-primary dot-pulse-animate' : 'bg-accent'
          }`}
        />
        <div className="w-0.5 bg-accent mt-2 flex-1" />
      </div>

      {/* RIGHT SIDE */}
      <div className="pb-6 transition-all duration-300 group-hover:translate-x-1">
        <div className="flex flex-col-reverse md:flex-row justify-center md:justify-between items-baseline md:items-center gap-4 md:gap-0">
          <h3 className="text-[#2B3437] text-2xl font-bold">{item.title}</h3>
          <Badge className={`font-bold px-4 py-1.5 ${isCurrent ? 'bg-primary text-white' : 'bg-accent text-[#2B3437]'}`}>
            {item.period}
          </Badge>
        </div>
        <p className="text-[#2B3437] font-semibold">
          {item.company} • {item.place}
        </p>
        <p className="text-secondary text-sm md:text-base mt-2">{item.description}</p>
      </div>
    </div>
  );
}
