import { useState } from 'react'

const Settings = ({
  lineupSize,
  changeLineupSize
}: {
  lineupSize: number,
  changeLineupSize: (size: number) => void
}) => {
  const [size, setSize] = useState(lineupSize)

  const handleSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSize(Number(e.target.value))
  }
  return (
    <div className="settings-container">
      {/* disabled for now, will implement later */}
      <input value={size} onChange={handleSize} disabled />
      <button onClick={() => changeLineupSize(size)} disabled>change lineup size</button>
    </div>
  )
}

export default Settings
