import { useRef, useEffect, useState } from 'react'
import type { InjuredAlertType, PlayerType } from "../types"

// maybe make 2 buttons
// if they want to change now them adjust lineup and clear alert
// if not just clear alert
const InjuredAlert = (
  {
    injuredAlert,
    closeInjured,
    replaceInjured,
    players,
    handleReplaceGoalie,
  }: {
    injuredAlert: InjuredAlertType,
    closeInjured: () => void,
    replaceInjured: () => void,
    players: PlayerType[],
    handleReplaceGoalie: (e: React.MouseEvent<HTMLButtonElement>) => void,
  }) => {
  const [replaceGoalie, setReplaceGoalie] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current

    if (!dialog) return

    if (injuredAlert.injured) {
      if (!dialog.open) dialog.showModal()
    } else {
      dialog.close()
    }
  }, [injuredAlert.injured])

  const injuredPlayer = players.find(player => player.id === injuredAlert.id)
  const isGoalie = injuredPlayer?.goalie

  const replacements = players.filter(player => !player.goalie)

  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault()
    closeInjured()
  }

  const handleReplace = (e: React.SyntheticEvent) => {
    e.preventDefault()
    replaceInjured()
  }

  const showReplaceGoalie = () => {
    setReplaceGoalie(true)
  }

  if (!isGoalie) {
    return (
      <>
        <dialog
          ref={dialogRef}
          className="injured-dialog"
          onCancel={handleCancel}
        >
          <p>Do you want to replace injured player in current lineup?</p>
          <button onClick={handleReplace}>yes</button><button onClick={handleCancel}>no</button>
        </dialog>
      </>
    )
  } else {
    return (
      <>
        <dialog
          ref={dialogRef}
          className="injured-dialog"
          onCancel={handleCancel}
        >
          <p>Do you want to replace injured goalie in current lineup?</p>
          <button onClick={showReplaceGoalie}>yes</button><button onClick={handleCancel}>no</button>
          {replaceGoalie && (
            <div>
              <p>pick a player to replace goalie:</p>
              <div className="player-buttons-container">
                {replacements.map(player => (
                  <div>
                    <button onClick={handleReplaceGoalie} value={player.id}>{player.name}</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </dialog>
      </>
    )
  }
}

export default InjuredAlert
