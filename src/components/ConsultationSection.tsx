import { useEffect, useState, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2, ExternalLink, MessageCircle, RefreshCw } from 'lucide-react';
import {
  AGE_GROUP_OPTIONS,
  CONCERN_OPTIONS,
  DRAFT_WHATSAPP_DIGITS,
  DRAFT_WHATSAPP_DISPLAY,
} from '../data/programContent';

interface ConsultationSectionProps {
  preselectedConcern: string;
  quizSummary: string;
  onOpenPrivacyModal: () => void;
}

interface VerifiedSuccessData {
  leadId: string;
  submittedAtMyt: string;
  normalizedPhone: string;
  parentName: string;
  primaryConcern: string;
}

function previewNormalizeMyPhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, '');
  let local = '';
  if (digits.startsWith('60')) {
    local = digits.slice(2);
  } else if (digits.startsWith('0')) {
    local = digits.slice(1);
  } else if (digits.startsWith('1')) {
    local = digits;
  } else {
    return null;
  }
  if (!/^1[0-9]{8,9}$/.test(local)) {
    return null;
  }
  return `+60${local}`;
}

export function ConsultationSection({
  preselectedConcern,
  quizSummary,
  onOpenPrivacyModal,
}: ConsultationSectionProps) {
  const [parentName, setParentName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [childAgeGroup, setChildAgeGroup] = useState('');
  const [primaryConcern, setPrimaryConcern] = useState(CONCERN_OPTIONS[0]);
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [websiteHoneypot, setWebsiteHoneypot] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<VerifiedSuccessData | null>(null);

  useEffect(() => {
    if (preselectedConcern && CONCERN_OPTIONS.includes(preselectedConcern)) {
      setPrimaryConcern(preselectedConcern);
    }
  }, [preselectedConcern]);

  const normalizedPreview = whatsapp.trim() ? previewNormalizeMyPhone(whatsapp) : null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (parentName.trim().length < 2) {
      setErrorMessage('Sila masukkan nama ibu bapa atau penjaga (sekurang-kurangnya 2 aksara).');
      return;
    }

    const normalized = previewNormalizeMyPhone(whatsapp);
    if (!normalized) {
      setErrorMessage(
        'Sila masukkan nombor WhatsApp Malaysia yang sah (contoh: 019-211 5642 atau +60192115642).',
      );
      return;
    }

    if (!consent) {
      setErrorMessage(
        'Sila tandakan kotak persetujuan untuk membenarkan wakil GIS menghubungi anda bagi tujuan konsultasi.',
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentName: parentName.trim(),
          whatsapp: whatsapp.trim(),
          childAgeGroup,
          primaryConcern,
          message: message.trim(),
          consent: true,
          quizSummary,
          website: websiteHoneypot,
        }),
      });

      const payload = (await response.json().catch(() => null)) as {
        ok?: boolean;
        leadId?: string;
        submittedAtMyt?: string;
        normalizedPhone?: string;
        error?: string;
      } | null;

      if (!response.ok || !payload?.ok || !payload.leadId) {
        setErrorMessage(
          payload?.error ||
            'Rekod tidak dapat disahkan oleh pelayan. Maklumat yang anda isi kekal di sini — sila cuba lagi atau hubungi melalui WhatsApp manual.',
        );
        return;
      }

      setSuccessData({
        leadId: payload.leadId,
        submittedAtMyt: payload.submittedAtMyt || '',
        normalizedPhone: payload.normalizedPhone || normalized,
        parentName: parentName.trim(),
        primaryConcern,
      });
    } catch {
      setErrorMessage(
        'Tiada sambungan ke pelayan pengesahan. Data belum direkodkan — sila cuba hantar semula atau guna pautan WhatsApp manual.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const buildWhatsappHref = (leadId?: string) => {
    const lines = [
      'Salam sejahtera GIS, saya ingin memohon konsultasi Program SKM Penjagaan Warga Emas.',
      leadId ? `ID Rujukan: ${leadId}` : null,
      parentName.trim() ? `Nama Ibu Bapa/Penjaga: ${parentName.trim()}` : null,
      `Topik Utama: ${primaryConcern}`,
      childAgeGroup ? `Umur Anak: ${childAgeGroup}` : null,
    ].filter(Boolean);
    return `https://wa.me/${DRAFT_WHATSAPP_DIGITS}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const handleResetForm = () => {
    setSuccessData(null);
    setErrorMessage(null);
    setParentName('');
    setWhatsapp('');
    setChildAgeGroup('');
    setMessage('');
    setConsent(false);
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      <div className="lg:col-span-5 space-y-6">
        <div>
          <p className="text-xs font-medium text-[#127E79] mb-2">
            Langkah Seterusnya · Tanpa Paksaan Pendaftaran
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#21495B] leading-tight">
            Mohon Konsultasi Bersama GIS
          </h2>
          <p className="mt-3 text-base text-[#254451] leading-relaxed">
            Bercakap terus dengan wakil penasihat untuk mendapatkan penjelasan telus mengenai struktur program, suasana latihan, status pengesahan yuran, dan pilihan lawatan kampus.
          </p>
        </div>

        <div className="bg-[#EAF7F3] border border-[#127E79]/15 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-[#21495B]">
            Bagaimana Proses Konsultasi Berfungsi
          </h3>
          <ol className="space-y-3 text-sm text-[#254451] leading-relaxed">
            <li>
              <span className="font-semibold text-[#21495B]">01. Hantar butiran ringkas:</span>{' '}
              Pelayan menyemak maklumat dan mengesahkan ID rujukan unik sebelum memaparkan pengesahan.
            </li>
            <li>
              <span className="font-semibold text-[#21495B]">02. Teruskan ke WhatsApp:</span>{' '}
              Pautan WhatsApp akan menyertakan ID rujukan supaya pasukan GIS dapat menyemak topik persoalan anda dengan tepat.
            </li>
            <li>
              <span className="font-semibold text-[#21495B]">03. Perbincangan jujur:</span>{' '}
              Tiada yuran konsultasi dan tiada kewajipan mendaftar selepas sesi penerangan.
            </li>
          </ol>
          <p className="text-xs text-[#254451]/80 pt-2 border-t border-[#21495B]/10">
            Nombor WhatsApp draf: <span className="font-semibold">{DRAFT_WHATSAPP_DISPLAY}</span> (tertakluk kepada pengesahan rasmi GIS sebelum penerbitan).
          </p>
        </div>
      </div>

      <div className="lg:col-span-7">
        <div className="bg-white border border-[#21495B]/12 rounded-2xl p-6 sm:p-8 shadow-sm">
          {successData ? (
            <div className="space-y-6" role="status" aria-live="polite">
              <div className="flex items-start gap-3.5 bg-[#EAF7F3] border border-[#127E79]/30 rounded-xl p-5">
                <CheckCircle2 className="w-6 h-6 text-[#127E79] shrink-0 mt-0.5" aria-hidden="true" />
                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-[#21495B]">
                    Permohonan Konsultasi Berjaya Direkodkan
                  </h3>
                  <p className="text-sm text-[#254451] leading-relaxed">
                    Terima kasih, <span className="font-semibold">{successData.parentName}</span>. Permohonan anda telah disahkan oleh pelayan dengan butiran berikut:
                  </p>
                </div>
              </div>

              <dl className="grid sm:grid-cols-2 gap-4 bg-[#FFF9EF] border border-[#21495B]/10 rounded-xl p-5 text-sm">
                <div>
                  <dt className="text-xs text-[#254451]/75">ID Rujukan</dt>
                  <dd className="font-mono-code font-semibold text-[#21495B] mt-0.5">
                    {successData.leadId}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-[#254451]/75">Masa Rekod (MYT)</dt>
                  <dd className="tabular-nums font-medium text-[#21495B] mt-0.5">
                    {successData.submittedAtMyt || 'Direkodkan'}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-[#254451]/75">Nombor WhatsApp</dt>
                  <dd className="tabular-nums font-medium text-[#21495B] mt-0.5">
                    {successData.normalizedPhone}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-[#254451]/75">Persoalan Utama</dt>
                  <dd className="font-medium text-[#21495B] mt-0.5">{successData.primaryConcern}</dd>
                </div>
              </dl>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href={buildWhatsappHref(successData.leadId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-3 text-sm font-semibold text-white bg-[#127E79] hover:bg-[#0e6662] rounded-lg transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  Teruskan ke WhatsApp
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="inline-flex items-center justify-center min-h-[44px] px-4 py-2.5 text-sm font-medium text-[#21495B] border border-[#21495B]/15 hover:bg-[#EAF7F3] rounded-lg transition-colors whitespace-nowrap"
                >
                  Hantar Permohonan Lain
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Honeypot field for bot filtering */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website-field">Laman web</label>
                <input
                  id="website-field"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={websiteHoneypot}
                  onChange={(e) => setWebsiteHoneypot(e.target.value)}
                />
              </div>

              {quizSummary ? (
                <div className="bg-[#EAF7F3] border border-[#127E79]/20 rounded-xl px-4 py-3 text-xs text-[#21495B]">
                  Ringkasan semakan kesesuaian disertakan bersama borang: <span className="font-semibold">{quizSummary}</span>
                </div>
              ) : null}

              {errorMessage ? (
                <div
                  role="alert"
                  className="bg-[#FFF9EF] border border-[#b45309]/35 rounded-xl p-4 space-y-3"
                >
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-5 h-5 text-[#b45309] shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-sm font-medium text-[#21495B] leading-relaxed">
                      {errorMessage}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 pl-7">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 text-xs font-semibold text-white bg-[#127E79] hover:bg-[#0e6662] rounded-lg transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
                      Cuba Hantar Semula
                    </button>
                    <a
                      href={buildWhatsappHref()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 text-xs font-semibold text-[#21495B] border border-[#21495B]/20 bg-white hover:bg-[#EAF7F3] rounded-lg transition-colors"
                    >
                      Hubungi WhatsApp secara manual (tanpa ID rekod)
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              ) : null}

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="parent-name"
                    className="block text-sm font-semibold text-[#21495B] mb-1.5"
                  >
                    Nama Ibu Bapa / Penjaga <span className="text-[#127E79]">*</span>
                  </label>
                  <input
                    id="parent-name"
                    name="parentName"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Contoh: Puan Norazura"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    className="w-full min-h-[44px] px-3.5 py-2.5 text-sm text-[#21495B] bg-white border border-[#21495B]/20 rounded-lg focus:border-[#127E79]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="parent-whatsapp"
                    className="block text-sm font-semibold text-[#21495B] mb-1.5"
                  >
                    Nombor WhatsApp <span className="text-[#127E79]">*</span>
                  </label>
                  <input
                    id="parent-whatsapp"
                    name="whatsapp"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="Contoh: 019-211 5642"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full min-h-[44px] px-3.5 py-2.5 text-sm text-[#21495B] bg-white border border-[#21495B]/20 rounded-lg focus:border-[#127E79] tabular-nums"
                  />
                  {normalizedPreview ? (
                    <p className="mt-1 text-xs text-[#127E79] tabular-nums">
                      Format disahkan: {normalizedPreview}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="child-age-group"
                    className="block text-sm font-semibold text-[#21495B] mb-1.5"
                  >
                    Kumpulan Umur Anak (Pilihan)
                  </label>
                  <select
                    id="child-age-group"
                    name="childAgeGroup"
                    value={childAgeGroup}
                    onChange={(e) => setChildAgeGroup(e.target.value)}
                    className="w-full min-h-[44px] px-3.5 py-2.5 text-sm text-[#21495B] bg-white border border-[#21495B]/20 rounded-lg focus:border-[#127E79]"
                  >
                    <option value="">Pilih kumpulan umur (pilihan)</option>
                    {AGE_GROUP_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="primary-concern"
                    className="block text-sm font-semibold text-[#21495B] mb-1.5"
                  >
                    Persoalan Utama <span className="text-[#127E79]">*</span>
                  </label>
                  <select
                    id="primary-concern"
                    name="primaryConcern"
                    required
                    value={primaryConcern}
                    onChange={(e) => setPrimaryConcern(e.target.value)}
                    className="w-full min-h-[44px] px-3.5 py-2.5 text-sm text-[#21495B] bg-white border border-[#21495B]/20 rounded-lg focus:border-[#127E79]"
                  >
                    {CONCERN_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="consultation-message"
                  className="block text-sm font-semibold text-[#21495B] mb-1.5"
                >
                  Soalan atau Catatan Tambahan (Pilihan)
                </label>
                <textarea
                  id="consultation-message"
                  name="message"
                  rows={3}
                  maxLength={800}
                  placeholder="Contoh: Kami ingin bertanya tentang jadual lawatan kampus dan pengesahan yuran terkini."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm text-[#21495B] bg-white border border-[#21495B]/20 rounded-lg focus:border-[#127E79]"
                />
              </div>

              <div className="bg-[#FFF9EF] border border-[#21495B]/10 rounded-xl p-4 space-y-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 accent-[#127E79] shrink-0"
                  />
                  <span className="text-xs sm:text-sm text-[#254451] leading-relaxed">
                    Saya bersetuju untuk membenarkan pihak Global Institute of Studies (GIS) menghubungi saya melalui WhatsApp atau panggilan bagi tujuan konsultasi program ini selaras dengan{' '}
                    <button
                      type="button"
                      onClick={onOpenPrivacyModal}
                      className="font-semibold text-[#127E79] underline hover:text-[#0e6662]"
                    >
                      Notis Privasi PDPA (Draf)
                    </button>
                    .
                  </span>
                </label>
              </div>

              <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center min-h-[46px] px-6 py-3 text-sm font-semibold text-white bg-[#127E79] hover:bg-[#0e6662] disabled:opacity-60 rounded-lg transition-colors whitespace-nowrap"
                >
                  {isSubmitting ? 'Menghantar & Mengesahkan Rekod...' : 'Mohon Konsultasi Bersama GIS'}
                </button>
                <p className="text-xs text-[#254451]/75">
                  Maklumat terhad kepada tujuan konsultasi sahaja.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
