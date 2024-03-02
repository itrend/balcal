import { CardRank, Combination, CombinationOpts, combination } from "./poker"

export type ComboLevels = Record<Combination, number>

interface CalcParams {
  cardsBonus: number
  cardsMult: number
  extraChips: number
  extraMult: number
  multMult: string
  comboLevels: ComboLevels
}

export interface ChipsAndMult {
  chips: number
  mult: number
}

export interface CalcExplanation {
  hand: CardRank[]
  combo: Combination
  cardChips: number
  base: ChipsAndMult
  levelled: ChipsAndMult
  final: ChipsAndMult
  score: number
}

export function calc(hand: CardRank[], opts: CombinationOpts, params: CalcParams): CalcExplanation {
  const cardChips = hand.map((r) => chipsPerRank[r]).reduce((a, b) => a + b, 0)

  const combo = combination(hand, opts)
  const [baseChips, baseMult, levMult, levChips] = comboBases[combo]
  const level = params.comboLevels[combo] - 1
  const comboChips = baseChips + level * levChips
  const comboMult = baseMult + level * levMult

  const {extraChips, extraMult, cardsBonus, cardsMult, multMult} = params
  const finalChips = (comboChips + cardChips + extraChips + 30 * cardsBonus)
  const finalMultCum = (comboMult + extraMult + 4 * cardsMult)
  const finalMult = calcMultChain(multMult, finalMultCum)
  const score = finalChips * finalMult

  return {
    hand,
    combo,
    cardChips,
    base: {
      chips: baseChips,
      mult: baseMult,
    },
    levelled: {
      chips: comboChips,
      mult: comboMult,
    },
    final: {
      chips: finalChips,
      mult: finalMult,
    },
    score,
  }
}

const chipsPerRank = [50, 11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]

const comboBases: Record<Combination, [number, number, number, number]> = {
  "High": [5, 1, 1, 10],
  "Pair": [10, 2, 1, 15],
  "TwoPair": [20, 2, 1, 20],
  "Three": [30, 3, 2, 20],
  "Straight": [30, 4, 2, 30],
  "Flush": [35, 4, 2, 15],
  "Full": [40, 4, 2, 25],
  "Four": [60, 7, 3, 30],
  "Five": [120, 12, 3, 35],
  "StraightFlush": [100, 8, 3, 40],
  "FlushHouse": [140, 14, 3, 40],
  "FlushFive": [160, 16, 3, 40],
}

function calcMultChain(s: string, mult: number): number {
  return s.match(/[x*+]/i) ? calcMultExpr(s, mult) : calcMultSimple(s, mult)
}

function calcMultSimple(s: string, mult: number): number {
  const list = s.split(/[ ,;]+/).map((n) => parseFloat(n))
  return list.reduce((a, b) => a * b, mult)
}

function calcMultExpr(s: string, mult: number): number {
  s = s.replace(/\s+/g, "")
  if (!s) return mult
  if (s.charAt(0).match(/[0-9]/)) s = "*" + s

  const r = s.match(/[x*+-]\d+(\.\d*)?/ig)?.reduce((result, term) => {
    const op = term.charAt(0)
    if ("+-".includes(op)) return result + parseFloat(term)
    if ("*xX".includes(op)) return result * parseFloat(term.substring(1))
    throw new Error(`UNPOSSIBLE TERM '${term}'`)
  }, mult)
  return r ?? mult
}
