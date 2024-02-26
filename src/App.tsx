import { FormEvent, useState } from 'react'
import './App.css'
import { combinations, parseRanks, rankToStr } from './poker'
import { CalcExplanation, ChipsAndMult, ComboLevels, calc } from './poker-baltaro'

function App() {
  const [parsed, setParsed] = useState("")
  const [expl, setExpl] = useState<CalcExplanation | null>(null)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)

    const b = (s: string) => !!formData.get(s)
    const n = (s: string) => parseInt(formData.get(s) as string)
    // const f = (s: string) => parseFloat(formData.get(s) as string)

    const hand = formData.get("hand") as string
    const hasFlush = b("hasFlush")
    const straightFour = b("straightFour")
    const straightSkip = b("straightSkip")
    const cardsBonus = n("cardsBonus")
    const cardsMult = n("cardsMult")
    const extraChips = n("extraChips")
    const extraMult = n("extraMult")
    const multMult = (formData.get("multMult") as string).split(" ").map((s) => parseFloat(s))
    const comboLevels = parseLevels(formData)
    const calcParams = { cardsBonus, cardsMult, extraChips, extraMult, multMult, comboLevels }
    try {
      const ranks = parseRanks(hand)
      const handOpts = { hasFlush, straightFour, straightSkip }
      const expl = calc(ranks, handOpts, calcParams)
      setParsed("What I though you said: " + ranks.map(rankToStr).join(" "))
      setExpl(expl)
    } catch (e) {
      setParsed(`Unparsable: ${(e as Error).message}`)
      setExpl(null)
    }
  }
  return (
    <>
      <h1>BAL CAL</h1>
      <form method='post' onSubmit={onSubmit}>
        <Levels />
        <hr/>
        <label>
          Poker hand: <input name="hand" size={8}/>
        </label>
        &nbsp;
        <label>
          Flush <input type="checkbox" name="hasFlush" defaultChecked={false} />
        </label>
        <br/>
        <label>
          Straight with 4 cards <input type="checkbox" name="straightFour" defaultChecked={false} />
        </label>
        &nbsp;
        <label>
          Straight skip rank <input type="checkbox" name="straightSkip" defaultChecked={false} />
        </label>
        <br/>
        <label>
          Cards with bonus: <input name="cardsBonus" size={3} defaultValue="0"/>
        </label>
        &nbsp;
        <label>
          Cards with mult: <input name="cardsMult" size={3} defaultValue="0" />
        </label>
        <br/>
        <label>
          Extra chips: <input name="extraChips" size={8} defaultValue="0"/>
        </label>
        &nbsp;
        <label>
          Extra mult: <input name="extraMult" size={8} defaultValue="0" />
        </label>
        <br/>
        <label>
          Mult mult chain: <input name="multMult" size={8} defaultValue="1" />
        </label>
        <br/>
        <input type='submit' value="BALCAL!" />
        <hr/>
        {parsed}
        <br/>
        {expl && <Explain expl={expl} />}
        <br/>
      </form>
    </>
  )
}

export default App

function Levels() {
  return (
    <div style={{textAlign: "left"}}>
      <ul>
        {combinations.map((c) => {
          return (<li key={c}><label><input name={`level_${c}`} defaultValue={1} size={2} /> {c}</label></li>)
        })}
      </ul>
    </div>
  )
}

function parseLevels(formData: FormData): ComboLevels {
  const entries = combinations.map((c) => [c, parseFloat(formData.get(`level_${c}`) as string)])
  return Object.fromEntries(entries) as ComboLevels
}

interface ExplainProps {
  expl: CalcExplanation
}

function Explain({ expl }: ExplainProps) {
  const cam = (cm: ChipsAndMult) => <><b>{cm.chips}</b>x<b>{intOrFixed(cm.mult)}</b></>
  return (
    <div style={{textAlign: "left"}}>
      <b>{expl.combo}</b> <br/>
      {cam(expl.base)} combo base<br/>
      {cam(expl.levelled)} combo levelled<br/>
      <b>{expl.cardChips}</b> chips from cards<br/>
      {cam(expl.final)} with extras<br/>
      <b>{Math.floor(expl.score)}</b> final score
    </div>
  )
}

const intOrFixed = (n: number) => n === Math.floor(n) ? n.toString() : n.toFixed(2)