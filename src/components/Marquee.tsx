import BrandMark from './BrandMark'

export default function Marquee() {
  const line = 'Fort · Bombay · Est. 1924 · Apeejay Chambers · Wallace Street · Filter coffee · Tiffin Table'
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {Array.from({ length: 4 }, (_, i) => (
          <span key={i}>
            <BrandMark variant="mark" className="marquee-mark" decorative />
            {line}
          </span>
        ))}
      </div>
    </div>
  )
}
