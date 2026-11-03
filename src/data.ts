import type { AuditState } from './types'

export interface Heuristic {
  id: string
  number: number
  title: string
  contemporary: string
  group: string
  canonical: string
  lens: string
  lookFor: string[]
  prompt: string
}

export const HEURISTICS: Heuristic[] = [
  {
    id: 'h1', number: 1, title: 'Visibility of system status', contemporary: 'System status & epistemic transparency', group: 'Feedback & state',
    canonical: 'The design should always keep users informed about what is going on, through appropriate feedback within a reasonable amount of time.',
    lens: 'For AI-enabled features, also inspect process visibility, source provenance, confidence, and uncertainty—not merely a spinner or completion bar.',
    lookFor: ['Feedback after an action', 'Progress, loading, and completion states', 'Clear success, failure, or pending status', 'Visible sources or confidence where relevant'],
    prompt: 'Find three moments when the platform makes its current state or the result of a user action clear.'
  },
  {
    id: 'h2', number: 2, title: 'Match between system and the real world', contemporary: 'Intent alignment', group: 'Cognition & clarity',
    canonical: 'The design should speak the users’ language. Use familiar words, phrases, and concepts rather than internal system-oriented terms. Follow real-world conventions and present information in a natural, logical order.',
    lens: 'For AI-enabled features, examine whether natural-language intent is mapped into visible, editable parameters without encouraging anthropomorphic over-trust.',
    lookFor: ['Familiar labels and domain language', 'Logical sequencing and categorization', 'Meaningful icons and metaphors', 'Editable interpretation of user intent'],
    prompt: 'Find three places where the platform fits the user’s vocabulary, expectations, or real-world task model.'
  },
  {
    id: 'h3', number: 3, title: 'User control and freedom', contemporary: 'Agentic steering', group: 'Agency & control',
    canonical: 'Users often perform actions by mistake. They need a clearly marked emergency exit to leave an unwanted action without an extended process. Support undo and redo.',
    lens: 'For multi-step or AI-mediated actions, look for pause, steer, preview, staging, selective acceptance, and granular rollback.',
    lookFor: ['Undo, redo, cancel, and back controls', 'Safe exits from unwanted states', 'Preview before commitment', 'Control over automated or multi-step actions'],
    prompt: 'Find three features that let users reverse, interrupt, preview, or take control of an action.'
  },
  {
    id: 'h4', number: 4, title: 'Consistency and standards', contemporary: 'Behavioral predictability', group: 'Cognition & clarity',
    canonical: 'Users should not have to wonder whether different words, situations, or actions mean the same thing. Follow platform and industry conventions.',
    lens: 'For generative interfaces, also assess stable output structures, citation patterns, and clear separation between fixed and generated interface regions.',
    lookFor: ['Consistent terminology and visual patterns', 'Predictable control placement and behavior', 'Platform and industry conventions', 'Stable structures across repeated outputs'],
    prompt: 'Find three examples of a repeated pattern or convention that makes behavior easy to predict.'
  },
  {
    id: 'h5', number: 5, title: 'Error prevention', contemporary: 'Hallucination grounding', group: 'Error & resilience',
    canonical: 'Even better than a good error message is a careful design that prevents a problem from occurring. Eliminate error-prone conditions or check for them and confirm before users commit to the action.',
    lens: 'For AI-enabled features, inspect grounding, claim verification, constraints, pre-flight checks, and dry runs that prevent plausible but incorrect output from becoming action.',
    lookFor: ['Constraints and sensible defaults', 'Validation before submission', 'Confirmation for consequential actions', 'Grounding, verification, or dry-run safeguards'],
    prompt: 'Find three design choices that stop a mistake before it happens.'
  },
  {
    id: 'h6', number: 6, title: 'Recognition rather than recall', contemporary: 'Contextual scaffolding', group: 'Cognition & clarity',
    canonical: 'Minimize the user’s memory load by making elements, actions, and options visible. Users should not have to remember information from one part of the interface to another. Required information should be visible or easily retrievable.',
    lens: 'For AI-enabled features, inspect visible examples, contextual starters, current context, memory pins, and other support that reduces blank-prompt or working-memory burden.',
    lookFor: ['Visible options and instructions', 'Autocomplete, recent items, and suggestions', 'Persistent task context', 'Examples and contextual starting points'],
    prompt: 'Find three moments when information or options are available at the point of need instead of relying on memory.'
  },
  {
    id: 'h7', number: 7, title: 'Flexibility and efficiency of use', contemporary: 'Agentic acceleration', group: 'Agency & control',
    canonical: 'Shortcuts, hidden from novice users, may speed up interaction for expert users so the design caters to both inexperienced and experienced users. Allow users to tailor frequent actions.',
    lens: 'For advanced or AI-mediated workflows, assess presets, reusable instructions, batch actions, and multimodal accelerators while preserving user control.',
    lookFor: ['Shortcuts and quick actions', 'Personalization and saved preferences', 'Efficient repeat or batch workflows', 'Support for both novice and expert users'],
    prompt: 'Find three features that make frequent or expert work faster without blocking less experienced users.'
  },
  {
    id: 'h8', number: 8, title: 'Aesthetic and minimalist design', contemporary: 'Compression & progressive disclosure', group: 'Cognition & clarity',
    canonical: 'Interfaces should not contain information that is irrelevant or rarely needed. Every extra unit of information competes with relevant units and diminishes their relative visibility.',
    lens: 'For generated content, examine synthesis, compression, progressive disclosure, and signal-to-noise discipline rather than visual simplicity alone.',
    lookFor: ['Clear visual hierarchy', 'Relevant content prioritized', 'Progressive disclosure of detail', 'Concise, high-value output'],
    prompt: 'Find three examples where prioritization, hierarchy, or compression helps users focus on what matters.'
  },
  {
    id: 'h9', number: 9, title: 'Help users recognize, diagnose, and recover from errors', contemporary: 'Fault attribution & scoped repair', group: 'Error & resilience',
    canonical: 'Error messages should be expressed in plain language, precisely indicate the problem, and constructively suggest a solution.',
    lens: 'For AI-enabled features, inspect claim-level attribution, inline repair, and scoped correction that avoids discarding an otherwise useful result.',
    lookFor: ['Plain-language diagnosis', 'Errors located near their cause', 'Concrete recovery steps', 'Scoped correction without starting over'],
    prompt: 'Find three examples where the platform helps users understand and recover from a problem.'
  },
  {
    id: 'h10', number: 10, title: 'Help and documentation', contemporary: 'Capability discovery', group: 'Error & resilience',
    canonical: 'Even when a system can be used without documentation, help may be necessary. It should be easy to search, focused on the user’s task, list concrete steps, and not be too large.',
    lens: 'For AI-enabled features, documentation should make capabilities, limitations, inputs, and boundaries discoverable through concrete examples.',
    lookFor: ['Searchable, task-focused help', 'Onboarding and contextual guidance', 'Concrete steps and examples', 'Explicit capabilities and limitations'],
    prompt: 'Find three help, onboarding, or guidance features that support successful task completion.'
  }
]

