import { type PlayerType } from "../types"
import Player from "./Player"
import PlayerInput from "./PlayerInput"

const Players = ({
  addPlayer,
  name,
  handleName,
  nameInputRef,
  players,
  handleGoalieChange,
  handleChangePreferred,
  handleChangeInjured,
}:
  {
    addPlayer: () => void,
    name: string,
    handleName: (e: React.ChangeEvent<HTMLInputElement>) => void,
    nameInputRef: React.RefObject<HTMLInputElement | null>,
    players: PlayerType[],
    handleGoalieChange: (id: number) => void,
    handleChangePreferred: (id: number) => void,
    handleChangeInjured: (id: number) => void
  }) => {

  return (
    <>
      <PlayerInput nameInputRef={nameInputRef} name={name} handleName={handleName} addPlayer={addPlayer} />
      <div className="players-container">
        <div className="player-head-container players-grid">
          <p className="player-head">name</p>
          <p className="player-head">times played</p>
          <p className="player-head">goalie</p>
          <p className="player-head">out</p>
          <p className="player-head">preferred</p>
        </div>
        {players.map(player => (
          <Player
            key={player.id}
            player={player}
            handleGoalieChange={handleGoalieChange}
            handleChangePreferred={handleChangePreferred}
            handleChangeInjured={handleChangeInjured}
          />
        ))}
      </div>
    </>
  )
}

export default Players
