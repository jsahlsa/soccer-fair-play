import { type PlayerType } from "../types"

const Lineup = ({
  lineup
}: {
  lineup: PlayerType[]
}) => {
  return (
    <>
      <div className="lineup-header-container lineup-player-container player-head-container">
        <p>name</p>
        <p>times played</p>
      </div>
      {lineup.map((player) => (
        <div key={player.id} className={`lineup-player-container ${player.preferred ? 'preferred' : ''} ${player.goalie ? 'goalie' : ''}`}>
          <p>{player.name}</p>
          <p>{player.timesPlayed}</p>
        </div>
      ))}
    </>
  )
}

export default Lineup
