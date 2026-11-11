import { useEffect, useRef, useState } from 'react'
import { MENU } from '../timeline.js'
import { orektika, salates, pizza, pasta, anapsyktika, pota, legal } from '../menuData.js'
import { at, rowCounter, Heading, SubHeading, ItemList, Notes } from './MenuParts.jsx'
import MobileMenu from './MobileMenu.jsx'


const PAGE_W = 720
const PAGE_H = 977
const WIDE_MIN = 1180   
const PHONE_MAX = 700 

function useLayout() {
  const get = () => {
    const vw = window.innerWidth
    const vh = window.innerHeight
       if (vw < PHONE_MAX || vh < 500) return { mode: 'phone' }
    if (vw >= WIDE_MIN) {
      const scale = Math.min(vh / PAGE_H, vw / (PAGE_W * 2))
      const W = vw / scale
      return { mode: 'wide', scale, W, H: PAGE_H, k: W / 2 / PAGE_W }
    }
    return { mode: 'stacked', scale: Math.min(vw / PAGE_W, 1.35), W: PAGE_W, H: PAGE_H * 2, k: 1 }
  }
  const [layout, setLayout] = useState(get)
  useEffect(() => {
    const onResize = () => setLayout(get())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return layout
}


function usePlayWhenVisible(always) {
  const ref = useRef(null)
  const [playing, setPlaying] = useState(always)
  useEffect(() => {
    if (playing || !ref.current) return
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setPlaying(true),
      { threshold: 0.3 },
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [playing])
  return [ref, playing]
}

function PageOne({ playNow }) {
  const [ref, playing] = usePlayWhenVisible(playNow)
  const rowA = rowCounter()
  const rowS = rowCounter()
  const rowP = rowCounter()

  return (
    <section ref={ref} className={`page page--one ${playing ? 'is-playing' : ''}`}>
      {}
      <img
        className="deco deco--square anim-square"
        style={at(MENU.square, MENU.squareDur)}
        src="/img/square-red.png"
        alt=""
      />
      <img
        className="deco deco--basil anim-grow"
        style={at(MENU.leaves, MENU.leavesDur)}
        src="/img/basil.png"
        alt=""
      />

      <div className="col col--orektika">
        <Heading title={orektika.title} />
        <ItemList items={orektika.items} row={rowA} />
        <Notes notes={orektika.notes} className="notes--after-list" />
      </div>

      <div className="col col--salates">
        <Heading title={salates.title} />
        <ItemList items={salates.items} row={rowS} />
        <Notes notes={salates.notes} className="notes--after-list" />
      </div>

      <div className="col col--pizza">
        <Heading title={pizza.title} aside={pizza.aside} />
        <ItemList items={pizza.items} row={rowP} className="items--pizza" />
        <SubHeading text={pizza.footerHead} row={rowP()} className="subheading--pizza" />
        <Notes notes={pizza.notes} className="notes--pizza" />
      </div>
    </section>
  )
}

function PageTwo({ playNow }) {
  const [ref, playing] = usePlayWhenVisible(playNow)
  const rowP = rowCounter()
  const rowA = rowCounter()
  const rowD = rowCounter()

  return (
    <section ref={ref} className={`page page--two ${playing ? 'is-playing' : ''}`}>
      <img
        className="deco deco--tomatoes anim-from-right"
        style={at(MENU.tomatoes, MENU.tomatoesDur)}
        src="/img/tomatoes.png"
        alt=""
      />
      <img
        className="deco deco--logo anim-pop"
        style={at(MENU.logo, MENU.logoDur)}
        src="/img/logo-cream.png"
        alt="Dell'Angelo Pizzeria"
      />

      <div className="col col--pasta">
        <Heading title={pasta.title} />
        {pasta.groups.map((g) => (
          <div className="group" key={g.title}>
            <SubHeading text={g.title} extra={g.titleExtra} row={rowP()} />
            <ItemList items={g.items} row={rowP} />
          </div>
        ))}
        <Notes notes={pasta.notes} className="notes--pasta" />
      </div>

      <div className="col col--anapsyktika">
        <Heading title={anapsyktika.title} />
        <ItemList items={anapsyktika.items} row={rowA} numbered={false} className="items--drinks" />
      </div>

      <div className="col col--pota">
        <Heading title={pota.title} />
        <ItemList items={pota.items} row={rowD} numbered={false} className="items--drinks" />
      </div>

      <Notes notes={legal} className="legal" />
    </section>
  )
}

export default function Menu() {
  const { mode, scale, W, H, k } = useLayout()
  const wide = mode === 'wide'
  if (mode === 'phone') return <MobileMenu />
  const kw = 1 + (k - 1) * 0.6

  return (
    <main className={`menu menu--${mode}`}>
      <div
        className="menu__stage"
        style={{ width: Math.floor(W * scale), height: Math.floor(H * scale) }}
      >
        <div
          className="menu__canvas"
          style={{ width: W, height: H, transform: `scale(${scale})`, '--k': k, '--kw': kw }}
        >
          <PageOne playNow />
          <PageTwo playNow={wide} />
        </div>
      </div>
    </main>
  )
}
