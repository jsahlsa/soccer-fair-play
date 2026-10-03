import { type PlayerType } from '../types'

const Player = ({
  player,
  handleGoalieChange,
  handleChangePreferred
}: {
  player: PlayerType,
  handleGoalieChange: (id: number) => void,
  handleChangePreferred: (id: number) => void
}) => {
  return (
    <>
      <div className={`player-container ${player.goalie ? 'goalie' : ''}`}>
        <p>{player.id}: {player.name} times played: {player.timesPlayed}</p>
        <button
          className="player-button goalie-button"
          onClick={() => handleGoalieChange(player.id)}
        >
          goalie
        </button>
        <label htmlFor="preferred">preferred:
          <input type="checkbox" onChange={() => handleChangePreferred(player.id)} checked={player.preferred} />
        </label>
      </div >
    </>
  )
}

export default Player
