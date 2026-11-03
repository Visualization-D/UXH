import type { AuditState } from '../types'
import { HEURISTICS, SEVERITY } from '../data'
import { safeFilename } from './workbook'

const esc = (value: string | number | null | undefined) => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character] || character)
const text = (value: string) => esc(value).replace(/\n/g, '<br>')

export function reportFilename(state: AuditState) {
  return `Heuristic-Audit-${safeFilename(state.profile.platformName)}-${safeFilename(state.profile.studentName)}`
}

export function generateReport(state: AuditState): string {
  const p = state.profile
  const heuristics = HEURISTICS.map(h => `
    <section class="heuristic">
      <p class="kicker">HEURISTIC ${String(h.number).padStart(2, '0')} · ${esc(h.group)}</p>
      <h2>${esc(h.title)}</h2>
      <p class="lens">Contemporary lens: ${esc(h.contemporary)}</p>
      <blockquote>${esc(h.canonical)}</blockquote>
      ${[1, 2, 3].map(index => {
        const entry = state.evidence[`${h.id}-e${index}`]
        return `<article class="entry">
          <h3>Strength ${index}. ${text(entry.title) || 'Untitled evidence'}</h3>
          <p class="location">${text(entry.location)}</p>
          ${entry.screenshot ? `<img src="${entry.screenshot}" alt="Evidence for ${esc(h.title)}, example ${index}">` : '<p class="missing">Screenshot not supplied.</p>'}
          <dl>
            <dt>Observed design</dt><dd>${text(entry.observation)}</dd>
            <dt>Why this demonstrates the heuristic</dt><dd>${text(entry.reasoning)}</dd>
            <dt>User benefit</dt><dd>${text(entry.benefit)}</dd>
          </dl>
        </article>`
      }).join('')}
    </section>`).join('')

  const defects = [1, 2, 3, 4, 5].map(index => {
    const d = state.defects[`d${index}`]
    const primary = HEURISTICS.find(h => h.id === d.primary)
    const secondary = d.secondary.map(id => HEURISTICS.find(h => h.id === id)?.title).filter(Boolean).join('; ')
    return `<section class="defect">
      <p class="kicker">DEFECT ${String(index).padStart(2, '0')}</p>
      <h2>${text(d.title) || 'Untitled defect'}</h2>
      <p class="location">${text(d.location)}</p>
      <dl class="summary">
        <dt>Primary heuristic</dt><dd>${esc(primary?.title || 'Not mapped')}</dd>
        <dt>Secondary heuristic(s)</dt><dd>${esc(secondary || 'None')}</dd>
        <dt>Severity</dt><dd>${esc(SEVERITY.find(s => s.value === d.severity)?.label || 'Not rated')}</dd>
      </dl>
      <div class="comparison">
        <div><h3>Observed defect</h3>${d.screenshot ? `<img src="${d.screenshot}" alt="Observed defect ${index}">` : '<p class="missing">Before screenshot not supplied.</p>'}</div>
        <div><h3>Proposed alternative</h3>${d.redesignImage ? `<img src="${d.redesignImage}" alt="Proposed alternative for defect ${index}">` : '<p class="missing">Alternative visual not supplied.</p>'}</div>
      </div>
      <dl>
        <dt>Defect and user task</dt><dd>${text(d.description)}</dd>
        <dt>User impact</dt><dd>${text(d.impact)}</dd>
        <dt>Proposed alternative and rationale</dt><dd>${text(d.alternative)}</dd>
      </dl>
    </section>`
  }).join('')

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Heuristic Audit · ${esc(p.platformName)}</title><style>
    :root{--ink:#172729;--blue:#292456;--mint:#ddedf0;--line:#a8c3c7;--paper:#f7faf8}*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font:15px/1.6 Arial,sans-serif}main{max-width:980px;margin:auto;padding:48px}h1,h2,h3,p{margin-top:0}h1,h2{font-family:Georgia,serif;font-weight:400;line-height:1.08}h1{font-size:48px;max-width:740px;margin-bottom:20px}h2{font-size:32px;margin-bottom:8px}h3{font-size:17px;line-height:1.3;margin-bottom:10px}.kicker{font-size:11px;font-weight:700;letter-spacing:.14em;color:var(--blue);margin-bottom:12px}.lens{font-weight:700}.subtitle{font-size:20px;max-width:700px}.meta{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;border-top:1px solid var(--line);border-bottom:1px solid var(--line);padding:20px 0;margin:30px 0 50px}.meta p{margin:0}.meta b,.label{display:block;font-size:11px;letter-spacing:.08em;text-transform:uppercase;margin-bottom:3px}.heuristic,.defect,.final{page-break-before:always;padding-top:16px}blockquote{border-left:2px solid var(--blue);margin:20px 0 30px;padding:8px 18px;font-family:Georgia,serif;font-size:18px}.entry{border-top:1px solid var(--line);padding:24px 0;page-break-inside:avoid}.location{font-size:13px;font-weight:700}img{display:block;width:100%;max-height:560px;object-fit:contain;background:#fff;border:1px solid var(--line);margin:14px 0 18px;page-break-inside:avoid}dl{display:grid;grid-template-columns:190px 1fr;gap:8px 18px;margin:0}dt{font-weight:700}dd{margin:0}.summary{background:var(--mint);padding:16px;margin:16px 0}.comparison{display:grid;grid-template-columns:1fr 1fr;gap:18px}.comparison img{max-height:360px}.missing{padding:20px;border:1px dashed var(--line)}.final dl{margin-bottom:28px}.footer{font-size:12px;border-top:1px solid var(--line);margin-top:50px;padding-top:16px}@media(max-width:640px){main{padding:24px}h1{font-size:36px}.meta,.comparison{grid-template-columns:1fr}dl{grid-template-columns:1fr}dd{margin-bottom:12px}}@media print{body{background:#fff}main{max-width:none;padding:0}.heuristic,.defect,.final{page-break-before:always}.entry{page-break-inside:auto}.entry h3,.entry .location{page-break-after:avoid}img{max-height:480px}@page{margin:16mm}}
  </style></head><body><main>
    <p class="kicker">PLATFORM HEURISTIC AUDIT · COURSE SUBMISSION</p>
    <h1>${esc(p.platformName || 'Platform audit')}</h1>
    <p class="subtitle">Thirty documented strengths, five diagnosed defects, and evidence-led design alternatives.</p>
    <div class="meta">
      <p><b>Student</b>${esc(p.studentName)}${p.studentId ? ` · ${esc(p.studentId)}` : ''}</p>
      <p><b>Course</b>${esc(p.course || 'Not supplied')}</p>
      <p><b>Platform category</b>${esc(p.category)}</p>
      <p><b>Platform URL</b>${esc(p.url)}</p>
      <p><b>Audit context</b>${esc(p.device)} · ${esc(p.auditDate)}</p>
      <p><b>Tasks in scope</b>${text(p.tasks)}</p>
    </div>
    ${heuristics}
    <section class="heuristic"><p class="kicker">PART B</p><h1>Defect analysis & alternatives</h1><p class="subtitle">Each defect is rooted in one or more heuristics and paired with a visual, plausible alternative.</p></section>
    ${defects}
    <section class="final"><p class="kicker">SYNTHESIS</p><h1>Patterns, priorities & reflection</h1>
      <dl><dt>Cross-heuristic patterns</dt><dd>${text(state.synthesis.patterns)}</dd></dl>
      <dl><dt>Priority recommendation</dt><dd>${text(state.synthesis.priority)}</dd></dl>
      <dl><dt>Audit reflection</dt><dd>${text(state.synthesis.reflection)}</dd></dl>
      <p class="footer">Generated ${esc(new Date().toLocaleString())} · Workbook revision ${state.revision}. Screenshots remain the intellectual property of their respective platform and are included for educational analysis.</p>
    </section>
  </main></body></html>`
}
