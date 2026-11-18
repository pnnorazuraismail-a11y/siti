import { useEffect } from 'react';
import { X } from 'lucide-react';

interface PolicyModalProps {
  activeModal: 'privacy' | 'draft-status' | null;
  onClose: () => void;
}

const PENDING_ITEMS = [
  { item: 'Nama rasmi program, kod, tahap SKM & bukti akreditasi JPK', status: 'GIS untuk mengesahkan' },
  { item: 'Tempoh pengajian & syarat kemasukan rasmi lepasan SPM', status: 'GIS untuk mengesahkan' },
  { item: 'Yuran pengajian, yuran pendaftaran & kos tambahan', status: 'GIS untuk mengesahkan' },
  { item: 'Ketersediaan pembiayaan (PTPK, geran, diskaun, ansuran)', status: 'Belum disahkan' },
  { item: 'Nama rakan industri, perjanjian MOU & butiran penempatan', status: 'GIS untuk mengesahkan' },
  { item: 'Foto rasmi kampus, bilik simulasi, pengajar & pelajar', status: 'Menunggu aset rasmi' },
  { item: 'Julat gaji & rujukan pasaran tempatan bertarikh', status: 'Penyelidikan & pengesahan' },
  { item: 'Nombor WhatsApp konsultasi rasmi (+60 19-211 5642)', status: 'Untuk pengesahan GIS' },
  { item: 'Pemilik Google Sheet, akses terhad & polisi tempoh simpanan', status: 'Untuk konfigurasi' },
  { item: 'Notis privasi PDPA muktamad & kelulusan penerbitan', status: 'Menunggu kelulusan' },
];

export function PolicyModals({ activeModal, onClose }: PolicyModalProps) {
  useEffect(() => {
    if (!activeModal) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeModal, onClose]);

  if (!activeModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#21495B]/35 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white border border-[#21495B]/15 rounded-2xl p-6 sm:p-8 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#21495B]/10">
          <div>
            <p className="text-xs font-medium text-[#127E79]">
              Dokumen Draf Penilaian · Global Institute of Studies
            </p>
            <h3 id="modal-title" className="text-xl font-bold text-[#21495B] mt-1">
              {activeModal === 'privacy'
                ? 'Notis Privasi & Perlindungan Data Peribadi (Draf PDPA)'
                : 'Senarai Item Menunggu Pengesahan Rasmi GIS'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup dialog"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-[#21495B] hover:bg-[#EAF7F3] transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {activeModal === 'privacy' ? (
          <div className="mt-5 space-y-4 text-sm text-[#254451] leading-relaxed">
            <p>
              Notis ini disediakan sebagai draf rujukan selaras dengan prinsip Akta Perlindungan Data Peribadi 2010 (PDPA) Malaysia sebelum kelulusan muktamad oleh Global Institute of Studies (GIS).
            </p>
            <div className="space-y-2">
              <h4 className="font-bold text-[#21495B]">1. Tujuan Pengumpulan Maklumat</h4>
              <p>
                Nama ibu bapa/penjaga, nombor WhatsApp, kumpulan umur anak (pilihan), dan persoalan utama dikumpulkan semata-mata untuk mengatur sesi konsultasi pendidikan serta menjawab pertanyaan anda mengenai program.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-[#21495B]">2. Had Data Sensitif &amp; Persetujuan</h4>
              <p>
                Borang ini mengelakkan pengumpulan maklumat peribadi anak yang tidak perlu. Pertanyaan susulan hanya dibuat selepas anda menandakan persetujuan eksplisit.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-[#21495B]">3. Akses, Simpanan &amp; Hak Menarik Balik</h4>
              <p>
                Dalam pelaksanaan rasmi, rekod konsultasi hanya boleh diakses oleh kakitangan kemasukan GIS yang diberi kuasa dengan pengesahan dua faktor (2FA), tertakluk kepada polisi tempoh simpanan data dan hak penarikan balik persetujuan pada bila-bila masa.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            <p className="text-sm text-[#254451] leading-relaxed">
              Selaras dengan garis panduan ketelusan, item berikut masih berada dalam fasa semakan dan pengesahan rasmi bersama GIS sebelum halaman ini diterbitkan kepada umum:
            </p>
            <div className="divide-y divide-[#21495B]/10 border border-[#21495B]/12 rounded-xl overflow-hidden">
              {PENDING_ITEMS.map((row) => (
                <div
                  key={row.item}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 py-3 text-sm bg-white"
                >
                  <span className="text-[#21495B] font-medium">{row.item}</span>
                  <span className="text-xs font-semibold text-[#127E79] whitespace-nowrap shrink-0">
                    [{row.status}]
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-[#21495B]/10 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-5 py-2.5 text-sm font-semibold text-white bg-[#127E79] hover:bg-[#0e6662] rounded-lg transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
