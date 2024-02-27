export function Footer() {
  const links = [
    <a href="https://www.playbalatro.com/" key="issues">Balatro</a>,
    <a href="https://store.steampowered.com/app/2379780/Balatro/" key="issues">on steam</a>,
    <a href="https://github.com/itrend/balcal" key="src">source code</a>,
    <a href="https://github.com/itrend/balcal/issues" key="issues">issues</a>,
  ]
  const sep = <>&nbsp;|&nbsp;</>
  return (
    <div>
      {links.map((link, i) => <>{i !== 0 ? sep : null}{link}</>)}
    </div>
  )
}
