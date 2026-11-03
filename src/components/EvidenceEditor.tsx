import { Check } from 'lucide-react'
import type { EvidenceEntry } from '../types'
import { isEvidenceComplete } from '../lib/workbook'
import { Field, TextArea, TextInput } from './Fields'
import { ImageField } from './ImageField'

export function EvidenceEditor({ entry, index, onChange }: { entry: EvidenceEntry; index: number; onChange: (entry: EvidenceEntry) => void }) {
  const update = <K extends keyof EvidenceEntry>(key: K, value: EvidenceEntry[K]) => onChange({ ...entry, [key]: value })
  const complete = isEvidenceComplete(entry)
  return <article className="evidence-editor">
    <div className="entry-heading">
      <div><span className="entry-index">Strength {String(index).padStart(2, '0')}</span><h3>{entry.title || 'Document a successful example'}</h3></div>
      {complete && <span className="complete-badge"><Check size={14} /> Complete</span>}
    </div>
    <div className="evidence-grid">
      <div>
        <ImageField value={entry.screenshot} onChange={value => update('screenshot', value)} label={`Screenshot for strength ${index}`} />
        <Field label="Short evidence title" required><TextInput value={entry.title} onChange={e => update('title', e.target.value)} placeholder="e.g., Delivery progress is visible end to end" /></Field>
        <Field label="Screen, task, or precise location" hint="Include the page/view and the task being performed." required><TextInput value={entry.location} onChange={e => update('location', e.target.value)} placeholder="Checkout → delivery options" /></Field>
      </div>
      <div className="evidence-writing">
        <Field label="What do you observe?" hint="Describe the visible design without evaluating it yet." required><TextArea value={entry.observation} onChange={e => update('observation', e.target.value)} placeholder="After the user places an order, the screen shows…" /></Field>
        <Field label="Why does this deploy the heuristic successfully?" hint="Name the specific design mechanism and connect it to the canonical rule. Use the contemporary lens only when relevant." required><TextArea value={entry.reasoning} onChange={e => update('reasoning', e.target.value)} placeholder="This demonstrates the heuristic because…" /></Field>
        <Field label="What is the user benefit?" hint="Explain the effect on understanding, effort, control, error recovery, or efficiency." required><TextArea rows={3} value={entry.benefit} onChange={e => update('benefit', e.target.value)} placeholder="The user can…" /></Field>
      </div>
    </div>
  </article>
}
