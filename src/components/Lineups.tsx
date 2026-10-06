import { type PlayerType } from '../types'
import Lineup from './Lineup'

const Lineups = ({
  lineups,
  createLineup,
  undoLineup,
}: {
  lineups: PlayerType[][],
  createLineup: () => void,
  undoLineup: () => void,
}) => {
  return (
    <>
      <h1>Lineups</h1>
      <button onClick={createLineup}>create lineup</button>
      <button onClick={undoLineup}>undo last lineup</button>
      {lineups.toReversed().map((lineup, i) => (
        <div key={i}>
          <h2>lineup: {lineups.length - i}</h2>
          <Lineup lineup={lineup} />
        </div>
      ))}
    </>
  )
}

export default Lineups
