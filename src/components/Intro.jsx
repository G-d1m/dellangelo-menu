import { useEffect, useRef, useState } from 'react'
import { INTRO } from '../timeline.js'

/*
 * Stage 1 — terracotta screen, cream logo in the middle, the tagline is
 * "hand-written" underneath, then the logo zooms in from its centre
 * until the whole screen is cream (= the menu background).
 * Click / tap / any key skips it.
 */

// Zoom point: the cream spot closest to the logo's centre (between the ' and the A
// of "Dell'Angelo"). Measured on the 1017 × 821 logo image.
const LOGO_W = 1017
const ORIGIN_X = 0.5192
const ORIGIN_Y = 0.4933
const CREAM_RADIUS = 18 // px of solid cream around that point, in image pixels

/*
 * One continuous zoom. The scale grows exponentially (each frame multiplies
 * the size by the same amount), which the eye reads as a steady, smooth
 * fly-in instead of a zoom that speeds up and stops.
 */
function zoomFrames(logo) {
  const r = logo.getBoundingClientRect()
  const px = r.left + r.width * ORIGIN_X
  const py = r.top + r.height * ORIGIN_Y
  // how big the cream spot must get to cover the farthest screen corner
  const far = Math.max(
    Math.hypot(px, py),
    Math.hypot(window.innerWidth - px, py),
    Math.hypot(px, window.innerHeight - py),
    Math.hypot(window.innerWidth - px, window.innerHeight - py),
  )
  const creamOnScreen = CREAM_RADIUS * (r.width / LOGO_W)
  const maxScale = (far / creamOnScreen) * 1.1

  const STEPS = 60
  const frames = []
  for (let i = 0; i <= STEPS; i++) {
    const t = i / STEPS
    const eased = t * t * (1.6 - 0.6 * t) // gentle start, steady finish
    frames.push({ transform: `scale(${Math.pow(maxScale, eased)})` })
  }
  return frames
}

export default function Intro({ onDone }) {
  const [phase, setPhase] = useState('play') // play → expand
  const logoRef = useRef(null)

  useEffect(() => {
    const timers = [
      setTimeout(() => {
        setPhase('expand')
        const logo = logoRef.current
        if (logo) {
          logo.getAnimations().forEach((a) => a.cancel()) // stop the entrance animation
          logo.animate(zoomFrames(logo), {
            duration: INTRO.expandDur,
            easing: 'linear',
            fill: 'forwards',
          })
        }
      }, INTRO.expand),
      setTimeout(onDone, INTRO.done),
    ]
    const skip = () => onDone()
    window.addEventListener('keydown', skip)
    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener('keydown', skip)
    }
  }, [onDone])

  const t = (delay, dur) => ({ '--d': `${delay}ms`, '--dur': `${dur}ms` })

  return (
    <div
      className={`intro intro--${phase}`}
      onClick={onDone}
      style={{ '--expand-dur': `${INTRO.expandDur}ms` }}
      aria-label="Dell'Angelo Pizzeria — In Wood We Trust, since 2002"
    >
      <div className="intro__group">
        <img
          ref={logoRef}
          className={`intro__logo ${phase === 'play' ? 'anim-logo-in' : ''}`}
          style={t(INTRO.logoIn, INTRO.logoInDur)}
          src="/img/logo-cream.png"
          alt="Dell'Angelo Pizzeria"
          draggable="false"
        />
        <div className="intro__text">
          <p className="intro__tagline write" style={t(INTRO.tagline, INTRO.taglineDur)}>
            In Wood We Trust
          </p>
          <p className="intro__since write" style={t(INTRO.since, INTRO.sinceDur)}>
            ~ Since 2002 ~
          </p>
        </div>
      </div>
      <div className="intro__cream" />
    </div>
  )
}
