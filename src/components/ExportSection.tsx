import { useRef } from 'react'
import { Archive, Check, Download, FileJson, LogOut, Printer, RotateCcw, Upload, X } from 'lucide-react'
import type { AuditState } from '../types'
import { completion } from '../lib/workbook'

export function ExportSection({ state, saveState, exportBusy, onNavigate, onExport, onPrint, onBackup, onImport, onExit, onReset }: {
  state: AuditState
  saveState: 'loading' | 'saving' | 'saved' | 'error'
  exportBusy: boolean
  onNavigate: (id: string) => void
  onExport: () => void
  onPrint: () => void
  onBackup: () => void
  onImport: (file: File) => void
  onExit: () => void
  onReset: () => void
}) {
  const fileRef = useRef<HTMLInputElement>(null)
  const status = completion(state)
  const currentExport = status.complete && state.revision === state.exportedRevision
  return <section id="export" className="work-section export-section" aria-labelledby="export-title">
    <div className="section-topline"><span>Final review</span><span>Submission & safe exit</span></div>
    <h2 id="export-title">Nothing counts as finished until the file is current.</h2>
    <p className="section-intro">Your work auto-saves in this browser. Exporting creates the submission file you must keep or submit. Any later edit makes the previous export out of date.</p>
    <div className="export-status-grid">
      <div><span>Strengths</span><strong>{status.evidenceCount}<small> / 30</small></strong></div>
      <div><span>Defects</span><strong>{status.defectCount}<small> / 5</small></strong></div>
      <div><span>Heuristics</span><strong>{status.heuristicCount}<small> / 10</small></strong></div>
      <div><span>Current file</span><strong className="file-state">{currentExport ? <><Check size={22} /> Exported</> : <><X size={22} /> Pending</>}</strong></div>
    </div>
    <div className="review-layout">
      <div className="checklist-panel">
        <h3>Completeness checklist</h3>
        <ul>{status.checks.map(item => <li key={item.id} className={item.complete ? 'done' : ''}><button type="button" onClick={() => onNavigate(item.target)}>{item.complete ? <Check size={16} /> : <span className="empty-check" />}<span>{item.label}</span><span>{item.complete ? 'Review' : 'Complete'}</span></button></li>)}</ul>
      </div>
      <div className="export-panel">
        <span className={`save-pill ${saveState}`}>{saveState === 'saving' ? 'Saving…' : saveState === 'saved' ? 'Auto-saved in this browser' : saveState === 'error' ? 'Auto-save failed' : 'Loading saved work…'}</span>
        <h3>Submission package</h3>
        <p>The ZIP contains a readable visual report and an editable workbook backup. Screenshots are embedded in both.</p>
        <button type="button" className="primary-button wide" onClick={onExport} disabled={exportBusy || saveState === 'saving'}><Archive size={18} />{exportBusy ? 'Building submission…' : 'Export submission ZIP'}</button>
        <button type="button" className="secondary-button wide" onClick={onPrint}><Printer size={17} />Open printable report / Save PDF</button>
        <p className="export-note">Main export requires every checklist item. The report may also be printed as a draft.</p>
      </div>
    </div>
    <div className="backup-row">
      <div><FileJson size={20} /><span><strong>Workbook backup</strong><small>Download or restore your editable data, even when incomplete.</small></span></div>
      <div><button type="button" className="text-button" onClick={onBackup}><Download size={16} />Download backup</button><button type="button" className="text-button" onClick={() => fileRef.current?.click()}><Upload size={16} />Restore backup</button><input ref={fileRef} type="file" accept="application/json,.json" className="visually-hidden" onChange={event => { const file = event.target.files?.[0]; if (file) onImport(file); event.target.value = '' }} /></div>
    </div>
    <div className="exit-row"><div><strong>Ready to leave?</strong><p>The exit check requires a complete, current exported file. Browser tab closing is also guarded while the export is out of date.</p></div><button type="button" className="exit-button" onClick={onExit}><LogOut size={17} />Check & exit</button></div>
    <div className="local-warning"><strong>Local-storage notice:</strong> Auto-save is limited to this browser and device. It does not sync across devices, and clearing browser data can erase it. Keep an exported backup.</div>
    <button type="button" className="reset-link" onClick={onReset}><RotateCcw size={14} />Start a new audit / erase this browser’s saved work</button>
  </section>
}
