export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <p className="kicker">Est. 1924</p>
          <h2>Hebbar’s Heritage Home</h2>
          <p>
            Fourth floor, Apeejay Chambers
            <br />
            Wallace Street, Fort, Mumbai 400001
          </p>
        </div>
        <div>
          <h3>Book</h3>
          <p>Website ledger, QR House Guide, WhatsApp, telephone or selected platforms.</p>
          <p>
            <a href="#book">Stay</a>
            <br />
            <a href="#table">Table</a>
            <br />
            <a href="#shoots">Shoots</a>
          </p>
        </div>
        <div>
          <h3>House</h3>
          <p>Check-in 1:00 PM · Check-out 10:30 AM</p>
          <p>Quiet hours 10:30 PM – 7:00 AM</p>
          <p>
            <a href="#house-rules">Rules</a> · <a href="#emergency">Emergency 112</a>
          </p>
        </div>
      </div>
      <div className="wrap footer-bottom">
        Rates, timings and visitor policies are proposed for the redesigned house and must be confirmed by the property
        before being treated as final. Mood, rooms and Fort photographs are shown for atmosphere.
      </div>
    </footer>
  )
}
