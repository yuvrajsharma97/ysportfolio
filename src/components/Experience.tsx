import type { ExperienceEntry } from "../data/content";

export default function Experience({ experience }: { experience: ExperienceEntry[] }) {
  return (
    <section id="experience" className="section exp" aria-labelledby="exp-q">
      <div className="container exp__grid">
        <div className="exp__aside">
          <h2 id="exp-q" data-head>Where I've worked</h2>
          <p className="lead qa__muted" data-rise>Three front-end roles, then my MSc at Sussex.</p>
        </div>
        <ol className="ledger" data-slide>
          {experience.map((e) => (
            <li key={e.id}>
              <details className="ledger__item">
                <summary className="ledger__head">
                  <span className="ledger__initial" aria-hidden="true">{e.organization.charAt(0)}</span>
                  <span className="ledger__who">
                    <span className="ledger__role">{e.role}</span>
                    <span className="ledger__org">{e.organization}</span>
                  </span>
                  <span className="ledger__when num">{e.period}</span>
                </summary>
                <p className="ledger__body">{e.description}</p>
              </details>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
