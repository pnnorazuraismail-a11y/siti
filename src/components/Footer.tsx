import { DRAFT_WHATSAPP_DISPLAY } from '../data/programContent';

interface FooterProps {
  onOpenPrivacyModal: () => void;
  onOpenDraftStatusModal: () => void;
}

export function Footer({ onOpenPrivacyModal, onOpenDraftStatusModal }: FooterProps) {
  return (
    <footer className="bg-[#EAF7F3]/75 border-t border-[#21495B]/10 text-[#254451]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid md:grid-cols-12 gap-8 pb-10 border-b border-[#21495B]/10">
          <div className="md:col-span-5 space-y-3">
            <p className="text-lg font-bold text-[#21495B]">Global Institute of Studies (GIS)</p>
            <p className="text-sm text-[#254451] leading-relaxed max-w-md">
              Draf halaman panduan ibu bapa untuk Program SKM Penjagaan Warga Emas. Disediakan untuk penilaian pihak berkepentingan sebelum penerbitan rasmi.
            </p>
            <p className="text-xs text-[#254451]/80">
              Status dokumen: DRAF untuk penilaian, bukan laman web rasmi.
            </p>
          </div>

          <div className="md:col-span-3 space-y-2.5">
            <h3 className="text-sm font-bold text-[#21495B]">Pautan Bahagian</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#kebimbangan" className="hover:text-[#127E79] transition-colors">
                  Persoalan Ibu Bapa
                </a>
              </li>
              <li>
                <a href="#kerjaya" className="hover:text-[#127E79] transition-colors">
                  Laluan Kerjaya
                </a>
              </li>
              <li>
                <a href="#pembelajaran" className="hover:text-[#127E79] transition-colors">
                  Pembelajaran Praktikal
                </a>
              </li>
              <li>
                <a href="#ketelusan" className="hover:text-[#127E79] transition-colors">
                  Ketelusan Yuran &amp; Akreditasi
                </a>
              </li>
              <li>
                <a href="#kesesuaian" className="hover:text-[#127E79] transition-colors">
                  Semakan Kesesuaian Anak
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-2.5">
            <h3 className="text-sm font-bold text-[#21495B]">Hubungi &amp; Pematuhan</h3>
            <p className="text-sm">
              WhatsApp Konsultasi (Draf):{' '}
              <span className="font-semibold text-[#21495B] tabular-nums">
                {DRAFT_WHATSAPP_DISPLAY}
              </span>
            </p>
            <p className="text-xs text-[#254451]/80 leading-relaxed">
              Alamat kampus rasmi, talian pejabat, dan emel pendaftaran akan disahkan oleh GIS sebelum pelancaran awam.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-[#127E79]">
              <button
                type="button"
                onClick={onOpenPrivacyModal}
                className="underline hover:text-[#0e6662] min-h-[36px]"
              >
                Notis Privasi PDPA (Draf)
              </button>
              <button
                type="button"
                onClick={onOpenDraftStatusModal}
                className="underline hover:text-[#0e6662] min-h-[36px]"
              >
                Senarai Item Menunggu Pengesahan GIS
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#254451]/80">
          <p>© 2026 Global Institute of Studies (Draf Penilaian). Semua hak cipta terpelihara.</p>
          <p>Semua foto di halaman draf ini ialah gambar ilustrasi — bukan gambar sebenar GIS.</p>
        </div>
      </div>
    </footer>
  );
}
