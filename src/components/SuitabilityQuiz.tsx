import { useMemo, useState } from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/programContent';

interface SuitabilityQuizProps {
  onApplyToConsultation: (concern: string, summaryNote: string) => void;
}

export function SuitabilityQuiz({ onApplyToConsultation }: SuitabilityQuizProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === QUIZ_QUESTIONS.length;

  const result = useMemo(() => {
    if (!allAnswered) return null;

    let total = 0;
    for (const q of QUIZ_QUESTIONS) {
      const selected = q.options.find((opt) => opt.value === answers[q.id]);
      total += selected ? selected.score : 0;
    }

    if (total >= 10) {
      return {
        heading: 'Kecenderungan baik untuk meneroka bidang penjagaan',
        body: 'Berdasarkan jawapan anda, anak anda kelihatan mempunyai ciri empati, ketenangan, dan kesediaan belajar secara praktikal yang sangat serasi dengan latihan kemahiran penjagaan warga emas.',
        nextStep:
          'Langkah sesuai seterusnya ialah sesi konsultasi bersama GIS agar ibu bapa dan anak boleh bertanya tentang modul amali serta jadual pembelajaran sebenar.',
        summaryTag: 'Kecenderungan tinggi terhadap amali & penjagaan manusia',
      };
    }

    if (total >= 7) {
      return {
        heading: 'Sesuai untuk perbincangan lanjut dan pendedahan awal',
        body: 'Anak anda menunjukkan kesediaan menerima bimbingan serta potensi menyesuaikan diri melalui latihan berstruktur. Ramai pelajar lepasan SPM membina keyakinan secara berperingkat apabila melihat demonstrasi sebenar.',
        nextStep:
          'Kami cadangkan sesi konsultasi santai atau lawatan kampus berjadual supaya anak anda dapat memahami suasana latihan tanpa tekanan.',
        summaryTag: 'Potensi terbuka — perlukan pendedahan dan penerangan awal',
      };
    }

    return {
      heading: 'Mungkin memerlukan penerokaan hala tuju kerjaya yang lebih luas',
      body: 'Berdasarkan pilihan semasa, anak anda mungkin lebih selesa dengan bidang lain yang kurang berinteraksi secara intensif dengan keperluan individu, atau masih memerlukan masa mengenal minat sebenar.',
      nextStep:
        'Tidak mengapa — perbualan terbuka bersama penasihat pendidikan atau keluarga tetap membantu menentukan sama ada bidang penjagaan sesuai atau sebaliknya.',
      summaryTag: 'Perlu penerokaan lanjut kesesuaian minat anak',
    };
  }, [allAnswered, answers]);

  const handleReset = () => {
    setAnswers({});
  };

  return (
    <div className="bg-white border border-[#21495B]/12 rounded-2xl p-6 sm:p-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#21495B]/10">
        <div>
          <p className="text-xs font-medium text-[#127E79] mb-1.5">
            Alat Pemula Perbincangan Keluarga · Bukan Ujian Kemasukan
          </p>
          <h3 className="text-xl sm:text-2xl font-bold text-[#21495B]">
            Semak Kesesuaian Awal Anak Anda
          </h3>
        </div>
        <div className="flex items-center gap-4 text-xs text-[#254451]/80 shrink-0">
          <span className="tabular-nums font-medium">
            {answeredCount} daripada {QUIZ_QUESTIONS.length} dijawab
          </span>
          {answeredCount > 0 ? (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-[#127E79] hover:text-[#0e6662] font-semibold min-h-[40px] px-2 rounded-md transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              Set semula
            </button>
          ) : null}
        </div>
      </div>

      <div className="mt-8 space-y-8">
        {QUIZ_QUESTIONS.map((question) => (
          <fieldset key={question.id} className="space-y-3">
            <legend className="text-base font-semibold text-[#21495B] leading-snug">
              {question.prompt}
            </legend>
            <div className="grid gap-2.5 pt-1">
              {question.options.map((option) => {
                const checked = answers[question.id] === option.value;
                return (
                  <label
                    key={option.value}
                    className={`flex items-start gap-3 min-h-[44px] px-4 py-3 rounded-xl border cursor-pointer transition-colors ${
                      checked
                        ? 'bg-[#EAF7F3] border-[#127E79] text-[#21495B]'
                        : 'bg-[#FFFFFF] border-[#21495B]/12 text-[#254451] hover:bg-[#FFF9EF]'
                    }`}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={option.value}
                      checked={checked}
                      onChange={() =>
                        setAnswers((prev) => ({
                          ...prev,
                          [question.id]: option.value,
                        }))
                      }
                      className="mt-1 h-4 w-4 accent-[#127E79] shrink-0"
                    />
                    <span className="text-sm sm:text-[15px] leading-relaxed">{option.label}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <div aria-live="polite" className="mt-8">
        {result ? (
          <div className="bg-[#EAF7F3] border border-[#127E79]/25 rounded-xl p-6 space-y-4">
            <div>
              <p className="text-xs font-medium text-[#127E79]">
                Panduan Perbincangan (Bukan Penilaian Diagnostik)
              </p>
              <h4 className="text-lg sm:text-xl font-bold text-[#21495B] mt-1">
                {result.heading}
              </h4>
            </div>
            <p className="text-sm sm:text-[15px] text-[#254451] leading-relaxed">{result.body}</p>
            <p className="text-sm sm:text-[15px] text-[#21495B] font-medium leading-relaxed">
              {result.nextStep}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  onApplyToConsultation(
                    'Kesesuaian anak dengan bidang penjagaan warga emas',
                    result.summaryTag,
                  )
                }
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 text-sm font-semibold text-white bg-[#127E79] hover:bg-[#0e6662] rounded-lg transition-colors whitespace-nowrap"
              >
                Bincang Hasil Ini dalam Konsultasi
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center min-h-[44px] px-4 py-2.5 text-sm font-medium text-[#21495B] hover:bg-white/70 rounded-lg transition-colors whitespace-nowrap"
              >
                Ulang Semakan
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-[#254451]/75 bg-[#FFF9EF] border border-[#21495B]/10 rounded-xl px-4 py-3.5">
            Lengkapkan keempat-empat soalan di atas untuk melihat panduan perbincangan bagi keluarga anda.
          </p>
        )}
      </div>
    </div>
  );
}