export const RUBRIC = [
  { criterion: 'Systematic coverage & distinct evidence', points: 20, description: 'All ten heuristics; three relevant and meaningfully different strengths per heuristic; five distinct defects.' },
  { criterion: 'Visual documentation & audit trail', points: 20, description: 'Readable cropped screenshots, precise locations, task context, device/date, and clear before/after evidence.' },
  { criterion: 'Heuristic reasoning', points: 20, description: 'Accurate connections to canonical principles and contemporary lenses; observations are distinguished from interpretations.' },
  { criterion: 'Defect diagnosis & severity', points: 15, description: 'Specific defects, credible user impact, defensible primary/secondary mappings, and calibrated severity ratings.' },
  { criterion: 'Alternative designs', points: 15, description: 'Plausible, feasible alternatives that address the diagnosed cause and explain the expected improvement.' },
  { criterion: 'Synthesis & professional presentation', points: 10, description: 'Cross-heuristic patterns, prioritization, reflection, concise writing, privacy care, and a complete submission package.' }
]

export const SEVERITY = [
  { value: 0, label: '0 — Not a usability problem', short: 'No problem' },
  { value: 1, label: '1 — Cosmetic', short: 'Cosmetic' },
  { value: 2, label: '2 — Minor', short: 'Minor' },
  { value: 3, label: '3 — Major', short: 'Major' },
  { value: 4, label: '4 — Catastrophic', short: 'Catastrophic' }
]

export function createInitialState(): AuditState {
  const evidence: AuditState['evidence'] = {}
  for (const heuristic of HEURISTICS) {
    for (let index = 1; index <= 3; index += 1) {
      evidence[`${heuristic.id}-e${index}`] = { title: '', location: '', observation: '', reasoning: '', benefit: '', screenshot: '' }
    }
  }
  const defects: AuditState['defects'] = {}
  for (let index = 1; index <= 5; index += 1) {
    defects[`d${index}`] = { title: '', location: '', primary: '', secondary: [], description: '', impact: '', severity: null, alternative: '', screenshot: '', redesignImage: '' }
  }
  return {
    version: 1,
    profile: { studentName: '', studentId: '', course: '', platformName: '', category: '', url: '', device: '', auditDate: new Date().toISOString().slice(0, 10), tasks: '' },
    evidence,
    defects,
    synthesis: { patterns: '', priority: '', reflection: '' },
    revision: 0,
    exportedRevision: -1,
    updatedAt: new Date().toISOString()
  }
}
