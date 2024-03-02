import { PropsWithChildren, ReactNode } from "react"
import "../balatro.css"


export function Help() {
  return (
    <div id="help">
      <h3>Help</h3>
      Very simple hand score calculator for <a href="https://www.playbalatro.com/">Balatro</a> with
      many <b>limitations:</b> (non-exclusive list)
      <ul>
        <li>extra chips and mult must be gathered manually from the game</li>
        <li>retrigger cards must be accounted for manually, as extra chips</li>
        <li>debuffed card&apos;s chips must be manually substracted from extra chips (possibly going negative)</li>
        <li>no error handling - if you write a non-number in any field, you'll get <b>NaN</b> (a principle
        known as <a href="https://en.wikipedia.org/wiki/Garbage_in,_garbage_out">garbage in,
        garbage out</a>)</li>
      </ul>
      <hr/>
      <b>Poker hand</b>: the ranks of your poker hand (no colors), spaces are optional. Each
      of <code>23456789JQK</code> mean what you expect, <code>1</code> is interpreted
      as <code>A</code>, unless directly followed by a zero, in which case it&apos;s interpreted
      as <code>10</code>. You can also use <code>T</code> for <code>10</code>.
      Use <code>0</code> or <code>S</code> for stone card.
      Examples: <code>12345</code> - ace two three four five, <code>10 10 J Q S</code> -
      ten ten jack queen stone-card, <code>10JQK1</code> - ten jack queen king ace
      <br />
      <b>Flush</b>: colors only matter for flushes, so instead of telling me all your colors,
      just mark this if you have a Flush
      <br />
      <b>Straight with 4 cards, Straight skip rank</b>: check if you have the relevant jokers
      <br />
      <b>Cards with bonus</b>: numbers of cards with bonus enhancement (<Chips>+30 chips</Chips>)
      <br />
      <b>Cards with mult</b>: numbers of cards with mult enhancement (<AMult>+4 mult</AMult>)
      <br />
      <b>Extra chips</b>: <Chips>+chips</Chips> from jokers, retriggers, and other sources.
      You can type the final number here or a list of numbers to be summed e.g. <code>2 3</code> or <code>3+4+5</code>
      <br />
      <b>Extra mult</b>: <AMult>+mult</AMult> from jokers, retriggers, and other sources. As above,
      you can type more than one number and they will be summed
      <br />
      <b>Mult mult chain</b>: your <MMult>Xmult</MMult> bonuses. Can be either:
      <ul>
        <li>
          a list of numbers that will be multiplied together to get the final multiplier
          e.g. <code>1.5 2 3</code> will yield final multiplier of <code>9</code>. Use this way
          if all of your <MMult>Xmult</MMult>s
          are <b>after</b> all <AMult>+mult</AMult>s
        </li>
        <li>
          a &quot;multiplier expression&quot; like <code>*2+3*4+5</code> for the scenarios where you
          have <AMult>+mult</AMult> between <MMult>Xmult</MMult>s.
          The expression describes the order and operation of mult modifiers. Unlike usual math rules,
          this expression is calculated from left to right, putting the base mult on the left.
          For example, suppose you play a hand where there&apos;s one card
          with <AMult>+4 mult</AMult> enhancement,
          a steel card left in hand (giving <MMult>X1.5 mult</MMult> after scoring all cards),
          then a <AMult>+8 mult</AMult> joker and finally a <MMult>X2 mult</MMult> joker.
          This is expressed as <code>+4 *1.5 +8 *2</code> (spaces are optional) and will be calculated
          as <code>((&lt;base_multiplier&gt; + 4) * 1.5 + 8) * 2</code>
        </li>
      </ul>
      <br />
    </div>
  )
}


const balatroSpan = (clsName: string, children: ReactNode) => <span className={`balatro ${clsName}`}>{children}</span>
const Chips = ({ children }: PropsWithChildren) => balatroSpan("chips", children)
const AMult = ({ children }: PropsWithChildren) => balatroSpan("amult", children)
const MMult = ({ children }: PropsWithChildren) => balatroSpan("mmult", children)
