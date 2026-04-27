'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface Option<T extends string> {
  value: T;
  label: string;
}

interface Props<T extends string> {
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
}

export default function CustomSelect<T extends string>({ value, options, onChange }: Props<T>) {
  const [open, setOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const selected = options.find(o => o.value === value);

  function handleOpen() {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + window.scrollY + 6,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
    setOpen(o => !o);
  }

  useEffect(() => {
    if (!open) return;
    function close(e: MouseEvent) {
      if (triggerRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    }
    document.addEventListener('mousedown', close);
    window.addEventListener('scroll', close, true);
    return () => {
      document.removeEventListener('mousedown', close);
      window.removeEventListener('scroll', close, true);
    };
  }, [open]);

  const dropdown = open ? (
    <div
      style={{
        position: 'absolute',
        top: dropdownPos.top,
        left: dropdownPos.left,
        width: dropdownPos.width,
        zIndex: 9999,
      }}
      className="bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden"
    >
      {options.map(opt => {
        const isSelected = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onMouseDown={e => e.stopPropagation()}
            onClick={() => { onChange(opt.value); setOpen(false); }}
            className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors duration-150 ${
              isSelected
                ? 'bg-primary text-white'
                : 'text-[#2B3437] hover:bg-accent hover:text-primary'
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  ) : null;

  return (
    <div className="relative w-full md:w-auto">
      <button
        ref={triggerRef}
        type="button"
        onClick={handleOpen}
        className="w-full md:w-auto flex items-center justify-between gap-6 pl-4 pr-3 py-2.5 rounded-lg bg-white border border-gray-200 text-[#2B3437] text-sm font-medium outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 cursor-pointer hover:border-primary"
      >
        <span>{selected?.label}</span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {typeof window !== 'undefined' && createPortal(dropdown, document.body)}
    </div>
  );
}
