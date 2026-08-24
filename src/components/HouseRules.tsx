import { ruleGroups } from '../data/rules'
import Reveal from './Reveal'

export default function HouseRules() {
  return (
    <section className="section" id="house-rules">
      <div className="wrap">
        <Reveal>
          <p className="kicker">House rules</p>
          <h2 className="section-title">A shared heritage home, not a hotel corridor.</h2>
          <p className="lede">
            These rules protect guests, residents, staff and a century-old property inside a mixed residential and
            commercial building. Completing check-in means you have read and accepted them.
          </p>
        </Reveal>
        <div className="accordion">
          {ruleGroups.map((group) => (
            <details key={group.id}>
              <summary>{group.title}</summary>
              <ul>
                {group.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </details>
          ))}
        </div>
        <p className="fine-print">
          Quiet hours 10:30 PM – 7:00 AM. Visitors 9:00 AM – 9:00 PM. Emergency: call 112, then inform the House Desk.
          Use the staircase, not the lift, in a fire or evacuation.
        </p>
      </div>
    </section>
  )
}
