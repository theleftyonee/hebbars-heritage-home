import BrandMark from './BrandMark'
import { useEffect } from 'react'

export type Confirmation = {
  kind: 'stay' | 'event' | 'shoot'
  reference: string
  title: string
  lines: string[]
}

type Props = {
  confirmation: Confirmation | null
  onClose: () => void
}

export default function ConfirmModal({ confirmation, onClose }: Props) {
  useEffect(() => {
    document.body.classList.toggle('modal-open', Boolean(confirmation))
    return () => document.body.classList.remove('modal-open')
  }, [confirmation])

  if (!confirmation) return null

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        onClick={(e) => e.stopPropagation()}
      >
        <BrandMark variant="seal" className="confirm-seal" decorative />
        <p className="kicker">House Desk · request received</p>
        <h2 id="confirm-title">{confirmation.title}</h2>
        <p className="key-tag" aria-label={`Booking reference ${confirmation.reference}`}>
          {confirmation.reference.split('-').map((part) => (
            <span key={part}>{part}</span>
          ))}
        </p>
        <ul className="confirm-lines">
          {confirmation.lines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <p className="fine-print">
          This request is stored on this device for the House Desk to confirm. No payment has been taken. Rates and
          timings remain proposed until the property confirms them.
        </p>
        <button type="button" className="btn btn-blue" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  )
}
