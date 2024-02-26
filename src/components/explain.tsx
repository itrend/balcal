import { rankToStr } from "../poker"
import { CalcExplanation, ChipsAndMult } from "../poker-baltaro"

interface ExplainProps {
  expl: CalcExplanation
}

export function Explain({ expl }: ExplainProps) {
  const cam = (cm: ChipsAndMult) => <><b>{cm.chips}</b>x<b>{intOrFixed(cm.mult)}</b></>
  return (
    <div style={{ marginTop: "1rem" }}>
      <b>{expl.hand.map((v) => rankToStr(v)).join(" ")}</b><br/>
      <b>{expl.combo}</b><br/>
      {cam(expl.base)} combo base<br/>
      {cam(expl.levelled)} combo levelled<br/>
      <b>{expl.cardChips}</b> chips from cards<br/>
      {cam(expl.final)} with extras<br/>
      <b>{Math.floor(expl.score)}</b> final score
    </div>
  )
}

const intOrFixed = (n: number) => n === Math.floor(n) ? n.toString() : n.toFixed(2)
