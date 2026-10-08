const PlayerInput = ({
  nameInputRef,
  name,
  handleName,
  addPlayer
}: {
  nameInputRef: React.RefObject<HTMLInputElement | null>,
  name: string,
  handleName: (e: React.ChangeEvent<HTMLInputElement>) => void,
  addPlayer: () => void
}) => {
  return (
    <div className="player-input-container">
      <label htmlFor="add-player">
        add player:{' '}
        <input ref={nameInputRef} id="add-player" name="add-player" type="text" value={name} onChange={handleName} />
      </label>
      <button className="button-secondary" id="add" type="submit" onClick={addPlayer}>+</button>
    </div>
  )
}

export default PlayerInput
