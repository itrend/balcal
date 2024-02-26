export type CardRank = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 1 | 0
// type CardRankStr = "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "A" | "S"


// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const strToCardMap: Partial<Record<string, CardRank>> = Object.fromEntries([
  ...new Array(9).fill(0).map((_, i) => i+2 as CardRank).map((i) => ([i.toString(), i])),
  ["J", 11],
  ["Q", 12],
  ["K", 13],
  ["A", 1],
  ["S", 0],
])

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const rankToStrMap: Partial<Record<CardRank, string>> = Object.fromEntries(Object.entries(strToCardMap).map(([k, v]) => ([v, k])))

export const rankToStr = (r: CardRank) => rankToStrMap[r]?.toString()

const validSeparators = " \t.,;"

export function parseRanks(s: string): CardRank[] {
  s = s.toUpperCase()
  const ranks: CardRank[] = []

  const nextCard = (i: number): [number, CardRank] => {
    const c = s.charAt(i)
    i += 1
    const card = strToCardMap[c]
    if (card != null) return [i, card]
    if (c === "0") return [i, 10]
    if (c === "1") {
      if (i < s.length && s.charAt(i) === "0") return [i + 1, 10]
      return [i, 1]
    }
    throw new Error(`Unknown symbol '${c}' at col ${i}`)
  }

  const skipSeparators = (i: number): number => {
    while (i < s.length && validSeparators.includes(s.charAt(i))) ++i
    return i
  }

  let i = 0
  while (i < s.length) {
    i = skipSeparators(i)
    if (i < s.length) {
      const [ni, card] = nextCard(i)
      i = ni
      ranks.push(card)
    }
  }
  return ranks
}

export const combinations = ["High", "Pair", "TwoPair", "Three", "Straight", "Flush", "Full", "Four", "StraightFlush", "FlushHouse", "Five", "FlushFive"] as const
export type Combination = typeof combinations[number]
export interface CombinationOpts {
  straightSkip?: boolean
  straightFour?: boolean
  hasFlush?: boolean
}

export function combination(ranks: CardRank[], opts: CombinationOpts = {}): Combination {
  const { straightSkip = false, straightFour = false, hasFlush: baseHasFlush = false } = opts
  const cardsToCombo = straightFour ? 4 : 5
  const hasFlush = baseHasFlush && ranks.length >= cardsToCombo
  if (ranks.length === 0) throw Error("Hand is empty")
  const counts: Record<number, number> = {}
  ranks.forEach((r) => {
    if (!counts[r]) counts[r] = 0
    counts[r] += 1 
  })
  const vals = Object.values(counts).sort((a, b) => b - a)
  if (vals[0] >= 5) return hasFlush ? "FlushFive" : "Five"
  if (vals[0] === 4) return "Four"
  if (vals[0] === 3 && vals[1] === 2) return hasFlush ? "FlushHouse" : "Full"
  const straight = hasStraight(ranks, cardsToCombo, straightSkip)
  if (hasFlush) return straight ? "StraightFlush" : "Flush"
  if (straight) return "Straight"
  if (vals[0] === 3) return "Three"
  if (vals[0] === 2 && vals[1] === 2) return "TwoPair"
  if (vals[0] === 2) return "Pair"
  return "High"
}

function hasStraight(ranks: number[], ncards: number, canSkip: boolean): boolean {
  return hasStraightEasy(ranks, ncards, canSkip) || hasStraightEasy(ranks.map((r) => r === 1 ? 14 : r), ncards, canSkip)
}

function hasStraightEasy(ranks: number[], ncards: number, canSkip: boolean): boolean {
  const sranks = [...ranks]
  sranks.sort((a, b) => a - b)
  const maxDiff = canSkip ? 2 : 1
  for (let i = 0; i <= ranks.length - ncards; ++i) {
    if (sranks[i] === 0) continue
    let izzy = true
    for (let j = i + 1; j < i + ncards; ++j) {
      const d = sranks[j] - sranks[j - 1]
      if (d <= 0 || d > maxDiff) {
        izzy = false
        break
      }
    }
    if (izzy) return true
  }
  return false
}