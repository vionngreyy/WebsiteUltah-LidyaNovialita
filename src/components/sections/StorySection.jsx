import { siteData as data } from '../../data/siteData';

export default function StorySection() {
  const h = data.sectionHeadings;

  return (
    <>
      <section id="story" className="story section-pad">
        <div className="section-head reveal reveal-left">
          <span className="kicker">{h.reasons.kicker}</span>
          <h2>{h.reasons.top}<br /><em>{h.reasons.emphasis}</em></h2>
          <p>{h.reasons.sub}</p>
        </div>

        <div className="reason-grid">
          {data.reasons.map((item, index) => (
            <article
              className="reason-card reveal reveal-up"
              style={{ '--delay': `${index * 90}ms` }}
              key={item.title}
            >
              <span className="reason-emoji" aria-hidden="true">{item.emoji}</span>
              <span className="reason-number">0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="notes section-pad">
        <div className="section-head reveal reveal-left">
          <span className="kicker">{h.notes.kicker}</span>
          <h2>{h.notes.top}<br /><em>{h.notes.emphasis}</em></h2>
        </div>
        <div className="notes-stack">
          {data.littleNotes.map((note, index) => (
            <article className="note-card reveal reveal-right" style={{ '--delay': `${index * 90}ms` }} key={note}>
              <span>0{index + 1}</span>
              <p>{note}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
