import { Combination, combinations } from "../poker"

export type ComboLevelsStr = Record<Combination, string>

interface LevelProps {
  levels: ComboLevelsStr
  onLevelsChanged: (levels: ComboLevelsStr) => void
}

export function Levels({ levels, onLevelsChanged }: LevelProps) {
  return (
    <div style={{textAlign: "left"}}>
      <h3>Hand levels</h3>
      {combinations.map((c) => {
        return (
          <>
            <label>
              <input
                value={levels[c]}
                onChange={(e) => {
                  onLevelsChanged({ ...levels, [c]: e.target.value })
                }}
                defaultValue={1}
                size={2}
              />&nbsp;{c}
            </label>
            <br/>
          </>
        )
      })}
    </div>
  )
}
