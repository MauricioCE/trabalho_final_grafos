import { create } from "zustand";
import { Algorithm, GameState } from "../common/types";

export interface GameplayStore {
  gameplayState: GameState;
  playerScore: number;
  botScore: number;
  maxScore: number;
  algorithm: Algorithm;
  stageName: string;

  setGameState: (state: GameState) => void;
  setPlayerScore: (score: number) => void;
  setBotScore: (score: number) => void;
  setMaxScore: (value: number) => void;
  setAlgorithm: (name: Algorithm) => void;
  setStageName: (name: string) => void;
}

export const useGameplayStore = create<GameplayStore>((set) => ({
  gameplayState: "paused",
  playerScore: 0,
  botScore: 0,
  maxScore: 5,
  algorithm: "dfs",
  stageName: "Sem nome",

  setGameState: (state: GameState) => set({ gameplayState: state }),
  setPlayerScore: (score: number) => set({ playerScore: score }),
  setBotScore: (score: number) => set({ botScore: score }),
  setMaxScore: (value: number) => set({ maxScore: value }),
  setAlgorithm: (name: Algorithm) => set({ algorithm: name }),
  setStageName: (name: string) => set({ stageName: name }),
}));
