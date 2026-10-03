export interface PlayerType {
  id: number;
  name: string;
  timesPlayed: number;
  preferred: boolean;
  injured: boolean;
  goalie: boolean;
  playing: boolean;
}

export interface MessageType {
  type: string;
  content: string;
}
