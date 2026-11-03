import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'

export function Field({ label, hint, required = false, children, className = '' }: { label: string; hint?: string; required?: boolean; children: ReactNode; className?: string }) {
  return <label className={`field ${className}`}>
    <span className="field-label">{label}{required && <span aria-hidden="true"> *</span>}</span>
    {children}
    {hint && <span className="field-hint">{hint}</span>}
  </label>
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`text-input ${props.className ?? ''}`} {...props} />
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={`text-area ${props.className ?? ''}`} rows={props.rows ?? 4} {...props} />
}

export function SelectInput(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={`text-input ${props.className ?? ''}`} {...props} />
}
