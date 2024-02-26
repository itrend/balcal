import { CardRank, Combination, CombinationOpts, combination } from "./poker"

export type ComboLevels = Record<Combination, number>

interface CalcParams {
  cardsBonus: number
  cardsMult: number
  extraChips: number
  extraMult: number
  multMult: number[]
  comboLevels: ComboLevels
}

export interface ChipsAndMult {
  chips: number
  mult: number
}

export interface CalcExplanation {
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
  const finalMultMult = multMult.reduce((a, b) => a * b, 1)
  const finalMult = finalMultCum * finalMultMult
  const score = finalChips * finalMult

  return {
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
  "Five": [0, 0, 3, 35],
  "StraightFlush": [100, 8, 3, 40],
  "FlushHouse": [0, 0, 3, 40],
  "FlushFive": [0, 0, 3, 40],
}
