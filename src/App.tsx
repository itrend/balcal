import { useState } from 'react'
import './App.css'
import { ComboLevelsStr, Levels } from './components/levels'
import { combinations } from './poker'
import { ComboLevels } from './poker-baltaro'
import { HandCalculator } from './components/hand-calculator'
import { Help } from './components/help'

const levelsStrDefault = Object.fromEntries(combinations.map((c) => ([c, "1"]))) as ComboLevelsStr

function App() {
  const [levelsStr, setLevelsStr] = useState(levelsStrDefault)
  const levels = Object.fromEntries(
    Object.entries(levelsStr)
      .map(([c, val]) => [c, parseFloat(val)])
  ) as ComboLevels
  return (
    <>
      <h1>BALatro CALculator</h1>
      <div id="container">
        <div id="levelContainer">
          <Levels levels={levelsStr} onLevelsChanged={setLevelsStr} />
        </div>
        <div id="handsContainer">
          {new Array(6).fill(0).map((_, i) =>
            <HandCalculator name={`Hand ${i+1}`} key={i} comboLevels={levels} />
          )}
        </div>
      </div>
      <Help />
    </>
  )
}

export default App
