import { type PlayerType } from "../types"
import { FaExchangeAlt } from "react-icons/fa";

const Lineup = ({
  lineup,
  handleReplace,
  lineupsLength,
}: {
  lineup: PlayerType[],
  handleReplace: (e: React.MouseEvent<HTMLButtonElement>) => void,
  lineupsLength: boolean,
}) => {

  const replacePlayer = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleReplace(e)
  }

  return (
    <>
      <div className="lineup-header-container lineup-player-container player-head-container">
        <p>name</p>
        <p>times played</p>
        <p>replace</p>
      </div>
      {lineup.map((player) => (
        < div key={player.id} className={`lineup-player-container ${player.preferred ? 'preferred' : ''} ${player.goalie ? 'goalie' : ''}`}>
          <p>{player.name}</p>
          <p>{player.timesPlayed}</p>
          {lineupsLength && <button
            className="replace-button"
            data-id={player.id}
            onClick={replacePlayer}
          >
            <FaExchangeAlt className="replace-icon" />
          </button>
          }
        </div >
      ))}
    </>
  )
}

export default Lineup
