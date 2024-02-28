import { FormEvent, useState } from "react"
import { parseRanks } from "../poker"
import { CalcExplanation, ComboLevels, calc } from "../poker-baltaro"
import { Explain } from "./explain"

const inputs: string[] = ["hand", "hasFlush", "straightFour", "straightSkip", "cardsBonus", "cardsMult", "extraChips", "extraMult", "multMult"]
interface HandCalculatorProps {
  id: number
  comboLevels: ComboLevels
  calculatorsCount: number
}


export function HandCalculator({ id, comboLevels, calculatorsCount }: HandCalculatorProps) {
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
    const multMult = formData.get("multMult") as string
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

  function copyFields(fromCalculator: string, toCalculator: string) {
    inputs.map(field => {
      const frm = document.getElementById(`${fromCalculator}_${field}`) as HTMLInputElement
      const to = document.getElementById(`${toCalculator}_${field}`) as HTMLInputElement
      to.value = frm.value
      to.checked = frm.checked
    })
  }

  return (
    <div className="calculator">
      <form id={`calculator${id}`} method='post' onSubmit={onSubmit}>
        <h3>Hand {id}</h3>
        <label>
          Poker hand: <input id={`calculator${id}_hand`} name="hand" size={8} placeholder="a 2 3 4 5" />
        </label>
        &nbsp;
        <label>
          Flush <input type="checkbox" id={`calculator${id}_hasFlush`} name="hasFlush" defaultChecked={false} />
        </label>
        <br />
        <label>
          Straight with 4 cards <input type="checkbox" id={`calculator${id}_straightFour`} name="straightFour" defaultChecked={false} />
        </label>
        &nbsp;
        <label>
          Straight skip rank <input type="checkbox" id={`calculator${id}_straightSkip`} name="straightSkip" defaultChecked={false} />
        </label>
        <br />
        <label>
          Cards with bonus: <input id={`calculator${id}_cardsBonus`} name="cardsBonus" size={3} defaultValue="0" />
        </label>
        &nbsp;
        <label>
          Cards with mult: <input id={`calculator${id}_cardsMult`} name="cardsMult" size={8} defaultValue="0" />
        </label>
        <br />
        <label>
          Extra chips: <input id={`calculator${id}_extraChips`} name="extraChips" size={10} defaultValue="0" />
        </label>
        &nbsp;
        <label>
          Extra mult: <input id={`calculator${id}_extraMult`} name="extraMult" size={10} defaultValue="0" />
        </label>
        <br />
        <label>
          Mult mult chain: <input id={`calculator${id}_multMult`} name="multMult" size={24} defaultValue="1" />
        </label>
        <br />
        <input type='submit' value="Calculate" className="submit" />
        {parsed}
        <br />
        {expl && <Explain expl={expl} />}
        <br />
      </form>
      <select className="copy" value={-1} defaultValue={-1}
        onChange={e => {
          copyFields(e.target.value, `calculator${id}`)
          e.target.value = "-1"
        }
        }
      >
        <option key={-1} value={-1}>Copy from...</option>
        {new Array(calculatorsCount).fill(0).map((_, i) => {
          if (i + 1 != id) {
            return (<option key={i + 1} value={`calculator${i + 1}`}>hand {i + 1}</option>)
          }
        })}
      </select>
    </div>
  )
}


const parseNumberList = (s: string) => s.split(/[ ,;+]+/).map((n) => parseFloat(n))