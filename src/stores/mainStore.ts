import { create } from "zustand";
import { GameMap, Size, Vector2 } from "../common/types";

export interface GameData {
  map: GameMap;
  mapSize: Size;
  playerCoord: Vector2;
  playerPointsCoords: Vector2[];
  botCoord: Vector2;
  botPointsCoords: Vector2[];
  path: Vector2[];
  pressedKey: { value: string };

  setMap: (newMap: GameMap) => void;
  setMapSize: (newSize: Size) => void;
  setPlayerCoord: (coord: Vector2) => void;
  setPlayerPointsCoords: (coords: Vector2[]) => void;
  setBotCoord: (coord: Vector2) => void;
  setBotPointsCoords: (coords: Vector2[]) => void;
  setPath: (path: Vector2[]) => void;
  setPressedKey: (key: { value: string }) => void;
}

export const useGameStore = create<GameData>((set) => ({
  map: [],
  mapSize: { width: 0, height: 0 },
  playerCoord: { x: -1, y: -1 },
  playerPointsCoords: [],
  botCoord: { x: -1, y: -1 },
  botPointsCoords: [],
  steps: 0,
  maxSteps: 0,
  updateMap: 1,
  path: [],
  pressedKey: { value: "" },

  setMap: (newMap: GameMap) => set({ map: newMap }),
  setMapSize: (newSize: Size) => set({ mapSize: newSize }),
  setPlayerCoord: (coord: Vector2) => set({ playerCoord: coord }),
  setPlayerPointsCoords: (coords: Vector2[]) =>
    set({ playerPointsCoords: coords }),
  setBotCoord: (coord: Vector2) => set({ botCoord: coord }),
  setBotPointsCoords: (coords: Vector2[]) => set({ botPointsCoords: coords }),
  setPath: (path: Vector2[]) => set({ path: path }),
  setPressedKey: (key: { value: string }) => set({ pressedKey: key }),
}));
