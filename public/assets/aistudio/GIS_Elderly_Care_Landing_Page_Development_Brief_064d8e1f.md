# GIS — SKM Elderly Care Landing Page
## Development Brief & Implementation Guide (Draft V3)

**Project:** Landing page Program SKM Penjagaan Warga Emas (Elderly Care)  
**Organisation:** GIS — Global Institute of Studies  
**Audience:** Ibu bapa/penjaga, terutamanya keluarga lepasan SPM  
**Status:** DRAF untuk penilaian, bukan laman web rasmi  
**Companion preview:** `GIS_Elderly_Care_Landing_Page_V3.html`  
**Language:** Bahasa Melayu (professional, warm, parent-friendly)

---

## 1. Objectives

Build trust and generate **qualified consultation enquiries**, not make unsupported job guarantees. Address parents' concerns: employment prospects, salary, career progression, study affordability, supportive learning, and suitability of the child for elderly care.

**Primary CTA:** `Mohon Konsultasi Bersama GIS`  
**Secondary CTA:** `Terokai Peluang Kerjaya` / `Semak Kesesuaian Anak`.

**Core positioning:** “Anak masih mencari hala tuju selepas SPM? Terokai kemahiran penjagaan warga emas dan peluang membina kerjaya bermakna.”

## 2. Visual direction — cinematic, light-only

- **No dark mode**, including footer and final CTA. Use bright ivory/white backgrounds, pale teal, soft warm beige, deep teal text.
- Palette: background `#FFFFFF`, pale teal `#EAF7F3`, cream `#FFF9EF`, heading `#21495B`, accent `#127E79`, body `#254451`.
- Modern, readable typography: system sans-serif or licensed Google Font such as Plus Jakarta Sans; strong headline hierarchy, generous whitespace.
- **Cinematic hero:** edge-to-edge landscape photography with an Asian caregiver compassionately supporting an older adult, natural warm lighting, authentic documentary-style atmosphere. Add **light gradient overlay** behind text for contrast. Avoid dramatic medical emergencies, hospital distress, or exaggerated “guaranteed future” imagery.
- Hero heading: 40–74px responsive, short lines, animated entry; desktop hero approx. 650px tall; mobile stacked text and photographic composition.
- Photographs must be legally licensed for commercial use and must have alt text. All stock imagery explicitly labelled *Gambar ilustrasi — bukan gambar sebenar GIS*. Replace with authentic GIS campus, mock room, trainers, and student photos after written approval.
- Current preview references remote Unsplash images; their availability, licensing for intended use, and exact subject composition **must be verified before publishing**. Do not claim they depict GIS.

## 3. Motion and interaction specification

| Component | Behaviour | Accessibility |
|---|---|---|
| Hero eyebrow/headline/description | Staggered fade + upward slide on load, ~0.8–1s | Respect `prefers-reduced-motion` |
| Content sections | Fade-in + 28px upward movement on scroll, IntersectionObserver | Content remains visible if JS unavailable |
| Feature cards/photos | Subtle hover lift (~5px), gentle shadow | No essential information hidden behind hover |
| Buttons | Gentle hover emphasis, visible focus ring | Full keyboard navigation |
| FAQ | Native expandable details | Semantic `<details>` and `<summary>` |
| Suitability quiz | Four radio questions; show non-diagnostic feedback | Labels, keyboard support, polite result announcements |
| Mobile | Responsive layout; no horizontal scroll | Touch targets ~44px |

Avoid autoplay audio, flashing animation, heavy parallax, or scroll-jacking. Optimize hero images (AVIF/WebP with JPEG fallback), preload only the primary hero image, and lazy-load lower sections.

## 4. Recommended page structure

1. **Sticky navigation:** GIS brand, Kerjaya, Pembelajaran, Kesesuaian Anak, CTA.
2. **Cinematic hero:** emotional headline, short copy, two CTAs, clear stock-photo disclaimer.
3. **Six parent concerns:** job, salary, progression, cost, learning environment, child suitability.
4. **Career pathway:** Caregiver → Senior Caregiver → Supervisor / management track (progression depends on experience and additional requirements).
5. **Practical learning:** demonstration, skills practice, supportive teaching; insert approved campus and mock-room photos.
6. **Financial transparency:** total fees, duration, extra costs, payment plans all marked **[Belum disahkan oleh GIS]**.
7. **Child suitability quiz:** helpful discussion starter, not an admissions test.
8. **FAQ:** employment not guaranteed; salaries variable; financing not yet confirmed; campus visits by arrangement.
9. **Lead capture + WhatsApp consultation:** form, consent, success/failure states, privacy notice.
10. **Light footer:** GIS contact details and approved policy links.

## 5. Claims and content guardrails

