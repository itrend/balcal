import { FormEvent, useState } from "react"
import { parseRanks } from "../poker"
import { CalcExplanation, ComboLevels, calc } from "../poker-baltaro"
import { Explain } from "./explain"

interface HandCalculatorProps {
  name: string
  comboLevels: ComboLevels
}


export function HandCalculator({ name, comboLevels }: HandCalculatorProps) {
  const [parsed, setParsed] = useState("")
  const [expl, setExpl] = useState<CalcExplanation | null>(null)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)

    const b = (s: string) => !!formData.get(s)
    const n = (s: string) => parseNumberList(formData.get(s) as string).reduce((a, b) => a + b, 0)

    const hand = formData.get("hand") as string
    const hasFlush = b("hasFlush")
    const straightFour = b("straightFour")
    const straightSkip = b("straightSkip")
    const cardsBonus = n("cardsBonus")
    const cardsMult = n("cardsMult")
    const extraChips = n("extraChips")
    const extraMult = n("extraMult")
    const multMult = parseNumberList(formData.get("multMult") as string)
    const calcParams = { cardsBonus, cardsMult, extraChips, extraMult, multMult, comboLevels }
    try {
      const ranks = parseRanks(hand)
      const handOpts = { hasFlush, straightFour, straightSkip }
      const expl = calc(ranks, handOpts, calcParams)
      setParsed("")
      setExpl(expl)
    } catch (e) {
      setParsed(`Unparsable: ${(e as Error).message}`)
      setExpl(null)
    }
  }
  return (
    <div className="calculator">
      <form method='post' onSubmit={onSubmit}>
        <h3>{name}</h3>
        <label>
          Poker hand: <input name="hand" size={8} placeholder="a 2 3 4 5" />
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
          Extra chips: <input name="extraChips" size={10} defaultValue="0"/>
        </label>
        &nbsp;
        <label>
          Extra mult: <input name="extraMult" size={10} defaultValue="0" />
        </label>
        <br/>
        <label>
          Mult mult chain: <input name="multMult" size={8} defaultValue="1" />
        </label>
        <br/>
        <input type='submit' value="Calculate" className="submit" />
        {parsed}
        <br/>
        {expl && <Explain expl={expl} />}
        <br/>
      </form>
    </div>
  )
}


const parseNumberList = (s: string) => s.split(/[ ,;+]+/).map((n) => parseFloat(n))