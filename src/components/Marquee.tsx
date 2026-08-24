export default function Marquee() {
  const line = 'Fort · Bombay · Est. 1924 · Apeejay Chambers · Wallace Street · Filter coffee · Tiffin Table ·'
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <span>{line}</span>
        <span>{line}</span>
        <span>{line}</span>
        <span>{line}</span>
      </div>
    </div>
  )
}
