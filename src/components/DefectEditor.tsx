import { Check } from 'lucide-react'
import { HEURISTICS, SEVERITY } from '../data'
import type { DefectEntry } from '../types'
import { isDefectComplete } from '../lib/workbook'
import { Field, SelectInput, TextArea, TextInput } from './Fields'
import { ImageField } from './ImageField'

export function DefectEditor({ entry, index, onChange }: { entry: DefectEntry; index: number; onChange: (entry: DefectEntry) => void }) {
  const update = <K extends keyof DefectEntry>(key: K, value: DefectEntry[K]) => onChange({ ...entry, [key]: value })
  const toggleSecondary = (id: string) => update('secondary', entry.secondary.includes(id) ? entry.secondary.filter(item => item !== id) : [...entry.secondary, id])
  return <article className="defect-editor">
    <div className="entry-heading">
      <div><span className="entry-index">Defect {String(index).padStart(2, '0')}</span><h3>{entry.title || 'Diagnose a UX defect'}</h3></div>
      {isDefectComplete(entry) && <span className="complete-badge"><Check size={14} /> Complete</span>}
    </div>
    <div className="form-grid two">
      <Field label="Short defect title" required><TextInput value={entry.title} onChange={e => update('title', e.target.value)} placeholder="e.g., Account deletion cannot be undone" /></Field>
      <Field label="Screen, task, or precise location" required><TextInput value={entry.location} onChange={e => update('location', e.target.value)} placeholder="Settings → account → delete" /></Field>
    </div>
    <div className="comparison-uploads">
      <ImageField value={entry.screenshot} onChange={value => update('screenshot', value)} label="Before: paste defect evidence" compact />
      <ImageField value={entry.redesignImage} onChange={value => update('redesignImage', value)} label="After: paste your alternative" compact />
    </div>
    <div className="form-grid two">
      <Field label="Primary heuristic" hint="Choose the heuristic most directly violated." required>
        <SelectInput value={entry.primary} onChange={e => update('primary', e.target.value)}>
          <option value="">Select primary heuristic</option>
          {HEURISTICS.map(h => <option key={h.id} value={h.id}>H{String(h.number).padStart(2, '0')} · {h.title}</option>)}
        </SelectInput>
      </Field>
      <Field label="Severity rating" hint="Consider frequency, persistence, and impact—not personal annoyance." required>
        <SelectInput value={entry.severity ?? ''} onChange={e => update('severity', e.target.value === '' ? null : Number(e.target.value))}>
          <option value="">Select severity</option>
          {SEVERITY.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </SelectInput>
      </Field>
    </div>
    <fieldset className="secondary-mapping"><legend>Secondary heuristic(s), if applicable</legend><div>{HEURISTICS.map(h => <label key={h.id} className={entry.secondary.includes(h.id) ? 'selected' : ''}><input type="checkbox" checked={entry.secondary.includes(h.id)} onChange={() => toggleSecondary(h.id)} />H{String(h.number).padStart(2, '0')}</label>)}</div></fieldset>
    <Field label="Defect and user task" hint="Explain what happens, where, and why it conflicts with the selected heuristic(s)." required><TextArea value={entry.description} onChange={e => update('description', e.target.value)} placeholder="When the user tries to…" /></Field>
    <Field label="User impact" hint="Identify who is affected and the consequence for task success, time, confidence, safety, or accessibility." required><TextArea rows={3} value={entry.impact} onChange={e => update('impact', e.target.value)} placeholder="This can cause…" /></Field>
    <Field label="Plausible better alternative" hint="Describe the alternative, how it addresses the cause rather than the surface symptom, and its expected benefit." required><TextArea rows={5} value={entry.alternative} onChange={e => update('alternative', e.target.value)} placeholder="Replace the current interaction with…" /></Field>
  </article>
}
