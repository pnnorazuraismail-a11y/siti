import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import express from 'express';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = Number(process.env.PORT || 3000);
const isProduction = process.env.NODE_ENV === 'production';

interface ConsultationRecord {
  leadId: string;
  submittedAtMyt: string;
  parentName: string;
  whatsapp: string;
  childAgeGroup: string;
  primaryConcern: string;
  message: string;
  consent: boolean;
  consentTimestamp: string;
  source: string;
  followUpStatus: 'New';
  assignedTo: string;
  lastContactedAt: string;
  notes: string;
  createdAtEpoch: number;
}

const ALLOWED_CONCERNS = new Set([
  'Peluang pekerjaan & halatuju selepas SPM',
  'Gaji & perkembangan kerjaya jangka panjang',
  'Yuran pengajian & pilihan pembiayaan',
  'Suasana pembelajaran & latihan praktikal',
  'Kesesuaian anak dengan bidang penjagaan warga emas',
  'Lawatan kampus & maklumat kemasukan rasmi',
]);

const ALLOWED_AGE_GROUPS = new Set([
  '',
  '17–18 tahun (Lepasan SPM terkini)',
  '19–21 tahun',
  '22 tahun ke atas',
  'Belum pasti / ingin berbincang dahulu',
]);

const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();
const recentLeads: ConsultationRecord[] = [];

function normalizeMalaysianPhone(raw: string): string | null {
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

function formatMytTimestamp(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kuala_Lumpur',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
    .format(date)
    .replace(',', '');
}

function generateLeadId(): string {
  const code = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `GIS-2026-${code}`;
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const maxRequests = 8;

  const entry = rateLimitBuckets.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitBuckets.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= maxRequests) {
    return false;
  }
  entry.count += 1;
  return true;
}

function persistDraftLead(record: ConsultationRecord): void {
  const dataDir = path.resolve(__dirname, '.data');
  const filePath = path.join(dataDir, 'consultations-draft.json');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  let existing: ConsultationRecord[] = [];
  if (fs.existsSync(filePath)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      if (Array.isArray(parsed)) {
        existing = parsed;
      }
    } catch {
      existing = [];
    }
  }
  existing.push(record);
  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), 'utf-8');
}

