import { useEffect, useRef, useState } from 'react'
import { PHONE } from '../timeline.js'
import { orektika, salates, pizza, pasta, anapsyktika, pota, legal } from '../menuData.js'


const SECTIONS = [
  { id: 'orektika', data: orektika },
  { id: 'salates', data: salates },
  { id: 'pizza', data: pizza },
  { id: 'pasta', data: pasta },
  { id: 'anapsyktika', data: anapsyktika, drinks: true },
  { id: 'pota', data: pota, drinks: true },
]

const at = (delay, dur) => ({ '--d': `${delay}ms`, '--dur': `${dur}ms` })
const rowDelay = (i) => PHONE.items + Math.min(i, PHONE.itemsMaxRows) * PHONE.itemsStagger


function Row({ item, i, numbered, small }) {
  return (
    <li className="m-item">
      <div className="m-item__line write" style={at(rowDelay(i), PHONE.itemsDur)}>
        {numbered && <span className="m-item__num">{item.n}</span>}
        <span className="m-item__name">
          {item.name}
          {item.extra && <span className="m-item__extra"> {item.extra}</span>}
        </span>
        <span className="m-item__leader" aria-hidden="true" />
        <span className="m-item__price">{item.price}</span>
      </div>
      {item.desc && (
        <p className={`m-item__desc appear ${numbered ? '' : 'is-flush'}`} style={small}>
          {item.desc}
        </p>
      )}
    </li>
  )
}

function Notes({ notes, small }) {
  return (
    <div className="m-notes appear" style={small}>
      {notes.map((n, i) => (
        <p key={i} className={typeof n === 'object' && n.indent ? 'is-indent' : undefined}>
          {typeof n === 'string' ? n : n.text}
        </p>
      ))}
    </div>
  )
}


function Section({ id, data, drinks, sectionRef }) {
  const ref = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const el = ref.current
    sectionRef(id, el)
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setPlaying(true)
          io.disconnect()
        }
      },
      { threshold: 0, rootMargin: '0px 0px -12% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [id, sectionRef])

  const totalRows = data.groups
    ? data.groups.reduce((n, g) => n + 1 + g.items.length, 0)
    : data.items.length + (data.footerHead ? 1 : 0)
  const small = at(rowDelay(totalRows) + PHONE.smallAfter, PHONE.smallDur)

  let row = 0
  const blocks = []
  if (data.groups) {
    data.groups.forEach((g) => {
      const r = row++
      blocks.push(
        <h3 key={g.title} className="m-sub write" style={at(rowDelay(r), PHONE.itemsDur)}>
          {g.title}
          {g.titleExtra && <span className="m-sub__extra"> {g.titleExtra}</span>}
        </h3>,
      )
      blocks.push(
        <ul key={g.title + '-items'} className="m-items">
          {g.items.map((it, k) => (
            <Row key={k} item={it} i={row++} numbered small={small} />
          ))}
        </ul>,
      )
    })
  } else {
    blocks.push(
      <ul key="items" className={`m-items ${drinks ? 'm-items--drinks' : ''}`}>
        {data.items.map((it, k) => (
          <Row key={k} item={it} i={row++} numbered={!drinks} small={small} />
        ))}
      </ul>,
    )
  }
  if (data.footerHead) {
    const r = row++
    blocks.push(
      <h3 key="fh" className="m-sub m-sub--footer write" style={at(rowDelay(r), PHONE.itemsDur)}>
        {data.footerHead}
      </h3>,
    )
  }

  return (
    <section
      ref={ref}
      id={`m-${id}`}
      className={`m-sec ${playing ? 'is-playing' : ''}`}
    >
      <div className="m-heading">
        <h2 className="m-heading__title write" style={at(PHONE.headings, PHONE.headingsDur)}>
          <span>{data.title}</span>
          {data.aside && (
            <span className="m-heading__aside">
              {data.aside.label} <b>{data.aside.size}</b>
            </span>
          )}
        </h2>
        <div className="m-heading__rule write" style={at(PHONE.lines, PHONE.linesDur)} />
      </div>

      {blocks}

      {data.notes && <Notes notes={data.notes} small={small} />}
    </section>
  )
}


export default function MobileMenu() {
  const sections = useRef({})
  const chipsRef = useRef(null)
  const [active, setActive] = useState(SECTIONS[0].id)

  const sectionRef = useRef((id, el) => {
    sections.current[id] = el
  }).current

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id.replace('m-', ''))
        })
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )
    Object.values(sections.current).forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const bar = chipsRef.current
    const chip = bar?.querySelector(`[data-id="${active}"]`)
    if (bar && chip) {
      bar.scrollTo({ left: chip.offsetLeft - bar.clientWidth / 2 + chip.clientWidth / 2, behavior: 'smooth' })
    }
  }, [active])

  const jump = (id) => {
    sections.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main className="m-menu">
      <header className="m-hero">
        <img
          className="m-hero__square anim-square"
          style={at(PHONE.square, PHONE.squareDur)}
          src="/img/square-red.png"
          alt=""
        />
        <img
          className="m-hero__basil anim-grow"
          style={at(PHONE.leaves, PHONE.leavesDur)}
          src="/img/basil.png"
          alt=""
        />
        <img
          className="m-hero__tomatoes anim-from-right"
          style={at(PHONE.tomatoes, PHONE.tomatoesDur)}
          src="/img/tomatoes.png"
          alt=""
        />
        <img
          className="m-hero__logo anim-pop"
          style={at(PHONE.logo, PHONE.logoDur)}
          src="/img/logo-cream.png"
          alt="Dell'Angelo Pizzeria"
        />
      </header>

      <nav className="m-chips" ref={chipsRef} aria-label="Κατηγορίες">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            data-id={s.id}
            className={`m-chip ${active === s.id ? 'is-active' : ''}`}
            onClick={() => jump(s.id)}
          >
            {s.data.title}
          </button>
        ))}
      </nav>

      <div className="m-list">
        {SECTIONS.map((s) => (
          <Section key={s.id} {...s} sectionRef={sectionRef} />
        ))}
      </div>

      <footer className="m-legal">
        {legal.map((l, i) => (
          <p key={i}>{l}</p>
        ))}
      </footer>
    </main>
  )
}