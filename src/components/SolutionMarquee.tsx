const ITEMS = [
  'Face Recognition',
  'Visitor Management',
  'Time & Attendance',
  'Safety Induction',
  'Meal Management',
  'Queue Management',
  'Security',
  'Healthcare',
  'Enterprise',
]

function MarqueeItem({ label }: { label: string }) {
  return (
    <span className="marquee-item">
      <span className="m" aria-hidden="true" />
      {label}
    </span>
  )
}

export function SolutionMarquee() {
  return (
    <section className="marquee" aria-label="Cognicoders solutions">
      <div className="marquee-track">
        <div className="marquee-group">
          {ITEMS.map((label) => (
            <MarqueeItem key={label} label={label} />
          ))}
        </div>
        <div className="marquee-group" aria-hidden="true">
          {ITEMS.map((label) => (
            <MarqueeItem key={`${label}-dup`} label={label} />
          ))}
        </div>
      </div>
    </section>
  )
}