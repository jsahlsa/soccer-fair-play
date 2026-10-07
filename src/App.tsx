import { useState, useEffect, useRef } from 'react'
import type { PlayerType, MessageType, InjuredAlertType } from './types'
import Players from './components/Players'
import Lineups from './components/Lineups'
import Settings from './components/Settings'
import Message from './components/Message'
import InjuredAlert from './components/InjuredAlert'

import { seededPlayers } from './utils/seed'

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
  const [injuredAlert, setInjuredAlert] = useState<InjuredAlertType>()

  const nameInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setPlayers(seededPlayers)
  }, [])

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
          handleChangeInjured={handleChangeInjured}
        />
      )
      case 'lineups': return <Lineups
        lineups={lineups}
        createLineup={createLineup}
        undoLineup={undoLineup}
      />
      default: return (
        <Players
          addPlayer={addPlayer}
          name={name}
          handleName={handleName}
          nameInputRef={nameInputRef}
          players={players}
          handleGoalieChange={handleGoalieChange}
          handleChangePreferred={handleChangePreferred}
          handleChangeInjured={handleChangeInjured}
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

  const handleChangeInjured = (id: number) => {
    setPlayers(prevPlayers =>
      prevPlayers.map(player =>
        player.id === id ? { ...player, injured: !player.injured } : { ...player }
      )
    )
    const injuredPlayer = players.find(player => id === player.id)
    if (injuredPlayer) {
      if (!injuredPlayer.injured) {
        setInjuredAlert({
          injured: true,
          id: injuredPlayer.id
        })
      } else {
        setInjuredAlert({
          injured: false,
          id: undefined
        })
      }
    }
  }

  const closeInjured = () => {
    setInjuredAlert({ injured: false, id: undefined })
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

  const replaceInjured = () => {
    const lastLineup = lineups.at(-1)
    const injuredPlayer = players.find(player => player.id === injuredAlert?.id)

    if (!lastLineup || !injuredPlayer) {
      console.warn('missing lineup or injured player data')
      return
    }

    const replacementPlayer = players
      .filter(player => !player.playing)
      .filter(player => !player.injured)
      .toSorted((a, b) => a.timesPlayed - b.timesPlayed)[0]

    if (!replacementPlayer) {
      console.warn('no replacement players')
      return
    }
    const newLineup = lastLineup.map(player => player.id === injuredPlayer?.id ? replacementPlayer : player)

    const newPlayers = players.map(player => {
      if (player.id === replacementPlayer.id) {
        return { ...player, timesPlayed: player.timesPlayed + 0.5, playing: true }
      }
      if (player.id === injuredPlayer.id) {
        return { ...player, timesPlayed: player.timesPlayed - 0.5, playing: false }
      }
      return player
    })
    setPlayers(newPlayers)

    const replacementLineup: PlayerType[] = newLineup.map(player => player.id === replacementPlayer.id
      ? { ...player, timesPlayed: player.timesPlayed + 0.5, playing: true }
      : player
    )

    setLineups((prevLineups) => {
      if (prevLineups.length === 0) {
        return [replacementLineup]
      }

      return [...prevLineups.slice(0, -1), replacementLineup] as PlayerType[][]
    })
    setInjuredAlert({
      injured: false,
      id: undefined
    })
  }

  const undoLineup = () => {
    const newLineups = lineups.slice(0, -1)
    // decrement each player in last lineup
    // mark players as playing or not from second to last lineup
    // keep all other properties the same
    const lastLineup = lineups.at(-1)
    const secondToLastLineup = lineups.at(-2)
    const idsOfPlaying = lastLineup?.map(player => player.id)
    const idsOfPlayingSecondToLast = secondToLastLineup?.map(player => player.id)
    const decrementedTimesPlayed = players.map(player => idsOfPlaying?.includes(player.id)
      ? { ...player, timesPlayed: player.timesPlayed - 1 }
      : { ...player }
    )
    const markedAsPlaying = decrementedTimesPlayed.map(player => idsOfPlayingSecondToLast?.includes(player.id)
      ? { ...player, playing: true }
      : { ...player }
    )
    console.log('ids of playing', idsOfPlaying, 'decremented', decrementedTimesPlayed, 'marked', markedAsPlaying)

    setLineups([...newLineups])
    setPlayers(markedAsPlaying)
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
    const fieldPlayers = players
      .filter(player => !player.goalie)
      .filter(player => !player.injured)
    // check if it is first lineup, and get six more
    if (lineups.length === 0) {
      // gets 6 random players to add to goalie
      const randomLineup = createRandomLineup(fieldPlayers)
      lineup = [...lineup, ...randomLineup]
      // check if there are enough players for the lineup
    } else if (players.length <= lineupSize) {
      lineup = [...lineup, ...fieldPlayers]
    } else {
      lineup = [...lineup, ...createFairLineup(fieldPlayers)]
    }

    // need to check for a preferred player before finalizing lineup
    lineup = checkForPreferred(lineup, fieldPlayers)
    // get ids of players in lineup
    const lineupIds = lineup.map(player => player.id)

    const updatedPlayers = players.map(player =>
      lineupIds.includes(player.id)
        ? { ...player, timesPlayed: player.timesPlayed + 1, playing: true }
        : { ...player, playing: false }
    )

    setPlayers(updatedPlayers)

    const updatedLineup = lineupIds.map(id => {
      const player = updatedPlayers.find(player => player.id === id)
      return player
    }).filter((player): player is PlayerType => player !== undefined)

    setLineups([...lineups, updatedLineup])
  }

  const injuredInLineup = (id: number | undefined) => {
    const injuredPlayer = players.find(player => player.id === id)
    const lastLineupIds = lineups?.at(-1)?.map(player => player.id)
    if (!injuredPlayer?.id) return false
    return lastLineupIds?.includes(injuredPlayer.id) ?? false
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
      {injuredAlert?.injured && injuredInLineup(injuredAlert?.id)
        ? <InjuredAlert
          injuredAlert={injuredAlert}
          closeInjured={closeInjured}
          replaceInjured={replaceInjured}
        />
        : ''}
      <main>
        {renderView()}
      </main>
    </>
  )
}

export default App
