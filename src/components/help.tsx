export function Help() {
  return (
    <div id="help">
      <h3>Help</h3>
      Very simple hand score calculator for <a href="https://www.playbalatro.com/">Balatro</a> with
      many <b>limitations:</b> (non-exclusive list)
      <ul>
        <li>extra chips and mult must be gathered manually from the game</li>
        <li>retrigger cards must be accounted for manually, as extra chips</li>
        <li>mult multiplier is always calculated after mult additions</li>
        <li>debuffed card&apos;s chips must be manually substracted from extra chips (possibly going negative)</li>
        <li>the secret combinations (five of a kind, flush house and flush five) are not correct as I
          do not know their strength</li>
      </ul>
      <hr/>
      <b>Poker hand</b>: the ranks only of your poker hand, spaces are optional. Each
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
      <b>Cards with bonus</b>: numbers of cards with bonus enhancement (+30 chips)
      <br />
      <b>Cards with mult</b>: numbers of cards with mult enhancement (+4 mult)
      <br />
      <b>Extra chips</b>: all extra chips from jokers, retriggers, and other sources. You can type the
      final number here or a list of numbers to be summed e.g. <code>2 3</code> or <code>3+4+5</code>
      <br />
      <b>Extra mult</b>: extra mult *additions* from jokers, retriggers, and other sources. As above,
      you can type more than one number and they will be summed
      <br />
      <b>Mult mult chain</b>: all of your multiplier multipliers. A list of numbers that will be multiplied
      together to get the final multiplier e.g. <code>1.5 2 3</code> will yield final multiplier of <code>9</code>
      <br />
      <a href="https://github.com/itrend/balcal">source code</a>
      <a href="https://github.com/itrend/balcal/issues">issues</a>
    </div>
  )
}
