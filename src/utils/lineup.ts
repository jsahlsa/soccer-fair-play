import type { PlayerType } from "../types"
const starters = 7

const createFairLineup = (players: PlayerType[]): PlayerType[] => {
  console.log(players)
  let newLineup: PlayerType[] = [...players.filter(player => !player.playing), ...players.filter(player => player.goalie)]
  // first get all the players who were sitting out
  const difference = starters - newLineup.length
  console.log(difference, 'difference')
  newLineup = [...newLineup, ...players.toSorted((a, b) => a.timesPlayed - b.timesPlayed).slice(0, difference - 1)]
  console.log(newLineup, 'new lineup in create fair lineup')
  return newLineup
}

const createRandomLineup = (players: PlayerType[]) => {
  const randomSeven = getRandomAmount(players, starters)
  return randomSeven
}

const getRandomAmount = (obj: PlayerType[], amount: number) => {
  const lineup: PlayerType[] = []
  while (lineup.length < amount - 1) {
    // get a player at random
    const player = getRandomPlayer(obj)
    // check if they are already in the lineup
    const inLineup = lineup.some(item => item.id === player.id)
    // if they are not in the lineup and are not the goalie then add them
    if (!inLineup && !player.goalie) {
      lineup.push(player)
    }
  }
  return lineup
}

const checkForPreferred = (lineup: PlayerType[], players: PlayerType[]): PlayerType[] => {
  const hasPreferred = lineup.some(player => player.preferred)
  if (hasPreferred) {
    return lineup
  }
  const newLineup = addPreferred(lineup, players)
  return newLineup
}

const addPreferred = (lineup: PlayerType[], players: PlayerType[]): PlayerType[] => {
  const allPreferreds = players.filter(player => player.preferred)
  const onePreferred = getOneWithLeastTimesPlayed(allPreferreds)
  const newLineup = insertPreferred([...lineup], onePreferred)
  return newLineup
}

const insertPreferred = (lineup: PlayerType[], onePreferred: PlayerType): PlayerType[] => {
  const sorted = lineup.toSorted((a, b) => b.timesPlayed - a.timesPlayed)
  sorted[0] = onePreferred
  return sorted
}

const getOneWithLeastTimesPlayed = (all: PlayerType[]): PlayerType => {
  const one = [...all].sort((a, b) => a.timesPlayed - b.timesPlayed)[0]
  return one
}

const getRandomPlayer = (obj: PlayerType[]) => {
  const randomNumber = Math.floor(Math.random() * obj.length)
  return [...obj][randomNumber]
}

const idsOfPlayersPlaying = (lineup: PlayerType[]) => {
  return lineup.map(player => player.id)
}

export {
  createFairLineup,
  createRandomLineup,
  idsOfPlayersPlaying,
  checkForPreferred,
}
