import { useEffect, useRef } from 'react'
import type { PlayerType, ReplacementType } from '../types'

const ReplaceDialog = ({
  replace,
  handleCloseReplace,
  playersNotPlaying,
  handleReplacePlayer,
}: {
  replace: ReplacementType,
  handleCloseReplace: () => void,
  playersNotPlaying: PlayerType[],
  handleReplacePlayer: (e: React.MouseEvent<HTMLButtonElement>) => void,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current

    if (!dialog) return

    if (replace) {
      if (!dialog.open) dialog.showModal()
    } else {
      dialog.close()
    }

  }, [replace])

  const closeReplace = () => {
    handleCloseReplace()
  }

  return (
    <>
      <dialog
        ref={dialogRef}
      >
        <p>choose a replacement player:</p>
        <button onClick={closeReplace} className="close-button">x</button>
        <div className="player-buttons-container">
          {playersNotPlaying.map(player => (
            <div>
              <button data-id={player.id} onClick={handleReplacePlayer}>{player.name}</button>
            </div>
          ))}
        </div>
      </dialog>
    </>
  )
}

export default ReplaceDialog
