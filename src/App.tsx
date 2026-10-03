import { useState, useRef } from 'react'
import type { PlayerType, MessageType } from './types'
import Players from './components/Players'
import Lineups from './components/Lineups'
import Settings from './components/Settings'
import Message from './components/Message'

import {
  createRandomLineup,
  checkForPreferred,
  createFairLineup
} from './utils/lineup'

function App() {
  const [lineupSize, setLineupSize] = useState<number>(7)
  const [players, setPlayers] = useState<PlayerType[]>([])
  const [lineups, setLineups] = useState<PlayerType[][]>([])
  const [name, setName] = useState<string>('')
  const [message, setMessage] = useState<MessageType>()
  const [currentView, setCurrentView] = useState<'players' | 'lineups'>('players')

  const nameInputRef = useRef<HTMLInputElement>(null)

  const renderView = () => {
    switch (currentView) {
      case 'players': return (
        <Players
          addPlayer={addPlayer}
          name={name}
          handleName={handleName}
          nameInputRef={nameInputRef}
          players={players}
          handleGoalieChange={handleGoalieChange}
          handleChangePreferred={handleChangePreferred}
        />
      )
      case 'lineups': return <Lineups lineups={lineups} createLineup={createLineup} />
      default: return (
        <Players
          addPlayer={addPlayer}
          name={name}
          handleName={handleName}
          nameInputRef={nameInputRef}
          players={players}
          handleGoalieChange={handleGoalieChange}
          handleChangePreferred={handleChangePreferred}
        />
      )
    }
  }

  const addPlayer = () => {
    const id = players.length > 0 ? players[players.length - 1].id + 1 : 1;
    setPlayers(
      [...players,
      {
        id: id,
        name: name,
        timesPlayed: 0,
        preferred: false,
        injured: false,
        goalie: false,
        playing: false
      }
      ])
    setName('')

    if (nameInputRef.current) {
      nameInputRef.current?.focus()
    }
  }

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleGoalieChange = (id: number) => {
    setPlayers(prevPlayers =>
      prevPlayers.map(player =>
        player.id === id ? { ...player, goalie: true } : { ...player, goalie: false }
      )
    )
  }

  const handleChangePreferred = (id: number) => {
    setPlayers(prevPlayers =>
      prevPlayers.map(player =>
        player.id === id ? { ...player, preferred: !player.preferred } : { ...player }
      )
    )
  }

  const changeLineupSize = (size: number) => {
    setLineupSize(size)
  }

  const createMessage = (type: string, content: string, timeout: number) => {
    setMessage({
      type: type,
      content: content,
    })
    setTimeout(() => {
      setMessage({
        type: '',
        content: '',
      })
    }, timeout)

  }

  const createLineup = () => {
    // mnake sure there is at least one player
    if (players.length === 0) {
      createMessage('error', 'need to add at least 1 player', 3000)
      return
    }
    // check if goalie has been selected
    const goalie = players.find(player => player.goalie)
    if (!goalie) {
      createMessage('error', 'need to set a goalie first', 3000)
      return
    }

    const hasPreferredPlayers = players.filter(player => player.preferred)
    if (hasPreferredPlayers.length === 1) {
      createMessage('error', 'must have 0 or more than 1 preferred players', 3000)
      return
    }

    let lineup: PlayerType[] = []
    // goalie exists, so add goalie
    lineup.push(goalie)
    console.log('lineups length', lineups.length)
    const fieldPlayers = players.filter(player => !player.goalie)
    // check if it is first lineup, and get six more
    if (lineups.length === 0) {
      // gets 6 random players to add to goalie
      const randomLineup = createRandomLineup(fieldPlayers)
      lineup = [...lineup, ...randomLineup]
      // check if there are enough players for the lineup
    } else if (players.length <= lineupSize) {
      lineup = [...lineup, ...fieldPlayers]
    } else {
      console.log('in create fair lineup', lineup)
      lineup = [...lineup, ...createFairLineup(fieldPlayers)]
    }

    // need to check for a preferred player before finalizing lineup
    lineup = checkForPreferred(lineup, players)
    // get ids of players in lineup
    const lineupIds = lineup.map(player => player.id)
    // use ids to increment timesPlayed
    const updatedPlayers = players.map(player =>
      lineupIds.includes(player.id)
        ? { ...player, timesPlayed: player.timesPlayed + 1, playing: true }
        : { ...player, playing: false }
    )

    setPlayers(updatedPlayers)

    const finalizedLineup = lineup.map(lineupPlayer => {
      const freshRecord = updatedPlayers.find(p => p.id === lineupPlayer.id)
      return freshRecord ? freshRecord : lineupPlayer
    })
    setLineups(prevLineups => [...prevLineups, finalizedLineup])
  }

  console.log(players, 'players', lineups, 'lineups')
  return (
    <>
      {message?.type ? <Message message={message} /> : ''}
      <Settings lineupSize={lineupSize} changeLineupSize={changeLineupSize} />
      <nav>
        <button onClick={() => setCurrentView('players')}>players</button>
        <button onClick={() => setCurrentView('lineups')}>lineup</button>
      </nav>
      <h1>Soccer fair play app</h1>
      <main>
        {renderView()}
      </main>
    </>
  )
}

export default App