async function startServer(): Promise<void> {
  const app = express();
  app.set('trust proxy', 1);
  app.use(express.json({ limit: '32kb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true });
  });

  app.post('/api/consultations', async (req, res) => {
    const clientIp = req.ip || 'unknown';
    if (!checkRateLimit(clientIp)) {
      res.status(429).json({
        ok: false,
        error: 'Terlalu banyak percubaan dihantar. Sila tunggu beberapa minit dan cuba semula.',
      });
      return;
    }

    const body = (req.body ?? {}) as Record<string, unknown>;

    // Honeypot anti-spam check
    if (typeof body.website === 'string' && body.website.trim().length > 0) {
      res.status(400).json({
        ok: false,
        error: 'Permintaan tidak dapat disahkan.',
      });
      return;
    }

    const parentName = typeof body.parentName === 'string' ? body.parentName.trim() : '';
    const rawWhatsapp = typeof body.whatsapp === 'string' ? body.whatsapp.trim() : '';
    const childAgeGroup = typeof body.childAgeGroup === 'string' ? body.childAgeGroup.trim() : '';
    const primaryConcern = typeof body.primaryConcern === 'string' ? body.primaryConcern.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim().slice(0, 800) : '';
    const consent = body.consent === true;
    const quizSummary = typeof body.quizSummary === 'string' ? body.quizSummary.trim().slice(0, 240) : '';

    if (parentName.length < 2 || parentName.length > 100) {
      res.status(400).json({
        ok: false,
        error: 'Sila masukkan nama ibu bapa atau penjaga yang sah (sekurang-kurangnya 2 aksara).',
      });
      return;
    }

    const normalizedPhone = normalizeMalaysianPhone(rawWhatsapp);
    if (!normalizedPhone) {
      res.status(400).json({
        ok: false,
        error: 'Sila masukkan nombor WhatsApp Malaysia yang sah (contoh: 019-211 5642).',
      });
      return;
    }

    if (!ALLOWED_AGE_GROUPS.has(childAgeGroup)) {
      res.status(400).json({
        ok: false,
        error: 'Pilihan kumpulan umur anak tidak sah.',
      });
      return;
    }

    if (!ALLOWED_CONCERNS.has(primaryConcern)) {
      res.status(400).json({
        ok: false,
        error: 'Sila pilih persoalan utama yang ingin dibincangkan.',
      });
      return;
    }

    if (!consent) {
      res.status(400).json({
        ok: false,
        error: 'Persetujuan eksplisit diperlukan sebelum menghantar permohonan konsultasi.',
      });
      return;
    }

    const now = new Date();
    const nowEpoch = now.getTime();

    // Idempotency guard against accidental double-clicks within 60 seconds
    const duplicate = recentLeads.find(
      (item) =>
        item.whatsapp === normalizedPhone &&
        item.primaryConcern === primaryConcern &&
        nowEpoch - item.createdAtEpoch < 60_000,
    );

    if (duplicate) {
      res.status(200).json({
        ok: true,
        leadId: duplicate.leadId,
        submittedAtMyt: duplicate.submittedAtMyt,
        normalizedPhone: duplicate.whatsapp,
        deduplicated: true,
      });
      return;
    }

    const record: ConsultationRecord = {
      leadId: generateLeadId(),
      submittedAtMyt: formatMytTimestamp(now),
      parentName,
      whatsapp: normalizedPhone,
      childAgeGroup: childAgeGroup || 'Tidak dinyatakan',
      primaryConcern,
      message: message || '-',
      consent: true,
      consentTimestamp: now.toISOString(),
      source: 'GIS SKM Elderly Care Landing Page (Draft V3)',
      followUpStatus: 'New',
      assignedTo: '',
      lastContactedAt: '',
      notes: quizSummary ? `Ringkasan semakan kesesuaian: ${quizSummary}` : '',
      createdAtEpoch: nowEpoch,
    };

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();

    if (webhookUrl) {
      try {
        const sheetResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            'Lead ID': record.leadId,
            'Submitted At (MYT)': record.submittedAtMyt,
            'Parent Name': record.parentName,
            WhatsApp: record.whatsapp,
            'Child Age Group': record.childAgeGroup,
            'Primary Concern': record.primaryConcern,
            Message: record.message,
            Consent: 'Yes',
            'Consent Timestamp': record.consentTimestamp,
            Source: record.source,
            'Follow-up Status': record.followUpStatus,
            'Assigned To': record.assignedTo,
            'Last Contacted At': record.lastContactedAt,
            Notes: record.notes,
          }),
          signal: AbortSignal.timeout(8000),
        });

        if (!sheetResponse.ok) {
          res.status(502).json({
            ok: false,
            error:
              'Rekod tidak dapat disahkan oleh sistem pendaftaran buat masa ini. Maklumat anda masih disimpan di skrin — sila cuba lagi atau hubungi melalui WhatsApp.',
          });
          return;
        }
      } catch {
        res.status(502).json({
          ok: false,
          error:
            'Sambungan ke sistem rekod terganggu. Data tidak direkodkan — sila cuba sebentar lagi atau guna pautan WhatsApp manual.',
        });
        return;
      }
    } else {
      try {
        persistDraftLead(record);
      } catch {
        res.status(500).json({
          ok: false,
          error:
            'Rekod draf tidak dapat disimpan buat sementara waktu. Sila cuba lagi atau hubungi GIS melalui WhatsApp.',
        });
        return;
      }
    }

    recentLeads.push(record);
    if (recentLeads.length > 200) {
      recentLeads.shift();
    }

    res.status(201).json({
      ok: true,
      leadId: record.leadId,
      submittedAtMyt: record.submittedAtMyt,
      normalizedPhone: record.whatsapp,
    });
  });

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`GIS Landing Page server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
