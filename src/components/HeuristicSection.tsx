import { ArrowRight, Check, ChevronDown } from 'lucide-react'
import type { Heuristic } from '../data'
import type { AuditState, EvidenceEntry } from '../types'
import { heuristicComplete } from '../lib/workbook'
import { EvidenceEditor } from './EvidenceEditor'

export function HeuristicSection({ heuristic, state, onEvidenceChange, onNext }: {
  heuristic: Heuristic
  state: AuditState
  onEvidenceChange: (key: string, entry: EvidenceEntry) => void
  onNext: () => void
}) {
  const complete = heuristicComplete(state, heuristic.id)
  return <section id={heuristic.id} className="work-section heuristic-section" aria-labelledby={`${heuristic.id}-title`}>
    <div className="section-topline"><span>Heuristic {String(heuristic.number).padStart(2, '0')} / 10</span><span>{heuristic.group}</span>{complete && <span className="complete-badge"><Check size={14} /> 3 of 3 documented</span>}</div>
    <h2 id={`${heuristic.id}-title`}>{heuristic.title}</h2>
    <p className="contemporary-title">{heuristic.contemporary}</p>
    <div className="heuristic-guide">
      <blockquote>{heuristic.canonical}</blockquote>
      <details>
        <summary>Contemporary lens & evidence prompts <ChevronDown size={17} /></summary>
        <div><p>{heuristic.lens}</p><ul>{heuristic.lookFor.map(item => <li key={item}>{item}</li>)}</ul><p><strong>Your task:</strong> {heuristic.prompt}</p><p className="quiet">If the platform has no AI-enabled feature, complete this section using the canonical rule. Do not invent an AI example.</p></div>
      </details>
    </div>
    <div className="evidence-list">
      {[1, 2, 3].map(index => {
        const key = `${heuristic.id}-e${index}`
        return <EvidenceEditor key={key} entry={state.evidence[key]} index={index} onChange={entry => onEvidenceChange(key, entry)} />
      })}
    </div>
    <div className="section-footer"><span>{[1, 2, 3].filter(index => {
      const e = state.evidence[`${heuristic.id}-e${index}`]
      return e.title && e.location && e.observation && e.reasoning && e.benefit && e.screenshot
    }).length} / 3 complete · changes save automatically</span><button type="button" className="primary-button" onClick={onNext}>{heuristic.number === 10 ? 'Continue to defect analysis' : 'Save & next heuristic'}<ArrowRight size={17} /></button></div>
  </section>
}
