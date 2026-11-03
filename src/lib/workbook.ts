import { openDB } from 'idb'
import type { AuditState, DefectEntry, EvidenceEntry } from '../types'
import { HEURISTICS, createInitialState } from '../data'

const DATABASE = 'heuristic-audit-studio'
const STORE = 'workbook'
const KEY = 'current-audit'

function database() {
  return openDB(DATABASE, 1, {
    upgrade(db) {
      db.createObjectStore(STORE)
    }
  })
}

export async function loadWorkbook(): Promise<AuditState | null> {
  const db = await database()
  return (await db.get(STORE, KEY)) ?? null
}

export async function saveWorkbook(state: AuditState): Promise<void> {
  const db = await database()
  await db.put(STORE, state, KEY)
}

export async function clearWorkbook(): Promise<void> {
  const db = await database()
  await db.delete(STORE, KEY)
}

export function isEvidenceComplete(entry: EvidenceEntry): boolean {
  return Boolean(entry.title.trim() && entry.location.trim() && entry.observation.trim() && entry.reasoning.trim() && entry.benefit.trim() && entry.screenshot)
}

export function isDefectComplete(entry: DefectEntry): boolean {
  return Boolean(entry.title.trim() && entry.location.trim() && entry.primary && entry.description.trim() && entry.impact.trim() && entry.alternative.trim() && entry.severity !== null && entry.screenshot && entry.redesignImage)
}

export function isProfileComplete(state: AuditState): boolean {
  const p = state.profile
  return Boolean(p.studentName.trim() && p.platformName.trim() && p.category && p.url.trim() && p.device.trim() && p.auditDate && p.tasks.trim())
}

export function isSynthesisComplete(state: AuditState): boolean {
  return Boolean(state.synthesis.patterns.trim() && state.synthesis.priority.trim() && state.synthesis.reflection.trim())
}

export function heuristicComplete(state: AuditState, heuristicId: string): boolean {
  return [1, 2, 3].every(index => isEvidenceComplete(state.evidence[`${heuristicId}-e${index}`]))
}

export function completion(state: AuditState) {
  const evidenceCount = Object.values(state.evidence).filter(isEvidenceComplete).length
  const defectCount = Object.values(state.defects).filter(isDefectComplete).length
  const heuristicCount = HEURISTICS.filter(h => heuristicComplete(state, h.id)).length
  const checks = [
    { id: 'setup', label: 'Audit setup and task scope', complete: isProfileComplete(state), target: 'setup' },
    ...HEURISTICS.map(h => ({ id: h.id, label: `H${String(h.number).padStart(2, '0')} · ${h.title}`, complete: heuristicComplete(state, h.id), target: h.id })),
    { id: 'defects', label: 'Five defect analyses and visual alternatives', complete: defectCount === 5, target: 'defects' },
    { id: 'synthesis', label: 'Cross-heuristic synthesis and reflection', complete: isSynthesisComplete(state), target: 'synthesis' }
  ]
  return { evidenceCount, defectCount, heuristicCount, checks, complete: checks.every(check => check.complete) }
}

export function normalizeImportedState(value: unknown): AuditState {
  if (!value || typeof value !== 'object') throw new Error('This file does not contain an audit workbook.')
  const candidate = value as Partial<AuditState>
  if (candidate.version !== 1 || !candidate.profile || !candidate.evidence || !candidate.defects || !candidate.synthesis) {
    throw new Error('The workbook structure is not compatible with this version.')
  }
  const initial = createInitialState()
  return {
    ...initial,
    ...candidate,
    profile: { ...initial.profile, ...candidate.profile },
    evidence: { ...initial.evidence, ...candidate.evidence },
    defects: { ...initial.defects, ...candidate.defects },
    synthesis: { ...initial.synthesis, ...candidate.synthesis },
    revision: Date.now(),
    exportedRevision: -1,
    updatedAt: new Date().toISOString()
  }
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export function safeFilename(value: string): string {
  return value.trim().replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').slice(0, 60) || 'platform'
}
