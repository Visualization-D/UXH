import { Check, Circle } from 'lucide-react'
import { HEURISTICS } from '../data'
import type { AuditState } from '../types'
import { completion } from '../lib/workbook'

export function Navigation({ active, state, onNavigate }: { active: string; state: AuditState; onNavigate: (id: string) => void }) {
  const status = completion(state)
  const check = (id: string) => status.checks.find(item => item.id === id)?.complete
  const items = [
    { id: 'overview', label: 'Overview', meta: 'Start' },
    { id: 'setup', label: 'Audit setup', meta: 'Scope', complete: check('setup') },
    { id: 'brief', label: 'Assignment brief', meta: 'Guide' },
    ...HEURISTICS.map(h => ({ id: h.id, label: h.title, meta: `H${String(h.number).padStart(2, '0')}`, complete: check(h.id) })),
    { id: 'defects', label: 'Defect analysis', meta: `${status.defectCount}/5`, complete: check('defects') },
    { id: 'synthesis', label: 'Synthesis', meta: 'Reflect', complete: check('synthesis') },
    { id: 'export', label: 'Review & export', meta: 'Finish' }
  ]
  return <>
    <nav className="side-nav" aria-label="Audit sections">
      <div className="nav-progress"><span>{status.heuristicCount} / 10 heuristics</span><div><i style={{ width: `${status.heuristicCount * 10}%` }} /></div></div>
      <ul>{items.map(item => <li key={item.id}><button type="button" className={active === item.id ? 'active' : ''} onClick={() => onNavigate(item.id)} aria-current={active === item.id ? 'location' : undefined}><span className="nav-meta">{item.meta}</span><span>{item.label}</span>{'complete' in item && (item.complete ? <Check size={14} /> : <Circle size={10} />)}</button></li>)}</ul>
    </nav>
    <div className="mobile-jump"><label htmlFor="section-jump">Jump to audit section</label><select id="section-jump" value={active} onChange={event => onNavigate(event.target.value)}>{items.map(item => <option key={item.id} value={item.id}>{item.meta} · {item.label}</option>)}</select></div>
  </>
}
