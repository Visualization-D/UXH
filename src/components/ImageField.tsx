import { useRef, useState } from 'react'
import type { ClipboardEvent, DragEvent, KeyboardEvent } from 'react'
import { ImagePlus, RefreshCw, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { processImage } from '../lib/images'

export function ImageField({ value, onChange, label, compact = false }: { value: string; onChange: (value: string) => void; label: string; compact?: boolean }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [dragging, setDragging] = useState(false)

  async function accept(file?: File) {
    if (!file) return
    setBusy(true)
    try {
      onChange(await processImage(file))
      toast.success('Screenshot added and queued for auto-save.')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'The image could not be added.')
    } finally {
      setBusy(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  function paste(event: ClipboardEvent<HTMLDivElement>) {
    const file = Array.from(event.clipboardData.items).find(item => item.type.startsWith('image/'))?.getAsFile()
    if (file) {
      event.preventDefault()
      void accept(file)
    } else {
      toast.message('No image found on the clipboard. Copy a screenshot first.')
    }
  }

  function drop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setDragging(false)
    void accept(event.dataTransfer.files[0])
  }

  function keyboard(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      inputRef.current?.click()
    }
  }

  if (value) {
    return <div className={`image-preview ${compact ? 'compact' : ''}`}>
      <img src={value} alt={label} />
      <div className="image-actions">
        <button type="button" className="text-button" onClick={() => inputRef.current?.click()}><RefreshCw size={15} /> Replace</button>
        <button type="button" className="text-button danger" onClick={() => onChange('')}><Trash2 size={15} /> Remove</button>
      </div>
      <input ref={inputRef} className="visually-hidden" type="file" accept="image/*" onChange={event => void accept(event.target.files?.[0])} />
    </div>
  }

  return <div
    className={`paste-zone ${dragging ? 'dragging' : ''} ${compact ? 'compact' : ''}`}
    role="button"
    tabIndex={0}
    aria-label={`${label}. Paste, drop, or choose an image.`}
    onPaste={paste}
    onKeyDown={keyboard}
    onClick={event => { if (event.target instanceof HTMLInputElement) return; inputRef.current?.click() }}
    onDragOver={event => { event.preventDefault(); setDragging(true) }}
    onDragLeave={() => setDragging(false)}
    onDrop={drop}
  >
    <ImagePlus size={24} strokeWidth={1.6} />
    <strong>{busy ? 'Processing screenshot…' : label}</strong>
    <span>Paste with Ctrl/Cmd + V, drop an image, or browse</span>
    <small>Use your screenshot tool’s marquee or freehand mode to capture only the relevant region.</small>
    <input ref={inputRef} className="visually-hidden" type="file" accept="image/*" onChange={event => void accept(event.target.files?.[0])} />
  </div>
}
