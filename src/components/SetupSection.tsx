import { ArrowRight } from 'lucide-react'
import type { AuditProfile, PlatformCategory } from '../types'
import { Field, SelectInput, TextArea, TextInput } from './Fields'

export function SetupSection({ profile, onChange, onNext }: { profile: AuditProfile; onChange: (profile: AuditProfile) => void; onNext: () => void }) {
  const update = <K extends keyof AuditProfile>(key: K, value: AuditProfile[K]) => onChange({ ...profile, [key]: value })
  return <section id="setup" className="work-section" aria-labelledby="setup-title">
    <div className="section-topline"><span>Before you begin</span><span>Audit protocol</span></div>
    <h2 id="setup-title">Bound the audit before judging the interface.</h2>
    <p className="section-intro">Choose one platform and two or three tasks that a real user would attempt. Examples: renew a document, return an order, find course requirements, track a delivery, or adjust privacy settings.</p>
    <div className="form-grid two">
      <Field label="Your name" required><TextInput value={profile.studentName} onChange={e => update('studentName', e.target.value)} placeholder="Student name" autoComplete="name" /></Field>
      <Field label="Student ID (optional)"><TextInput value={profile.studentId} onChange={e => update('studentId', e.target.value)} placeholder="Student ID" /></Field>
      <Field label="Course or section"><TextInput value={profile.course} onChange={e => update('course', e.target.value)} placeholder="Course name / section" /></Field>
      <Field label="Audit date" required><TextInput type="date" value={profile.auditDate} onChange={e => update('auditDate', e.target.value)} /></Field>
      <Field label="Platform name" required><TextInput value={profile.platformName} onChange={e => update('platformName', e.target.value)} placeholder="Selected platform" /></Field>
      <Field label="Platform category" required><SelectInput value={profile.category} onChange={e => update('category', e.target.value as PlatformCategory)}><option value="">Select a category</option><option>Government service</option><option>E-commerce</option><option>University website</option><option>Food delivery</option><option>Social media</option></SelectInput></Field>
      <Field label="Platform URL" required><TextInput type="url" value={profile.url} onChange={e => update('url', e.target.value)} placeholder="https://…" /></Field>
      <Field label="Device, browser, and viewport" hint="e.g., iPhone 16 / Safari, or Windows 11 / Chrome at 1440 px." required><TextInput value={profile.device} onChange={e => update('device', e.target.value)} placeholder="Device · browser · viewport" /></Field>
    </div>
    <Field label="Task flows in scope" hint="List two or three tasks and the starting point for each. Keep the scope feasible; do not attempt to audit every page." required><TextArea rows={5} value={profile.tasks} onChange={e => update('tasks', e.target.value)} placeholder={'1. Start on the home page and…\n2. From search results…\n3. In account settings…'} /></Field>
    <div className="privacy-note"><strong>Privacy check</strong><p>Use test data wherever possible. Redact personal information before pasting screenshots. Never enter real payment details or perform destructive actions for this assignment.</p></div>
    <div className="section-footer"><span>Setup establishes the audit trail for every later example.</span><button type="button" className="primary-button" onClick={onNext}>Begin with heuristic 01<ArrowRight size={17} /></button></div>
  </section>
}
