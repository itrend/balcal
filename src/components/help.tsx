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
        <li>I still don&apos;t know the base score of flush five, so this one won&apos;t work</li>
      </ul>
      <hr/>
      <hr/>
      <b>Poker hand</b>: the ranks of your poker hand (no colors), spaces are optional. Each
      of <code>23456789JQK</code> mean what you expect, <code>1</code> is interpreted
      as <code>A</code>, unless directly followed by a zero, in which case it&apos;s interpreted
      as <code>10</code>. Use <code>0</code> or <code>S</code> for stone card.
      Examples: <code>12345</code> - ace two three four five, <code>10 10 J Q S</code> -
      ten ten jack queen stone-card, <code>10JQK1</code> - ten jack queen king ace
      <br />
      <b>Flush</b>: colors only matter for flushes, so instead of telling me all your colors,
      just mark this if you have a Flush
      <br />
      <b>Straight with 4 cards, Straight skip rank</b>: check if you have the relevant jokers
      <br />
      <b>Cards with bonus</b>: numbers of cards with bonus enhancement (<span className="chips">+30 chips</span>)
      <br />
      <b>Cards with mult</b>: numbers of cards with mult enhancement (<span className="amult">+4 mult</span>)
      <br />
      <b>Extra chips</b>: <span className="chips">+chips</span> from jokers, retriggers, and other sources.
      You can type the final number here or a list of numbers to be summed e.g. <code>2 3</code> or <code>3+4+5</code>
      <br />
      <b>Extra mult</b>: <span className="amult">+mult</span> from jokers, retriggers, and other sources. As above,
      you can type more than one number and they will be summed
      <br />
      <b>Mult mult chain</b>: all of your multiplier multipliers. Can be either:
      <ul>
        <li>
          list of numbers that will be multiplied together to get the final multiplier
          e.g. <code>1.5 2 3</code> will yield final multiplier of <code>9</code>. Use this way
          if all of your <span className="mmult">Xmult</span>s
          are <b>after</b> all <span className="amult">+mult</span>s
        </li>
        <li>
          a &quot;multiplier expression&quot; like <code>*2+3*4+5</code> for the scenarios where you
          have <span className="amult">+mult</span> between <span className="mmult">Xmult</span>s.
          The expression describes the order and operation of mult modifiers. Unlike usual math rules,
          this expression is calculated from left to right, putting the base mult on the left.
          For example, suppose you play a hand where there&apos;s one card
          with <span className="amult">+4 mult</span> enhancement,
          a steel card left in hand (giving <span className="mmult">X1.5 mult</span> after scoring all cards),
          then a <span className="amult">+8 mult</span> joker and finally a <span className="mmult">X2 mult</span> joker.
          This is expressed as <code>+4 *1.5 +8 *2</code> (spaces are optional) and will be calculated
          as <code>((&lt;base_multiplier&gt; + 4) * 1.5 + 8) * 2</code>
        </li>
      </ul>
      <br />
    </div>
  )
}
