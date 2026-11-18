import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '#kerjaya', label: 'Kerjaya' },
  { href: '#pembelajaran', label: 'Pembelajaran' },
  { href: '#kesesuaian', label: 'Kesesuaian Anak' },
  { href: '#soalan-lazim', label: 'Soalan Lazim' },
];

export function TopNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#21495B]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        <a
          href="#atas"
          className="text-base sm:text-lg font-bold tracking-tight text-[#21495B] whitespace-nowrap shrink-0"
        >
          Global Institute of Studies
        </a>

        <nav
          aria-label="Navigasi utama"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#254451]"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="py-1 border-b-2 border-transparent hover:border-[#127E79] hover:text-[#127E79] transition-colors whitespace-nowrap shrink-0"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#konsultasi"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-[#127E79] hover:bg-[#0e6662] rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            Mohon Konsultasi
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="navigasi-mudah-alih"
            aria-label={mobileOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-[#21495B] hover:bg-[#EAF7F3] transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div
          id="navigasi-mudah-alih"
          className="md:hidden bg-white border-t border-[#21495B]/10 px-4 py-4 space-y-1"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center min-h-[44px] px-3 rounded-lg text-sm font-medium text-[#21495B] hover:bg-[#EAF7F3] transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#konsultasi"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center min-h-[44px] w-full px-4 py-2.5 text-sm font-semibold text-white bg-[#127E79] hover:bg-[#0e6662] rounded-lg transition-colors"
            >
              Mohon Konsultasi Bersama GIS
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