- **Industry collaboration:** say GIS has industry collaboration only at the general level until specific partners, MOUs, placement arrangements, and terms are verified.
- **Employment:** never claim `100% pekerjaan dijamin` or `jaminan kerja` without a substantiated, formal, current arrangement. State that recruitment depends on employers, vacancies, and applicant eligibility.
- **Salary:** do not publish salary figures without current, geographically relevant evidence and a date/source. Do not promise Singapore employment, salary, or work-pass eligibility.
- **Accreditation:** publish exact SKM programme name, code, level, and accreditation status only after verification with GIS/JPK.
- **Financing:** PTPK, instalments, grants, or discounts are **not confirmed**; do not advertise them as available.
- **Facilities:** do not describe any photographed stock facility as a GIS facility.
- **Learning support:** explain support mechanisms only after GIS confirms them.

## 6. Consultation form → Google Sheets → WhatsApp

### Recommended user flow

1. Parent enters name, phone, child age group (optional), main concern, message (optional), and explicit consent.
2. Frontend validates fields, normalizes Malaysian phone number, and displays a privacy notice.
3. Frontend sends form to a **secure backend** (e.g., Cloud Run / serverless function), not directly to an exposed public Sheet.
4. Backend validates, rate-limits, applies anti-spam protection, and writes a new row to a Google Sheet using an authorized service account or Apps Script service.
5. Backend returns **verified success** and a lead ID only after the Sheet write succeeds.
6. Frontend displays confirmation and offers `Teruskan ke WhatsApp`; include the lead ID in the prefilled WhatsApp message so staff can reconcile the conversation with the Sheet.
7. If write fails, **do not claim data was saved**. Display an error and a retry option; optionally offer a clearly labelled manual WhatsApp fallback.

**Important:** The current HTML V3 is a draft only. It stores test enquiries in the browser when the endpoint is not configured. The optional `no-cors` submission pattern in the prototype cannot verify Google Sheets writes and must be replaced with the verified flow above before launch.

### Google Sheet column design

`Lead ID | Submitted At (MYT) | Parent Name | WhatsApp | Child Age Group | Primary Concern | Message | Consent | Consent Timestamp | Source | Follow-up Status | Assigned To | Last Contacted At | Notes`

Recommended statuses: `New`, `Contacted`, `Consultation Scheduled`, `Interested`, `Not Interested`, `Enrolled`.

### Privacy and security

- Obtain explicit consent for consultation follow-up and link to an approved privacy notice consistent with applicable Malaysian PDPA requirements.
- Limit Sheet access to authorized GIS admissions personnel, enable 2FA and least-privilege access.
- Never put API secrets, Google credentials, or unrestricted Sheets write tokens into public HTML.
- Use HTTPS, input validation, spam protection, logging without sensitive details, retention/deletion rules, and an opt-out process.
- Avoid collecting unnecessary sensitive information about the child.
- **WhatsApp number in draft:** `+60 19-211 5642` — confirm official GIS number before publication.

## 7. Implementation and acceptance checklist

- [ ] Cinematic light-mode hero renders on desktop and mobile.
- [ ] All imagery licensed/approved; stock-photo labels present.
- [ ] Hero text readable across screen sizes and image crops.
- [ ] All animations honor reduced-motion preference.
- [ ] No dark background in CTA/footer and no automatic dark theme.
- [ ] Page works on Chrome, Edge, Safari, Android, iPhone.
- [ ] FAQ, quiz, anchors and form keyboard-accessible.
- [ ] Form never claims Sheets success without confirmed server response.
- [ ] Test: one valid enquiry creates exactly one row; duplicates/retries handled safely.
- [ ] Test: backend failure displays error and retains entered values.
- [ ] Staff can view and update follow-up status in the Sheet.
- [ ] Privacy notice, official contact number and consent wording approved.
- [ ] All programme details and career claims approved by GIS.
- [ ] Page performance, image sizes, SEO title/description and analytics reviewed.

## 8. Pending GIS approvals / placeholders

| Item | Current status |
|---|---|
| Official SKM title/code/level and accreditation evidence | `[GIS to verify]` |
| Programme duration and entry requirements | `[GIS to verify]` |
| Tuition, registration and additional fees | `[GIS to verify]` |
| Funding/instalment availability | `[Not confirmed]` |
| Industry partner names, agreements, placement details | `[GIS to verify]` |
| Campus/mock-room/student photos and permissions | `[Awaiting assets]` |
| Salary ranges and market references | `[Research and verify]` |
| Official consultation WhatsApp | `[Confirm +60 19-211 5642]` |
| Google Sheet owner, authorized users and retention | `[To configure]` |
| Privacy policy and publication approval | `[Pending]` |

## 9. Deliverables

- `GIS_Elderly_Care_Landing_Page_V3.html`: responsive interactive **draft preview**, not production deployment.
- `GIS_Elderly_Care_Landing_Page_Development_Brief.md`: this development specification.

**Definition of done for this phase:** A visually compelling prototype for stakeholder review, with clear outstanding placeholders. **Production launch and live Google Sheets integration are separate subsequent phases.**
