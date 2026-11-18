import { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { ConsultationSection } from './components/ConsultationSection';
import { Footer } from './components/Footer';
import { PolicyModals } from './components/PolicyModals';
import { ResilientImage } from './components/ResilientImage';
import { RevealSection } from './components/RevealSection';
import { SuitabilityQuiz } from './components/SuitabilityQuiz';
import { TopNav } from './components/TopNav';
import {
  CAREER_STAGES,
  FAQ_ITEMS,
  HERO_IMAGE,
  LEARNING_IMAGES,
  LEARNING_PILLARS,
  PARENT_CONCERNS,
  TRANSPARENCY_ITEMS,
} from './data/programContent';

export default function App() {
  const [selectedConcern, setSelectedConcern] = useState('');
  const [quizSummary, setQuizSummary] = useState('');
  const [activeModal, setActiveModal] = useState<'privacy' | 'draft-status' | null>(null);

  const handleApplyFromQuiz = (concern: string, summaryNote: string) => {
    setSelectedConcern(concern);
    setQuizSummary(summaryNote);
    const el = document.getElementById('konsultasi');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#254451]">
      <TopNav />

      <main className="flex-1">
        {/* 1. Cinematic Light-Mode Hero */}
        <section
          id="atas"
          className="relative bg-[#FFF9EF] border-b border-[#21495B]/10 overflow-hidden"
        >
          {/* Desktop Edge-to-Edge Photography + Light Gradient Scrim */}
          <div className="hidden lg:block relative min-h-[650px]">
            <img
              src={HERO_IMAGE.src}
              alt={HERO_IMAGE.alt}
              loading="eager"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-right"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(95deg, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.92) 42%, rgba(255,255,255,0.52) 66%, rgba(255,255,255,0.12) 100%)',
              }}
            />

            <div className="relative max-w-6xl mx-auto px-6 py-20 min-h-[650px] flex flex-col justify-center">
              <div className="max-w-2xl space-y-6">
                <p className="hero-stagger-1 text-xs font-semibold tracking-wide text-[#127E79]">
                  Draf Penilaian · Program SKM Penjagaan Warga Emas · Panduan Ibu Bapa
                </p>

                <h1 className="hero-stagger-2 text-[clamp(2.5rem,4.5vw,4.25rem)] font-bold leading-[1.1] tracking-tight text-[#21495B]">
                  Anak masih mencari hala tuju selepas SPM?
                </h1>

                <p className="hero-stagger-3 text-lg text-[#254451] leading-relaxed max-w-xl">
                  Terokai kemahiran penjagaan warga emas dan peluang membina kerjaya bermakna — melalui pembelajaran praktikal terbimbing dan perbincangan jujur bersama keluarga.
                </p>

                <div className="hero-stagger-4 flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="#konsultasi"
                    className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 text-sm font-semibold text-white bg-[#127E79] hover:bg-[#0e6662] rounded-lg transition-colors whitespace-nowrap"
                  >
                    Mohon Konsultasi Bersama GIS
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                  <a
                    href="#kerjaya"
                    className="inline-flex items-center justify-center min-h-[48px] px-5 py-3 text-sm font-semibold text-[#21495B] bg-white/90 hover:bg-[#EAF7F3] border border-[#21495B]/20 rounded-lg transition-colors whitespace-nowrap"
                  >
                    Terokai Peluang Kerjaya
                  </a>
                  <a
                    href="#kesesuaian"
                    className="inline-flex items-center min-h-[44px] px-2 text-sm font-semibold text-[#127E79] hover:text-[#0e6662] underline underline-offset-4 whitespace-nowrap"
                  >
                    Semak Kesesuaian Anak
                  </a>
                </div>
              </div>
            </div>

            <p className="absolute bottom-4 right-6 text-xs font-medium text-[#21495B] bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-md border border-[#21495B]/10">
              {HERO_IMAGE.caption}
            </p>
          </div>

          {/* Mobile & Tablet Stacked Photographic Composition */}
          <div className="lg:hidden">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-8 space-y-5">
              <p className="hero-stagger-1 text-xs font-semibold text-[#127E79]">
                Draf Penilaian · Program SKM Penjagaan Warga Emas
              </p>
              <h1 className="hero-stagger-2 text-[2.35rem] sm:text-5xl font-bold leading-[1.12] tracking-tight text-[#21495B]">
                Anak masih mencari hala tuju selepas SPM?
              </h1>
              <p className="hero-stagger-3 text-base sm:text-lg text-[#254451] leading-relaxed">
                Terokai kemahiran penjagaan warga emas dan peluang membina kerjaya bermakna — melalui pembelajaran praktikal terbimbing dan perbincangan jujur bersama keluarga.
              </p>
              <div className="hero-stagger-4 flex flex-col sm:flex-row sm:flex-wrap gap-3 pt-1">
                <a
                  href="#konsultasi"
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 text-sm font-semibold text-white bg-[#127E79] hover:bg-[#0e6662] rounded-lg transition-colors"
                >
                  Mohon Konsultasi Bersama GIS
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href="#kerjaya"
                  className="inline-flex items-center justify-center min-h-[48px] px-5 py-3 text-sm font-semibold text-[#21495B] bg-white border border-[#21495B]/20 hover:bg-[#EAF7F3] rounded-lg transition-colors"
                >
                  Terokai Peluang Kerjaya
                </a>
              </div>
            </div>

            <div className="px-4 sm:px-6 pb-8">
              <ResilientImage
                src={HERO_IMAGE.src}
                alt={HERO_IMAGE.alt}
                caption={HERO_IMAGE.caption}
                loading="eager"
                aspectClassName="aspect-[16/9] rounded-xl"
              />
            </div>
          </div>
        </section>

        {/* 2. Six Parent Concerns */}
        <RevealSection id="kebimbangan" className="bg-white py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-2xl space-y-3">
              <p className="text-xs font-semibold text-[#127E79]">
                Jawapan Terus Terang untuk Ibu Bapa &amp; Penjaga
              </p>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#21495B] tracking-tight">
                Enam persoalan utama sebelum memilih bidang penjagaan warga emas
              </h2>
              <p className="text-base text-[#254451] leading-relaxed">
                Kami memahami ibu bapa mahukan gambaran yang realistik — bukan janji kosong. Berikut ialah penjelasan jujur bagi setiap pertimbangan penting keluarga.
              </p>
            </div>

            <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PARENT_CONCERNS.map((item) => (
                <article
                  key={item.number}
                  className="bg-white border border-[#21495B]/12 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-md"
                >
                  <div>
                    <p className="font-mono-code text-xs font-medium text-[#127E79]">
                      {item.number}.
                    </p>
                    <h3 className="text-lg font-bold text-[#21495B] mt-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm text-[#254451] leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  <p className="mt-5 pt-4 border-t border-[#21495B]/10 text-xs text-[#21495B]/85 leading-relaxed">
                    <span className="font-semibold text-[#127E79]">Realiti semasa:</span>{' '}
                    {item.realityNote}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </RevealSection>

        {/* 3. Career Pathway & Industry Reality */}
        <RevealSection id="kerjaya" className="bg-[#EAF7F3] py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-[#127E79]">
                    Prospek &amp; Perkembangan Kerjaya
                  </p>
                  <h2 className="text-2xl sm:text-4xl font-bold text-[#21495B] tracking-tight">
                    Laluan kerjaya berperingkat dalam sektor penjagaan
                  </h2>
                  <p className="text-base text-[#254451] leading-relaxed">
                    Kemahiran penjagaan warga emas memberi asas kerja yang jelas dan bermaruah. Kemajuan kerjaya bergantung kepada pengalaman kerja, prestasi di lapangan, dan keperluan kelayakan tambahan.
                  </p>
                </div>

                <div className="divide-y divide-[#21495B]/12 border-y border-[#21495B]/12">
                  {CAREER_STAGES.map((stage) => (
                    <div key={stage.step} className="py-5 grid sm:grid-cols-12 gap-2 sm:gap-6">
                      <div className="sm:col-span-3">
                        <p className="font-mono-code text-xs font-medium text-[#127E79]">
                          {stage.step}
                        </p>
                        <p className="text-xs text-[#254451]/75 mt-0.5">{stage.roleSubtitle}</p>
                      </div>
                      <div className="sm:col-span-9">
                        <h3 className="text-base font-bold text-[#21495B]">{stage.roleTitle}</h3>
                        <p className="mt-1.5 text-sm text-[#254451] leading-relaxed">
                          {stage.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white/85 border border-[#21495B]/12 rounded-xl p-5 space-y-2 text-xs sm:text-sm text-[#254451] leading-relaxed">
                  <p>
                    <span className="font-bold text-[#21495B]">Nota kerjasama industri &amp; pekerjaan:</span>{' '}
                    GIS mempunyai kerjasama industri di peringkat umum; nama rakan industri rasmi, MOU, dan terma penempatan hanya akan diumumkan selepas pengesahan bertulis. Pengambilan kerja bergantung kepada majikan, kekosongan, dan kelayakan pemohon.
                  </p>
                  <p>
                    <span className="font-bold text-[#21495B]">Tiada janji luar negara:</span>{' '}
                    Halaman ini tidak menjanjikan pekerjaan di Singapura, kadar gaji tertentu, atau kelayakan pas kerja luar negara.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col">
                <ResilientImage
                  src={LEARNING_IMAGES.career.src}
                  alt={LEARNING_IMAGES.career.alt}
                  caption={LEARNING_IMAGES.career.caption}
                  className="h-full"
                  aspectClassName="aspect-[4/3] lg:aspect-auto lg:flex-1 rounded-2xl"
                  imgClassName="hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>
        </RevealSection>

        {/* 4. Practical Learning */}
        <RevealSection id="pembelajaran" className="bg-[#FFF9EF] py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
            <div className="grid lg:grid-cols-12 gap-6 items-end">
              <div className="lg:col-span-7 space-y-3">
                <p className="text-xs font-semibold text-[#127E79]">
                  Pendekatan Pembelajaran Praktikal
                </p>
                <h2 className="text-2xl sm:text-4xl font-bold text-[#21495B] tracking-tight">
                  Belajar melalui tunjuk cara, latihan kemahiran, dan bimbingan pengajar
                </h2>
              </div>
              <p className="lg:col-span-5 text-sm sm:text-base text-[#254451] leading-relaxed">
                Pelajar lepasan SPM dibimbing dari asas supaya mereka yakin mengendalikan situasi penjagaan harian dengan selamat dan beretika. Gambar di bawah ialah ilustrasi sementara sehingga foto rasmi kampus serta bilik simulasi GIS diluluskan.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {LEARNING_PILLARS.map((pillar) => (
                <div
                  key={pillar.number}
                  className="bg-white border border-[#21495B]/12 rounded-2xl p-6 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-md"
                >
                  <p className="font-mono-code text-xs font-medium text-[#127E79]">
                    {pillar.number}.
                  </p>
                  <h3 className="text-lg font-bold text-[#21495B] mt-2">{pillar.title}</h3>
                  <p className="mt-2.5 text-sm text-[#254451] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <ResilientImage
                src={LEARNING_IMAGES.demo.src}
                alt={LEARNING_IMAGES.demo.alt}
                caption={`${LEARNING_IMAGES.demo.caption} — ilustrasi demonstrasi asas penjagaan.`}
                aspectClassName="aspect-[4/3] rounded-2xl"
                imgClassName="hover:scale-[1.02]"
              />
              <ResilientImage
                src={LEARNING_IMAGES.coaching.src}
                alt={LEARNING_IMAGES.coaching.alt}
                caption={`${LEARNING_IMAGES.coaching.caption} — ilustrasi bimbingan komunikasi & mobiliti.`}
                aspectClassName="aspect-[4/3] rounded-2xl"
                imgClassName="hover:scale-[1.02]"
              />
            </div>
          </div>
        </RevealSection>

        {/* 5. Financial & Accreditation Transparency */}
        <RevealSection id="ketelusan" className="bg-white py-16 sm:py-24 border-y border-[#21495B]/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold text-[#127E79]">
                Ketelusan Maklumat Program &amp; Kewangan
              </p>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#21495B] tracking-tight">
                Perkara yang sedang disahkan oleh pihak GIS sebelum penerbitan rasmi
              </h2>
              <p className="text-base text-[#254451] leading-relaxed">
                Demi ketelusan kepada ibu bapa, tiada angka yuran, tempoh muktamad, kod akreditasi SKM, atau skim pembiayaan diterbitkan selagi dokumen pengesahan rasmi GIS dan JPK belum dimuktamadkan.
              </p>
            </div>

            <div className="border border-[#21495B]/12 rounded-2xl overflow-hidden divide-y divide-[#21495B]/10">
              {TRANSPARENCY_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="grid md:grid-cols-12 gap-4 p-6 bg-white hover:bg-[#EAF7F3]/35 transition-colors"
                >
                  <div className="md:col-span-5 space-y-1">
                    <h3 className="text-base font-bold text-[#21495B]">{item.label}</h3>
                    <p className="text-xs font-semibold text-[#127E79]">[{item.statusTag}]</p>
                  </div>
                  <p className="md:col-span-7 text-sm text-[#254451] leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 bg-[#EAF7F3] border border-[#127E79]/15 rounded-xl px-6 py-4">
              <p className="text-sm text-[#21495B]">
                Ingin dimaklumkan sebaik sahaja struktur yuran dan jadual pengambilan rasmi disahkan?
              </p>
              <a
                href="#konsultasi"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#127E79] hover:text-[#0e6662] whitespace-nowrap"
              >
                Daftar pertanyaan konsultasi
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </RevealSection>

        {/* 6. Child Suitability Quiz */}
        <RevealSection id="kesesuaian" className="bg-[#EAF7F3] py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
            <div className="space-y-3 text-center max-w-2xl mx-auto">
              <p className="text-xs font-semibold text-[#127E79]">
                Perbincangan Ibu Bapa &amp; Anak
              </p>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#21495B] tracking-tight">
                Adakah bidang penjagaan warga emas sesuai dengan minat anak anda?
              </h2>
              <p className="text-base text-[#254451] leading-relaxed">
                Jawab empat soalan ringkas bersama anak anda untuk memulakan perbincangan. Keputusan ini bukan ujian kemasukan dan tidak mengikat sebarang pendaftaran.
              </p>
            </div>

            <SuitabilityQuiz onApplyToConsultation={handleApplyFromQuiz} />
          </div>
        </RevealSection>

        {/* 7. FAQ using semantic <details> and <summary> */}
        <RevealSection id="soalan-lazim" className="bg-white py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="space-y-3">
              <p className="text-xs font-semibold text-[#127E79]">
                Soalan Lazim Ibu Bapa
              </p>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#21495B] tracking-tight">
                Penjelasan terus tentang pekerjaan, gaji, pembiayaan, dan lawatan kampus
              </h2>
            </div>

            <div className="divide-y divide-[#21495B]/12 border-y border-[#21495B]/12">
              {FAQ_ITEMS.map((faq) => (
                <details key={faq.question} className="group py-5">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer min-h-[44px] text-left text-base sm:text-lg font-semibold text-[#21495B] hover:text-[#127E79] transition-colors">
                    <span>{faq.question}</span>
                    <ChevronDown
                      className="w-5 h-5 text-[#127E79] shrink-0 transition-transform duration-200 group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="mt-3 pr-8 text-sm sm:text-base text-[#254451] leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </RevealSection>

        {/* 8. Lead Capture + WhatsApp Consultation (Light Cream Canvas) */}
        <RevealSection
          id="konsultasi"
          className="bg-[#FFF9EF] py-16 sm:py-24 border-t border-[#21495B]/10"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <ConsultationSection
              preselectedConcern={selectedConcern}
              quizSummary={quizSummary}
              onOpenPrivacyModal={() => setActiveModal('privacy')}
            />
          </div>
        </RevealSection>
      </main>

      <Footer
        onOpenPrivacyModal={() => setActiveModal('privacy')}
        onOpenDraftStatusModal={() => setActiveModal('draft-status')}
      />

      <PolicyModals activeModal={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
