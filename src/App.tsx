import { useState } from 'react'
import './App.css'
import { ComboLevelsStr, Levels } from './components/levels'
import { combinations } from './poker'
import { ComboLevels } from './poker-baltaro'
import { HandCalculator } from './components/hand-calculator'
import { Help } from './components/help'
import { Footer } from './components/footer'

const levelsStrDefault = Object.fromEntries(combinations.map((c) => ([c, "1"]))) as ComboLevelsStr

function App() {
  const [levelsStr, setLevelsStr] = useState(levelsStrDefault)
  const levels = Object.fromEntries(
    Object.entries(levelsStr)
      .map(([c, val]) => [c, parseFloat(val)])
  ) as ComboLevels
  const calculatorsCount = 6
  return (
    <>
      <h1>BALatro CALculator</h1>
      <div id="container">
        <div id="levelContainer">
          <Levels levels={levelsStr} onLevelsChanged={setLevelsStr} />
        </div>
        <div id="handsContainer">
          {new Array(calculatorsCount).fill(0).map((_, i) =>
            <HandCalculator id={i+1} key={i} comboLevels={levels} calculatorsCount={calculatorsCount} />
          )}
        </div>
      </div>
      <Help />
      <Footer />
    </>
  )
}

export default App
