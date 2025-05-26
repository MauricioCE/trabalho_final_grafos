import { create } from "zustand";
import { GameState } from "../common/types";

export interface GameplayStore {
  gameState: GameState;
  playerScore: number;
  botScore: number;
  maxScore: number;

  setGameState: (state: GameState) => void;
  setPlayerScore: (score: number) => void;
  setBotScore: (score: number) => void;
  setMaxScore: (value: number) => void;
}

export const useGameplayStore = create<GameplayStore>((set) => ({
  gameState: "paused",
  playerScore: 0,
  botScore: 0,
  maxScore: 5,

  setGameState: (state: GameState) => set({ gameState: state }),
  setPlayerScore: (score: number) => set({ playerScore: score }),
  setBotScore: (score: number) => set({ botScore: score }),
  setMaxScore: (value: number) => set({ maxScore: value }),
}));
