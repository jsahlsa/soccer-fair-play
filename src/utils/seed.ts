const players = ['dax', 'roman', 'bradley', 'mikaya', 'mason', 'noah', 'thomas', 'israel', 'jack', 'teddy']

const seededPlayers = players.map((player, i) => {
  return {
    id: i + 1,
    name: player,
    timesPlayed: 0,
    preferred: player === 'teddy' || player === 'bradley',
    injured: false,
    goalie: player === 'noah',
    playing: false,
  }
})

export {
  seededPlayers,
}
