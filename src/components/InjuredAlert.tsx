import { useRef, useEffect } from 'react'
import type { InjuredAlertType } from "../types"

// maybe make 2 buttons
// if they want to change now them adjust lineup and clear alert
// if not just clear alert
const InjuredAlert = (
  {
    injuredAlert,
    closeInjured,
    replaceInjured,
  }: {
    injuredAlert: InjuredAlertType,
    closeInjured: () => void,
    replaceInjured: () => void,
  }) => {

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

  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault()
    closeInjured()
  }

  const handleReplace = (e: React.SyntheticEvent) => {
    e.preventDefault()
    replaceInjured()
  }

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
}

export default InjuredAlert
