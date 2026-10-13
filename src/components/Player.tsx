import { type PlayerType } from '../types'

const Player = ({
  player,
  handleGoalieChange,
  handleChangePreferred,
  handleChangeInjured,
  handleIncrementDecrement,
}: {
  player: PlayerType,
  handleGoalieChange: (id: number) => void,
  handleChangePreferred: (id: number) => void,
  handleChangeInjured: (id: number) => void,
  handleIncrementDecrement: (e: React.MouseEvent<HTMLButtonElement>) => void
}) => {

  const handleDecrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    handleIncrementDecrement(e)
  }

  const handleIncrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    handleIncrementDecrement(e)
  }

  return (
    <>
      <div className={`player-container players-grid`}>
        <p className="player-name">{player.name}</p>
        <div className="times-played-container">
          <button
            className="decrement times-played-button"
            data-id={player.id}
            onClick={handleDecrement}>
            -
          </button>
          <p className="times-played">{player.timesPlayed}</p>
          <button
            className="increment times-played-button"
            data-id={player.id}
            onClick={handleIncrement}>
            +
          </button>
        </div>
        <button
          className={`player-button ${player.goalie ? 'goalie-button' : ''}`}
          onClick={() => handleGoalieChange(player.id)}
        >
          G
        </button>
        <label htmlFor="out">
          <input className="out-checked" type="checkbox" onChange={() => handleChangeInjured(player.id)} checked={player.injured} />
        </label>
        <label htmlFor="preferred">
          <input className="preferred-checked" type="checkbox" onChange={() => handleChangePreferred(player.id)} checked={player.preferred} />
        </label>
      </div >
    </>
  )
}

export default Player
