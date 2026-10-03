import { type PlayerType } from "../types"

const Lineup = ({
  lineup
}: {
  lineup: PlayerType[]
}) => {
  return (
    <>
      {lineup.map((player) => (
        <div className={`lineup-player-container ${player.preferred ? 'preferred' : ''} ${player.goalie ? 'goalie' : ''}`}>
          <p>{player.name} times played: {player.timesPlayed}</p>
        </div>
      ))}
    </>
  )
}

export default Lineup
