import type { PlayerType, ReplacementType } from '../types'
import Lineup from './Lineup'
import ReplaceDialog from './ReplaceDialog'

const Lineups = ({
  lineups,
  createLineup,
  undoLineup,
  handleReplace,
  replace,
  handleCloseReplace,
  playersNotPlaying,
  handleReplacePlayer,
}: {
  lineups: PlayerType[][],
  createLineup: () => void,
  undoLineup: () => void,
  handleReplace: (e: React.MouseEvent<HTMLButtonElement>) => void,
  replace: ReplacementType,
  handleCloseReplace: () => void,
  playersNotPlaying: PlayerType[],
  handleReplacePlayer: (e: React.MouseEvent<HTMLButtonElement>) => void,
}) => {
  console.log(playersNotPlaying, 'players not playing')

  return (
    <div className="lineups-container">
      <h1>Lineups</h1>
      <button onClick={createLineup}>create lineup</button>
      <button className="button-secondary" onClick={undoLineup} disabled={lineups.length === 0}>undo last lineup</button>
      {lineups.toReversed().map((lineup, i) => (
        console.log(lineups.length, i, 'lineups lenghth and i'),
        <div key={i}>
          <h2 className="lineup-count">lineup: {lineups.length - i}</h2>
          <Lineup lineup={lineup} handleReplace={handleReplace} lineupsLength={i === 0} />
        </div>
      ))}
      {replace.replace ? <ReplaceDialog
        replace={replace}
        handleCloseReplace={handleCloseReplace}
        playersNotPlaying={playersNotPlaying}
        handleReplacePlayer={handleReplacePlayer}
      />
        : ''
      }
    </div>
  )
}

export default Lineups
