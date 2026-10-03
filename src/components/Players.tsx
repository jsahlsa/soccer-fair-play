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
  handleChangePreferred
}:
  {
    addPlayer: () => void,
    name: string,
    handleName: (e: React.ChangeEvent<HTMLInputElement>) => void,
    nameInputRef: React.RefObject<HTMLInputElement | null>,
    players: PlayerType[],
    handleGoalieChange: (id: number) => void,
    handleChangePreferred: (id: number) => void
  }) => {

  return (
    <>
      <PlayerInput nameInputRef={nameInputRef} name={name} handleName={handleName} addPlayer={addPlayer} />
      <div className="players-container">
        {players.map(player => (
          <Player
            key={player.id}
            player={player}
            handleGoalieChange={handleGoalieChange}
            handleChangePreferred={handleChangePreferred}
          />
        ))}
      </div>
    </>
  )
}

export default Players
