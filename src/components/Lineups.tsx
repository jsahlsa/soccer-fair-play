import { type PlayerType } from '../types'
import Lineup from './Lineup'

const Lineups = ({
  lineups,
  createLineup
}: {
  lineups: PlayerType[][],
  createLineup: () => void
}) => {
  return (
    <>
      <h1>Lineups</h1>
      <button onClick={createLineup}>create lineup</button>
      {lineups.toReversed().map((lineup, i) => (
        <>
          <h2>lineup: {lineups.length - i}</h2>
          <Lineup lineup={lineup} />
        </>
      ))}
    </>
  )
}

export default Lineups
