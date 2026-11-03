export type PlatformCategory = 'Government service' | 'E-commerce' | 'University website' | 'Food delivery' | 'Social media' | ''

export interface AuditProfile {
  studentName: string
  studentId: string
  course: string
  platformName: string
  category: PlatformCategory
  url: string
  device: string
  auditDate: string
  tasks: string
}

export interface EvidenceEntry {
  title: string
  location: string
  observation: string
  reasoning: string
  benefit: string
  screenshot: string
}

export interface DefectEntry {
  title: string
  location: string
  primary: string
  secondary: string[]
  description: string
  impact: string
  severity: number | null
  alternative: string
  screenshot: string
  redesignImage: string
}

export interface Synthesis {
  patterns: string
  priority: string
  reflection: string
}

export interface AuditState {
  version: 1
  profile: AuditProfile
  evidence: Record<string, EvidenceEntry>
  defects: Record<string, DefectEntry>
  synthesis: Synthesis
  revision: number
  exportedRevision: number
  updatedAt: string
}
