import { useState } from 'react'
import Intro from './components/Intro.jsx'
import Menu from './components/Menu.jsx'

// Add ?skip to the URL to jump straight to the menu while developing.
const skipIntro = new URLSearchParams(window.location.search).has('skip')

export default function App() {
  const [stage, setStage] = useState(skipIntro ? 'menu' : 'intro')

  return (
    <>
      {stage === 'menu' && <Menu />}
      {stage === 'intro' && <Intro onDone={() => setStage('menu')} />}
    </>
  )
}
